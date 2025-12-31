// jest.config.js
module.exports = {
  preset: "ts-jest", // 关键：告诉 jest 使用 ts-jest
  testEnvironment: "node",
  roots: ["<rootDir>/src"], // 测试根目录
  testMatch: ["**/*.test.ts"], // 测试文件匹配模式
  moduleFileExtensions: ["ts", "js"], // 支持的文件扩展名
  transform: {
    "ts-jest": [
      "ts-jest",
      {
        tsconfig: "tsconfig.json",
        /* ts-jest config goes here in Jest */
      },
    ],
  },
};
