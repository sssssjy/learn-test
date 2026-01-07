// 产品评论类
export default class ProductReview {
    _name; // 产品名称
    _review; // 产品评论
    constructor(name, review) {
        this._name = name;
        this._review = review;
    }
    get name() {
        return this._name;
    }
    get review() {
        return this._review;
    }
}
//# sourceMappingURL=productReview.js.map