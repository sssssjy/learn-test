// 评论收集
export default class ReviewCollector {
    reviewList; // 产品评论的数组
    productList; // 产品名称数组
    constructor() {
        this.reviewList = [];
        this.productList = [];
    }
    // 添加评论到reviewList
    // 在添加商品时 若商品评论和所评论商品不存在 评论和商品都会被添加
    addReview(productReview) {
        this.reviewList.push(productReview);
        if (!this.productList.find(item => item === productReview.name)) {
            this.productList.push(productReview.name);
        }
    }
    // 获取某个产品的好评数
    // 假设评论中带有“好” 认为是一条好评
    getNumGoodReview(productName) {
        let numGoodReview = 0;
        this.reviewList.forEach(review => {
            if (review.name !== productName)
                return;
            if (review.review.includes('好'))
                numGoodReview++;
        });
        return numGoodReview;
    }
}
//# sourceMappingURL=reviewCollector.js.map