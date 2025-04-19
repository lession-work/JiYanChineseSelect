const { JSDOM } = require('jsdom');
const { window } = new JSDOM(`<!DOCTYPE html><html lang="zh-CN" class="theme-switch theme-switch-jym-cat" style="font-size: 37.5px"> <head><title>购买确认</title> <meta name="description" content="交易猫下单购买页" /></head><body><p>Hello world</p></body></html>`);
const { document } = window;
let e={};
    !function(t) {
        "use strict";
        function e(t) {
            return e = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function(t) {
                return typeof t
            }
            : function(t) {
                return t && "function" == typeof Symbol && t.constructor === Symbol && t !== Symbol.prototype ? "symbol" : typeof t
            }
            ,
            e(t)
        }
        var i = {}
          , r = {};
        function o(t) {
            return "0123456789abcdefghijklmnopqrstuvwxyz".charAt(t)
        }
        function a(t, e) {
            return t & e
        }
        function s(t, e) {
            return t | e
        }
        function u(t, e) {
            return t ^ e
        }
        function l(t, e) {
            return t & ~e
        }
        function c(t) {
            if (0 == t)
                return -1;
            var e = 0;
            return 0 == (65535 & t) && (t >>= 16,
            e += 16),
            0 == (255 & t) && (t >>= 8,
            e += 8),
            0 == (15 & t) && (t >>= 4,
            e += 4),
            0 == (3 & t) && (t >>= 2,
            e += 2),
            0 == (1 & t) && ++e,
            e
        }
        function d(t) {
            for (var e = 0; 0 != t; )
                t &= t - 1,
                ++e;
            return e
        }
        !function() {
            function t() {
                function t(t) {
                    var e, n, i;
                    for (t || (t = 8),
                    e = new Array(t),
                    n = [],
                    i = 0; 256 > i; i++)
                        n[i] = i;
                    for (i = 0; i < e.length; i++)
                        e[i] = n[Math.floor(Math.random() * n.length)];
                    return e
                }
                this.setDefaults = function() {
                    this.params.nBits = 256,
                    this.params.salt = t(8),
                    this.params.salt = r.byteArray2String(this.params.salt),
                    this.params.salt = r.convertToHex(this.params.salt),
                    this.params.blockSize = 16,
                    this.params.UTF8 = !0,
                    this.params.A0_PAD = !0
                }
                ,
                this.debug = !0,
                this.params = {},
                this.params.dataIn = "",
                this.params.dataOut = "",
                this.params.decryptIn = "",
                this.params.decryptOut = "",
                this.params.encryptIn = "",
                this.params.encryptOut = "",
                this.params.key = "",
                this.params.iv = "",
                this.params.clear = !0,
                this.setDefaults(),
                this.errors = "",
                this.warnings = "",
                this.infos = "",
                this.debugMsg = "",
                this.setParams = function(t) {
                    for (var e in t || (t = {}),
                    t)
                        this.params[e] = t[e]
                }
                ,
                this.getParams = function() {
                    return this.params
                }
                ,
                this.getParam = function(t) {
                    return this.params[t] || ""
                }
                ,
                this.clearParams = function() {
                    this.params = {}
                }
                ,
                this.getNBits = function() {
                    return this.params.nBits
                }
                ,
                this.getOutput = function() {
                    return this.params.dataOut
                }
                ,
                this.setError = function(t) {
                    this.error = t
                }
                ,
                this.appendError = function(t) {
                    return this.errors += t,
                    ""
                }
                ,
                this.getErrors = function() {
                    return this.errors
                }
                ,
                this.isError = function() {
                    return this.errors.length > 0
                }
                ,
                this.appendInfo = function(t) {
                    return this.infos += t,
                    ""
                }
                ,
                this.getInfos = function() {
                    return this.infos
                }
                ,
                this.setDebug = function(t) {
                    this.debug = t
                }
                ,
                this.appendDebug = function(t) {
                    return this.debugMsg += t,
                    ""
                }
                ,
                this.isDebug = function() {
                    return this.debug
                }
                ,
                this.getAllMessages = function(t) {
                    var e, n, i, o, a = {
                        lf: "\n",
                        clr_mes: !1,
                        verbose: 15
                    };
                    for (e in t || (t = a),
                    a)
                        void 0 === t[e] && (t[e] = a[e]);
                    for (o in n = "",
                    i = "",
                    this.params) {
                        switch (o) {
                        case "encryptOut":
                            i = r.toByteArray(this.params[o].toString()),
                            i = r.fragment(i.join(), 64, t.lf);
                            break;
                        case "key":
                        case "iv":
                            i = r.formatHex(this.params[o], 48);
                            break;
                        default:
                            i = r.fragment(this.params[o].toString(), 64, t.lf)
                        }
                        n += "<p><b>" + o + "</b>:<pre>" + i + "</pre></p>"
                    }
                    return this.debug && (n += "debug: " + this.debug + t.lf),
                    this.errors.length > 0 && 1 == (1 & t.verbose) && (n += "Errors:" + t.lf + this.errors + t.lf),
                    this.warnings.length > 0 && 2 == (2 & t.verbose) && (n += "Warnings:" + t.lf + this.warnings + t.lf),
                    this.infos.length > 0 && 4 == (4 & t.verbose) && (n += "Infos:" + t.lf + this.infos + t.lf),
                    this.debug && 8 == (8 & t.verbose) && (n += "Debug messages:" + t.lf + this.debugMsg + t.lf),
                    t.clr_mes && (this.errors = this.infos = this.warnings = this.debug = ""),
                    n
                }
                ,
                this.getRandomBytes = function(e) {
                    return t(e)
                }
            }
            r.encodeBase64 = function(t, e) {
                var n, i, o, a, s, u, l, c, d, p, h;
                if (t || (t = ""),
                n = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/=",
                p = [],
                h = "",
                (l = (c = (e = void 0 !== e && e) ? r.encodeUTF8(t) : t).length % 3) > 0)
                    for (; l++ < 3; )
                        h += "=",
                        c += "\0";
                for (l = 0; l < c.length; l += 3)
                    o = 63 & (i = c.charCodeAt(l) << 16 | c.charCodeAt(l + 1) << 8 | c.charCodeAt(l + 2)) >> 18,
                    a = 63 & i >> 12,
                    s = 63 & i >> 6,
                    u = 63 & i,
                    p[l / 3] = n.charAt(o) + n.charAt(a) + n.charAt(s) + n.charAt(u);
                return (d = p.join("")).slice(0, d.length - h.length) + h
            }
            ,
            r.decodeBase64 = function(t, e) {
                var n, i, o, a, s, u, l, c, d, p, h;
                for (t || (t = ""),
                n = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/=",
                p = [],
                d = (e = void 0 !== e && e) ? r.decodeUTF8(t) : t,
                h = 0; h < d.length; h += 4)
                    i = 255 & (l = n.indexOf(d.charAt(h)) << 18 | n.indexOf(d.charAt(h + 1)) << 12 | (s = n.indexOf(d.charAt(h + 2))) << 6 | (u = n.indexOf(d.charAt(h + 3)))) >>> 16,
                    o = 255 & l >>> 8,
                    a = 255 & l,
                    p[h / 4] = String.fromCharCode(i, o, a),
                    64 == u && (p[h / 4] = String.fromCharCode(i, o)),
                    64 == s && (p[h / 4] = String.fromCharCode(i));
                return c = p.join(""),
                e ? r.decodeUTF8(c) : c
            }
            ,
            r.encodeUTF8 = function(t) {
                return t || (t = ""),
                (t = t.replace(/[\u0080-\u07ff]/g, (function(t) {
                    var e = t.charCodeAt(0);
                    return String.fromCharCode(192 | e >> 6, 128 | 63 & e)
                }
                ))).replace(/[\u0800-\uffff]/g, (function(t) {
                    var e = t.charCodeAt(0);
                    return String.fromCharCode(224 | e >> 12, 128 | 63 & e >> 6, 128 | 63 & e)
                }
                ))
            }
            ,
            r.decodeUTF8 = function(t) {
                return t || (t = ""),
                (t = t.replace(/[\u00c0-\u00df][\u0080-\u00bf]/g, (function(t) {
                    var e = (31 & t.charCodeAt(0)) << 6 | 63 & t.charCodeAt(1);
                    return String.fromCharCode(e)
                }
                ))).replace(/[\u00e0-\u00ef][\u0080-\u00bf][\u0080-\u00bf]/g, (function(t) {
                    var e = (15 & t.charCodeAt(0)) << 12 | (63 & t.charCodeAt(1)) << 6 | 63 & t.charCodeAt(2);
                    return String.fromCharCode(e)
                }
                ))
            }
            ,
            r.convertToHex = function(t) {
                var e, n, i;
                for (t || (t = ""),
                e = "",
                n = "",
                i = 0; i < t.length; i++)
                    e += 1 == (n = t.charCodeAt(i).toString(16)).length ? "0" + n : n;
                return e
            }
            ,
            r.convertFromHex = function(t) {
                var e, n;
                for (t || (t = ""),
                e = "",
                n = 0; n < t.length; n += 2)
                    e += String.fromCharCode(parseInt(t.substring(n, n + 2), 16));
                return e
            }
            ,
            r.stripLineFeeds = function(t) {
                return t || (t = ""),
                t.replace(/\n/g, "").replace(/\r/g, "")
            }
            ,
            r.toByteArray = function(t) {
                var e, n;
                for (t || (t = ""),
                e = [],
                n = 0; n < t.length; n++)
                    e[n] = t.charCodeAt(n);
                return e
            }
            ,
            r.fragment = function(t, e, n) {
                var i, r;
                if (t || (t = ""),
                !e || e >= t.length)
                    return t;
                for (n || (n = "\n"),
                i = "",
                r = 0; r < t.length; r += e)
                    i += t.substr(r, e) + n;
                return i
            }
            ,
            r.formatHex = function(t, e) {
                var n, i, r;
                for (t || (t = ""),
                e || (e = 45),
                n = "",
                i = t.toLowerCase(),
                r = 0; r < i.length; r += 2)
                    n += i.substr(r, 2) + ":";
                return this.fragment(n, e)
            }
            ,
            r.byteArray2String = function(t) {
                var e, n = "";
                for (e = 0; e < t.length; e++)
                    n += String.fromCharCode(t[e]);
                return n
            }
            ,
            void 0 !== t && (t.MD5 = function(t) {
                function e(t, e) {
                    return t << e | t >>> 32 - e
                }
                function n(t, e) {
                    var n, i, r, o, a;
                    return r = 2147483648 & t,
                    o = 2147483648 & e,
                    a = (1073741823 & t) + (1073741823 & e),
                    (n = 1073741824 & t) & (i = 1073741824 & e) ? 2147483648 ^ a ^ r ^ o : n | i ? 1073741824 & a ? 3221225472 ^ a ^ r ^ o : 1073741824 ^ a ^ r ^ o : a ^ r ^ o
                }
                function i(t, i, r, o, a, s, u) {
                    return t = n(t, n(n(function(t, e, n) {
                        return t & e | ~t & n
                    }(i, r, o), a), u)),
                    n(e(t, s), i)
                }
                function r(t, i, r, o, a, s, u) {
                    return t = n(t, n(n(function(t, e, n) {
                        return t & n | e & ~n
                    }(i, r, o), a), u)),
                    n(e(t, s), i)
                }
                function o(t, i, r, o, a, s, u) {
                    return t = n(t, n(n(function(t, e, n) {
                        return t ^ e ^ n
                    }(i, r, o), a), u)),
                    n(e(t, s), i)
                }
                function a(t, i, r, o, a, s, u) {
                    return t = n(t, n(n(function(t, e, n) {
                        return e ^ (t | ~n)
                    }(i, r, o), a), u)),
                    n(e(t, s), i)
                }
                function s(t) {
                    var e, n = "", i = "";
                    for (e = 0; 3 >= e; e++)
                        n += (i = "0" + (255 & t >>> 8 * e).toString(16)).substr(i.length - 2, 2);
                    return n
                }
                var u, l, c, d, p, h, f, g, m, v = Array();
                for (v = function(t) {
                    for (var e, n = t.length, i = n + 8, r = 16 * ((i - i % 64) / 64 + 1), o = Array(r - 1), a = 0, s = 0; n > s; )
                        a = s % 4 * 8,
                        o[e = (s - s % 4) / 4] = o[e] | t.charCodeAt(s) << a,
                        s++;
                    return a = s % 4 * 8,
                    o[e = (s - s % 4) / 4] = o[e] | 128 << a,
                    o[r - 2] = n << 3,
                    o[r - 1] = n >>> 29,
                    o
                }(t),
                h = 1732584193,
                f = 4023233417,
                g = 2562383102,
                m = 271733878,
                u = 0; u < v.length; u += 16)
                    l = h,
                    c = f,
                    d = g,
                    p = m,
                    h = i(h, f, g, m, v[u + 0], 7, 3614090360),
                    m = i(m, h, f, g, v[u + 1], 12, 3905402710),
                    g = i(g, m, h, f, v[u + 2], 17, 606105819),
                    f = i(f, g, m, h, v[u + 3], 22, 3250441966),
                    h = i(h, f, g, m, v[u + 4], 7, 4118548399),
                    m = i(m, h, f, g, v[u + 5], 12, 1200080426),
                    g = i(g, m, h, f, v[u + 6], 17, 2821735955),
                    f = i(f, g, m, h, v[u + 7], 22, 4249261313),
                    h = i(h, f, g, m, v[u + 8], 7, 1770035416),
                    m = i(m, h, f, g, v[u + 9], 12, 2336552879),
                    g = i(g, m, h, f, v[u + 10], 17, 4294925233),
                    f = i(f, g, m, h, v[u + 11], 22, 2304563134),
                    h = i(h, f, g, m, v[u + 12], 7, 1804603682),
                    m = i(m, h, f, g, v[u + 13], 12, 4254626195),
                    g = i(g, m, h, f, v[u + 14], 17, 2792965006),
                    h = r(h, f = i(f, g, m, h, v[u + 15], 22, 1236535329), g, m, v[u + 1], 5, 4129170786),
                    m = r(m, h, f, g, v[u + 6], 9, 3225465664),
                    g = r(g, m, h, f, v[u + 11], 14, 643717713),
                    f = r(f, g, m, h, v[u + 0], 20, 3921069994),
                    h = r(h, f, g, m, v[u + 5], 5, 3593408605),
                    m = r(m, h, f, g, v[u + 10], 9, 38016083),
                    g = r(g, m, h, f, v[u + 15], 14, 3634488961),
                    f = r(f, g, m, h, v[u + 4], 20, 3889429448),
                    h = r(h, f, g, m, v[u + 9], 5, 568446438),
                    m = r(m, h, f, g, v[u + 14], 9, 3275163606),
                    g = r(g, m, h, f, v[u + 3], 14, 4107603335),
                    f = r(f, g, m, h, v[u + 8], 20, 1163531501),
                    h = r(h, f, g, m, v[u + 13], 5, 2850285829),
                    m = r(m, h, f, g, v[u + 2], 9, 4243563512),
                    g = r(g, m, h, f, v[u + 7], 14, 1735328473),
                    h = o(h, f = r(f, g, m, h, v[u + 12], 20, 2368359562), g, m, v[u + 5], 4, 4294588738),
                    m = o(m, h, f, g, v[u + 8], 11, 2272392833),
                    g = o(g, m, h, f, v[u + 11], 16, 1839030562),
                    f = o(f, g, m, h, v[u + 14], 23, 4259657740),
                    h = o(h, f, g, m, v[u + 1], 4, 2763975236),
                    m = o(m, h, f, g, v[u + 4], 11, 1272893353),
                    g = o(g, m, h, f, v[u + 7], 16, 4139469664),
                    f = o(f, g, m, h, v[u + 10], 23, 3200236656),
                    h = o(h, f, g, m, v[u + 13], 4, 681279174),
                    m = o(m, h, f, g, v[u + 0], 11, 3936430074),
                    g = o(g, m, h, f, v[u + 3], 16, 3572445317),
                    f = o(f, g, m, h, v[u + 6], 23, 76029189),
                    h = o(h, f, g, m, v[u + 9], 4, 3654602809),
                    m = o(m, h, f, g, v[u + 12], 11, 3873151461),
                    g = o(g, m, h, f, v[u + 15], 16, 530742520),
                    h = a(h, f = o(f, g, m, h, v[u + 2], 23, 3299628645), g, m, v[u + 0], 6, 4096336452),
                    m = a(m, h, f, g, v[u + 7], 10, 1126891415),
                    g = a(g, m, h, f, v[u + 14], 15, 2878612391),
                    f = a(f, g, m, h, v[u + 5], 21, 4237533241),
                    h = a(h, f, g, m, v[u + 12], 6, 1700485571),
                    m = a(m, h, f, g, v[u + 3], 10, 2399980690),
                    g = a(g, m, h, f, v[u + 10], 15, 4293915773),
                    f = a(f, g, m, h, v[u + 1], 21, 2240044497),
                    h = a(h, f, g, m, v[u + 8], 6, 1873313359),
                    m = a(m, h, f, g, v[u + 15], 10, 4264355552),
                    g = a(g, m, h, f, v[u + 6], 15, 2734768916),
                    f = a(f, g, m, h, v[u + 13], 21, 1309151649),
                    h = a(h, f, g, m, v[u + 4], 6, 4149444226),
                    m = a(m, h, f, g, v[u + 11], 10, 3174756917),
                    g = a(g, m, h, f, v[u + 2], 15, 718787259),
                    f = a(f, g, m, h, v[u + 9], 21, 3951481745),
                    h = n(h, l),
                    f = n(f, c),
                    g = n(g, d),
                    m = n(m, p);
                return (s(h) + s(f) + s(g) + s(m)).toLowerCase()
            }
            ),
            void 0 !== t && (t.AES = function(e) {
                this.env = e || new t,
                this.blockSize = 16,
                this.ShiftRowTabInv,
                this.xtime,
                this.SBox = new Array(99,124,119,123,242,107,111,197,48,1,103,43,254,215,171,118,202,130,201,125,250,89,71,240,173,212,162,175,156,164,114,192,183,253,147,38,54,63,247,204,52,165,229,241,113,216,49,21,4,199,35,195,24,150,5,154,7,18,128,226,235,39,178,117,9,131,44,26,27,110,90,160,82,59,214,179,41,227,47,132,83,209,0,237,32,252,177,91,106,203,190,57,74,76,88,207,208,239,170,251,67,77,51,133,69,249,2,127,80,60,159,168,81,163,64,143,146,157,56,245,188,182,218,33,16,255,243,210,205,12,19,236,95,151,68,23,196,167,126,61,100,93,25,115,96,129,79,220,34,42,144,136,70,238,184,20,222,94,11,219,224,50,58,10,73,6,36,92,194,211,172,98,145,149,228,121,231,200,55,109,141,213,78,169,108,86,244,234,101,122,174,8,186,120,37,46,28,166,180,198,232,221,116,31,75,189,139,138,112,62,181,102,72,3,246,14,97,53,87,185,134,193,29,158,225,248,152,17,105,217,142,148,155,30,135,233,206,85,40,223,140,161,137,13,191,230,66,104,65,153,45,15,176,84,187,22),
                this.SBoxInv = new Array(82,9,106,213,48,54,165,56,191,64,163,158,129,243,215,251,124,227,57,130,155,47,255,135,52,142,67,68,196,222,233,203,84,123,148,50,166,194,35,61,238,76,149,11,66,250,195,78,8,46,161,102,40,217,36,178,118,91,162,73,109,139,209,37,114,248,246,100,134,104,152,22,212,164,92,204,93,101,182,146,108,112,72,80,253,237,185,218,94,21,70,87,167,141,157,132,144,216,171,0,140,188,211,10,247,228,88,5,184,179,69,6,208,44,30,143,202,63,15,2,193,175,189,3,1,19,138,107,58,145,17,65,79,103,220,234,151,242,207,206,240,180,230,115,150,172,116,34,231,173,53,133,226,249,55,232,28,117,223,110,71,241,26,113,29,41,197,137,111,183,98,14,170,24,190,27,252,86,62,75,198,210,121,32,154,219,192,254,120,205,90,244,31,221,168,51,136,7,199,49,177,18,16,89,39,128,236,95,96,81,127,169,25,181,74,13,45,229,122,159,147,201,156,239,160,224,59,77,174,42,245,176,200,235,187,60,131,83,153,97,23,43,4,126,186,119,214,38,225,105,20,99,85,33,12,125),
                this.ShiftRowTab = new Array(0,5,10,15,4,9,14,3,8,13,2,7,12,1,6,11)
            }
            ,
            t.AES.prototype.init = function() {
                this.env.setParams({
                    blockSize: this.blockSize
                }),
                this.ShiftRowTabInv = new Array(16);
                for (var t = 0; 16 > t; t++)
                    this.ShiftRowTabInv[this.ShiftRowTab[t]] = t;
                for (this.xtime = new Array(256),
                t = 0; 128 > t; t++)
                    this.xtime[t] = t << 1,
                    this.xtime[128 + t] = 27 ^ t << 1
            }
            ,
            t.AES.prototype.expandKey = function(t) {
                var e, n, i, r, o = t.slice(), a = o.length, s = 1;
                switch (a) {
                case 16:
                    e = 176;
                    break;
                case 24:
                    e = 208;
                    break;
                case 32:
                    e = 240;
                    break;
                default:
                    alert("AESCore.expandKey: Only key lengths of 16, 24 or 32 bytes allowed!")
                }
                for (n = a; e > n; n += 4)
                    for (i = o.slice(n - 4, n),
                    0 == n % a ? (i = new Array(this.SBox[i[1]] ^ s,this.SBox[i[2]],this.SBox[i[3]],this.SBox[i[0]]),
                    (s <<= 1) >= 256 && (s ^= 283)) : a > 24 && 16 == n % a && (i = new Array(this.SBox[i[0]],this.SBox[i[1]],this.SBox[i[2]],this.SBox[i[3]])),
                    r = 0; 4 > r; r++)
                        o[n + r] = o[n + r - a] ^ i[r];
                return o
            }
            ,
            t.AES.prototype.encrypt = function(t, e) {
                var n, i = e.length, r = t.slice();
                for (this.addRoundKey(r, e.slice(0, 16)),
                n = 16; i - 16 > n; n += 16)
                    this.subBytes(r),
                    this.shiftRows(r),
                    this.mixColumns(r),
                    this.addRoundKey(r, e.slice(n, n + 16));
                return this.subBytes(r),
                this.shiftRows(r),
                this.addRoundKey(r, e.slice(n, i)),
                r
            }
            ,
            t.AES.prototype.decrypt = function(t, e) {
                var n, i = e.length, r = t.slice();
                for (this.addRoundKey(r, e.slice(i - 16, i)),
                this.shiftRows(r, 1),
                this.subBytes(r, 1),
                n = i - 32; n >= 16; n -= 16)
                    this.addRoundKey(r, e.slice(n, n + 16)),
                    this.mixColumns_Inv(r),
                    this.shiftRows(r, 1),
                    this.subBytes(r, 1);
                return this.addRoundKey(r, e.slice(0, 16)),
                r
            }
            ,
            t.AES.prototype.subBytes = function(t, e) {
                var n, i = void 0 === e ? this.SBox.slice() : this.SBoxInv.slice();
                for (n = 0; 16 > n; n++)
                    t[n] = i[t[n]]
            }
            ,
            t.AES.prototype.addRoundKey = function(t, e) {
                for (var n = 0; 16 > n; n++)
                    t[n] ^= e[n]
            }
            ,
            t.AES.prototype.shiftRows = function(t, e) {
                var n, i = void 0 === e ? this.ShiftRowTab.slice() : this.ShiftRowTabInv.slice(), r = (new Array).concat(t);
                for (n = 0; 16 > n; n++)
                    t[n] = r[i[n]]
            }
            ,
            t.AES.prototype.mixColumns = function(t) {
                var e, n, i, r, o, a;
                for (e = 0; 16 > e; e += 4)
                    a = (n = t[e + 0]) ^ (i = t[e + 1]) ^ (r = t[e + 2]) ^ (o = t[e + 3]),
                    t[e + 0] ^= a ^ this.xtime[n ^ i],
                    t[e + 1] ^= a ^ this.xtime[i ^ r],
                    t[e + 2] ^= a ^ this.xtime[r ^ o],
                    t[e + 3] ^= a ^ this.xtime[o ^ n]
            }
            ,
            t.AES.prototype.mixColumns_Inv = function(t) {
                var e, n, i, r, o, a, s, u, l;
                for (e = 0; 16 > e; e += 4)
                    a = (n = t[e + 0]) ^ (i = t[e + 1]) ^ (r = t[e + 2]) ^ (o = t[e + 3]),
                    s = this.xtime[a],
                    u = this.xtime[this.xtime[s ^ n ^ r]] ^ a,
                    l = this.xtime[this.xtime[s ^ i ^ o]] ^ a,
                    t[e + 0] ^= u ^ this.xtime[n ^ i],
                    t[e + 1] ^= l ^ this.xtime[i ^ r],
                    t[e + 2] ^= u ^ this.xtime[r ^ o],
                    t[e + 3] ^= l ^ this.xtime[o ^ n]
            }
            ,
            t.AES.prototype.xOr_Array = function(t, e) {
                var n, i = Array();
                for (n = 0; n < t.length; n++)
                    i[n] = t[n] ^ e[n];
                return i
            }
            ,
            t.AES.prototype.getCounterBlock = function() {
                var t, e = new Array(this.blockSize), n = (new Date).getTime(), i = Math.floor(n / 1e3), r = n % 1e3;
                for (t = 0; 4 > t; t++)
                    e[t] = 255 & i >>> 8 * t;
                for (t = 0; 4 > t; t++)
                    e[t + 4] = 255 & r;
                return e.slice()
            }
            ),
            void 0 !== t && void 0 !== t.AES && void 0 !== t.MD5 && (t.AES.CBC = function() {
                this.pidcrypt = new t,
                this.aes = new t.AES(this.pidcrypt),
                this.getOutput = function() {
                    return this.pidcrypt.getOutput()
                }
                ,
                this.getAllMessages = function(t) {
                    return this.pidcrypt.getAllMessages(t)
                }
                ,
                this.isError = function() {
                    return this.pidcrypt.isError()
                }
            }
            ,
            t.AES.CBC.prototype.init = function(t, e) {
                var n, i, r, o;
                for (r in e || (e = {}),
                (n = this.pidcrypt).setDefaults(),
                i = this.pidcrypt.getParams(),
                e)
                    i[r] = e[r];
                o = this.createKeyAndIv({
                    password: t,
                    salt: i.salt,
                    bits: i.nBits
                }),
                i.key = o.key,
                i.iv = o.iv,
                i.dataOut = "",
                n.setParams(i),
                this.aes.init()
            }
            ,
            t.AES.CBC.prototype.initEncrypt = function(t, e, n) {
                this.init(e, n),
                this.pidcrypt.setParams({
                    dataIn: t,
                    encryptIn: r.toByteArray(t)
                })
            }
            ,
            t.AES.CBC.prototype.initDecrypt = function(t, e, n) {
                var i, o, a;
                n || (n = {}),
                (i = this.pidcrypt).setParams({
                    dataIn: t
                }),
                e || i.appendError("pidCrypt.AES.CBC.initFromEncryption: Sorry, can not crypt or decrypt without password.\n"),
                0 != (o = r.decodeBase64(t)).indexOf("Salted__") && i.appendError("pidCrypt.AES.CBC.initFromCrypt: Sorry, unknown encryption method.\n"),
                a = o.substr(8, 8),
                n.salt = r.convertToHex(a),
                this.init(e, n),
                o = o.substr(16),
                i.setParams({
                    decryptIn: r.toByteArray(o)
                })
            }
            ,
            t.AES.CBC.prototype.initByValues = function(t, e, n, i) {
                var r = {};
                this.init("", i),
                r.dataIn = t,
                r.key = e,
                r.iv = n,
                this.pidcrypt.setParams(r)
            }
            ,
            t.AES.CBC.prototype.getAllMessages = function(t) {
                return this.pidcrypt.getAllMessages(t)
            }
            ,
            t.AES.CBC.prototype.createKeyAndIv = function(n) {
                var i, o, a, s, u, l, c, d = this.pidcrypt, p = {};
                for (n || (n = {}),
                n.salt || (n.salt = d.getRandomBytes(8),
                n.salt = r.convertToHex(r.byteArray2String(n.salt)),
                d.setParams({
                    salt: n.salt
                })),
                i = n.password + r.convertFromHex(n.salt),
                o = "",
                a = "",
                u = 0,
                (s = [])[u++] = i,
                l = 0; "3" > l; l++) {
                    for (0 == l ? a = i : (o = r.convertFromHex(a),
                    a = o += i),
                    c = 0; 1 > c; c++)
                        a = t.MD5(a);
                    s[u++] = a
                }
                switch (n.bits) {
                case 128:
                    p.key = s[1],
                    p.iv = s[2];
                    break;
                case 192:
                    p.key = s[1] + s[2].substr(0, 16),
                    p.iv = s[3];
                    break;
                case 256:
                    p.key = s[1] + s[2],
                    p.iv = s[3];
                    break;
                default:
                    d.appendError("pidCrypt.AES.CBC.createKeyAndIv: Sorry, only 128, 192 and 256 bits are supported.\nBits(" + e(n.bits) + ") = " + n.bits)
                }
                return p
            }
            ,
            t.AES.CBC.prototype.encryptRaw = function(t) {
                var e, n, i, o, a, s, u, l, c, d, p, h, f, g, m = this.pidcrypt, v = this.aes, y = m.getParams();
                for (t || (t = y.encryptIn),
                m.setParams({
                    encryptIn: t
                }),
                y.dataIn || m.setParams({
                    dataIn: t
                }),
                e = r.convertFromHex(y.iv),
                n = y.blockSize - (t.length + 1) % y.blockSize,
                y.A0_PAD && (t[t.length] = 10),
                i = 0; n > i; i++)
                    t[t.length] = n;
                for (o = Math.floor(y.nBits / 8),
                a = new Array(o),
                s = r.convertFromHex(y.key),
                u = 0; o > u; u++)
                    a[u] = isNaN(s.charCodeAt(u)) ? 0 : s.charCodeAt(u);
                for (l = v.expandKey(a),
                c = Math.ceil(t.length / y.blockSize),
                d = new Array(c),
                p = [],
                h = r.toByteArray(e),
                f = 0; c > f; f++)
                    p = t.slice(f * y.blockSize, f * y.blockSize + y.blockSize),
                    h = v.xOr_Array(h, p),
                    h = v.encrypt(h.slice(), l),
                    d[f] = r.byteArray2String(h);
                return g = d.join(""),
                m.setParams({
                    dataOut: g,
                    encryptOut: g
                }),
                !m.isDebug() && m.clear && m.clearParams(),
                g || ""
            }
            ,
            t.AES.CBC.prototype.encrypt = function(t) {
                var e, n = this.pidcrypt, i = n.getParams();
                return t || (t = i.dataIn),
                i.UTF8 && (t = r.encodeUTF8(t)),
                n.setParams({
                    dataIn: t,
                    encryptIn: r.toByteArray(t)
                }),
                e = this.encryptRaw(),
                r.convertFromHex(i.salt),
                e = r.encodeBase64(e),
                n.setParams({
                    dataOut: e
                }),
                !n.isDebug() && n.clear && n.clearParams(),
                e || ""
            }
            ,
            t.AES.CBC.prototype.encryptText = function(t, e, n) {
                return this.initEncrypt(t, e, n),
                this.encrypt()
            }
            ,
            t.AES.CBC.prototype.decryptRaw = function(t) {
                var e, n, i, o, a, s, u, l, c, d, p, h, f, g, m, v = this.aes, y = this.pidcrypt, b = y.getParams();
                if (t || (t = b.decryptIn),
                y.setParams({
                    decryptIn: t
                }),
                b.dataIn || y.setParams({
                    dataIn: t
                }),
                b.iv.length / 2 < b.blockSize)
                    return y.appendError("pidCrypt.AES.CBC.decrypt: Sorry, can not decrypt without complete set of parameters.\n Length of key,iv:" + b.key.length + "," + b.iv.length);
                if (e = r.convertFromHex(b.iv),
                0 != t.length % b.blockSize)
                    return y.appendError("pidCrypt.AES.CBC.decrypt: Sorry, the encrypted text has the wrong length for aes-cbc mode\n Length of ciphertext:" + t.length + t.length % b.blockSize);
                for (n = Math.floor(b.nBits / 8),
                i = new Array(n),
                o = r.convertFromHex(b.key),
                a = 0; n > a; a++)
                    i[a] = isNaN(o.charCodeAt(a)) ? 0 : o.charCodeAt(a);
                for (s = v.expandKey(i),
                u = Math.ceil(t.length / b.blockSize),
                l = new Array(u.length),
                c = r.toByteArray(e),
                d = [],
                p = [],
                h = 0; u > h; h++)
                    d = t.slice(h * b.blockSize, h * b.blockSize + b.blockSize),
                    p = v.decrypt(d, s),
                    l[h] = r.byteArray2String(v.xOr_Array(c, p)),
                    c = d.slice();
                return f = l.join(""),
                y.isDebug() && y.appendDebug("Padding after decryption:" + r.convertToHex(f) + ":" + f.length + "\n"),
                g = f.charCodeAt(f.length - 1),
                b.A0_PAD ? f = f.substr(0, f.length - (g + 1)) : (m = f.length - (f.length - g),
                g == f.charCodeAt(f.length - g) && g == m && (f = f.substr(0, f.length - g))),
                y.setParams({
                    dataOut: f,
                    decryptOut: f
                }),
                !y.isDebug() && y.clear && y.clearParams(),
                f || ""
            }
            ,
            t.AES.CBC.prototype.decrypt = function(t) {
                var e, n, i = this.pidcrypt, o = i.getParams();
                return t && i.setParams({
                    dataIn: t
                }),
                o.decryptIn || (0 == (e = r.decodeBase64(o.dataIn)).indexOf("Salted__") && (e = e.substr(16)),
                i.setParams({
                    decryptIn: r.toByteArray(e)
                })),
                n = this.decryptRaw(),
                o.UTF8 && (n = r.decodeUTF8(n)),
                i.isDebug() && i.appendDebug("Removed Padding after decryption:" + r.convertToHex(n) + ":" + n.length + "\n"),
                i.setParams({
                    dataOut: n
                }),
                !i.isDebug() && i.clear && i.clearParams(),
                n || ""
            }
            ,
            t.AES.CBC.prototype.decryptText = function(t, e, n) {
                return this.initDecrypt(t, e, n),
                this.decrypt()
            }
            ),
            i.encrypt = function(e, n) {
                var i, o;
                return i = n = r.convertToHex(n),
                (o = new t.AES.CBC).initByValues(e, n, i, {
                    nBits: 128
                }),
                o.encrypt()
            }
            ,
            i.decrypt = function(e, n) {
                var i, o;
                return i = n = r.convertToHex(n),
                (o = new t.AES.CBC).initByValues(e, n, i, {
                    nBits: 128,
                    A0_PAD: !1
                }),
                o.decrypt()
            }
        }();
        var p, h = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/";
        function f(t) {
            var e, n, i = "";
            for (e = 0; e + 3 <= t.length; e += 3)
                n = parseInt(t.substring(e, e + 3), 16),
                i += h.charAt(n >> 6) + h.charAt(63 & n);
            for (e + 1 == t.length ? (n = parseInt(t.substring(e, e + 1), 16),
            i += h.charAt(n << 2)) : e + 2 == t.length && (n = parseInt(t.substring(e, e + 2), 16),
            i += h.charAt(n >> 2) + h.charAt((3 & n) << 4)); (3 & i.length) > 0; )
                i += "=";
            return i
        }
        function g(t) {
            var e, n = "", i = 0, r = 0;
            for (e = 0; e < t.length && "=" != t.charAt(e); ++e) {
                var a = h.indexOf(t.charAt(e));
                a < 0 || (0 == i ? (n += o(a >> 2),
                r = 3 & a,
                i = 1) : 1 == i ? (n += o(r << 2 | a >> 4),
                r = 15 & a,
                i = 2) : 2 == i ? (n += o(r),
                n += o(a >> 2),
                r = 3 & a,
                i = 3) : (n += o(r << 2 | a >> 4),
                n += o(15 & a),
                i = 0))
            }
            return 1 == i && (n += o(r << 2)),
            n
        }
        var m, v = function(t) {
            var e;
            if (void 0 === p) {
                var n = "0123456789ABCDEF"
                  , i = " \f\n\r\t\xa0\u2028\u2029";
                for (p = {},
                e = 0; e < 16; ++e)
                    p[n.charAt(e)] = e;
                for (n = n.toLowerCase(),
                e = 10; e < 16; ++e)
                    p[n.charAt(e)] = e;
                for (e = 0; e < i.length; ++e)
                    p[i.charAt(e)] = -1
            }
            var r = []
              , o = 0
              , a = 0;
            for (e = 0; e < t.length; ++e) {
                var s = t.charAt(e);
                if ("=" == s)
                    break;
                if (-1 != (s = p[s])) {
                    if (void 0 === s)
                        throw new Error("Illegal character at offset " + e);
                    o |= s,
                    ++a >= 2 ? (r[r.length] = o,
                    o = 0,
                    a = 0) : o <<= 4
                }
            }
            if (a)
                throw new Error("Hex encoding incomplete: 4 bits missing");
            return r
        }, y = {
            decode: function(t) {
                var e;
                if (void 0 === m) {
                    var n = "= \f\n\r\t\xa0\u2028\u2029";
                    for (m = Object.create(null),
                    e = 0; e < 64; ++e)
                        m["ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/".charAt(e)] = e;
                    for (m["-"] = 62,
                    m._ = 63,
                    e = 0; e < n.length; ++e)
                        m[n.charAt(e)] = -1
                }
                var i = []
                  , r = 0
                  , o = 0;
                for (e = 0; e < t.length; ++e) {
                    var a = t.charAt(e);
                    if ("=" == a)
                        break;
                    if (-1 != (a = m[a])) {
                        if (void 0 === a)
                            throw new Error("Illegal character at offset " + e);
                        r |= a,
                        ++o >= 4 ? (i[i.length] = r >> 16,
                        i[i.length] = r >> 8 & 255,
                        i[i.length] = 255 & r,
                        r = 0,
                        o = 0) : r <<= 6
                    }
                }
                switch (o) {
                case 1:
                    throw new Error("Base64 encoding incomplete: at least 2 bits missing");
                case 2:
                    i[i.length] = r >> 10;
                    break;
                case 3:
                    i[i.length] = r >> 16,
                    i[i.length] = r >> 8 & 255
                }
                return i
            },
            re: /-----BEGIN [^-]+-----([A-Za-z0-9+\/=\s]+)-----END [^-]+-----|begin-base64[^\n]+\n([A-Za-z0-9+\/=\s]+)====/,
            unarmor: function(t) {
                var e = y.re.exec(t);
                if (e)
                    if (e[1])
                        t = e[1];
                    else {
                        if (!e[2])
                            throw new Error("RegExp out of sync");
                        t = e[2]
                    }
                return y.decode(t)
            }
        }, b = 1e13, _ = function() {
            function t(t) {
                this.buf = [+t || 0]
            }
            return t.prototype.mulAdd = function(t, e) {
                var n, i, r = this.buf, o = r.length;
                for (n = 0; n < o; ++n)
                    (i = r[n] * t + e) < b ? e = 0 : i -= (e = 0 | i / b) * b,
                    r[n] = i;
                e > 0 && (r[n] = e)
            }
            ,
            t.prototype.sub = function(t) {
                var e, n, i = this.buf, r = i.length;
                for (e = 0; e < r; ++e)
                    (n = i[e] - t) < 0 ? (n += b,
                    t = 1) : t = 0,
                    i[e] = n;
                for (; 0 === i[i.length - 1]; )
                    i.pop()
            }
            ,
            t.prototype.toString = function(t) {
                if (10 != (t || 10))
                    throw new Error("only base 10 is supported");
                for (var e = this.buf, n = e[e.length - 1].toString(), i = e.length - 2; i >= 0; --i)
                    n += (b + e[i]).toString().substring(1);
                return n
            }
            ,
            t.prototype.valueOf = function() {
                for (var t = this.buf, e = 0, n = t.length - 1; n >= 0; --n)
                    e = e * b + t[n];
                return e
            }
            ,
            t.prototype.simplify = function() {
                var t = this.buf;
                return 1 == t.length ? t[0] : this
            }
            ,
            t
        }(), w = /^(\d\d)(0[1-9]|1[0-2])(0[1-9]|[12]\d|3[01])([01]\d|2[0-3])(?:([0-5]\d)(?:([0-5]\d)(?:[.,](\d{1,3}))?)?)?(Z|[-+](?:[0]\d|1[0-2])([0-5]\d)?)?$/, S = /^(\d\d\d\d)(0[1-9]|1[0-2])(0[1-9]|[12]\d|3[01])([01]\d|2[0-3])(?:([0-5]\d)(?:([0-5]\d)(?:[.,](\d{1,3}))?)?)?(Z|[-+](?:[0]\d|1[0-2])([0-5]\d)?)?$/;
        function A(t, e) {
            return t.length > e && (t = t.substring(0, e) + "\u2026"),
            t
        }
        var E, T = function() {
            function t(e, n) {
                this.hexDigits = "0123456789ABCDEF",
                e instanceof t ? (this.enc = e.enc,
                this.pos = e.pos) : (this.enc = e,
                this.pos = n)
            }
            return t.prototype.get = function(t) {
                if (void 0 === t && (t = this.pos++),
                t >= this.enc.length)
                    throw new Error("Requesting byte offset " + t + " on a stream of length " + this.enc.length);
                return "string" == typeof this.enc ? this.enc.charCodeAt(t) : this.enc[t]
            }
            ,
            t.prototype.hexByte = function(t) {
                return this.hexDigits.charAt(t >> 4 & 15) + this.hexDigits.charAt(15 & t)
            }
            ,
            t.prototype.hexDump = function(t, e, n) {
                for (var i = "", r = t; r < e; ++r)
                    if (i += this.hexByte(this.get(r)),
                    !0 !== n)
                        switch (15 & r) {
                        case 7:
                            i += "  ";
                            break;
                        case 15:
                            i += "\n";
                            break;
                        default:
                            i += " "
                        }
                return i
            }
            ,
            t.prototype.isASCII = function(t, e) {
                for (var n = t; n < e; ++n) {
                    var i = this.get(n);
                    if (i < 32 || i > 176)
                        return !1
                }
                return !0
            }
            ,
            t.prototype.parseStringISO = function(t, e) {
                for (var n = "", i = t; i < e; ++i)
                    n += String.fromCharCode(this.get(i));
                return n
            }
            ,
            t.prototype.parseStringUTF = function(t, e) {
                for (var n = "", i = t; i < e; ) {
                    var r = this.get(i++);
                    n += r < 128 ? String.fromCharCode(r) : r > 191 && r < 224 ? String.fromCharCode((31 & r) << 6 | 63 & this.get(i++)) : String.fromCharCode((15 & r) << 12 | (63 & this.get(i++)) << 6 | 63 & this.get(i++))
                }
                return n
            }
            ,
            t.prototype.parseStringBMP = function(t, e) {
                for (var n, i, r = "", o = t; o < e; )
                    n = this.get(o++),
                    i = this.get(o++),
                    r += String.fromCharCode(n << 8 | i);
                return r
            }
            ,
            t.prototype.parseTime = function(t, e, n) {
                var i = this.parseStringISO(t, e)
                  , r = (n ? w : S).exec(i);
                return r ? (n && (r[1] = +r[1],
                r[1] += +r[1] < 70 ? 2e3 : 1900),
                i = r[1] + "-" + r[2] + "-" + r[3] + " " + r[4],
                r[5] && (i += ":" + r[5],
                r[6] && (i += ":" + r[6],
                r[7] && (i += "." + r[7]))),
                r[8] && (i += " UTC",
                "Z" != r[8] && (i += r[8],
                r[9] && (i += ":" + r[9]))),
                i) : "Unrecognized time: " + i
            }
            ,
            t.prototype.parseInteger = function(t, e) {
                for (var n, i = this.get(t), r = i > 127, o = r ? 255 : 0, a = ""; i == o && ++t < e; )
                    i = this.get(t);
                if (0 == (n = e - t))
                    return r ? -1 : 0;
                if (n > 4) {
                    for (a = i,
                    n <<= 3; 0 == (128 & (+a ^ o)); )
                        a = +a << 1,
                        --n;
                    a = "(" + n + " bit)\n"
                }
                r && (i -= 256);
                for (var s = new _(i), u = t + 1; u < e; ++u)
                    s.mulAdd(256, this.get(u));
                return a + s.toString()
            }
            ,
            t.prototype.parseBitString = function(t, e, n) {
                for (var i = this.get(t), r = "(" + ((e - t - 1 << 3) - i) + " bit)\n", o = "", a = t + 1; a < e; ++a) {
                    for (var s = this.get(a), u = a == e - 1 ? i : 0, l = 7; l >= u; --l)
                        o += s >> l & 1 ? "1" : "0";
                    if (o.length > n)
                        return r + A(o, n)
                }
                return r + o
            }
            ,
            t.prototype.parseOctetString = function(t, e, n) {
                if (this.isASCII(t, e))
                    return A(this.parseStringISO(t, e), n);
                var i = e - t
                  , r = "(" + i + " byte)\n";
                i > (n /= 2) && (e = t + n);
                for (var o = t; o < e; ++o)
                    r += this.hexByte(this.get(o));
                return i > n && (r += "\u2026"),
                r
            }
            ,
            t.prototype.parseOID = function(t, e, n) {
                for (var i = "", r = new _, o = 0, a = t; a < e; ++a) {
                    var s = this.get(a);
                    if (r.mulAdd(128, 127 & s),
                    o += 7,
                    !(128 & s)) {
                        if ("" === i)
                            if ((r = r.simplify())instanceof _)
                                r.sub(80),
                                i = "2." + r.toString();
                            else {
                                var u = r < 80 ? r < 40 ? 0 : 1 : 2;
                                i = u + "." + (r - 40 * u)
                            }
                        else
                            i += "." + r.toString();
                        if (i.length > n)
                            return A(i, n);
                        r = new _,
                        o = 0
                    }
                }
                return o > 0 && (i += ".incomplete"),
                i
            }
            ,
            t
        }(), I = function() {
            function t(t, e, n, i, r) {
                if (!(i instanceof C))
                    throw new Error("Invalid tag value.");
                this.stream = t,
                this.header = e,
                this.length = n,
                this.tag = i,
                this.sub = r
            }
            return t.prototype.typeName = function() {
                switch (this.tag.tagClass) {
                case 0:
                    switch (this.tag.tagNumber) {
                    case 0:
                        return "EOC";
                    case 1:
                        return "BOOLEAN";
                    case 2:
                        return "INTEGER";
                    case 3:
                        return "BIT_STRING";
                    case 4:
                        return "OCTET_STRING";
                    case 5:
                        return "NULL";
                    case 6:
                        return "OBJECT_IDENTIFIER";
                    case 7:
                        return "ObjectDescriptor";
                    case 8:
                        return "EXTERNAL";
                    case 9:
                        return "REAL";
                    case 10:
                        return "ENUMERATED";
                    case 11:
                        return "EMBEDDED_PDV";
                    case 12:
                        return "UTF8String";
                    case 16:
                        return "SEQUENCE";
                    case 17:
                        return "SET";
                    case 18:
                        return "NumericString";
                    case 19:
                        return "PrintableString";
                    case 20:
                        return "TeletexString";
                    case 21:
                        return "VideotexString";
                    case 22:
                        return "IA5String";
                    case 23:
                        return "UTCTime";
                    case 24:
                        return "GeneralizedTime";
                    case 25:
                        return "GraphicString";
                    case 26:
                        return "VisibleString";
                    case 27:
                        return "GeneralString";
                    case 28:
                        return "UniversalString";
                    case 30:
                        return "BMPString"
                    }
                    return "Universal_" + this.tag.tagNumber.toString();
                case 1:
                    return "Application_" + this.tag.tagNumber.toString();
                case 2:
                    return "[" + this.tag.tagNumber.toString() + "]";
                case 3:
                    return "Private_" + this.tag.tagNumber.toString()
                }
            }
            ,
            t.prototype.content = function(t) {
                if (void 0 === this.tag)
                    return null;
                void 0 === t && (t = 1 / 0);
                var e = this.posContent()
                  , n = Math.abs(this.length);
                if (!this.tag.isUniversal())
                    return null !== this.sub ? "(" + this.sub.length + " elem)" : this.stream.parseOctetString(e, e + n, t);
                switch (this.tag.tagNumber) {
                case 1:
                    return 0 === this.stream.get(e) ? "false" : "true";
                case 2:
                    return this.stream.parseInteger(e, e + n);
                case 3:
                    return this.sub ? "(" + this.sub.length + " elem)" : this.stream.parseBitString(e, e + n, t);
                case 4:
                    return this.sub ? "(" + this.sub.length + " elem)" : this.stream.parseOctetString(e, e + n, t);
                case 6:
                    return this.stream.parseOID(e, e + n, t);
                case 16:
                case 17:
                    return null !== this.sub ? "(" + this.sub.length + " elem)" : "(no elem)";
                case 12:
                    return A(this.stream.parseStringUTF(e, e + n), t);
                case 18:
                case 19:
                case 20:
                case 21:
                case 22:
                case 26:
                    return A(this.stream.parseStringISO(e, e + n), t);
                case 30:
                    return A(this.stream.parseStringBMP(e, e + n), t);
                case 23:
                case 24:
                    return this.stream.parseTime(e, e + n, 23 == this.tag.tagNumber)
                }
                return null
            }
            ,
            t.prototype.toString = function() {
                return this.typeName() + "@" + this.stream.pos + "[header:" + this.header + ",length:" + this.length + ",sub:" + (null === this.sub ? "null" : this.sub.length) + "]"
            }
            ,
            t.prototype.toPrettyString = function(t) {
                void 0 === t && (t = "");
                var e = t + this.typeName() + " @" + this.stream.pos;
                if (this.length >= 0 && (e += "+"),
                e += this.length,
                this.tag.tagConstructed ? e += " (constructed)" : !this.tag.isUniversal() || 3 != this.tag.tagNumber && 4 != this.tag.tagNumber || null === this.sub || (e += " (encapsulates)"),
                e += "\n",
                null !== this.sub) {
                    t += "  ";
                    for (var n = 0, i = this.sub.length; n < i; ++n)
                        e += this.sub[n].toPrettyString(t)
                }
                return e
            }
            ,
            t.prototype.posStart = function() {
                return this.stream.pos
            }
            ,
            t.prototype.posContent = function() {
                return this.stream.pos + this.header
            }
            ,
            t.prototype.posEnd = function() {
                return this.stream.pos + this.header + Math.abs(this.length)
            }
            ,
            t.prototype.toHexString = function() {
                return this.stream.hexDump(this.posStart(), this.posEnd(), !0)
            }
            ,
            t.decodeLength = function(t) {
                var e = t.get()
                  , n = 127 & e;
                if (n == e)
                    return n;
                if (n > 6)
                    throw new Error("Length over 48 bits not supported at position " + (t.pos - 1));
                if (0 === n)
                    return null;
                e = 0;
                for (var i = 0; i < n; ++i)
                    e = 256 * e + t.get();
                return e
            }
            ,
            t.prototype.getHexStringValue = function() {
                var t = this.toHexString()
                  , e = 2 * this.header
                  , n = 2 * this.length;
                return t.substr(e, n)
            }
            ,
            t.decode = function(e) {
                var n;
                n = e instanceof T ? e : new T(e,0);
                var i = new T(n)
                  , r = new C(n)
                  , o = t.decodeLength(n)
                  , a = n.pos
                  , s = a - i.pos
                  , u = null
                  , l = function() {
                    var e = [];
                    if (null !== o) {
                        for (var i = a + o; n.pos < i; )
                            e[e.length] = t.decode(n);
                        if (n.pos != i)
                            throw new Error("Content size is not correct for container starting at offset " + a)
                    } else
                        try {
                            for (; ; ) {
                                var r = t.decode(n);
                                if (r.tag.isEOC())
                                    break;
                                e[e.length] = r
                            }
                            o = a - n.pos
                        } catch (t) {
                            throw new Error("Exception while decoding undefined length content: " + t)
                        }
                    return e
                };
                if (r.tagConstructed)
                    u = l();
                else if (r.isUniversal() && (3 == r.tagNumber || 4 == r.tagNumber))
                    try {
                        if (3 == r.tagNumber && 0 != n.get())
                            throw new Error("BIT STRINGs with unused bits cannot encapsulate.");
                        u = l();
                        for (var c = 0; c < u.length; ++c)
                            if (u[c].tag.isEOC())
                                throw new Error("EOC is not supposed to be actual content.")
                    } catch (t) {
                        u = null
                    }
                if (null === u) {
                    if (null === o)
                        throw new Error("We can't skip over an invalid tag with undefined length at offset " + a);
                    n.pos = a + Math.abs(o)
                }
                return new t(i,s,o,r,u)
            }
            ,
            t
        }(), C = function() {
            function t(t) {
                var e = t.get();
                if (this.tagClass = e >> 6,
                this.tagConstructed = 0 != (32 & e),
                this.tagNumber = 31 & e,
                31 == this.tagNumber) {
                    var n = new _;
                    do {
                        e = t.get(),
                        n.mulAdd(128, 127 & e)
                    } while (128 & e);
                    this.tagNumber = n.simplify()
                }
            }
            return t.prototype.isUniversal = function() {
                return 0 === this.tagClass
            }
            ,
            t.prototype.isEOC = function() {
                return 0 === this.tagClass && 0 === this.tagNumber
            }
            ,
            t
        }(), O = [2, 3, 5, 7, 11, 13, 17, 19, 23, 29, 31, 37, 41, 43, 47, 53, 59, 61, 67, 71, 73, 79, 83, 89, 97, 101, 103, 107, 109, 113, 127, 131, 137, 139, 149, 151, 157, 163, 167, 173, 179, 181, 191, 193, 197, 199, 211, 223, 227, 229, 233, 239, 241, 251, 257, 263, 269, 271, 277, 281, 283, 293, 307, 311, 313, 317, 331, 337, 347, 349, 353, 359, 367, 373, 379, 383, 389, 397, 401, 409, 419, 421, 431, 433, 439, 443, 449, 457, 461, 463, 467, 479, 487, 491, 499, 503, 509, 521, 523, 541, 547, 557, 563, 569, 571, 577, 587, 593, 599, 601, 607, 613, 617, 619, 631, 641, 643, 647, 653, 659, 661, 673, 677, 683, 691, 701, 709, 719, 727, 733, 739, 743, 751, 757, 761, 769, 773, 787, 797, 809, 811, 821, 823, 827, 829, 839, 853, 857, 859, 863, 877, 881, 883, 887, 907, 911, 919, 929, 937, 941, 947, 953, 967, 971, 977, 983, 991, 997], N = (1 << 26) / O[O.length - 1], P = function() {
            function t(t, e, n) {
                null != t && ("number" == typeof t ? this.fromNumber(t, e, n) : null == e && "string" != typeof t ? this.fromString(t, 256) : this.fromString(t, e))
            }
            return t.prototype.toString = function(t) {
                if (this.s < 0)
                    return "-" + this.negate().toString(t);
                var e;
                if (16 == t)
                    e = 4;
                else if (8 == t)
                    e = 3;
                else if (2 == t)
                    e = 1;
                else if (32 == t)
                    e = 5;
                else {
                    if (4 != t)
                        return this.toRadix(t);
                    e = 2
                }
                var n, i = (1 << e) - 1, r = !1, a = "", s = this.t, u = this.DB - s * this.DB % e;
                if (s-- > 0)
                    for (u < this.DB && (n = this[s] >> u) > 0 && (r = !0,
                    a = o(n)); s >= 0; )
                        u < e ? (n = (this[s] & (1 << u) - 1) << e - u,
                        n |= this[--s] >> (u += this.DB - e)) : (n = this[s] >> (u -= e) & i,
                        u <= 0 && (u += this.DB,
                        --s)),
                        n > 0 && (r = !0),
                        r && (a += o(n));
                return r ? a : "0"
            }
            ,
            t.prototype.negate = function() {
                var e = B();
                return t.ZERO.subTo(this, e),
                e
            }
            ,
            t.prototype.abs = function() {
                return this.s < 0 ? this.negate() : this
            }
            ,
            t.prototype.compareTo = function(t) {
                var e = this.s - t.s;
                if (0 != e)
                    return e;
                var n = this.t;
                if (0 != (e = n - t.t))
                    return this.s < 0 ? -e : e;
                for (; --n >= 0; )
                    if (0 != (e = this[n] - t[n]))
                        return e;
                return 0
            }
            ,
            t.prototype.bitLength = function() {
                return this.t <= 0 ? 0 : this.DB * (this.t - 1) + H(this[this.t - 1] ^ this.s & this.DM)
            }
            ,
            t.prototype.mod = function(e) {
                var n = B();
                return this.abs().divRemTo(e, null, n),
                this.s < 0 && n.compareTo(t.ZERO) > 0 && e.subTo(n, n),
                n
            }
            ,
            t.prototype.modPowInt = function(t, e) {
                var n;
                return n = t < 256 || e.isEven() ? new x(e) : new k(e),
                this.exp(t, n)
            }
            ,
            t.prototype.clone = function() {
                var t = B();
                return this.copyTo(t),
                t
            }
            ,
            t.prototype.intValue = function() {
                if (this.s < 0) {
                    if (1 == this.t)
                        return this[0] - this.DV;
                    if (0 == this.t)
                        return -1
                } else {
                    if (1 == this.t)
                        return this[0];
                    if (0 == this.t)
                        return 0
                }
                return (this[1] & (1 << 32 - this.DB) - 1) << this.DB | this[0]
            }
            ,
            t.prototype.byteValue = function() {
                return 0 == this.t ? this.s : this[0] << 24 >> 24
            }
            ,
            t.prototype.shortValue = function() {
                return 0 == this.t ? this.s : this[0] << 16 >> 16
            }
            ,
            t.prototype.signum = function() {
                return this.s < 0 ? -1 : this.t <= 0 || 1 == this.t && this[0] <= 0 ? 0 : 1
            }
            ,
            t.prototype.toByteArray = function() {
                var t = this.t
                  , e = [];
                e[0] = this.s;
                var n, i = this.DB - t * this.DB % 8, r = 0;
                if (t-- > 0)
                    for (i < this.DB && (n = this[t] >> i) != (this.s & this.DM) >> i && (e[r++] = n | this.s << this.DB - i); t >= 0; )
                        i < 8 ? (n = (this[t] & (1 << i) - 1) << 8 - i,
                        n |= this[--t] >> (i += this.DB - 8)) : (n = this[t] >> (i -= 8) & 255,
                        i <= 0 && (i += this.DB,
                        --t)),
                        0 != (128 & n) && (n |= -256),
                        0 == r && (128 & this.s) != (128 & n) && ++r,
                        (r > 0 || n != this.s) && (e[r++] = n);
                return e
            }
            ,
            t.prototype.equals = function(t) {
                return 0 == this.compareTo(t)
            }
            ,
            t.prototype.min = function(t) {
                return this.compareTo(t) < 0 ? this : t
            }
            ,
            t.prototype.max = function(t) {
                return this.compareTo(t) > 0 ? this : t
            }
            ,
            t.prototype.and = function(t) {
                var e = B();
                return this.bitwiseTo(t, a, e),
                e
            }
            ,
            t.prototype.or = function(t) {
                var e = B();
                return this.bitwiseTo(t, s, e),
                e
            }
            ,
            t.prototype.xor = function(t) {
                var e = B();
                return this.bitwiseTo(t, u, e),
                e
            }
            ,
            t.prototype.andNot = function(t) {
                var e = B();
                return this.bitwiseTo(t, l, e),
                e
            }
            ,
            t.prototype.not = function() {
                for (var t = B(), e = 0; e < this.t; ++e)
                    t[e] = this.DM & ~this[e];
                return t.t = this.t,
                t.s = ~this.s,
                t
            }
            ,
            t.prototype.shiftLeft = function(t) {
                var e = B();
                return t < 0 ? this.rShiftTo(-t, e) : this.lShiftTo(t, e),
                e
            }
            ,
            t.prototype.shiftRight = function(t) {
                var e = B();
                return t < 0 ? this.lShiftTo(-t, e) : this.rShiftTo(t, e),
                e
            }
            ,
            t.prototype.getLowestSetBit = function() {
                for (var t = 0; t < this.t; ++t)
                    if (0 != this[t])
                        return t * this.DB + c(this[t]);
                return this.s < 0 ? this.t * this.DB : -1
            }
            ,
            t.prototype.bitCount = function() {
                for (var t = 0, e = this.s & this.DM, n = 0; n < this.t; ++n)
                    t += d(this[n] ^ e);
                return t
            }
            ,
            t.prototype.testBit = function(t) {
                var e = Math.floor(t / this.DB);
                return e >= this.t ? 0 != this.s : 0 != (this[e] & 1 << t % this.DB)
            }
            ,
            t.prototype.setBit = function(t) {
                return this.changeBit(t, s)
            }
            ,
            t.prototype.clearBit = function(t) {
                return this.changeBit(t, l)
            }
            ,
            t.prototype.flipBit = function(t) {
                return this.changeBit(t, u)
            }
            ,
            t.prototype.add = function(t) {
                var e = B();
                return this.addTo(t, e),
                e
            }
            ,
            t.prototype.subtract = function(t) {
                var e = B();
                return this.subTo(t, e),
                e
            }
            ,
            t.prototype.multiply = function(t) {
                var e = B();
                return this.multiplyTo(t, e),
                e
            }
            ,
            t.prototype.divide = function(t) {
                var e = B();
                return this.divRemTo(t, e, null),
                e
            }
            ,
            t.prototype.remainder = function(t) {
                var e = B();
                return this.divRemTo(t, null, e),
                e
            }
            ,
            t.prototype.divideAndRemainder = function(t) {
                var e = B()
                  , n = B();
                return this.divRemTo(t, e, n),
                [e, n]
            }
            ,
            t.prototype.modPow = function(t, e) {
                var n, i, r = t.bitLength(), o = F(1);
                if (r <= 0)
                    return o;
                n = r < 18 ? 1 : r < 48 ? 3 : r < 144 ? 4 : r < 768 ? 5 : 6,
                i = r < 8 ? new x(e) : e.isEven() ? new D(e) : new k(e);
                var a = []
                  , s = 3
                  , u = n - 1
                  , l = (1 << n) - 1;
                if (a[1] = i.convert(this),
                n > 1) {
                    var c = B();
                    for (i.sqrTo(a[1], c); s <= l; )
                        a[s] = B(),
                        i.mulTo(c, a[s - 2], a[s]),
                        s += 2
                }
                var d, p, h = t.t - 1, f = !0, g = B();
                for (r = H(t[h]) - 1; h >= 0; ) {
                    for (r >= u ? d = t[h] >> r - u & l : (d = (t[h] & (1 << r + 1) - 1) << u - r,
                    h > 0 && (d |= t[h - 1] >> this.DB + r - u)),
                    s = n; 0 == (1 & d); )
                        d >>= 1,
                        --s;
                    if ((r -= s) < 0 && (r += this.DB,
                    --h),
                    f)
                        a[d].copyTo(o),
                        f = !1;
                    else {
                        for (; s > 1; )
                            i.sqrTo(o, g),
                            i.sqrTo(g, o),
                            s -= 2;
                        s > 0 ? i.sqrTo(o, g) : (p = o,
                        o = g,
                        g = p),
                        i.mulTo(g, a[d], o)
                    }
                    for (; h >= 0 && 0 == (t[h] & 1 << r); )
                        i.sqrTo(o, g),
                        p = o,
                        o = g,
                        g = p,
                        --r < 0 && (r = this.DB - 1,
                        --h)
                }
                return i.revert(o)
            }
            ,
            t.prototype.modInverse = function(e) {
                var n = e.isEven();
                if (this.isEven() && n || 0 == e.signum())
                    return t.ZERO;
                for (var i = e.clone(), r = this.clone(), o = F(1), a = F(0), s = F(0), u = F(1); 0 != i.signum(); ) {
                    for (; i.isEven(); )
                        i.rShiftTo(1, i),
                        n ? (o.isEven() && a.isEven() || (o.addTo(this, o),
                        a.subTo(e, a)),
                        o.rShiftTo(1, o)) : a.isEven() || a.subTo(e, a),
                        a.rShiftTo(1, a);
                    for (; r.isEven(); )
                        r.rShiftTo(1, r),
                        n ? (s.isEven() && u.isEven() || (s.addTo(this, s),
                        u.subTo(e, u)),
                        s.rShiftTo(1, s)) : u.isEven() || u.subTo(e, u),
                        u.rShiftTo(1, u);
                    i.compareTo(r) >= 0 ? (i.subTo(r, i),
                    n && o.subTo(s, o),
                    a.subTo(u, a)) : (r.subTo(i, r),
                    n && s.subTo(o, s),
                    u.subTo(a, u))
                }
                return 0 != r.compareTo(t.ONE) ? t.ZERO : u.compareTo(e) >= 0 ? u.subtract(e) : u.signum() < 0 ? (u.addTo(e, u),
                u.signum() < 0 ? u.add(e) : u) : u
            }
            ,
            t.prototype.pow = function(t) {
                return this.exp(t, new R)
            }
            ,
            t.prototype.gcd = function(t) {
                var e = this.s < 0 ? this.negate() : this.clone()
                  , n = t.s < 0 ? t.negate() : t.clone();
                if (e.compareTo(n) < 0) {
                    var i = e;
                    e = n,
                    n = i
                }
                var r = e.getLowestSetBit()
                  , o = n.getLowestSetBit();
                if (o < 0)
                    return e;
                for (r < o && (o = r),
                o > 0 && (e.rShiftTo(o, e),
                n.rShiftTo(o, n)); e.signum() > 0; )
                    (r = e.getLowestSetBit()) > 0 && e.rShiftTo(r, e),
                    (r = n.getLowestSetBit()) > 0 && n.rShiftTo(r, n),
                    e.compareTo(n) >= 0 ? (e.subTo(n, e),
                    e.rShiftTo(1, e)) : (n.subTo(e, n),
                    n.rShiftTo(1, n));
                return o > 0 && n.lShiftTo(o, n),
                n
            }
            ,
            t.prototype.isProbablePrime = function(t) {
                var e, n = this.abs();
                if (1 == n.t && n[0] <= O[O.length - 1]) {
                    for (e = 0; e < O.length; ++e)
                        if (n[0] == O[e])
                            return !0;
                    return !1
                }
                if (n.isEven())
                    return !1;
                for (e = 1; e < O.length; ) {
                    for (var i = O[e], r = e + 1; r < O.length && i < N; )
                        i *= O[r++];
                    for (i = n.modInt(i); e < r; )
                        if (i % O[e++] == 0)
                            return !1
                }
                return n.millerRabin(t)
            }
            ,
            t.prototype.copyTo = function(t) {
                for (var e = this.t - 1; e >= 0; --e)
                    t[e] = this[e];
                t.t = this.t,
                t.s = this.s
            }
            ,
            t.prototype.fromInt = function(t) {
                this.t = 1,
                this.s = t < 0 ? -1 : 0,
                t > 0 ? this[0] = t : t < -1 ? this[0] = t + this.DV : this.t = 0
            }
            ,
            t.prototype.fromString = function(e, n) {
                var i;
                if (16 == n)
                    i = 4;
                else if (8 == n)
                    i = 3;
                else if (256 == n)
                    i = 8;
                else if (2 == n)
                    i = 1;
                else if (32 == n)
                    i = 5;
                else {
                    if (4 != n)
                        return void this.fromRadix(e, n);
                    i = 2
                }
                this.t = 0,
                this.s = 0;
                for (var r = e.length, o = !1, a = 0; --r >= 0; ) {
                    var s = 8 == i ? 255 & +e[r] : W(e, r);
                    s < 0 ? "-" == e.charAt(r) && (o = !0) : (o = !1,
                    0 == a ? this[this.t++] = s : a + i > this.DB ? (this[this.t - 1] |= (s & (1 << this.DB - a) - 1) << a,
                    this[this.t++] = s >> this.DB - a) : this[this.t - 1] |= s << a,
                    (a += i) >= this.DB && (a -= this.DB))
                }
                8 == i && 0 != (128 & +e[0]) && (this.s = -1,
                a > 0 && (this[this.t - 1] |= (1 << this.DB - a) - 1 << a)),
                this.clamp(),
                o && t.ZERO.subTo(this, this)
            }
            ,
            t.prototype.clamp = function() {
                for (var t = this.s & this.DM; this.t > 0 && this[this.t - 1] == t; )
                    --this.t
            }
            ,
            t.prototype.dlShiftTo = function(t, e) {
                var n;
                for (n = this.t - 1; n >= 0; --n)
                    e[n + t] = this[n];
                for (n = t - 1; n >= 0; --n)
                    e[n] = 0;
                e.t = this.t + t,
                e.s = this.s
            }
            ,
            t.prototype.drShiftTo = function(t, e) {
                for (var n = t; n < this.t; ++n)
                    e[n - t] = this[n];
                e.t = Math.max(this.t - t, 0),
                e.s = this.s
            }
            ,
            t.prototype.lShiftTo = function(t, e) {
                for (var n = t % this.DB, i = this.DB - n, r = (1 << i) - 1, o = Math.floor(t / this.DB), a = this.s << n & this.DM, s = this.t - 1; s >= 0; --s)
                    e[s + o + 1] = this[s] >> i | a,
                    a = (this[s] & r) << n;
                for (s = o - 1; s >= 0; --s)
                    e[s] = 0;
                e[o] = a,
                e.t = this.t + o + 1,
                e.s = this.s,
                e.clamp()
            }
            ,
            t.prototype.rShiftTo = function(t, e) {
                e.s = this.s;
                var n = Math.floor(t / this.DB);
                if (n >= this.t)
                    e.t = 0;
                else {
                    var i = t % this.DB
                      , r = this.DB - i
                      , o = (1 << i) - 1;
                    e[0] = this[n] >> i;
                    for (var a = n + 1; a < this.t; ++a)
                        e[a - n - 1] |= (this[a] & o) << r,
                        e[a - n] = this[a] >> i;
                    i > 0 && (e[this.t - n - 1] |= (this.s & o) << r),
                    e.t = this.t - n,
                    e.clamp()
                }
            }
            ,
            t.prototype.subTo = function(t, e) {
                for (var n = 0, i = 0, r = Math.min(t.t, this.t); n < r; )
                    i += this[n] - t[n],
                    e[n++] = i & this.DM,
                    i >>= this.DB;
                if (t.t < this.t) {
                    for (i -= t.s; n < this.t; )
                        i += this[n],
                        e[n++] = i & this.DM,
                        i >>= this.DB;
                    i += this.s
                } else {
                    for (i += this.s; n < t.t; )
                        i -= t[n],
                        e[n++] = i & this.DM,
                        i >>= this.DB;
                    i -= t.s
                }
                e.s = i < 0 ? -1 : 0,
                i < -1 ? e[n++] = this.DV + i : i > 0 && (e[n++] = i),
                e.t = n,
                e.clamp()
            }
            ,
            t.prototype.multiplyTo = function(e, n) {
                var i = this.abs()
                  , r = e.abs()
                  , o = i.t;
                for (n.t = o + r.t; --o >= 0; )
                    n[o] = 0;
                for (o = 0; o < r.t; ++o)
                    n[o + i.t] = i.am(0, r[o], n, o, 0, i.t);
                n.s = 0,
                n.clamp(),
                this.s != e.s && t.ZERO.subTo(n, n)
            }
            ,
            t.prototype.squareTo = function(t) {
                for (var e = this.abs(), n = t.t = 2 * e.t; --n >= 0; )
                    t[n] = 0;
                for (n = 0; n < e.t - 1; ++n) {
                    var i = e.am(n, e[n], t, 2 * n, 0, 1);
                    (t[n + e.t] += e.am(n + 1, 2 * e[n], t, 2 * n + 1, i, e.t - n - 1)) >= e.DV && (t[n + e.t] -= e.DV,
                    t[n + e.t + 1] = 1)
                }
                t.t > 0 && (t[t.t - 1] += e.am(n, e[n], t, 2 * n, 0, 1)),
                t.s = 0,
                t.clamp()
            }
            ,
            t.prototype.divRemTo = function(e, n, i) {
                var r = e.abs();
                if (!(r.t <= 0)) {
                    var o = this.abs();
                    if (o.t < r.t)
                        return null != n && n.fromInt(0),
                        void (null != i && this.copyTo(i));
                    null == i && (i = B());
                    var a = B()
                      , s = this.s
                      , u = e.s
                      , l = this.DB - H(r[r.t - 1]);
                    l > 0 ? (r.lShiftTo(l, a),
                    o.lShiftTo(l, i)) : (r.copyTo(a),
                    o.copyTo(i));
                    var c = a.t
                      , d = a[c - 1];
                    if (0 != d) {
                        var p = d * (1 << this.F1) + (c > 1 ? a[c - 2] >> this.F2 : 0)
                          , h = this.FV / p
                          , f = (1 << this.F1) / p
                          , g = 1 << this.F2
                          , m = i.t
                          , v = m - c
                          , y = null == n ? B() : n;
                        for (a.dlShiftTo(v, y),
                        i.compareTo(y) >= 0 && (i[i.t++] = 1,
                        i.subTo(y, i)),
                        t.ONE.dlShiftTo(c, y),
                        y.subTo(a, a); a.t < c; )
                            a[a.t++] = 0;
                        for (; --v >= 0; ) {
                            var b = i[--m] == d ? this.DM : Math.floor(i[m] * h + (i[m - 1] + g) * f);
                            if ((i[m] += a.am(0, b, i, v, 0, c)) < b)
                                for (a.dlShiftTo(v, y),
                                i.subTo(y, i); i[m] < --b; )
                                    i.subTo(y, i)
                        }
                        null != n && (i.drShiftTo(c, n),
                        s != u && t.ZERO.subTo(n, n)),
                        i.t = c,
                        i.clamp(),
                        l > 0 && i.rShiftTo(l, i),
                        s < 0 && t.ZERO.subTo(i, i)
                    }
                }
            }
            ,
            t.prototype.invDigit = function() {
                if (this.t < 1)
                    return 0;
                var t = this[0];
                if (0 == (1 & t))
                    return 0;
                var e = 3 & t;
                return (e = (e = (e = (e = e * (2 - (15 & t) * e) & 15) * (2 - (255 & t) * e) & 255) * (2 - ((65535 & t) * e & 65535)) & 65535) * (2 - t * e % this.DV) % this.DV) > 0 ? this.DV - e : -e
            }
            ,
            t.prototype.isEven = function() {
                return 0 == (this.t > 0 ? 1 & this[0] : this.s)
            }
            ,
            t.prototype.exp = function(e, n) {
                if (e > 4294967295 || e < 1)
                    return t.ONE;
                var i = B()
                  , r = B()
                  , o = n.convert(this)
                  , a = H(e) - 1;
                for (o.copyTo(i); --a >= 0; )
                    if (n.sqrTo(i, r),
                    (e & 1 << a) > 0)
                        n.mulTo(r, o, i);
                    else {
                        var s = i;
                        i = r,
                        r = s
                    }
                return n.revert(i)
            }
            ,
            t.prototype.chunkSize = function(t) {
                return Math.floor(Math.LN2 * this.DB / Math.log(t))
            }
            ,
            t.prototype.toRadix = function(t) {
                if (null == t && (t = 10),
                0 == this.signum() || t < 2 || t > 36)
                    return "0";
                var e = this.chunkSize(t)
                  , n = Math.pow(t, e)
                  , i = F(n)
                  , r = B()
                  , o = B()
                  , a = "";
                for (this.divRemTo(i, r, o); r.signum() > 0; )
                    a = (n + o.intValue()).toString(t).substr(1) + a,
                    r.divRemTo(i, r, o);
                return o.intValue().toString(t) + a
            }
            ,
            t.prototype.fromRadix = function(e, n) {
                this.fromInt(0),
                null == n && (n = 10);
                for (var i = this.chunkSize(n), r = Math.pow(n, i), o = !1, a = 0, s = 0, u = 0; u < e.length; ++u) {
                    var l = W(e, u);
                    l < 0 ? "-" == e.charAt(u) && 0 == this.signum() && (o = !0) : (s = n * s + l,
                    ++a >= i && (this.dMultiply(r),
                    this.dAddOffset(s, 0),
                    a = 0,
                    s = 0))
                }
                a > 0 && (this.dMultiply(Math.pow(n, a)),
                this.dAddOffset(s, 0)),
                o && t.ZERO.subTo(this, this)
            }
            ,
            t.prototype.fromNumber = function(e, n, i) {
                if ("number" == typeof n)
                    if (e < 2)
                        this.fromInt(1);
                    else
                        for (this.fromNumber(e, i),
                        this.testBit(e - 1) || this.bitwiseTo(t.ONE.shiftLeft(e - 1), s, this),
                        this.isEven() && this.dAddOffset(1, 0); !this.isProbablePrime(n); )
                            this.dAddOffset(2, 0),
                            this.bitLength() > e && this.subTo(t.ONE.shiftLeft(e - 1), this);
                else {
                    var r = []
                      , o = 7 & e;
                    r.length = 1 + (e >> 3),
                    n.nextBytes(r),
                    o > 0 ? r[0] &= (1 << o) - 1 : r[0] = 0,
                    this.fromString(r, 256)
                }
            }
            ,
            t.prototype.bitwiseTo = function(t, e, n) {
                var i, r, o = Math.min(t.t, this.t);
                for (i = 0; i < o; ++i)
                    n[i] = e(this[i], t[i]);
                if (t.t < this.t) {
                    for (r = t.s & this.DM,
                    i = o; i < this.t; ++i)
                        n[i] = e(this[i], r);
                    n.t = this.t
                } else {
                    for (r = this.s & this.DM,
                    i = o; i < t.t; ++i)
                        n[i] = e(r, t[i]);
                    n.t = t.t
                }
                n.s = e(this.s, t.s),
                n.clamp()
            }
            ,
            t.prototype.changeBit = function(e, n) {
                var i = t.ONE.shiftLeft(e);
                return this.bitwiseTo(i, n, i),
                i
            }
            ,
            t.prototype.addTo = function(t, e) {
                for (var n = 0, i = 0, r = Math.min(t.t, this.t); n < r; )
                    i += this[n] + t[n],
                    e[n++] = i & this.DM,
                    i >>= this.DB;
                if (t.t < this.t) {
                    for (i += t.s; n < this.t; )
                        i += this[n],
                        e[n++] = i & this.DM,
                        i >>= this.DB;
                    i += this.s
                } else {
                    for (i += this.s; n < t.t; )
                        i += t[n],
                        e[n++] = i & this.DM,
                        i >>= this.DB;
                    i += t.s
                }
                e.s = i < 0 ? -1 : 0,
                i > 0 ? e[n++] = i : i < -1 && (e[n++] = this.DV + i),
                e.t = n,
                e.clamp()
            }
            ,
            t.prototype.dMultiply = function(t) {
                this[this.t] = this.am(0, t - 1, this, 0, 0, this.t),
                ++this.t,
                this.clamp()
            }
            ,
            t.prototype.dAddOffset = function(t, e) {
                if (0 != t) {
                    for (; this.t <= e; )
                        this[this.t++] = 0;
                    for (this[e] += t; this[e] >= this.DV; )
                        this[e] -= this.DV,
                        ++e >= this.t && (this[this.t++] = 0),
                        ++this[e]
                }
            }
            ,
            t.prototype.multiplyLowerTo = function(t, e, n) {
                var i = Math.min(this.t + t.t, e);
                for (n.s = 0,
                n.t = i; i > 0; )
                    n[--i] = 0;
                for (var r = n.t - this.t; i < r; ++i)
                    n[i + this.t] = this.am(0, t[i], n, i, 0, this.t);
                for (r = Math.min(t.t, e); i < r; ++i)
                    this.am(0, t[i], n, i, 0, e - i);
                n.clamp()
            }
            ,
            t.prototype.multiplyUpperTo = function(t, e, n) {
                --e;
                var i = n.t = this.t + t.t - e;
                for (n.s = 0; --i >= 0; )
                    n[i] = 0;
                for (i = Math.max(e - this.t, 0); i < t.t; ++i)
                    n[this.t + i - e] = this.am(e - i, t[i], n, 0, 0, this.t + i - e);
                n.clamp(),
                n.drShiftTo(1, n)
            }
            ,
            t.prototype.modInt = function(t) {
                if (t <= 0)
                    return 0;
                var e = this.DV % t
                  , n = this.s < 0 ? t - 1 : 0;
                if (this.t > 0)
                    if (0 == e)
                        n = this[0] % t;
                    else
                        for (var i = this.t - 1; i >= 0; --i)
                            n = (e * n + this[i]) % t;
                return n
            }
            ,
            t.prototype.millerRabin = function(e) {
                var n = this.subtract(t.ONE)
                  , i = n.getLowestSetBit();
                if (i <= 0)
                    return !1;
                var r = n.shiftRight(i);
                (e = e + 1 >> 1) > O.length && (e = O.length);
                for (var o = B(), a = 0; a < e; ++a) {
                    o.fromInt(O[Math.floor(Math.random() * O.length)]);
                    var s = o.modPow(r, this);
                    if (0 != s.compareTo(t.ONE) && 0 != s.compareTo(n)) {
                        for (var u = 1; u++ < i && 0 != s.compareTo(n); )
                            if (0 == (s = s.modPowInt(2, this)).compareTo(t.ONE))
                                return !1;
                        if (0 != s.compareTo(n))
                            return !1
                    }
                }
                return !0
            }
            ,
            t.prototype.square = function() {
                var t = B();
                return this.squareTo(t),
                t
            }
            ,
            t.prototype.gcda = function(t, e) {
                var n = this.s < 0 ? this.negate() : this.clone()
                  , i = t.s < 0 ? t.negate() : t.clone();
                if (n.compareTo(i) < 0) {
                    var r = n;
                    n = i,
                    i = r
                }
                var o = n.getLowestSetBit()
                  , a = i.getLowestSetBit();
                if (a < 0)
                    e(n);
                else {
                    o < a && (a = o),
                    a > 0 && (n.rShiftTo(a, n),
                    i.rShiftTo(a, i));
                    var s = function t() {
                        (o = n.getLowestSetBit()) > 0 && n.rShiftTo(o, n),
                        (o = i.getLowestSetBit()) > 0 && i.rShiftTo(o, i),
                        n.compareTo(i) >= 0 ? (n.subTo(i, n),
                        n.rShiftTo(1, n)) : (i.subTo(n, i),
                        i.rShiftTo(1, i)),
                        n.signum() > 0 ? setTimeout(t, 0) : (a > 0 && i.lShiftTo(a, i),
                        setTimeout((function() {
                            e(i)
                        }
                        ), 0))
                    };
                    setTimeout(s, 10)
                }
            }
            ,
            t.prototype.fromNumberAsync = function(e, n, i, r) {
                if ("number" == typeof n)
                    if (e < 2)
                        this.fromInt(1);
                    else {
                        this.fromNumber(e, i),
                        this.testBit(e - 1) || this.bitwiseTo(t.ONE.shiftLeft(e - 1), s, this),
                        this.isEven() && this.dAddOffset(1, 0);
                        var o = this
                          , a = function i() {
                            o.dAddOffset(2, 0),
                            o.bitLength() > e && o.subTo(t.ONE.shiftLeft(e - 1), o),
                            o.isProbablePrime(n) ? setTimeout((function() {
                                r()
                            }
                            ), 0) : setTimeout(i, 0)
                        };
                        setTimeout(a, 0)
                    }
                else {
                    var u = []
                      , l = 7 & e;
                    u.length = 1 + (e >> 3),
                    n.nextBytes(u),
                    l > 0 ? u[0] &= (1 << l) - 1 : u[0] = 0,
                    this.fromString(u, 256)
                }
            }
            ,
            t
        }(), R = function() {
            function t() {}
            return t.prototype.convert = function(t) {
                return t
            }
            ,
            t.prototype.revert = function(t) {
                return t
            }
            ,
            t.prototype.mulTo = function(t, e, n) {
                t.multiplyTo(e, n)
            }
            ,
            t.prototype.sqrTo = function(t, e) {
                t.squareTo(e)
            }
            ,
            t
        }(), x = function() {
            function t(t) {
                this.m = t
            }
            return t.prototype.convert = function(t) {
                return t.s < 0 || t.compareTo(this.m) >= 0 ? t.mod(this.m) : t
            }
            ,
            t.prototype.revert = function(t) {
                return t
            }
            ,
            t.prototype.reduce = function(t) {
                t.divRemTo(this.m, null, t)
            }
            ,
            t.prototype.mulTo = function(t, e, n) {
                t.multiplyTo(e, n),
                this.reduce(n)
            }
            ,
            t.prototype.sqrTo = function(t, e) {
                t.squareTo(e),
                this.reduce(e)
            }
            ,
            t
        }(), k = function() {
            function t(t) {
                this.m = t,
                this.mp = t.invDigit(),
                this.mpl = 32767 & this.mp,
                this.mph = this.mp >> 15,
                this.um = (1 << t.DB - 15) - 1,
                this.mt2 = 2 * t.t
            }
            return t.prototype.convert = function(t) {
                var e = B();
                return t.abs().dlShiftTo(this.m.t, e),
                e.divRemTo(this.m, null, e),
                t.s < 0 && e.compareTo(P.ZERO) > 0 && this.m.subTo(e, e),
                e
            }
            ,
            t.prototype.revert = function(t) {
                var e = B();
                return t.copyTo(e),
                this.reduce(e),
                e
            }
            ,
            t.prototype.reduce = function(t) {
                for (; t.t <= this.mt2; )
                    t[t.t++] = 0;
                for (var e = 0; e < this.m.t; ++e) {
                    var n = 32767 & t[e]
                      , i = n * this.mpl + ((n * this.mph + (t[e] >> 15) * this.mpl & this.um) << 15) & t.DM;
                    for (t[n = e + this.m.t] += this.m.am(0, i, t, e, 0, this.m.t); t[n] >= t.DV; )
                        t[n] -= t.DV,
                        t[++n]++
                }
                t.clamp(),
                t.drShiftTo(this.m.t, t),
                t.compareTo(this.m) >= 0 && t.subTo(this.m, t)
            }
            ,
            t.prototype.mulTo = function(t, e, n) {
                t.multiplyTo(e, n),
                this.reduce(n)
            }
            ,
            t.prototype.sqrTo = function(t, e) {
                t.squareTo(e),
                this.reduce(e)
            }
            ,
            t
        }(), D = function() {
            function t(t) {
                this.m = t,
                this.r2 = B(),
                this.q3 = B(),
                P.ONE.dlShiftTo(2 * t.t, this.r2),
                this.mu = this.r2.divide(t)
            }
            return t.prototype.convert = function(t) {
                if (t.s < 0 || t.t > 2 * this.m.t)
                    return t.mod(this.m);
                if (t.compareTo(this.m) < 0)
                    return t;
                var e = B();
                return t.copyTo(e),
                this.reduce(e),
                e
            }
            ,
            t.prototype.revert = function(t) {
                return t
            }
            ,
            t.prototype.reduce = function(t) {
                for (t.drShiftTo(this.m.t - 1, this.r2),
                t.t > this.m.t + 1 && (t.t = this.m.t + 1,
                t.clamp()),
                this.mu.multiplyUpperTo(this.r2, this.m.t + 1, this.q3),
                this.m.multiplyLowerTo(this.q3, this.m.t + 1, this.r2); t.compareTo(this.r2) < 0; )
                    t.dAddOffset(1, this.m.t + 1);
                for (t.subTo(this.r2, t); t.compareTo(this.m) >= 0; )
                    t.subTo(this.m, t)
            }
            ,
            t.prototype.mulTo = function(t, e, n) {
                t.multiplyTo(e, n),
                this.reduce(n)
            }
            ,
            t.prototype.sqrTo = function(t, e) {
                t.squareTo(e),
                this.reduce(e)
            }
            ,
            t
        }();
        function B() {
            return new P(null)
        }
        function M(t, e) {
            return new P(t,e)
        }
        var L = "undefined" != typeof navigator;
        L && "Microsoft Internet Explorer" == navigator.appName ? (P.prototype.am = function(t, e, n, i, r, o) {
            for (var a = 32767 & e, s = e >> 15; --o >= 0; ) {
                var u = 32767 & this[t]
                  , l = this[t++] >> 15
                  , c = s * u + l * a;
                r = ((u = a * u + ((32767 & c) << 15) + n[i] + (1073741823 & r)) >>> 30) + (c >>> 15) + s * l + (r >>> 30),
                n[i++] = 1073741823 & u
            }
            return r
        }
        ,
        E = 30) : L && "Netscape" != navigator.appName ? (P.prototype.am = function(t, e, n, i, r, o) {
            for (; --o >= 0; ) {
                var a = e * this[t++] + n[i] + r;
                r = Math.floor(a / 67108864),
                n[i++] = 67108863 & a
            }
            return r
        }
        ,
        E = 26) : (P.prototype.am = function(t, e, n, i, r, o) {
            for (var a = 16383 & e, s = e >> 14; --o >= 0; ) {
                var u = 16383 & this[t]
                  , l = this[t++] >> 14
                  , c = s * u + l * a;
                r = ((u = a * u + ((16383 & c) << 14) + n[i] + r) >> 28) + (c >> 14) + s * l,
                n[i++] = 268435455 & u
            }
            return r
        }
        ,
        E = 28),
        P.prototype.DB = E,
        P.prototype.DM = (1 << E) - 1,
        P.prototype.DV = 1 << E,
        P.prototype.FV = Math.pow(2, 52),
        P.prototype.F1 = 52 - E,
        P.prototype.F2 = 2 * E - 52;
        var U, j, V = [];
        for (U = "0".charCodeAt(0),
        j = 0; j <= 9; ++j)
            V[U++] = j;
        for (U = "a".charCodeAt(0),
        j = 10; j < 36; ++j)
            V[U++] = j;
        for (U = "A".charCodeAt(0),
        j = 10; j < 36; ++j)
            V[U++] = j;
        function W(t, e) {
            var n = V[t.charCodeAt(e)];
            return null == n ? -1 : n
        }
        function F(t) {
            var e = B();
            return e.fromInt(t),
            e
        }
        function H(t) {
            var e, n = 1;
            return 0 != (e = t >>> 16) && (t = e,
            n += 16),
            0 != (e = t >> 8) && (t = e,
            n += 8),
            0 != (e = t >> 4) && (t = e,
            n += 4),
            0 != (e = t >> 2) && (t = e,
            n += 2),
            0 != (e = t >> 1) && (t = e,
            n += 1),
            n
        }
        P.ZERO = F(0),
        P.ONE = F(1);
        var q, z, K = "undefined" != typeof globalThis ? globalThis : "undefined" != typeof window ? window : void 0 !== n.g ? n.g : "undefined" != typeof self ? self : {}, J = "undefined" != typeof window ? window : void 0 !== K ? K : "undefined" != typeof self ? self : {}, $ = function() {
            function t() {
                this.i = 0,
                this.j = 0,
                this.S = []
            }
            return t.prototype.init = function(t) {
                var e, n, i;
                for (e = 0; e < 256; ++e)
                    this.S[e] = e;
                for (n = 0,
                e = 0; e < 256; ++e)
                    n = n + this.S[e] + t[e % t.length] & 255,
                    i = this.S[e],
                    this.S[e] = this.S[n],
                    this.S[n] = i;
                this.i = 0,
                this.j = 0
            }
            ,
            t.prototype.next = function() {
                var t;
                return this.i = this.i + 1 & 255,
                this.j = this.j + this.S[this.i] & 255,
                t = this.S[this.i],
                this.S[this.i] = this.S[this.j],
                this.S[this.j] = t,
                this.S[t + this.S[this.i] & 255]
            }
            ,
            t
        }(), G = null;
        if (null == G) {
            G = [],
            z = 0;
            var Y = void 0;
            if (J.crypto && J.crypto.getRandomValues) {
                var Q = new Uint32Array(256);
                for (J.crypto.getRandomValues(Q),
                Y = 0; Y < Q.length; ++Y)
                    G[z++] = 255 & Q[Y]
            }
            var Z = 0
              , X = function t(e) {
                if ((Z = Z || 0) >= 256 || z >= 256)
                    J.removeEventListener ? J.removeEventListener("mousemove", t, !1) : J.detachEvent && J.detachEvent("onmousemove", t);
                else
                    try {
                        var n = e.x + e.y;
                        G[z++] = 255 & n,
                        Z += 1
                    } catch (e) {}
            };
            J.addEventListener ? J.addEventListener("mousemove", X, !1) : J.attachEvent && J.attachEvent("onmousemove", X)
        }
        function tt() {
            if (null == q) {
                for (q = new $; z < 256; ) {
                    var t = Math.floor(65536 * Math.random());
                    G[z++] = 255 & t
                }
                for (q.init(G),
                z = 0; z < G.length; ++z)
                    G[z] = 0;
                z = 0
            }
            return q.next()
        }
        var et = function() {
            function t() {}
            return t.prototype.nextBytes = function(t) {
                for (var e = 0; e < t.length; ++e)
                    t[e] = tt()
            }
            ,
            t
        }()
          , nt = function() {
            function t() {
                this.n = null,
                this.e = 0,
                this.d = null,
                this.p = null,
                this.q = null,
                this.dmp1 = null,
                this.dmq1 = null,
                this.coeff = null
            }
            return t.prototype.doPublic = function(t) {
                return t.modPowInt(this.e, this.n)
            }
            ,
            t.prototype.doPrivate = function(t) {
                if (null == this.p || null == this.q)
                    return t.modPow(this.d, this.n);
                for (var e = t.mod(this.p).modPow(this.dmp1, this.p), n = t.mod(this.q).modPow(this.dmq1, this.q); e.compareTo(n) < 0; )
                    e = e.add(this.p);
                return e.subtract(n).multiply(this.coeff).mod(this.p).multiply(this.q).add(n)
            }
            ,
            t.prototype.setPublic = function(t, e) {
                null != t && null != e && t.length > 0 && e.length > 0 ? (this.n = M(t, 16),
                this.e = parseInt(e, 16)) : console.error("Invalid RSA public key")
            }
            ,
            t.prototype.encrypt = function(t) {
                var e = this.n.bitLength() + 7 >> 3
                  , n = function(t, e) {
                    if (e < t.length + 11)
                        return console.error("Message too long for RSA"),
                        null;
                    for (var n = [], i = t.length - 1; i >= 0 && e > 0; ) {
                        var r = t.charCodeAt(i--);
                        r < 128 ? n[--e] = r : r > 127 && r < 2048 ? (n[--e] = 63 & r | 128,
                        n[--e] = r >> 6 | 192) : (n[--e] = 63 & r | 128,
                        n[--e] = r >> 6 & 63 | 128,
                        n[--e] = r >> 12 | 224)
                    }
                    n[--e] = 0;
                    for (var o = new et, a = []; e > 2; ) {
                        for (a[0] = 0; 0 == a[0]; )
                            o.nextBytes(a);
                        n[--e] = a[0]
                    }
                    return n[--e] = 2,
                    n[--e] = 0,
                    new P(n)
                }(t, e);
                if (null == n)
                    return null;
                var i = this.doPublic(n);
                if (null == i)
                    return null;
                for (var r = i.toString(16), o = r.length, a = 0; a < 2 * e - o; a++)
                    r = "0" + r;
                return r
            }
            ,
            t.prototype.setPrivate = function(t, e, n) {
                null != t && null != e && t.length > 0 && e.length > 0 ? (this.n = M(t, 16),
                this.e = parseInt(e, 16),
                this.d = M(n, 16)) : console.error("Invalid RSA private key")
            }
            ,
            t.prototype.setPrivateEx = function(t, e, n, i, r, o, a, s) {
                null != t && null != e && t.length > 0 && e.length > 0 ? (this.n = M(t, 16),
                this.e = parseInt(e, 16),
                this.d = M(n, 16),
                this.p = M(i, 16),
                this.q = M(r, 16),
                this.dmp1 = M(o, 16),
                this.dmq1 = M(a, 16),
                this.coeff = M(s, 16)) : console.error("Invalid RSA private key")
            }
            ,
            t.prototype.generate = function(t, e) {
                var n = new et
                  , i = t >> 1;
                this.e = parseInt(e, 16);
                for (var r = new P(e,16); ; ) {
                    for (; this.p = new P(t - i,1,n),
                    0 != this.p.subtract(P.ONE).gcd(r).compareTo(P.ONE) || !this.p.isProbablePrime(10); )
                        ;
                    for (; this.q = new P(i,1,n),
                    0 != this.q.subtract(P.ONE).gcd(r).compareTo(P.ONE) || !this.q.isProbablePrime(10); )
                        ;
                    if (this.p.compareTo(this.q) <= 0) {
                        var o = this.p;
                        this.p = this.q,
                        this.q = o
                    }
                    var a = this.p.subtract(P.ONE)
                      , s = this.q.subtract(P.ONE)
                      , u = a.multiply(s);
                    if (0 == u.gcd(r).compareTo(P.ONE)) {
                        this.n = this.p.multiply(this.q),
                        this.d = r.modInverse(u),
                        this.dmp1 = this.d.mod(a),
                        this.dmq1 = this.d.mod(s),
                        this.coeff = this.q.modInverse(this.p);
                        break
                    }
                }
            }
            ,
            t.prototype.decrypt = function(t) {
                var e = M(t, 16)
                  , n = this.doPrivate(e);
                return null == n ? null : function(t, e) {
                    for (var n = t.toByteArray(), i = 0; i < n.length && 0 == n[i]; )
                        ++i;
                    if (n.length - i != e - 1 || 2 != n[i])
                        return null;
                    for (++i; 0 != n[i]; )
                        if (++i >= n.length)
                            return null;
                    for (var r = ""; ++i < n.length; ) {
                        var o = 255 & n[i];
                        o < 128 ? r += String.fromCharCode(o) : o > 191 && o < 224 ? (r += String.fromCharCode((31 & o) << 6 | 63 & n[i + 1]),
                        ++i) : (r += String.fromCharCode((15 & o) << 12 | (63 & n[i + 1]) << 6 | 63 & n[i + 2]),
                        i += 2)
                    }
                    return r
                }(n, this.n.bitLength() + 7 >> 3)
            }
            ,
            t.prototype.generateAsync = function(t, e, n) {
                var i = new et
                  , r = t >> 1;
                this.e = parseInt(e, 16);
                var o = new P(e,16)
                  , a = this
                  , s = function e() {
                    var s = function() {
                        if (a.p.compareTo(a.q) <= 0) {
                            var t = a.p;
                            a.p = a.q,
                            a.q = t
                        }
                        var i = a.p.subtract(P.ONE)
                          , r = a.q.subtract(P.ONE)
                          , s = i.multiply(r);
                        0 == s.gcd(o).compareTo(P.ONE) ? (a.n = a.p.multiply(a.q),
                        a.d = o.modInverse(s),
                        a.dmp1 = a.d.mod(i),
                        a.dmq1 = a.d.mod(r),
                        a.coeff = a.q.modInverse(a.p),
                        setTimeout((function() {
                            n()
                        }
                        ), 0)) : setTimeout(e, 0)
                    }
                      , u = function t() {
                        a.q = B(),
                        a.q.fromNumberAsync(r, 1, i, (function() {
                            a.q.subtract(P.ONE).gcda(o, (function(e) {
                                0 == e.compareTo(P.ONE) && a.q.isProbablePrime(10) ? setTimeout(s, 0) : setTimeout(t, 0)
                            }
                            ))
                        }
                        ))
                    }
                      , l = function e() {
                        a.p = B(),
                        a.p.fromNumberAsync(t - r, 1, i, (function() {
                            a.p.subtract(P.ONE).gcda(o, (function(t) {
                                0 == t.compareTo(P.ONE) && a.p.isProbablePrime(10) ? setTimeout(u, 0) : setTimeout(e, 0)
                            }
                            ))
                        }
                        ))
                    };
                    setTimeout(l, 0)
                };
                setTimeout(s, 0)
            }
            ,
            t.prototype.sign = function(t, e, n) {
                var i = function(t, e) {
                    if (e < t.length + 22)
                        return console.error("Message too long for RSA"),
                        null;
                    for (var n = e - t.length - 6, i = "", r = 0; r < n; r += 2)
                        i += "ff";
                    return M("0001" + i + "00" + t, 16)
                }((it[n] || "") + e(t).toString(), this.n.bitLength() / 4);
                if (null == i)
                    return null;
                var r = this.doPrivate(i);
                if (null == r)
                    return null;
                var o = r.toString(16);
                return 0 == (1 & o.length) ? o : "0" + o
            }
            ,
            t.prototype.verify = function(t, e, n) {
                var i = M(e, 16)
                  , r = this.doPublic(i);
                return null == r ? null : function(t) {
                    for (var e in it)
                        if (it.hasOwnProperty(e)) {
                            var n = it[e]
                              , i = n.length;
                            if (t.substr(0, i) == n)
                                return t.substr(i)
                        }
                    return t
                }(r.toString(16).replace(/^1f+00/, "")) == n(t).toString()
            }
            ,
            t
        }()
          , it = {
            md2: "3020300c06082a864886f70d020205000410",
            md5: "3020300c06082a864886f70d020505000410",
            sha1: "3021300906052b0e03021a05000414",
            sha224: "302d300d06096086480165030402040500041c",
            sha256: "3031300d060960864801650304020105000420",
            sha384: "3041300d060960864801650304020205000430",
            sha512: "3051300d060960864801650304020305000440",
            ripemd160: "3021300906052b2403020105000414"
        }
          , rt = {};
        rt.lang = {
            extend: function(t, e, n) {
                if (!e || !t)
                    throw new Error("YAHOO.lang.extend failed, please check that all dependencies are included.");
                var i = function() {};
                if (i.prototype = e.prototype,
                t.prototype = new i,
                t.prototype.constructor = t,
                t.superclass = e.prototype,
                e.prototype.constructor == Object.prototype.constructor && (e.prototype.constructor = e),
                n) {
                    var r;
                    for (r in n)
                        t.prototype[r] = n[r];
                    var o = function() {}
                      , a = ["toString", "valueOf"];
                    try {
                        /MSIE/.test(navigator.userAgent) && (o = function(t, e) {
                            for (r = 0; r < a.length; r += 1) {
                                var n = a[r]
                                  , i = e[n];
                                "function" == typeof i && i != Object.prototype[n] && (t[n] = i)
                            }
                        }
                        )
                    } catch (t) {}
                    o(t.prototype, n)
                }
            }
        };
        var ot = {};
        void 0 !== ot.asn1 && ot.asn1 || (ot.asn1 = {}),
        ot.asn1.ASN1Util = new function() {
            this.integerToByteHex = function(t) {
                var e = t.toString(16);
                return e.length % 2 == 1 && (e = "0" + e),
                e
            }
            ,
            this.bigIntToMinTwosComplementsHex = function(t) {
                var e = t.toString(16);
                if ("-" != e.substr(0, 1))
                    e.length % 2 == 1 ? e = "0" + e : e.match(/^[0-7]/) || (e = "00" + e);
                else {
                    var n = e.substr(1).length;
                    n % 2 == 1 ? n += 1 : e.match(/^[0-7]/) || (n += 2);
                    for (var i = "", r = 0; r < n; r++)
                        i += "f";
                    e = new P(i,16).xor(t).add(P.ONE).toString(16).replace(/^-/, "")
                }
                return e
            }
            ,
            this.getPEMStringFromHex = function(t, e) {
                return hextopem(t, e)
            }
            ,
            this.newObject = function(t) {
                var e = ot.asn1
                  , n = e.DERBoolean
                  , i = e.DERInteger
                  , r = e.DERBitString
                  , o = e.DEROctetString
                  , a = e.DERNull
                  , s = e.DERObjectIdentifier
                  , u = e.DEREnumerated
                  , l = e.DERUTF8String
                  , c = e.DERNumericString
                  , d = e.DERPrintableString
                  , p = e.DERTeletexString
                  , h = e.DERIA5String
                  , f = e.DERUTCTime
                  , g = e.DERGeneralizedTime
                  , m = e.DERSequence
                  , v = e.DERSet
                  , y = e.DERTaggedObject
                  , b = e.ASN1Util.newObject
                  , _ = Object.keys(t);
                if (1 != _.length)
                    throw "key of param shall be only one.";
                var w = _[0];
                if (-1 == ":bool:int:bitstr:octstr:null:oid:enum:utf8str:numstr:prnstr:telstr:ia5str:utctime:gentime:seq:set:tag:".indexOf(":" + w + ":"))
                    throw "undefined key: " + w;
                if ("bool" == w)
                    return new n(t[w]);
                if ("int" == w)
                    return new i(t[w]);
                if ("bitstr" == w)
                    return new r(t[w]);
                if ("octstr" == w)
                    return new o(t[w]);
                if ("null" == w)
                    return new a(t[w]);
                if ("oid" == w)
                    return new s(t[w]);
                if ("enum" == w)
                    return new u(t[w]);
                if ("utf8str" == w)
                    return new l(t[w]);
                if ("numstr" == w)
                    return new c(t[w]);
                if ("prnstr" == w)
                    return new d(t[w]);
                if ("telstr" == w)
                    return new p(t[w]);
                if ("ia5str" == w)
                    return new h(t[w]);
                if ("utctime" == w)
                    return new f(t[w]);
                if ("gentime" == w)
                    return new g(t[w]);
                if ("seq" == w) {
                    for (var S = t[w], A = [], E = 0; E < S.length; E++) {
                        var T = b(S[E]);
                        A.push(T)
                    }
                    return new m({
                        array: A
                    })
                }
                if ("set" == w) {
                    for (S = t[w],
                    A = [],
                    E = 0; E < S.length; E++)
                        T = b(S[E]),
                        A.push(T);
                    return new v({
                        array: A
                    })
                }
                if ("tag" == w) {
                    var I = t[w];
                    if ("[object Array]" === Object.prototype.toString.call(I) && 3 == I.length) {
                        var C = b(I[2]);
                        return new y({
                            tag: I[0],
                            explicit: I[1],
                            obj: C
                        })
                    }
                    var O = {};
                    if (void 0 !== I.explicit && (O.explicit = I.explicit),
                    void 0 !== I.tag && (O.tag = I.tag),
                    void 0 === I.obj)
                        throw "obj shall be specified for 'tag'.";
                    return O.obj = b(I.obj),
                    new y(O)
                }
            }
            ,
            this.jsonToASN1HEX = function(t) {
                return this.newObject(t).getEncodedHex()
            }
        }
        ,
        ot.asn1.ASN1Util.oidHexToInt = function(t) {
            for (var e = "", n = parseInt(t.substr(0, 2), 16), i = (e = Math.floor(n / 40) + "." + n % 40,
            ""), r = 2; r < t.length; r += 2) {
                var o = ("00000000" + parseInt(t.substr(r, 2), 16).toString(2)).slice(-8);
                i += o.substr(1, 7),
                "0" == o.substr(0, 1) && (e = e + "." + new P(i,2).toString(10),
                i = "")
            }
            return e
        }
        ,
        ot.asn1.ASN1Util.oidIntToHex = function(t) {
            var e = function(t) {
                var e = t.toString(16);
                return 1 == e.length && (e = "0" + e),
                e
            }
              , n = function(t) {
                var n = ""
                  , i = new P(t,10).toString(2)
                  , r = 7 - i.length % 7;
                7 == r && (r = 0);
                for (var o = "", a = 0; a < r; a++)
                    o += "0";
                for (i = o + i,
                a = 0; a < i.length - 1; a += 7) {
                    var s = i.substr(a, 7);
                    a != i.length - 7 && (s = "1" + s),
                    n += e(parseInt(s, 2))
                }
                return n
            };
            if (!t.match(/^[0-9.]+$/))
                throw "malformed oid string: " + t;
            var i = ""
              , r = t.split(".")
              , o = 40 * parseInt(r[0]) + parseInt(r[1]);
            i += e(o),
            r.splice(0, 2);
            for (var a = 0; a < r.length; a++)
                i += n(r[a]);
            return i
        }
        ,
        ot.asn1.ASN1Object = function() {
            this.getLengthHexFromValue = function() {
                if (void 0 === this.hV || null == this.hV)
                    throw "this.hV is null or undefined.";
                if (this.hV.length % 2 == 1)
                    throw "value hex must be even length: n=" + "".length + ",v=" + this.hV;
                var t = this.hV.length / 2
                  , e = t.toString(16);
                if (e.length % 2 == 1 && (e = "0" + e),
                t < 128)
                    return e;
                var n = e.length / 2;
                if (n > 15)
                    throw "ASN.1 length too long to represent by 8x: n = " + t.toString(16);
                return (128 + n).toString(16) + e
            }
            ,
            this.getEncodedHex = function() {
                return (null == this.hTLV || this.isModified) && (this.hV = this.getFreshValueHex(),
                this.hL = this.getLengthHexFromValue(),
                this.hTLV = this.hT + this.hL + this.hV,
                this.isModified = !1),
                this.hTLV
            }
            ,
            this.getValueHex = function() {
                return this.getEncodedHex(),
                this.hV
            }
            ,
            this.getFreshValueHex = function() {
                return ""
            }
        }
        ,
        ot.asn1.DERAbstractString = function(t) {
            ot.asn1.DERAbstractString.superclass.constructor.call(this),
            this.getString = function() {
                return this.s
            }
            ,
            this.setString = function(t) {
                this.hTLV = null,
                this.isModified = !0,
                this.s = t,
                this.hV = stohex(this.s)
            }
            ,
            this.setStringHex = function(t) {
                this.hTLV = null,
                this.isModified = !0,
                this.s = null,
                this.hV = t
            }
            ,
            this.getFreshValueHex = function() {
                return this.hV
            }
            ,
            void 0 !== t && ("string" == typeof t ? this.setString(t) : void 0 !== t.str ? this.setString(t.str) : void 0 !== t.hex && this.setStringHex(t.hex))
        }
        ,
        rt.lang.extend(ot.asn1.DERAbstractString, ot.asn1.ASN1Object),
        ot.asn1.DERAbstractTime = function(t) {
            ot.asn1.DERAbstractTime.superclass.constructor.call(this),
            this.localDateToUTC = function(t) {
                return utc = t.getTime() + 6e4 * t.getTimezoneOffset(),
                new Date(utc)
            }
            ,
            this.formatDate = function(t, e, n) {
                var i = this.zeroPadding
                  , r = this.localDateToUTC(t)
                  , o = String(r.getFullYear());
                "utc" == e && (o = o.substr(2, 2));
                var a = o + i(String(r.getMonth() + 1), 2) + i(String(r.getDate()), 2) + i(String(r.getHours()), 2) + i(String(r.getMinutes()), 2) + i(String(r.getSeconds()), 2);
                if (!0 === n) {
                    var s = r.getMilliseconds();
                    if (0 != s) {
                        var u = i(String(s), 3);
                        a = a + "." + (u = u.replace(/[0]+$/, ""))
                    }
                }
                return a + "Z"
            }
            ,
            this.zeroPadding = function(t, e) {
                return t.length >= e ? t : new Array(e - t.length + 1).join("0") + t
            }
            ,
            this.getString = function() {
                return this.s
            }
            ,
            this.setString = function(t) {
                this.hTLV = null,
                this.isModified = !0,
                this.s = t,
                this.hV = stohex(t)
            }
            ,
            this.setByDateValue = function(t, e, n, i, r, o) {
                var a = new Date(Date.UTC(t, e - 1, n, i, r, o, 0));
                this.setByDate(a)
            }
            ,
            this.getFreshValueHex = function() {
                return this.hV
            }
        }
        ,
        rt.lang.extend(ot.asn1.DERAbstractTime, ot.asn1.ASN1Object),
        ot.asn1.DERAbstractStructured = function(t) {
            ot.asn1.DERAbstractString.superclass.constructor.call(this),
            this.setByASN1ObjectArray = function(t) {
                this.hTLV = null,
                this.isModified = !0,
                this.asn1Array = t
            }
            ,
            this.appendASN1Object = function(t) {
                this.hTLV = null,
                this.isModified = !0,
                this.asn1Array.push(t)
            }
            ,
            this.asn1Array = new Array,
            void 0 !== t && void 0 !== t.array && (this.asn1Array = t.array)
        }
        ,
        rt.lang.extend(ot.asn1.DERAbstractStructured, ot.asn1.ASN1Object),
        ot.asn1.DERBoolean = function() {
            ot.asn1.DERBoolean.superclass.constructor.call(this),
            this.hT = "01",
            this.hTLV = "0101ff"
        }
        ,
        rt.lang.extend(ot.asn1.DERBoolean, ot.asn1.ASN1Object),
        ot.asn1.DERInteger = function(t) {
            ot.asn1.DERInteger.superclass.constructor.call(this),
            this.hT = "02",
            this.setByBigInteger = function(t) {
                this.hTLV = null,
                this.isModified = !0,
                this.hV = ot.asn1.ASN1Util.bigIntToMinTwosComplementsHex(t)
            }
            ,
            this.setByInteger = function(t) {
                var e = new P(String(t),10);
                this.setByBigInteger(e)
            }
            ,
            this.setValueHex = function(t) {
                this.hV = t
            }
            ,
            this.getFreshValueHex = function() {
                return this.hV
            }
            ,
            void 0 !== t && (void 0 !== t.bigint ? this.setByBigInteger(t.bigint) : void 0 !== t.int ? this.setByInteger(t.int) : "number" == typeof t ? this.setByInteger(t) : void 0 !== t.hex && this.setValueHex(t.hex))
        }
        ,
        rt.lang.extend(ot.asn1.DERInteger, ot.asn1.ASN1Object),
        ot.asn1.DERBitString = function(t) {
            if (void 0 !== t && void 0 !== t.obj) {
                var e = ot.asn1.ASN1Util.newObject(t.obj);
                t.hex = "00" + e.getEncodedHex()
            }
            ot.asn1.DERBitString.superclass.constructor.call(this),
            this.hT = "03",
            this.setHexValueIncludingUnusedBits = function(t) {
                this.hTLV = null,
                this.isModified = !0,
                this.hV = t
            }
            ,
            this.setUnusedBitsAndHexValue = function(t, e) {
                if (t < 0 || 7 < t)
                    throw "unused bits shall be from 0 to 7: u = " + t;
                var n = "0" + t;
                this.hTLV = null,
                this.isModified = !0,
                this.hV = n + e
            }
            ,
            this.setByBinaryString = function(t) {
                var e = 8 - (t = t.replace(/0+$/, "")).length % 8;
                8 == e && (e = 0);
                for (var n = 0; n <= e; n++)
                    t += "0";
                var i = "";
                for (n = 0; n < t.length - 1; n += 8) {
                    var r = t.substr(n, 8)
                      , o = parseInt(r, 2).toString(16);
                    1 == o.length && (o = "0" + o),
                    i += o
                }
                this.hTLV = null,
                this.isModified = !0,
                this.hV = "0" + e + i
            }
            ,
            this.setByBooleanArray = function(t) {
                for (var e = "", n = 0; n < t.length; n++)
                    1 == t[n] ? e += "1" : e += "0";
                this.setByBinaryString(e)
            }
            ,
            this.newFalseArray = function(t) {
                for (var e = new Array(t), n = 0; n < t; n++)
                    e[n] = !1;
                return e
            }
            ,
            this.getFreshValueHex = function() {
                return this.hV
            }
            ,
            void 0 !== t && ("string" == typeof t && t.toLowerCase().match(/^[0-9a-f]+$/) ? this.setHexValueIncludingUnusedBits(t) : void 0 !== t.hex ? this.setHexValueIncludingUnusedBits(t.hex) : void 0 !== t.bin ? this.setByBinaryString(t.bin) : void 0 !== t.array && this.setByBooleanArray(t.array))
        }
        ,
        rt.lang.extend(ot.asn1.DERBitString, ot.asn1.ASN1Object),
        ot.asn1.DEROctetString = function(t) {
            if (void 0 !== t && void 0 !== t.obj) {
                var e = ot.asn1.ASN1Util.newObject(t.obj);
                t.hex = e.getEncodedHex()
            }
            ot.asn1.DEROctetString.superclass.constructor.call(this, t),
            this.hT = "04"
        }
        ,
        rt.lang.extend(ot.asn1.DEROctetString, ot.asn1.DERAbstractString),
        ot.asn1.DERNull = function() {
            ot.asn1.DERNull.superclass.constructor.call(this),
            this.hT = "05",
            this.hTLV = "0500"
        }
        ,
        rt.lang.extend(ot.asn1.DERNull, ot.asn1.ASN1Object),
        ot.asn1.DERObjectIdentifier = function(t) {
            var e = function(t) {
                var e = t.toString(16);
                return 1 == e.length && (e = "0" + e),
                e
            }
              , n = function(t) {
                var n = ""
                  , i = new P(t,10).toString(2)
                  , r = 7 - i.length % 7;
                7 == r && (r = 0);
                for (var o = "", a = 0; a < r; a++)
                    o += "0";
                for (i = o + i,
                a = 0; a < i.length - 1; a += 7) {
                    var s = i.substr(a, 7);
                    a != i.length - 7 && (s = "1" + s),
                    n += e(parseInt(s, 2))
                }
                return n
            };
            ot.asn1.DERObjectIdentifier.superclass.constructor.call(this),
            this.hT = "06",
            this.setValueHex = function(t) {
                this.hTLV = null,
                this.isModified = !0,
                this.s = null,
                this.hV = t
            }
            ,
            this.setValueOidString = function(t) {
                if (!t.match(/^[0-9.]+$/))
                    throw "malformed oid string: " + t;
                var i = ""
                  , r = t.split(".")
                  , o = 40 * parseInt(r[0]) + parseInt(r[1]);
                i += e(o),
                r.splice(0, 2);
                for (var a = 0; a < r.length; a++)
                    i += n(r[a]);
                this.hTLV = null,
                this.isModified = !0,
                this.s = null,
                this.hV = i
            }
            ,
            this.setValueName = function(t) {
                var e = ot.asn1.x509.OID.name2oid(t);
                if ("" === e)
                    throw "DERObjectIdentifier oidName undefined: " + t;
                this.setValueOidString(e)
            }
            ,
            this.getFreshValueHex = function() {
                return this.hV
            }
            ,
            void 0 !== t && ("string" == typeof t ? t.match(/^[0-2].[0-9.]+$/) ? this.setValueOidString(t) : this.setValueName(t) : void 0 !== t.oid ? this.setValueOidString(t.oid) : void 0 !== t.hex ? this.setValueHex(t.hex) : void 0 !== t.name && this.setValueName(t.name))
        }
        ,
        rt.lang.extend(ot.asn1.DERObjectIdentifier, ot.asn1.ASN1Object),
        ot.asn1.DEREnumerated = function(t) {
            ot.asn1.DEREnumerated.superclass.constructor.call(this),
            this.hT = "0a",
            this.setByBigInteger = function(t) {
                this.hTLV = null,
                this.isModified = !0,
                this.hV = ot.asn1.ASN1Util.bigIntToMinTwosComplementsHex(t)
            }
            ,
            this.setByInteger = function(t) {
                var e = new P(String(t),10);
                this.setByBigInteger(e)
            }
            ,
            this.setValueHex = function(t) {
                this.hV = t
            }
            ,
            this.getFreshValueHex = function() {
                return this.hV
            }
            ,
            void 0 !== t && (void 0 !== t.int ? this.setByInteger(t.int) : "number" == typeof t ? this.setByInteger(t) : void 0 !== t.hex && this.setValueHex(t.hex))
        }
        ,
        rt.lang.extend(ot.asn1.DEREnumerated, ot.asn1.ASN1Object),
        ot.asn1.DERUTF8String = function(t) {
            ot.asn1.DERUTF8String.superclass.constructor.call(this, t),
            this.hT = "0c"
        }
        ,
        rt.lang.extend(ot.asn1.DERUTF8String, ot.asn1.DERAbstractString),
        ot.asn1.DERNumericString = function(t) {
            ot.asn1.DERNumericString.superclass.constructor.call(this, t),
            this.hT = "12"
        }
        ,
        rt.lang.extend(ot.asn1.DERNumericString, ot.asn1.DERAbstractString),
        ot.asn1.DERPrintableString = function(t) {
            ot.asn1.DERPrintableString.superclass.constructor.call(this, t),
            this.hT = "13"
        }
        ,
        rt.lang.extend(ot.asn1.DERPrintableString, ot.asn1.DERAbstractString),
        ot.asn1.DERTeletexString = function(t) {
            ot.asn1.DERTeletexString.superclass.constructor.call(this, t),
            this.hT = "14"
        }
        ,
        rt.lang.extend(ot.asn1.DERTeletexString, ot.asn1.DERAbstractString),
        ot.asn1.DERIA5String = function(t) {
            ot.asn1.DERIA5String.superclass.constructor.call(this, t),
            this.hT = "16"
        }
        ,
        rt.lang.extend(ot.asn1.DERIA5String, ot.asn1.DERAbstractString),
        ot.asn1.DERUTCTime = function(t) {
            ot.asn1.DERUTCTime.superclass.constructor.call(this, t),
            this.hT = "17",
            this.setByDate = function(t) {
                this.hTLV = null,
                this.isModified = !0,
                this.date = t,
                this.s = this.formatDate(this.date, "utc"),
                this.hV = stohex(this.s)
            }
            ,
            this.getFreshValueHex = function() {
                return void 0 === this.date && void 0 === this.s && (this.date = new Date,
                this.s = this.formatDate(this.date, "utc"),
                this.hV = stohex(this.s)),
                this.hV
            }
            ,
            void 0 !== t && (void 0 !== t.str ? this.setString(t.str) : "string" == typeof t && t.match(/^[0-9]{12}Z$/) ? this.setString(t) : void 0 !== t.hex ? this.setStringHex(t.hex) : void 0 !== t.date && this.setByDate(t.date))
        }
        ,
        rt.lang.extend(ot.asn1.DERUTCTime, ot.asn1.DERAbstractTime),
        ot.asn1.DERGeneralizedTime = function(t) {
            ot.asn1.DERGeneralizedTime.superclass.constructor.call(this, t),
            this.hT = "18",
            this.withMillis = !1,
            this.setByDate = function(t) {
                this.hTLV = null,
                this.isModified = !0,
                this.date = t,
                this.s = this.formatDate(this.date, "gen", this.withMillis),
                this.hV = stohex(this.s)
            }
            ,
            this.getFreshValueHex = function() {
                return void 0 === this.date && void 0 === this.s && (this.date = new Date,
                this.s = this.formatDate(this.date, "gen", this.withMillis),
                this.hV = stohex(this.s)),
                this.hV
            }
            ,
            void 0 !== t && (void 0 !== t.str ? this.setString(t.str) : "string" == typeof t && t.match(/^[0-9]{14}Z$/) ? this.setString(t) : void 0 !== t.hex ? this.setStringHex(t.hex) : void 0 !== t.date && this.setByDate(t.date),
            !0 === t.millis && (this.withMillis = !0))
        }
        ,
        rt.lang.extend(ot.asn1.DERGeneralizedTime, ot.asn1.DERAbstractTime),
        ot.asn1.DERSequence = function(t) {
            ot.asn1.DERSequence.superclass.constructor.call(this, t),
            this.hT = "30",
            this.getFreshValueHex = function() {
                for (var t = "", e = 0; e < this.asn1Array.length; e++)
                    t += this.asn1Array[e].getEncodedHex();
                return this.hV = t,
                this.hV
            }
        }
        ,
        rt.lang.extend(ot.asn1.DERSequence, ot.asn1.DERAbstractStructured),
        ot.asn1.DERSet = function(t) {
            ot.asn1.DERSet.superclass.constructor.call(this, t),
            this.hT = "31",
            this.sortFlag = !0,
            this.getFreshValueHex = function() {
                for (var t = new Array, e = 0; e < this.asn1Array.length; e++) {
                    var n = this.asn1Array[e];
                    t.push(n.getEncodedHex())
                }
                return 1 == this.sortFlag && t.sort(),
                this.hV = t.join(""),
                this.hV
            }
            ,
            void 0 !== t && void 0 !== t.sortflag && 0 == t.sortflag && (this.sortFlag = !1)
        }
        ,
        rt.lang.extend(ot.asn1.DERSet, ot.asn1.DERAbstractStructured),
        ot.asn1.DERTaggedObject = function(t) {
            ot.asn1.DERTaggedObject.superclass.constructor.call(this),
            this.hT = "a0",
            this.hV = "",
            this.isExplicit = !0,
            this.asn1Object = null,
            this.setASN1Object = function(t, e, n) {
                this.hT = e,
                this.isExplicit = t,
                this.asn1Object = n,
                this.isExplicit ? (this.hV = this.asn1Object.getEncodedHex(),
                this.hTLV = null,
                this.isModified = !0) : (this.hV = null,
                this.hTLV = n.getEncodedHex(),
                this.hTLV = this.hTLV.replace(/^../, e),
                this.isModified = !1)
            }
            ,
            this.getFreshValueHex = function() {
                return this.hV
            }
            ,
            void 0 !== t && (void 0 !== t.tag && (this.hT = t.tag),
            void 0 !== t.explicit && (this.isExplicit = t.explicit),
            void 0 !== t.obj && (this.asn1Object = t.obj,
            this.setASN1Object(this.isExplicit, this.hT, this.asn1Object)))
        }
        ,
        rt.lang.extend(ot.asn1.DERTaggedObject, ot.asn1.ASN1Object);
        var at, st = this && this.__extends || (at = function(t, e) {
            return at = Object.setPrototypeOf || {
                __proto__: []
            }instanceof Array && function(t, e) {
                t.__proto__ = e
            }
            || function(t, e) {
                for (var n in e)
                    Object.prototype.hasOwnProperty.call(e, n) && (t[n] = e[n])
            }
            ,
            at(t, e)
        }
        ,
        function(t, e) {
            if ("function" != typeof e && null !== e)
                throw new TypeError("Class extends value " + String(e) + " is not a constructor or null");
            function n() {
                this.constructor = t
            }
            at(t, e),
            t.prototype = null === e ? Object.create(e) : (n.prototype = e.prototype,
            new n)
        }
        ), ut = function(t) {
            function e(n) {
                var i = t.call(this) || this;
                return n && ("string" == typeof n ? i.parseKey(n) : (e.hasPrivateKeyProperty(n) || e.hasPublicKeyProperty(n)) && i.parsePropertiesFrom(n)),
                i
            }
            return st(e, t),
            e.prototype.parseKey = function(t) {
                try {
                    var e = 0
                      , n = 0
                      , i = /^\s*(?:[0-9A-Fa-f][0-9A-Fa-f]\s*)+$/.test(t) ? v(t) : y.unarmor(t)
                      , r = I.decode(i);
                    if (3 === r.sub.length && (r = r.sub[2].sub[0]),
                    9 === r.sub.length) {
                        e = r.sub[1].getHexStringValue(),
                        this.n = M(e, 16),
                        n = r.sub[2].getHexStringValue(),
                        this.e = parseInt(n, 16);
                        var o = r.sub[3].getHexStringValue();
                        this.d = M(o, 16);
                        var a = r.sub[4].getHexStringValue();
                        this.p = M(a, 16);
                        var s = r.sub[5].getHexStringValue();
                        this.q = M(s, 16);
                        var u = r.sub[6].getHexStringValue();
                        this.dmp1 = M(u, 16);
                        var l = r.sub[7].getHexStringValue();
                        this.dmq1 = M(l, 16);
                        var c = r.sub[8].getHexStringValue();
                        this.coeff = M(c, 16)
                    } else {
                        if (2 !== r.sub.length)
                            return !1;
                        var d = r.sub[1].sub[0];
                        e = d.sub[0].getHexStringValue(),
                        this.n = M(e, 16),
                        n = d.sub[1].getHexStringValue(),
                        this.e = parseInt(n, 16)
                    }
                    return !0
                } catch (t) {
                    return !1
                }
            }
            ,
            e.prototype.getPrivateBaseKey = function() {
                var t = {
                    array: [new ot.asn1.DERInteger({
                        int: 0
                    }), new ot.asn1.DERInteger({
                        bigint: this.n
                    }), new ot.asn1.DERInteger({
                        int: this.e
                    }), new ot.asn1.DERInteger({
                        bigint: this.d
                    }), new ot.asn1.DERInteger({
                        bigint: this.p
                    }), new ot.asn1.DERInteger({
                        bigint: this.q
                    }), new ot.asn1.DERInteger({
                        bigint: this.dmp1
                    }), new ot.asn1.DERInteger({
                        bigint: this.dmq1
                    }), new ot.asn1.DERInteger({
                        bigint: this.coeff
                    })]
                };
                return new ot.asn1.DERSequence(t).getEncodedHex()
            }
            ,
            e.prototype.getPrivateBaseKeyB64 = function() {
                return f(this.getPrivateBaseKey())
            }
            ,
            e.prototype.getPublicBaseKey = function() {
                var t = new ot.asn1.DERSequence({
                    array: [new ot.asn1.DERObjectIdentifier({
                        oid: "1.2.840.113549.1.1.1"
                    }), new ot.asn1.DERNull]
                })
                  , e = new ot.asn1.DERSequence({
                    array: [new ot.asn1.DERInteger({
                        bigint: this.n
                    }), new ot.asn1.DERInteger({
                        int: this.e
                    })]
                })
                  , n = new ot.asn1.DERBitString({
                    hex: "00" + e.getEncodedHex()
                });
                return new ot.asn1.DERSequence({
                    array: [t, n]
                }).getEncodedHex()
            }
            ,
            e.prototype.getPublicBaseKeyB64 = function() {
                return f(this.getPublicBaseKey())
            }
            ,
            e.wordwrap = function(t, e) {
                if (!t)
                    return t;
                var n = "(.{1," + (e = e || 64) + "})( +|$\n?)|(.{1," + e + "})";
                return t.match(RegExp(n, "g")).join("\n")
            }
            ,
            e.prototype.getPrivateKey = function() {
                var t = "-----BEGIN RSA PRIVATE KEY-----\n";
                return (t += e.wordwrap(this.getPrivateBaseKeyB64()) + "\n") + "-----END RSA PRIVATE KEY-----"
            }
            ,
            e.prototype.getPublicKey = function() {
                var t = "-----BEGIN PUBLIC KEY-----\n";
                return (t += e.wordwrap(this.getPublicBaseKeyB64()) + "\n") + "-----END PUBLIC KEY-----"
            }
            ,
            e.hasPublicKeyProperty = function(t) {
                return (t = t || {}).hasOwnProperty("n") && t.hasOwnProperty("e")
            }
            ,
            e.hasPrivateKeyProperty = function(t) {
                return (t = t || {}).hasOwnProperty("n") && t.hasOwnProperty("e") && t.hasOwnProperty("d") && t.hasOwnProperty("p") && t.hasOwnProperty("q") && t.hasOwnProperty("dmp1") && t.hasOwnProperty("dmq1") && t.hasOwnProperty("coeff")
            }
            ,
            e.prototype.parsePropertiesFrom = function(t) {
                this.n = t.n,
                this.e = t.e,
                t.hasOwnProperty("d") && (this.d = t.d,
                this.p = t.p,
                this.q = t.q,
                this.dmp1 = t.dmp1,
                this.dmq1 = t.dmq1,
                this.coeff = t.coeff)
            }
            ,
            e
        }(nt), lt = function() {
            function t(t) {
                void 0 === t && (t = {}),
                t = t || {},
                this.default_key_size = t.default_key_size ? parseInt(t.default_key_size, 10) : 1024,
                this.default_public_exponent = t.default_public_exponent || "010001",
                this.log = t.log || !1,
                this.key = null
            }
            return t.prototype.setKey = function(t) {
                this.log && this.key && console.warn("A key was already set, overriding existing."),
                this.key = new ut(t)
            }
            ,
            t.prototype.setPrivateKey = function(t) {
                this.setKey(t)
            }
            ,
            t.prototype.setPublicKey = function(t) {
                this.setKey(t)
            }
            ,
            t.prototype.decrypt = function(t) {
                try {
                    return this.getKey().decrypt(g(t))
                } catch (t) {
                    return !1
                }
            }
            ,
            t.prototype.encrypt = function(t) {
                try {
                    return f(this.getKey().encrypt(t))
                } catch (t) {
                    return !1
                }
            }
            ,
            t.prototype.sign = function(t, e, n) {
                try {
                    return f(this.getKey().sign(t, e, n))
                } catch (t) {
                    return !1
                }
            }
            ,
            t.prototype.verify = function(t, e, n) {
                try {
                    return this.getKey().verify(t, g(e), n)
                } catch (t) {
                    return !1
                }
            }
            ,
            t.prototype.getKey = function(t) {
                if (!this.key) {
                    if (this.key = new ut,
                    t && "[object Function]" === {}.toString.call(t))
                        return void this.key.generateAsync(this.default_key_size, this.default_public_exponent, t);
                    this.key.generate(this.default_key_size, this.default_public_exponent)
                }
                return this.key
            }
            ,
            t.prototype.getPrivateKey = function() {
                return this.getKey().getPrivateKey()
            }
            ,
            t.prototype.getPrivateKeyB64 = function() {
                return this.getKey().getPrivateBaseKeyB64()
            }
            ,
            t.prototype.getPublicKey = function() {
                return this.getKey().getPublicKey()
            }
            ,
            t.prototype.getPublicKeyB64 = function() {
                return this.getKey().getPublicBaseKeyB64()
            }
            ,
            t.version = "3.2.1",
            t
        }(), ct = function(t, e) {
            return "string" != typeof t && (t = JSON.stringify(t)),
            i.encrypt(t, e)
        }, dt = function(t, e) {
            var n = new lt;
            return n.setPublicKey(e),
            n.encrypt(t)
        }, pt = function(t) {
            t = t || 16;
            for (var e = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789", n = e.length, i = "", r = 0; r < t; r++)
                i += e.charAt(Math.floor(Math.random() * n));
            return i
        }();
        t.default = function(t) {
            var e = arguments.length > 1 && void 0 !== arguments[1] ? arguments[1] : {};
            "string" != typeof t && (t = JSON.stringify(t)),
            console.log("myOption", e);
            var n = e.publicKey || "MIGfMA0GCSqGSIb3DQEBAQUAA4GNADCBiQKBgQDCjYYIy9Are9QPRDOVug4e6Fdz8HK2HGyajKR4N8Wb/bB9gwXnieXqj4Mya0nLd6nBcBPN6qUJ0R7p5Cv6aPqQsc7pWfAxPr41GvcOlGixLtpLHLUH9m0093YEBhu4F7pKu0TZTQIPZINWUa1SLjQD/bcBlcaQyWbk6qJhSJFYkwIDAQAB"
              , i = dt(pt, n);
            return {
                k: i,
                v: e.v || 1,
                d: ct(t, pt),
                i: i
            }
        }
        ,
        t.unAdat = function(t, e) {
            var n = "";
            try {
                n = i.decrypt(t, e || pt)
            } catch (t) {
                console.log("unAdat error", t)
            }
            return n
        }
        ,
        Object.defineProperty(t, "__esModule", {
            value: !0
        })
        //console.log(t.default("cccc"))
        //return t;
    }(e)


   // console.log();

function encodeValue(value){
   return e.default(value)
}
    
module.exports = {
    encodeValue
}