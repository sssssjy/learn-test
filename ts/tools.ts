// 定义平台无关的 Timer 类型
type Timer = ReturnType<typeof setInterval>;

export function startTimer(
  callback: () => void,
  interval: number
): Timer | undefined {
  if (interval < 0) return;
  return setInterval(callback, interval);
}

export function stopTimer(timerId: Timer | undefined): void {
  if (!timerId) return;
  clearInterval(timerId);
}

export function startTimeOut(
  callback: () => void,
  delay: number
): Timer | undefined {
  if (delay < 0) return;
  return setTimeout(callback, delay);
}

export function stopTimeOut(timerId: Timer | undefined): void {
  if (!timerId) return;
  clearTimeout(timerId);
}
