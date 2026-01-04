/**
 * 该文件为测试文件
 * 在该文件中会书写一个个测试用例
 * 安装jest之后 默认会提供一些全局方法和全局方法
 * test/expect/jest
 */

const { sum, multiply, sub, div } = require("./tool"); // 引入需要测试的模块

// describe
describe("测试加减法", () => {
  /**
   * 一个test方法 表示一个测试用例
   * param1: 针对测试用例的描述
   * param2: 执行该用例所对应的回调函数 里面书写测试逻辑
   */
  test("测试加法", () => {
    expect(sum(1, 2)).toBe(3); // 断言 期望结果是3
  });

  test("测试减法", () => {
    expect(sub(1, 2)).toBe(-1); // 断言 期望结果是-1
  });
});

// describe("测试乘除", () => {
//   // it 是 test 的别名
//   it("测试乘法", () => {
//     expect(multiply(2, 3)).toBe(6); // 断言 期望结果是6
//   });

//   it("测试除法", () => {
//     expect(div(6, 3)).toBe(2); // 断言 期望结果是2
//   });

//   // 测试除以0 抛出异常
//   it("测试除以0 抛出异常", () => {
//     expect(() => div(6, 0)).toThrow("Division by zero is not allowed.");
//   });
// });
