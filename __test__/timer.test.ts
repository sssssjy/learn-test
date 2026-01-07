import {startTimer, stopTimer} from '../ts/tools';
type Timer = ReturnType<typeof setInterval>;

beforeEach(() => {
    // 在每个测试用例开始之间使用模拟计时器
    jest.useFakeTimers();
});

afterEach(() => {
    // 在每个测试用例结束后恢复真实计时器
    jest.useRealTimers();
});

test('开始计时器', () => {
    const callback = jest.fn();
    const interval = 1000;

    const setInterval = jest.spyOn(window, 'setInterval'); // 避免调用真实的 setInterval

    const timerId = startTimer(() => {
        callback();
    }, interval) as unknown as number;

    // 使用各种断言进行测试

    // 调用了startTimer方法后 setInterval 应该被调用一次
    expect(setInterval).toHaveBeenCalledTimes(1);
    // 断言 setInterval 调用时的参数
    expect(setInterval).toHaveBeenCalledWith(expect.any(Function), interval);

    jest.advanceTimersByTime(1000); // 快进 1s

    expect(callback).toHaveBeenCalledTimes(1); // 回调函数应该被调用一次

    jest.advanceTimersByTime(3000); // 再快进 3s

    expect(callback).toHaveBeenCalledTimes(4); // 回调函数应该被调用四次
    expect(setInterval).toHaveBeenCalledTimes(1);
    stopTimer(timerId as unknown as Timer);
})

test('停止计时器', () => {
    const callback = jest.fn();
    const interval = 1000;

    const timerId = startTimer(callback, interval) as unknown as number;
    stopTimer(timerId as unknown as Timer);

    expect(callback).toHaveBeenCalledTimes(0); // 回调函数不应该被调用
    expect(callback).not.toHaveBeenCalled();
})

test("时间不可为负数", () => {
    const callback = jest.fn();
    const interval = -1000;
    const setInterval = jest.spyOn(window, 'setInterval'); // 避免调用真实的 setInterval

    const timerId = startTimer(callback, interval) as unknown as number;
    stopTimer(timerId as unknown as Timer);

    expect(setInterval).toHaveBeenCalledTimes(0);
    expect(callback).toHaveBeenCalledTimes(0); // 回调函数不应该被调用
    jest.advanceTimersByTime(3000); // 快进 3s
    expect(callback).toHaveBeenCalledTimes(0); // 回调函数不应该被调用
    expect(callback).not.toHaveBeenCalled();
});