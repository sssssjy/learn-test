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
