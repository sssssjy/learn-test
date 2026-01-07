export function startTimer(callback, interval) {
    return setInterval(callback, interval);
}
export function stopTimer(timerId) {
    clearInterval(timerId);
}
export function startTimeOut(callback, delay) {
    return setTimeout(callback, delay);
}
export function stopTimeOut(timerId) {
    clearTimeout(timerId);
}
//# sourceMappingURL=tools.js.map