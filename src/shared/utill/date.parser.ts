export function parse(str) {
    var y = str.substr(0, 4),
        m = str.substr(4, 2) - 1,
        d = str.substr(6, 2);
    return new Date(y, m, d);
}