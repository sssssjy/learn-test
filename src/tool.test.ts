const { sum, sub, div, multiply } = require("./tool");

// 在每个测试用例执行前运行
beforeEach(() => {
  console.log("全局的beforeEach");
});

// 在每个测试用例执行后运行
afterEach(() => {
  console.log("全局的afterEach");
});

// 整个测试套件的的第一个测试用例执行之前执行
beforeAll(() => {
  console.log("全局的beforeAll");
});

// 整个测试套件的最后一个测试用例执行之后执行
afterAll(() => {
  console.log("全局的afterAll");
});

// 第一组
describe("第一组测试用例", () => {
  beforeEach(() => {
    console.log("第一组的beforeEach");
  });

  afterEach(() => {
    console.log("第一组的afterEach");
  });

  beforeAll(() => {
    console.log("第一组的beforeAll");
  });

  afterAll(() => {
    console.log("第一组的afterAll");
  }); 

  console.log("开始执行第一组测试用例");

  test("测试加法", () => {
    const result = sum(2, 3);
    expect(result).toBe(5);
    console.log("加法测试通过");
  });

  test("测试减法", () => {
    const result = sub(5, 3);
    expect(result).toBe(2);
    console.log("减法测试通过");
  });
});

// 第二组
describe("第二组测试用例", () => {
  beforeEach(() => {
    console.log("第二组的beforeEach");
  });

  afterEach(() => {
    console.log("第二组的afterEach");
  });

  beforeAll(() => {
    console.log("第二组的beforeAll");
  });

  afterAll(() => {
    console.log("第二组的afterAll");
  }); 

  console.log("开始执行第二组测试用例");

  test("测试乘法", () => {
    const result = multiply(4, 3);
    expect(result).toBe(12);
    console.log("乘法测试通过");
  });

  test.only("测试除法", () => {
    const result = div(10, 2);
    expect(result).toBe(5);
    console.log("除法测试通过");
  });
});
