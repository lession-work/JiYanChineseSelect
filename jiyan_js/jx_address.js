var fn = ["K", "L", "M", "N", "O", "P", "Q", "R", "S", "T", "A", "B", "C", "D", "E", "F", "G", "H", "I", "J", "U", "V", "W", "X", "Y", "Z", "a", "b", "c", "d", "o", "p", "q", "r", "s", "t", "u", "v", "w", "x", "e", "f", "g", "h", "i", "j", "k", "l", "m", "n", "y", "z", "0", "1", "2", "3", "4", "5", "6", "7", "8", "9", "+", "/"]
, pn = new Array(128);
function stringToByte(arguments) {
    for (var M = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : "", D = [], B = 0, J = M.length, se = 0; se < J; se++)
        (B = M.charCodeAt(se)) >= 65536 && B <= 1114111 ? (D.push(B >> 18 & 7 | 240),
        D.push(B >> 12 & 63 | 128),
        D.push(B >> 6 & 63 | 128),
        D.push(63 & B | 128)) : B >= 2048 && B <= 65535 ? (D.push(B >> 12 & 15 | 224),
        D.push(B >> 6 & 63 | 128),
        D.push(63 & B | 128)) : B >= 128 && B <= 2047 ? (D.push(B >> 6 & 31 | 192),
        D.push(63 & B | 128)) : D.push(255 & B);
    return D
}

function encode(s) {
    var M=[s];
    console.log(M);
    console.log(stringToByte(M));
    for (var D = [], B = stringToByte(M), J = 0; J <= B.length - 1; J += 3) {
        var se = new Array(4).fill(0)
          , fe = 0
          , pe = void 0;
        for (pe = 0; pe <= 2; ++pe)
            J + pe <= B.length - 1 ? (se[pe] = (255 & B[J + pe]) >>> 2 + 2 * pe | fe,
            fe = ((255 & B[J + pe]) << 2 + 2 * (2 - pe) & 255) >>> 2) : (se[pe] = fe,
            fe = 64);
        for (se[3] = fe,
        pe = 0; pe <= 3; ++pe)
            se[pe] <= 63 ? D.push(fn[se[pe]]) : D.push("=")
    }
    return D.join("")
}
// let str=["15259055315"];
// var res =encode(str);
// console.log(res);

module.exports = {
    encode
}