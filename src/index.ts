// 该游戏是一个猜数字游戏
// 玩家输入 4位 0-9 不重复的数字 和 pc生成的 4位 0-9 不重复的数字 进行对比
// 如果位置和数字都对 则为A
// 如果数字对位置不对 则为B
// 比如 pc生成 1234 玩家输入 1356 则结果为 1A1B

const readline = require('readline-sync');
const { randomNum, isRepeat } = require('./utils/tools');

/**
 * guessNum: 玩家输入的数字
 * a: A的数量
 * b: B的数量
 * chance: 剩余尝试次数
 */
function main(): void {
    let guessNum: string,
    a: number = 0,
    b: number = 0,
    chance: number = 10;

    const comNum: number[] = randomNum();

    const arr: string[] = [
        "加油",
        "你可以的",
        "继续努力",
        "不要放弃",
        "相信自己"
    ];

    while(chance > 0) {
        guessNum = readline.question('请输入4位不重复的数字: ');

        // 输入校验
        if (guessNum.length !== 4 || isRepeat(guessNum.split('').map((item: string) => Number(item))) || isNaN(Number(guessNum))) {
            console.log('输入有误，请重新输入');
            continue;
        }

        a = 0;
        b = 0;

        for (let i = 0; i < 4; i++) {
            const num: number = Number(guessNum[i]);
            if (num === comNum[i]) {
                a++;
            } else if (comNum.includes(num)) {
                b++;
            }
        }

        if (a === 4) {
            console.log('恭喜你，猜对了！');
            return;
        } else {
            chance--;
            console.log(`${a}A${b}B，${arr[Math.floor(Math.random() * arr.length)]}，你还有 ${chance} 次机会`);
        }
    }

    console.log(`很遗憾，机会用完了，正确答案是 ${comNum.join('')}`);
}

main();