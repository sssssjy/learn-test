# 模拟ES6类

在es6中所提供的class本质上是一个语法糖 背后实际是一个构造函数 可以使用jest.mock或者jest.spyOn模拟测试

在实际开发中 在测试一个模块时 通常这个模块引入了其他模块 为了屏蔽其影响 可以使用jest.mock

```ts
jest.mock("../ts/productReview.ts", () =>
  jest.fn().mockImplementation((name: string, review: string) => ({
    name,
    review,
  }))
);
```

使用jest.spyOn对类的方法进行模拟

```ts
import ProductReview from "../ts/productReview";

// 对该类的方法进行模拟

// 模拟类的getter
const mockName = jest.spyOn(ProductReview.prototype, 'name', 'get').mockImplementation(() => '小米手机');
const mockReview = jest.spyOn(ProductReview.prototype, 'review', 'get').mockImplementation(() => '很好用');

// 模拟类的静态方法
const mockStatic = jest.spyOn(ProductReview, 'showInfo').mockImplementation(() => "静态方法");

test("ProdcuctReview", () => {
    const p = new ProductReview("", "");
    const result = ProductReview.showInfo();

    expect(p.name).toBe("小米手机");
    expect(p.review).toBe("很好用");
    expect(result).toBe("静态方法");
    expect(mockName).toHaveBeenCalled();
    expect(mockReview).toHaveBeenCalled();
    expect(mockStatic).toHaveBeenCalled();
});
```

可用与TDD
