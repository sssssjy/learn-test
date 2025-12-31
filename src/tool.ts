// 工具库

exports.sum = function(a: number, b: number): number {
    return a + b;
};

exports.multiply = function(a: number, b: number): number {
    return a * b;
};

exports.sub = function(a: number, b: number): number {
    return a - b;
}

exports.div = function(a: number, b: number): number {
    if (b === 0) {
        throw new Error("Division by zero is not allowed.");
    }
    return a / b;
};
