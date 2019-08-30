module.exports = function checkHex(value) {
    return /^#[0-9A-F]{6}$/i.test(value);
}