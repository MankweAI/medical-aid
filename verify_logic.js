const { getAverageCopayment } = require('./lib/data-loader');

console.log("Testing getAverageCopayment for 'gastroscopy'...");
try {
    const result = getAverageCopayment('gastroscopy');
    console.log("Result:", result);
} catch (e) {
    console.error("Error:", e);
}
