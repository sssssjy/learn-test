/**
 * 该文件为测试文件
 * 在该文件中会书写一个个测试用例
 * 安装jest之后 默认会提供一些全局方法和全局方法
 * test/expect/jest
 */

test("深度比较", () => {
  const obj = { name: '张三', score: {html: 100, css: 30} };
  // expect(obj).toBe({ name: '张三', score: {html: 100, css: 30} }); // 不通过 toBe无法比较对象
  // toEqual 会递归比较所有属性
  expect(obj).toEqual({ name: '张三', score: {html: 100, css: 30} }); // 使用toEqual进行深度比较
});

it('布尔值相关匹配器', () => {
  const n = null;
  expect(n).toBeFalsy();
  expect(n).not.toBeTruthy();

  const a = 0;
  expect(a).toBeFalsy();
  expect(a).not.toBeTruthy();
});

it('无参匹配器', () => {
  const n = null;
  expect(n).toBeNull();
  expect(n).toBeDefined();
  expect(n).not.toBeUndefined();

  const a = null;
  expect(a).toBeNull();
  expect(a).toBeDefined();
  expect(a).not.toBeUndefined();
});

it('数值相关匹配器', () => {
  const value1 = 4;
  // 大于
  expect(value1).toBeGreaterThan(3);
  // 大于等于
  expect(value1).toBeGreaterThanOrEqual(4);
  // 小于
  expect(value1).toBeLessThan(5);
  // 小于等于
  expect(value1).toBeLessThanOrEqual(4);
  // 接近某个值
  // 需要注意浮点数的精度问题
  // 还接受第二个参数 用于指定位数 默认两位
  expect(0.1 + 0.2).toBeCloseTo(0.3);
  expect(0.301).toBeCloseTo(0.302, 2);
  expect(0.301).not.toBeCloseTo(0.302, 5);
});

it('字符串相关匹配器', () => {
  expect('this is a test').toMatch(/test/);
  expect('this is a test').not.toMatch(/abc/);
});

test('数组相关匹配器', () => {
  const shoppingList = ['牛奶', '面包', '鸡蛋', '苹果', '香蕉'];
  expect(shoppingList).toContain('鸡蛋');
  expect(shoppingList).not.toContain('西瓜');

  // toContain 用于判断数组中是否包含某个元素 全等比较
  // 不匹配 地址不同
  // 可以使用toContainEqual进行深度比较
  expect([{name: '张三'}, {name: '李四'}]).not.toContain({name: '张三'});
  expect([{name: '张三'}, {name: '李四'}]).toContainEqual({name: '张三'});

  // toContain还能比较一个字符串是否是另一个字符串的子串
  expect('hello world').toContain('world');

  // 也可用于Set
  expect(new Set(shoppingList)).toContain('苹果');
});

function throwErrorFunction() {
  throw new Error('aaa you are using the wrong JDK version, this is an error. bbb');
}

it('异常相关匹配器', () => {
  // 测试函数是否会抛出异常
  expect(throwErrorFunction).toThrow();
  // 测试函数抛出的异常信息
  expect(throwErrorFunction).toThrow('you are using the wrong JDK version');
  // 测试函数抛出的异常类型
  expect(throwErrorFunction).toThrow(Error);
  // 测试函数抛出的异常信息是否匹配某个正则
  expect(throwErrorFunction).toThrow(/JDK version/);
});

const arr = ['张三'];
test("测试arr不包含某个元素", () => {
  // 期望这个数组不包含arr中的元素
  expect(['李四', '王五', '赵六']).toEqual(expect.not.arrayContaining(arr));
})

const obj = {name: '张三', age: 18, score: 100};
test("测试obj不包含某些键值对", () => {
  // 期望这个对象不包含obj中的某些键值对 全等
  expect({name: '李四', age: 18, score: 100}).toEqual(expect.not.objectContaining(obj));
})