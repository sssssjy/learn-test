import { startTimer, stopTimer, startTimeOut, stopTimeOut } from "./tools.js";
// 定义平台无关的 Timer 类型
type Timer = ReturnType<typeof setInterval>;

const startBtn = document.getElementById("startBtn") as HTMLButtonElement;
const stopBtn = document.getElementById("stopBtn") as HTMLButtonElement;
const num = document.getElementById("num") as HTMLDivElement;

const startTimeoutBtn = document.getElementById("startTimeoutBtn") as HTMLButtonElement;
const stopTimeoutBtn = document.getElementById("stopTimeoutBtn") as HTMLButtonElement;
const num1 = document.getElementById("num1") as HTMLDivElement;

let counter = 0;
let timerId: Timer;

let counter1 = 0;
let timerId1: Timer;
startBtn?.addEventListener("click", () => {
  timerId = startTimer(() => {
    counter++;
    num.textContent = counter.toString();
  }, 1000);
});

stopBtn?.addEventListener("click", () => {
  stopTimer(timerId);
});

startTimeoutBtn?.addEventListener("click", () => {
  timerId1 = startTimeOut(() => {
    counter1++;
    num1.textContent = counter1.toString();
  }, 3000);
});

stopTimeoutBtn?.addEventListener("click", () => {
  stopTimeOut(timerId1);
});
