const {sum, multiply, divide, subtract} = require("../utils/tool");

jest.mock("../utils/tool", () => {
    // 改写文件模块实现

    // 拿到指定路径下的文件原始模块
    const originalModule = jest.requireActual("../utils/tool");

    // 相当于替换原始模块
    // 一部分使用原始模块，一部分使用模拟实现
    return {
        ...originalModule,
        sum: jest.fn(() => 10),
        multiply: jest.fn(() => 20),
    }
});

test("测试工具模块的函数", () => {
    // 测试被改写的函数
    expect(sum(1, 2)).toBe(10);
    expect(multiply(2, 3)).toBe(20);

    // 测试未被改写的函数
    expect(divide(6, 2)).toBe(3);
    expect(subtract(5, 3)).toBe(2);
});