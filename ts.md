# 整合typescript

## 项目准备

```ts
// 局部安装typescript
yarn add typescript
// 生成ts配置文件
npx tsc --init
// 运行在node环境 添加node类型
yarn add @types/node -D
yarn add ts-node -D
```

项目书写完毕后 可以配置ts编译完成后的输出目录

```ts
tsconfig.json
{
    "compilerOptions":{
        "outDir": "./dist",
    },
    // 对src目录下的ts文件进行编译
    "include": ["./src"]
}
```

## 使用jest测试

安装jest

```ts
// ts-jest ts的预处理器库
yarn add jest ts-jest -D
// 生成jest配置文件jest.config.ts
npx create-jest
// 添加jest类型
yarn add @types/jest -D
// 在tsconfig.json中添加jest
"compilerOptions":{
    "types": ["node", "jest"],
}
// 修改jest.config.json
{
    preset: 'ts-jest',
    testEnvironment: "node",
}
```

在src目录下创建测试目录：`__test__`
再次目录下新增测试套件
一个工具函数对应一个测试套件 在测试套件中针对不同的参数来书写对应的测试用例
