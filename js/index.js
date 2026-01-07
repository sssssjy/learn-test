import { startTimer, stopTimer, startTimeOut, stopTimeOut } from "./tools.js";
const startBtn = document.getElementById("startBtn");
const stopBtn = document.getElementById("stopBtn");
const num = document.getElementById("num");
const startTimeoutBtn = document.getElementById("startTimeoutBtn");
const stopTimeoutBtn = document.getElementById("stopTimeoutBtn");
const num1 = document.getElementById("num1");
let counter = 0;
let timerId;
let counter1 = 0;
let timerId1;
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
//# sourceMappingURL=index.js.map