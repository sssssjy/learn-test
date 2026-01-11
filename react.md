# 测试react组件

在现代前端开发中 组件是个重要的模块 一个组件拥有完整的功能 能够对我们的代码进行最大程度的复用

因此在进行单元测试的时候 往往也需要对重要组件进行测试

## Testing library

专门用于测试的工具库

<https://testing-library.com/docs/>

jest和testing library：

- jest是一个完整框架 提供完整测试工具链 匹配器、断言、mock库之类的工具 设计目标是提供一个完整的测试工具链 测试重点是测试某个函数是否功能正常
- testing library是一个通用库 主要用于“测试组件的行为而不是实现细节” 通过这个库提供的api模拟浏览器中与应用交互的方式 可与各种框架结合

在进行react组件的测试的时候 jest和testing library 一般都是配合使用

在cra创建的项目中 默认安装了

```ts
"@testing-library/dom": "^10.4.1",
"@testing-library/jest-dom": "^6.9.1",
"@testing-library/react": "^16.3.1",
"@testing-library/user-event": "^13.5.0",
```

- @testing-library/react 用于测试React组件 例如render screen fireEvent
- @testing-library/jest-dom jest扩展库 提供jest断言方法 用于测试dom状态和行为
- @testing-library/user-event 提供一组用于模拟用户行为的工具

```ts
test('renders learn react link', () => {
  const view = render(<App />);
  console.log(view)
  const linkElement = screen.getByText(/learn react/i);
  expect(linkElement).toBeInTheDocument();
});
```

render方法：
该方法接受一个组件作为参数 将其渲染为dom元素 并返回一个对象 包含以下重要属性：

- container 渲染后的dom元素 通过它模拟用户行为
- baseElement 整个文档的根元素
- asFrogment 将渲染后的dom元素转为DocumentFragment对象
- debug 在控制台输出渲染后的dom元素的html结构

screen对象
该对象封装了一些常用的dom查询和操作的函数 screen提供了一些常用的方法

- screen.getByLabelText 根据label标签的for属性或者内部文本 获取与之关联的表单元素
- screen.getByText 根据文本内容获取元素
- screen.getByRole 根据role属性获取元素
- screen.getByPlaceholderText 根据placeholder属性获取表单元素
- screen.getByTestId 根据data-testid获取元素
- screen.queryBy* 类似函数

测试3A准则：Arrange（准备）Act（动作）Assert（断言）
[3a准则](https://wiki.c2.com/?ArrangeActAssert)
准备必要条件
调用方法
断言结果

## 测试示例

使用cra搭建的react项目 官方推荐将测试代码放到src目录下

### 示例一

```ts
import { useState } from "react";

function HiddenMessage(props) {
  const [show, setShow] = useState(false);
  const {children} = props;

  return (
    <div>
      <label htmlFor="toggle">显示</label>
      <input type="checkbox" name="toggle" id="toggle" checked={show} onChange={e => setShow(e.target.checked)} />
      {show ? children : null}
    </div>
  );
}

export default HiddenMessage;

test("能够被勾选，功能正常", () => {
  const testMessage = "这是一条测试信息";
  render(<HiddenMessage>{testMessage}</HiddenMessage>)
  expect(screen.queryByText(testMessage)).toBeNull();

  // 模拟点击
  fireEvent.click(screen.getByLabelText("显示"));
  expect(screen.getByText(testMessage)).toBeInTheDocument();
})
```

queryBy与getBy的区别：
queryBy若没有找到 会返回null
getBy若没有找到 会抛错

## 示例2

```ts
import * as React from 'react'

function Login() {
    // 这里维护了一个组件自身的状态
    const [state, setState] = React.useReducer((s, a) => ({ ...s, ...a }), {
        resolved: false,
        loading: false,
        error: null,
    })

    function handleSubmit(event) {
        event.preventDefault()
        const { usernameInput, passwordInput } = event.target.elements

        setState({ loading: true, resolved: false, error: null })

        window
            .fetch('/api/login', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    username: usernameInput.value,
                    password: passwordInput.value,
                }),
            })
            .then(r => r.json().then(data => (r.ok ? data : Promise.reject(data))))
            .then(
                user => {
                    setState({ loading: false, resolved: true, error: null })
                    window.localStorage.setItem('token', user.token)
                },
                error => {
                    setState({ loading: false, resolved: false, error: error.message })
                },
            )
    }

    return (
        <div>
            <form onSubmit={handleSubmit}>
                <div>
                    <label htmlFor="usernameInput">Username</label>
                    <input id="usernameInput" />
                </div>
                <div>
                    <label htmlFor="passwordInput">Password</label>
                    <input id="passwordInput" type="password" />
                </div>
                <button type="submit">Submit{state.loading ? '...' : null}</button>
            </form>
            {state.error ? <div role="alert">{state.error}</div> : null}
            {state.resolved ? (
                <div role="alert">Congrats! You're signed in!</div>
            ) : null}
        </div>
    )
}

export default Login
```

模拟服务器

```ts
import { http, HttpResponse } from "msw";
import { setupServer } from "msw/node";
import { fireEvent, render, screen } from "@testing-library/react";

import Login from "../login";

const fakeUserRes = { token: "fake_user_token" };

const server = setupServer(
  http.post("/api/login", () => {
    return HttpResponse.json(fakeUserRes);
  })
);

// 启动服务器
beforeAll(() => server.listen());
// 关闭服务器
afterAll(() => server.close());
// 每个测试完成后重置服务器 测试用例之间互不影响
afterEach(() => {
  server.resetHandlers();
  window.localStorage.removeItem("token");
});

test("请求测试成功", async () => {
  // 渲染组件
  render(<Login />);
  // 往表单内部填写信息
  fireEvent.change(screen.getByLabelText(/Username/i), {
    target: {
      value: "name",
    },
  });

  fireEvent.change(screen.getByLabelText(/Password/i), {
    target: {
      value: "password",
    },
  });
  // 点击提交按钮
  fireEvent.click(screen.getByText("Submit"));
  expect(await screen.findByRole("alert")).toHaveTextContent(/Congrats/i);
  expect(window.localStorage.getItem("token")).toEqual(fakeUserRes.token);
});

test("请求测试失败", async () => {
  // 模拟服务器请求失败
  server.use(
    http.post("/api/login", () => {
      return HttpResponse.json({ message: "服务器内部出错" }, { status: 500 });
    })
  );

  // 渲染组件
  render(<Login />);
  // 往表单内部填写信息
  fireEvent.change(screen.getByLabelText(/Username/i), {
    target: {
      value: "name",
    },
  });

  fireEvent.change(screen.getByLabelText(/Password/i), {
    target: {
      value: "password",
    },
  });
  // 点击提交按钮
  fireEvent.click(screen.getByText("Submit"));

  expect(await screen.findByRole("alert")).toHaveTextContent(/服务器内部出错/i);
  expect(window.localStorage.getItem("token")).toBeNull();
});
```
