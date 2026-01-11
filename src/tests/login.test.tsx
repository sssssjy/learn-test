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

test("should 请求测试成功", async () => {
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
