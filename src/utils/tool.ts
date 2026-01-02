exports.sum = (a: number, b: number): number => {
    return a + b;
};

exports.multiply = (a: number, b: number): number => {
    return a * b;
};

exports.divide = (a: number, b: number): number => {
    if (b === 0) {
        throw new Error("Division by zero is not allowed.");
    }
    return a / b;
};

exports.subtract = (a: number, b: number): number => {
    return a - b;
};