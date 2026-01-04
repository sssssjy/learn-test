function isRepeat(arr: number[]): boolean {
    const len: number = arr.length;
    const uniqueArr: number[] = Array.from(new Set(arr));
    return len !== uniqueArr.length;
}

function randomNum(): number[] {
    let num: number = 0; // 0 - 9 随机数
    let comNum: number[] = []; // 随机生成的数字

    while (true) {
        comNum.length = 0; // 每次生成前清空数组
        for(let i = 0; i < 4; i++) {
            num = Math.floor(Math.random() * 10);
            comNum.push(num);
        }
        if (!isRepeat(comNum)) {
            break;
        }
    }

    return comNum;
}

module.exports = {
    isRepeat,
    randomNum
};
