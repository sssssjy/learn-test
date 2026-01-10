# 从0开始整合webpack

- typescript
- webpack
- jest

## 准备工作

yarn init 初始化
yarn add typescript

配置tsconfig.json

```json
{
  // Visit https://aka.ms/tsconfig to read more about this file
  "compilerOptions": {
    // File Layout
    // "rootDir": "./src",
    "outDir": "./dist", // 打包目录

    // Environment Settings
    // See also https://aka.ms/tsconfig/module

    // 此三项为esm配置
    "target": "ES2022",
    "module": "ESNext",
    "moduleResolution": "Bundler",
    "esModuleInterop": true,

    "types": [],
    // For nodejs:
    // "lib": ["esnext"],
    // "types": ["node"],
    // and npm install -D @types/node

    // Other Outputs
    "sourceMap": true,
    "declaration": true,
    "declarationMap": true,

    // Stricter Typechecking Options
    "noUncheckedIndexedAccess": true,
    "exactOptionalPropertyTypes": true,

    // Style Options
    // "noImplicitReturns": true,
    // "noImplicitOverride": true,
    // "noUnusedLocals": true,
    // "noUnusedParameters": true,
    // "noFallthroughCasesInSwitch": true,
    // "noPropertyAccessFromIndexSignature": true,

    // Recommended Options
    "strict": true,
    "jsx": "react-jsx",
    // 需要设置为false
    "verbatimModuleSyntax": false,
    "isolatedModules": true,
    "noUncheckedSideEffectImports": true,
    "moduleDetection": "force",
    "skipLibCheck": true,
  },
//   对css文件进行模块化定义
  "include": ["src", "src/global.d.ts"]
}

```

下载webpack并更改配置
下载jest并更改配置

package.json中`"type": "module"`
test目录与src同级 不需要被webpack和ts编译

jest.config.ts

```ts
    moduleFileExtensions: ['ts', 'tsx', 'js', 'jsx', 'json'],
    preset: 'ts-jest/presets/default-esm',
    transform: {
        '^.+\\.ts$': ['ts-jest', { useESM: true }]
    },
    extensionsToTreatAsEsm: ['.ts']
```
