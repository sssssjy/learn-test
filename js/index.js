import ProductReview from "./productReview.js";
import ReviewCollector from "./reviewCollector.js";
const reviewController = new ReviewCollector();
reviewController.addReview(new ProductReview("小米手表", "比较好用"));
reviewController.addReview(new ProductReview("苹果手机", "非常好"));
reviewController.addReview(new ProductReview("海豚音响", "一般"));
reviewController.addReview(new ProductReview("小米手表", "非常好用的手表"));
reviewController.addReview(new ProductReview("苹果手机", "我一直在用"));
reviewController.addReview(new ProductReview("海豚音响", "一般吧"));
console.log(reviewController.getNumGoodReview('小米手表'));
console.log(reviewController.getNumGoodReview('苹果手机'));
console.log(reviewController.getNumGoodReview('海豚音响'));
//# sourceMappingURL=index.js.map