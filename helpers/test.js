
module.exports = {
    upper: (str) => {
        console.log(str);
        return str.toUpperCase();
    },
    lower: (str) => str.toLowerCase(),
    default: (value, def) => value ? value : def
}