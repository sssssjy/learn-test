const {isRepeat} = require('../utils/tools');

it("参数为string类型", () => {
    expect(isRepeat(['1', '2', '3', '4'])).toBe(false);
    expect(isRepeat(['1', '2', '3', '1'])).toBe(true);
})

it('参数为number类型', () => {
    expect(isRepeat([1, 2, 3, 4])).toBe(false);
    expect(isRepeat([1, 2, 3, 1])).toBe(true);
})