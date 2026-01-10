import getTimer from '../src/ts/modules/util'

describe("测试getTimer", () => {
    let timer:ReturnType<typeof getTimer>

    beforeEach(() => {
        jest.useFakeTimers();
    })

    afterEach(() => {
        jest.useRealTimers();
        jest.clearAllTimers();
    })

    test("timer开始和结束是否正确", () => {
        const callback = jest.fn();
        const setInterval = jest.spyOn(window, 'setInterval');

        const timer = getTimer(1000, {}, callback);
        timer.start();

        jest.advanceTimersByTime(500);
        expect(setInterval).toHaveBeenCalledTimes(1);
        jest.advanceTimersByTime(500);
        expect(setInterval).toHaveBeenCalledTimes(1);
        jest.advanceTimersByTime(3000);
        expect(setInterval).toHaveBeenCalledTimes(1);

        timer.stop();
        timer.start();
        jest.advanceTimersByTime(500);
        expect(setInterval).toHaveBeenCalledTimes(2);
        jest.advanceTimersByTime(500);
        expect(setInterval).toHaveBeenCalledTimes(2);
        jest.advanceTimersByTime(3000);
        expect(setInterval).toHaveBeenCalledTimes(2);
        timer.stop();
    })

    test("callback是否正常", () => {
        const callback = jest.fn();
        const setInterval = jest.spyOn(window, 'setInterval');

        const timer = getTimer(1000, {}, callback);
        timer.start();

        jest.advanceTimersByTime(1000);
        expect(callback).toHaveBeenCalledTimes(1);
        jest.advanceTimersByTime(2000);
        expect(callback).toHaveBeenCalledTimes(3);

        timer.stop();
        jest.advanceTimersByTime(2000);
        expect(callback).toHaveBeenCalledTimes(3);
    })
})