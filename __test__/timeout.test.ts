import {startTimeOut, stopTimeOut} from '../ts/tools'
type Timer = ReturnType<typeof setInterval>;

beforeEach(() => {
    // 在每个测试用例开始之间使用模拟计时器
    jest.useFakeTimers();
});

afterEach(() => {
    // 在每个测试用例结束后恢复真实计时器
    jest.useRealTimers();
});

test("开启延时器", () => {
    const callback = jest.fn();
    const delay = 3000;
    const setTimeOut = jest.spyOn(window, 'setTimeout'); // 避免调用真实的 setTimeout

    const timerId = startTimeOut(callback, delay) as unknown as Timer;
    
    // 使用各种断言进行测试
    expect(setTimeOut).toHaveBeenCalledTimes(1);

    expect(callback).toHaveBeenCalledTimes(0); // 回调函数不应该被调用
    jest.advanceTimersByTime(1000); // 快进 1s
    expect(callback).toHaveBeenCalledTimes(0); // 回调函数不应该被调用
    jest.advanceTimersByTime(1000); // 快进 1s
    expect(callback).toHaveBeenCalledTimes(0); // 回调函数不应该被调用
    jest.advanceTimersByTime(1000); // 快进 1s
    expect(callback).toHaveBeenCalledTimes(1); // 回调函数应该被调用一次
});

test("停止延时器", () => {
    const callback = jest.fn();
    const delay = 3000;

    const setTimeOut = jest.spyOn(window, 'setTimeout'); // 避免调用真实的 setTimeout

    const timerId = startTimeOut(callback, delay) as unknown as Timer;
    stopTimeOut(timerId);

    expect(setTimeOut).toHaveBeenCalledTimes(1);
    expect(callback).toHaveBeenCalledTimes(0); // 回调函数不应该被调用
    jest.advanceTimersByTime(3000); // 快进 3s
    expect(callback).toHaveBeenCalledTimes(0); // 回调函数不应该被调用
    expect(callback).not.toHaveBeenCalled();
});

test("时间不可为负数", () => {
    const callback = jest.fn();
    const delay = -3000;

    const setTimeOut = jest.spyOn(window, 'setTimeout'); // 避免调用真实的 setTimeout

    const timerId = startTimeOut(callback, delay) as unknown as Timer;
    stopTimeOut(timerId);

    expect(setTimeOut).toHaveBeenCalledTimes(0);
    expect(callback).toHaveBeenCalledTimes(0); // 回调函数不应该被调用
    jest.advanceTimersByTime(3000); // 快进 3s
    expect(callback).toHaveBeenCalledTimes(0); // 回调函数不应该被调用
    expect(callback).not.toHaveBeenCalled();
});