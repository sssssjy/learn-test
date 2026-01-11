# 测试hook

自定义hook作为一块公共逻辑的抽离 也会像组件一样被用到多个地方
hook无法作为普通函数一样测试 因为在react中hook必须在组件中使用 否则报错

可以为了测试自定义hook 专门写一个组件 但比较麻烦
在Testing Library中提供了一个@test-library/react-hooks 专门用与测试react hooks
该扩展库对应的官网地址：[react-hook-testing-library](https://github.com/testing-library/react-hooks-testing-library)

## 自定义hook

```ts
// 自定义 hook
// 这是一个计数器的自定义 hook
// 内部维护了一个计数的值，以及修改这个值的一些方法

import { useState } from "react";

interface Options {
  min?: number;
  max?: number;
}

type ValueParam = number | ((c: number) => number);

// 该方法主要是做一个边界的判断，如果超过了边界，那么就取边界值
function getTargetValue(val: number, options: Options = {}) {
  const { min, max } = options;
  let target = val;
  // 判断有没有超过最大值，如果超过了，那么我们就取最大值
  if (typeof max === "number") {
    target = Math.min(max, target);
  }
  // 判断有没有超过最小值，如果超过了，那么我们就取最小值
  if (typeof min === "number") {
    target = Math.max(min, target);
  }
  return target;
}

// useCounter(100, {min : 1, max : 1000})
function useCounter(initialValue = 0, options: Options = {}) {
  const { min, max } = options;

  // 设置初始值，初始值就为 initialVaule
  // 初始值是该自定义 hook 内部维护的状态，用来表示计数器的数值
  const [current, setCurrent] = useState(() => {
    return getTargetValue(initialValue, {
      min,
      max,
    });
  });

  // 设置新的值
  // 在设置新的值的时候，调用了 getTargetValue 来判断新值是否越界
  const setValue = (value: ValueParam) => {
    setCurrent((c) => {
      const target = typeof value === "number" ? value : value(c);
      return getTargetValue(target, {
        max,
        min,
      });
    });
  };

  // 下面就是自定义 hook 提供的 4 个方法
  // 用于修改计数器的数值

  // 增加
  const inc = (delta = 1) => {
    setValue((c) => c + delta);
  };

  const asyncInc = (delta = 1) => {
    setTimeout(()=>{
        setValue((c) => c + delta);
    }, 2000);
  };

  // 减少
  const dec = (delta = 1) => {
    setValue((c) => c - delta);
  };

  // 设置
  const set = (value: ValueParam) => {
    setValue(value);
  };

  // 重置
  const reset = () => {
    setValue(initialValue);
  };

  // 像外部暴露
  return [
    current,
    {
      inc,
      asyncInc,
      dec,
      set,
      reset,
    },
  ] as const;
}

export default useCounter;
```

对该hook进行测试

```ts
import useCounter from "../hooks/useCounter";
import { renderHook, act } from "@testing-library/react";

it("加法", () => {
  // arrange
  // {current: [0, {inc, dec, set, rest}]}
  const counter = renderHook(() => useCounter(0));

  // act
  act(() => counter.result.current[1].inc(2));

  // assert
  expect(counter.result.current[0]).toEqual(2);

});

it("减法", () => {
  // arrange
  // {current: [0, {inc, dec, set, reset}]}
  const counter = renderHook(() => useCounter(0));

  // act
  act(() => counter.result.current[1].dec(2));

  // assert
  expect(counter.result.current[0]).toEqual(-2);
});

it("设置值", () => {
  // arrange
  const counter = renderHook(() => useCounter(0));

  // act
  act(() => counter.result.current[1].set(100));

  // assert
  expect(counter.result.current[0]).toEqual(100);
});

it("重置值", () => {
  // arrange
  const counter = renderHook(() => useCounter(0));

  // act
  act(() => counter.result.current[1].set(100));
  act(() => counter.result.current[1].reset());

  // assert
  expect(counter.result.current[0]).toEqual(0);
});

it("设置最大值", () => {
  // arrange
  const counter = renderHook(() => useCounter(0, {max: 100}));

  // act
  act(() => counter.result.current[1].set(1000));

  // assert
  expect(counter.result.current[0]).toEqual(100);
});

it("设置最小值", () => {
  // arrange
  const counter = renderHook(() => useCounter(0, {min: -100}));

  // act
  act(() => counter.result.current[1].set(-1000));

  // assert
  expect(counter.result.current[0]).toEqual(-100);
});
```

首先我们使用到了 renderHook，这个方法的背后，会去渲染一个测试组件，在组件中可以使用自定义 hook，从 renderHook 的返回值中可以解构出自定义 Hook 中返回的状态值以及修改状态值的方法。

接下来使用 act 方法，该方法主要是用来模拟 react 组件的交互行为，并且触发更新。

最后进行 expect 断言。

## 测试异步hook

```ts
const asyncInc = (delta = 1) => {
    setTimeout(()=>{
        setValue((c) => c + delta);
    }, 2000);
  };


import useCounter from "../hooks/useCounter";
import { renderHook, act } from "@testing-library/react";

it("测试异步增加", async () => {
  jest.useFakeTimers();

  // {current: [0, {inc, dec, set, rest}]}
  const {result} = renderHook(() => useCounter(0))
  act(() => result.current[1].asyncInc(2));
  expect(result.current[0]).toEqual(0);
  await act(() => jest.advanceTimersByTime(2000));
  expect(result.current[0]).toEqual(2);
  jest.useRealTimers();
});
```
