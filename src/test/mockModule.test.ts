const axios = require('axios');
const User = require('../api/user');
const userData = require('./user.json');

// 模拟axios模块
jest.mock('axios', () => {
    const userData = require('./user.json');
    const resp = {data: userData};
    return {
        get: jest.fn(() => Promise.resolve(resp))
    }
});

// 测试用例
test('测试获取用户数据', async () => {
    // 模拟响应数据
    
    // 指定模拟axios行为
    // 在使用axios.get时 相应resp
    // axios.get.mockImplementation(() => Promise.resolve(resp));

    await expect(User.all()).resolves.toEqual(userData);
});