import ProductReview from "../ts/productReview";
import ReviewCollector from "../ts/reviewCollector";

// ReviewCollector内部使用了ProductReview 使用jest.mock屏蔽其影响
jest.mock("../ts/productReview.ts", () =>
  jest.fn().mockImplementation((name: string, review: string) => ({
    name,
    review,
  }))
);

describe("测试reviewCollector", () => {
    let collector : ReviewCollector;
    beforeEach(() => {
        collector = new ReviewCollector();
    })

    it('添加一条评论', () => {
        const review = new ProductReview('产品a', "好用");
        collector.addReview(review);

        expect(collector.getNumGoodReview("产品a")).toBe(1);
        expect(collector["productList"]).toContain("产品a");
    });

    test("能够获取好评数", () => {
        const review1 = new ProductReview("产品a", "好用");
        const review2 = new ProductReview("产品a", "一般");
        const review3 = new ProductReview("产品b", "好用");

        collector.addReview(review1);
        collector.addReview(review2);
        collector.addReview(review3);

        // 进行断言测试
        expect(collector.getNumGoodReview("产品a")).toBe(1);
        expect(collector.getNumGoodReview("产品b")).toBe(1);
    })
})