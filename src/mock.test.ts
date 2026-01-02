// test('基本演示', () => {
//     // 创建一个模拟函数
//     const mock = jest.fn();

//     mock.mockReturnValue(10) // 设置返回值为 30
//         .mockReturnValueOnce(20) // 第一次调用返回 20
//         .mockReturnValueOnce(30); // 第二次调用返回 30

//     expect(mock()).toBe(20); // 第一次调用
//     expect(mock()).toBe(30); // 第二次调用
//     expect(mock()).toBe(10); // 之后的调用

//     // 设置这个模拟函数的返回值是 42
//     mock.mockReturnValue(42);
//     expect(mock()).toBe(42);
// });

// test('内置实现', () => {
//     const mock = jest.fn();
//     // 设置模拟函数的实现
//     mock.mockImplementation((x: number, y: number) => x + y);
//     expect(mock(1, 2)).toBe(3);
// });

// function forEach(arr: Array<any>, callback: Function) {
//   for (let i = 0; i < arr.length; i++) {
//     callback(arr[i]);
//   }
// }

// test("模拟回调函数", () => {
//   // 由于 forEach 函数接受一个回调函数作为参数
//   // 可以创建模拟函数来模拟callback

//   const mockCallback = jest.fn((x) => x + 100);

//   forEach([1, 2, 3], mockCallback);
//   /*
//         [
//             [1],
//             [2],
//             [3],
//         ];
//     */

//   expect(mockCallback.mock.calls).toHaveLength(3);
//   expect(mockCallback.mock.calls.length).toBe(3);

//   // 测试每次调用callback时传入的参数是否符合预期
//   expect(mockCallback.mock.calls?.[0]?.[0]).toBe(1);

//   // 针对每一个callback的返回值进行测试
//   expect(mockCallback.mock.results?.[0]?.value).toBe(101);

//   //   模拟函数是否调用过
//   expect(mockCallback).toHaveBeenCalled();

//   /**
//    * 对模拟函数进行边界判断
//    * .toHaveBeenNthCalledWith(nthCall, arg1, arg2, ....)
//    * 第nthCall次调用时传入的参数是否符合预期
//    * The nth argument must be positive integer starting from 1.
//    * */
//   expect(mockCallback).toHaveBeenNthCalledWith(1, 1);
// });

async function fetchData(success: boolean): Promise<string> {
    const res = await fetch('https://example.com/api/data');
    const data = await res.json();
    return data;
}

const mockFetchData = jest.fn();
const fakeData = {id: 1, name: 'Test Data'};

// 设置模拟函数的实现
mockFetchData.mockImplementation(() => {
    return Promise.resolve(fakeData);
});

// 通过模拟函数的方法控制模拟函数行为

test('模拟网络请求正常', async () => {
    const data = await mockFetchData();
    expect(data).toEqual({id: 1, name: 'Test Data'});
});

it('模拟网络请求失败', async () => {
    // 模拟网络请求 第一次请求失败 后续成功
    mockFetchData.mockImplementationOnce(() => {
        return Promise.reject(new Error('Network Error'));
    });

    await expect(mockFetchData()).rejects.toThrow('Network Error');
    await expect(mockFetchData()).resolves.toEqual({id: 1, name: 'Test Data'});
});