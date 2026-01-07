type Timer = ReturnType<typeof setInterval>;
export declare function startTimer(callback: () => void, interval: number): Timer;
export declare function stopTimer(timerId: Timer): void;
export declare function startTimeOut(callback: () => void, delay: number): Timer;
export declare function stopTimeOut(timerId: Timer): void;
export {};
//# sourceMappingURL=tools.d.ts.map