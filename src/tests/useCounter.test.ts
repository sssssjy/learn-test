import useCounter from "../hooks/useCounter";
import { renderHook, act } from "@testing-library/react";

it("加法", () => {
  // arrange
  const view = renderHook(() => useCounter(0));

  // act
  act(() => view.result.current[1].inc(2));

  // assert
  expect(view.result.current[0]).toEqual(2);

});

it("减法", () => {
  // arrange
  // {current: [0, {inc, dec, set, reset}]}
  const view = renderHook(() => useCounter(0));

  // act
  act(() => view.result.current[1].dec(2));

  // assert
  expect(view.result.current[0]).toEqual(-2);
});

it("设置值", () => {
  // arrange
  const view = renderHook(() => useCounter(0));

  // act
  act(() => view.result.current[1].set(100));

  // assert
  expect(view.result.current[0]).toEqual(100);
});

it("重置值", () => {
  // arrange
  const view = renderHook(() => useCounter(0));

  // act
  act(() => view.result.current[1].set(100));
  act(() => view.result.current[1].reset());

  // assert
  expect(view.result.current[0]).toEqual(0);
});

it("设置最大值", () => {
  // arrange
  const view = renderHook(() => useCounter(0, {max: 100}));

  // act
  act(() => view.result.current[1].set(1000));

  // assert
  expect(view.result.current[0]).toEqual(100);
});

it("设置最小值", () => {
  // arrange
  const view = renderHook(() => useCounter(0, {min: -100}));

  // act
  act(() => view.result.current[1].set(-1000));

  // assert
  expect(view.result.current[0]).toEqual(-100);
});

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
