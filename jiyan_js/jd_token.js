var document={location:{protocol:"https",href:""}};
var navigator={userAgent:""};
var window={};
var _riskFpMode = _riskFpMode || "strict";
"fast" != _riskFpMode && (_riskFpMode = "strict");
"function" != typeof String.prototype.startsWith && (String.prototype.startsWith = function (g) {
    return this.slice(0, g.length) === g
}
);
"function" != typeof String.prototype.endsWith && (String.prototype.endsWith = function (g) {
    return -1 !== this.indexOf(g, this.length - g.length)
}
);
var jdtRiskContext = jdtRiskContext || {
    d: !1,
    canvas_fp_md5: "",
    isRpTok: !1,
    isSdkTokenFinished: !1,
    isJsTokenFinished: !1,
    isSupportApp: !1,
    version: "3.2.1.0",
    deviceInfo: {
        jsToken: "",
        eid: "",
        sdkToken: "",
        clientVersion: "",
        fp: ""
    },
    isReady: function () {
        return this.isJsTokenFinished && this.isSdkTokenFinished
    }
};
_globalState = {
    uuid: null,
    reportCnt: 0,
    loadTime: (new Date).getTime(),
    callTime: null,
    callMethod: "",
    responseTime: null,
    bizTimeout: null,
    step: "init",
    errTrace: [],
    reportTime: null,
    xhr: {
        startTime: null,
        responseTime: null,
        status: -1,
        statusText: "",
        respText: ""
    }
};

var collectConfig = collectConfig || {
    fp: {
        language: "language",
        userAgent: "userAgent",
        colorDepth: "colorDepth",
        screenResolution: "screenResolution",
        timezoneOffset: "timezoneOffset",
        sessionStorage: "sessionStorage",
        localStorage: "localStorage",
        indexedDb: "indexedDb",
        addBehavior: "addBehavior",
        openDatabase: "openDatabase",
        cpuClass: "cpuClass",
        platform: "platform",
        hardwareConcurrency: "hardwareConcurrency",
        doNotTrack: "doNotTrack",
        plugins: "plugins",
        canvas: "canvas",
        webgl: "webgl"
    },
    env: {
        color: "color",
        canvas: "canvas",
        browserMode: "browserMode",
        fonts: "fonts",
        feature: "feature",
        plugins: "plugins",
        screen: "screen",
        position: "position",
        storeCheck: "storeCheck"
    },
    store: {
        sdkTokenKey: "BATQW722QTLYVCRD",
        giaDKey: "_gia_d",
        canvasFpKey: "CA1AN5BV0CA8DS2E3F",
        ldeKey: "GIA_LDE_MAP_KEY",
        strict: {
            jsTokenKey: "3AB9D23F7A4B3CSS",
            fpKey: "FFA9D23F7A4B3CSS",
            fpTsKey: "TSA9D23F7A4B3CSS",
            eidKey: "3AB9D23F7A4B3C9B"
        },
        fast: {
            jsTokenKey: "3AB9D23F7A4B3CFF",
            fpKey: "FFA9D23F7A4B3CFF",
            fpTsKey: "TSA9D23F7A4B3CFF",
            eidKey: "3AB9D23F7A4B3CFF"
        }
    },
    getEnvExcludeOptions: function (g) {
        if ("strict" == g)
            return g = {},
                g[this.env.fonts] = !0,
                g;
        if ("fast" == g)
            return g = {},
                g[this.env.color] = !0,
                g[this.env.fonts] = !0,
                g
    },
    getFpExcludeOptions: function (g) {
        if ("strict" == g)
            return {};
        if ("fast" == g)
            return g = {},
                g[this.fp.webgl] = !0,
                g[this.fp.plugins] = !0,
                g[this.fp.userAgent] = !0,
                g[this.fp.doNotTrack] = !0,
                g
    }
}
    , jdtRiskUtil = function (g) {
        
        var l = "https:" == document.location.protocol ? "https://" : "http://"
            , k = window.__fp_domain || "jra.jd.com"
            , f = ""
            , h = ""
            , d = "";
        (function () {
            var a = document.location.href.toString();
            try {
                var b = /^https?:\/\/(?:\w+\.)*?(\w*\.(?:com\.cn|cn|com|net|id))[\\\/]*/.exec(a);
                h = b && 1 < b.length ? b[1] : document.domain.split(".").slice(-2).join(".");
                var e = a.indexOf("?");
                0 < e && (f = a.substring(e + 1),
                    500 < f.length && (f = f.substring(0, 499)),
                    a = a.substring(0, e));
                d = a.substring(l.length)
            } catch (c) { }
        }
        )();
        g.getCurrentPageUrl = function () {
            return d
        }
            ;
        g.getCurrentPageProtocol = function () {
            return l
        }
            ;
        g.getCurrentRootDomain = function () {
            return h
        }
            ;
        g.getFpServerDomain = function () {
            return k
        }
            ;
        g.getUrlQueryStr = function () {
            return f
        }
            ;
        g.getBizId = function () {
            return "undefined" == typeof bp_bizid ? "" : bp_bizid
        }
            ;
        g.createWorker = function () {
            if (window.Worker && !g.worker) {
                try {
                    var a = new Blob(["onmessage = function (event) {\n    var data = JSON.parse(event.data);\n    try {\n        var httpRequest;\n        try {\n            httpRequest = new XMLHttpRequest();\n        } catch (h) {}\n        if (!httpRequest)\n            try {\n                httpRequest = new (window['ActiveXObject'])('Microsoft.XMLHTTP')\n            } catch (l) {}\n        if (!httpRequest)\n            try {\n                httpRequest = new (window['ActiveXObject'])('Msxml2.XMLHTTP')\n            } catch (r) {}\n        if (!httpRequest)\n            try {\n                httpRequest = new (window['ActiveXObject'])('Msxml3.XMLHTTP')\n            } catch (n) {}\n\n        if(data){\n            httpRequest['open']('POST', data.url, data.async);\n            httpRequest['withCredentials'] = true;\n            httpRequest['setRequestHeader']('Content-Type', data.isJson ? 'application/json;charset=UTF-8' : 'application/x-www-form-urlencoded;charset=UTF-8');\n            httpRequest['onreadystatechange'] = function () {\n                if (4 === httpRequest['readyState'] && 200 === httpRequest['status']) {\n                    postMessage(httpRequest.responseText);\n                }\n            };\n            httpRequest['send'](data.data);\n        }\n\n    }catch (e){console.error(e);}\n};"], {
                        type: "application/javascript"
                    })
                } catch (b) {
                    window.BlobBuilder = window.BlobBuilder || window.WebKitBlobBuilder || window.MozBlobBuilder,
                        a = new BlobBuilder,
                        a.append("onmessage = function (event) {\n    var data = JSON.parse(event.data);\n    try {\n        var httpRequest;\n        try {\n            httpRequest = new XMLHttpRequest();\n        } catch (h) {}\n        if (!httpRequest)\n            try {\n                httpRequest = new (window['ActiveXObject'])('Microsoft.XMLHTTP')\n            } catch (l) {}\n        if (!httpRequest)\n            try {\n                httpRequest = new (window['ActiveXObject'])('Msxml2.XMLHTTP')\n            } catch (r) {}\n        if (!httpRequest)\n            try {\n                httpRequest = new (window['ActiveXObject'])('Msxml3.XMLHTTP')\n            } catch (n) {}\n\n        if(data){\n            httpRequest['open']('POST', data.url, data.async);\n            httpRequest['withCredentials'] = true;\n            httpRequest['setRequestHeader']('Content-Type', data.isJson ? 'application/json;charset=UTF-8' : 'application/x-www-form-urlencoded;charset=UTF-8');\n            httpRequest['onreadystatechange'] = function () {\n                if (4 === httpRequest['readyState'] && 200 === httpRequest['status']) {\n                    postMessage(httpRequest.responseText);\n                }\n            };\n            httpRequest['send'](data.data);\n        }\n\n    }catch (e){console.error(e);}\n};"),
                        a = a.getBlob()
                }
                try {
                    g.worker = new Worker(URL.createObjectURL(a))
                } catch (b) { }
            }
        }
            ;
        g.reportWorker = function (a, b, e, c) {
            try {
                g.worker && (this.worker.postMessage(JSON.stringify({
                    url: a,
                    data: b,
                    async: void 0 === e ? !0 : e,
                    isJson: void 0 === c ? !1 : c
                })),
                    this.worker.onmessage = function (m) { }
                )
            } catch (m) { }
        }
            ;
        g.compareVersion = function (a, b) {
            try {
                if (a === b)
                    return 0;
                var e = a.split(".");
                var c = b.split(".");
                for (a = 0; a < e.length; a++) {
                    var m = parseInt(e[a]);
                    if (!c[a])
                        return 1;
                    var n = parseInt(c[a]);
                    if (m < n)
                        break;
                    if (m > n)
                        return 1
                }
            } catch (r) { }
            return -1
        }
            ;
        g.obtainPin = function (a) {
            var b = "";
            "string" === typeof jd_jr_td_risk_pin && 1 == a ? b = jd_jr_td_risk_pin : "string" === typeof pin ? b = pin : "object" === typeof pin && "string" === typeof jd_jr_td_risk_pin && (b = jd_jr_td_risk_pin);
            return b
        }
            ;
        g.sendRequest = function (a, b, e) {
            try {
                _globalState.xhr.startTime = (new Date).getTime();
                try {
                    var c = new window.XMLHttpRequest
                } catch (m) { }
                if (!c)
                    try {
                        c = new window.ActiveXObject("Microsoft.XMLHTTP")
                    } catch (m) { }
                if (!c)
                    try {
                        c = new window.ActiveXObject("Msxml2.XMLHTTP")
                    } catch (m) { }
                if (!c)
                    try {
                        c = new window.ActiveXObject("Msxml3.XMLHTTP")
                    } catch (m) { }
                c.open("POST", a, !0);
                c.timeout = 15E3;
                c.withCredentials = !0;
                c.setRequestHeader("Content-Type", "application/x-www-form-urlencoded;charset=UTF-8");
                c.onreadystatechange = function () {
                    _globalState.xhr.status = c.status;
                    4 === c.readyState && (_globalState.xhr.responseTime = (new Date).getTime(),
                        _globalState.xhr.respText = c.responseText,
                        200 === c.status && e && e(c.responseText))
                }
                    ;
                c.onerror = function () {
                    _globalState.xhr.status = c.status;
                    _globalState.xhr.statusText = "networkError_" + c.statusText
                }
                    ;
                c.ontimeout = function () {
                    _globalState.xhr.status = c.status;
                    _globalState.xhr.statusText = "timeout_" + c.statusText
                }
                    ;
                c.onabort = function () {
                    _globalState.xhr.status = c.status;
                    _globalState.xhr.statusText = "abort_" + c.statusText
                }
                    ;
                c.send(b)
            } catch (m) {
                _globalState.errTrace.push({
                    code: "sendRequest",
                    msg: m.message,
                    stack: m.stack
                }),
                    jdtRiskContext.d && console.error("sendRequest error : ", m)
            }
        }
            ;
        g.isDegrade = function () {
            var a = jdtRiskCookieManager.getCookie(collectConfig.store.giaDKey);
            if (a && 1 == a)
                return !0;
            a = jdtLocalStorageManager.get(collectConfig.store.ldeKey);
            if (!a)
                return !1;
            try {
                var b = JSON.parse(a)[jdtRiskUtil.getBizId()];
                return b ? b >= (new Date).getTime() : !1
            } catch (e) { }
            return !1
        }
            ;
        g.isValidSdkToken = function (a) {
            return a ? a.startsWith("jdd01") && a.endsWith("01234567") : !1
        }
            ;
        g.isValidJsToken = function (a) {
            return a ? a.startsWith("jdd03") && a.endsWith("X") : !1
        }
            ;
        g.cleanAndPushDeS = function (a, b) {
            try {
                if (a && b) {
                    var e = jdtLocalStorageManager.get(collectConfig.store.ldeKey)
                        , c = {};
                    e && (c = JSON.parse(e));
                    var m = (new Date).getTime(), n;
                    for (n in c)
                        c[n] < m && delete c[n];
                    c[a] = m + 1E3 * b;
                    jdtLocalStorageManager.set(collectConfig.store.ldeKey, JSON.stringify(c))
                }
            } catch (r) { }
        }
            ;
        g.randomStr = function (a) {
            var b = "";
            try {
                for (var e = 0; e < a; e++)
                    b += "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789abcdefghijklmnopqrstuvwxyz".charAt(Math.floor(62 * Math.random()))
            } catch (c) { }
            return b
        }
            ;
        return g
    }(jdtRiskUtil || {})
    , jdtRiskEncryptUtil = function (g) {
        g.MD5 = function () {
            function l(a, b, e, c, m, n) {
                a = d(d(b, a), d(c, n));
                return d(a << m | a >>> 32 - m, e)
            }
            function k(a, b, e, c, m, n, r) {
                return l(b & e | ~b & c, a, b, m, n, r)
            }
            function f(a, b, e, c, m, n, r) {
                return l(b & c | e & ~c, a, b, m, n, r)
            }
            function h(a, b, e, c, m, n, r) {
                return l(e ^ (b | ~c), a, b, m, n, r)
            }
            function d(a, b) {
                var e = (a & 65535) + (b & 65535);
                return (a >> 16) + (b >> 16) + (e >> 16) << 16 | e & 65535
            }
            return {
                hex_md5: function (a) {
                    if (null == a || void 0 == a || "" == a)
                        return "";
                    if (null == a || void 0 == a || "" == a)
                        var b = "";
                    else {
                        b = [];
                        for (var e = 0; e < 8 * a.length; e += 8)
                            b[e >> 5] |= (a.charCodeAt(e / 8) & 255) << e % 32
                    }
                    a = 8 * a.length;
                    b[a >> 5] |= 128 << a % 32;
                    b[(a + 64 >>> 9 << 4) + 14] = a;
                    a = 1732584193;
                    e = -271733879;
                    for (var c = -1732584194, m = 271733878, n = 0; n < b.length; n += 16) {
                        var r = a
                            , p = e
                            , u = c
                            , t = m;
                        a = k(a, e, c, m, b[n + 0], 7, -680876936);
                        m = k(m, a, e, c, b[n + 1], 12, -389564586);
                        c = k(c, m, a, e, b[n + 2], 17, 606105819);
                        e = k(e, c, m, a, b[n + 3], 22, -1044525330);
                        a = k(a, e, c, m, b[n + 4], 7, -176418897);
                        m = k(m, a, e, c, b[n + 5], 12, 1200080426);
                        c = k(c, m, a, e, b[n + 6], 17, -1473231341);
                        e = k(e, c, m, a, b[n + 7], 22, -45705983);
                        a = k(a, e, c, m, b[n + 8], 7, 1770035416);
                        m = k(m, a, e, c, b[n + 9], 12, -1958414417);
                        c = k(c, m, a, e, b[n + 10], 17, -42063);
                        e = k(e, c, m, a, b[n + 11], 22, -1990404162);
                        a = k(a, e, c, m, b[n + 12], 7, 1804603682);
                        m = k(m, a, e, c, b[n + 13], 12, -40341101);
                        c = k(c, m, a, e, b[n + 14], 17, -1502002290);
                        e = k(e, c, m, a, b[n + 15], 22, 1236535329);
                        a = f(a, e, c, m, b[n + 1], 5, -165796510);
                        m = f(m, a, e, c, b[n + 6], 9, -1069501632);
                        c = f(c, m, a, e, b[n + 11], 14, 643717713);
                        e = f(e, c, m, a, b[n + 0], 20, -373897302);
                        a = f(a, e, c, m, b[n + 5], 5, -701558691);
                        m = f(m, a, e, c, b[n + 10], 9, 38016083);
                        c = f(c, m, a, e, b[n + 15], 14, -660478335);
                        e = f(e, c, m, a, b[n + 4], 20, -405537848);
                        a = f(a, e, c, m, b[n + 9], 5, 568446438);
                        m = f(m, a, e, c, b[n + 14], 9, -1019803690);
                        c = f(c, m, a, e, b[n + 3], 14, -187363961);
                        e = f(e, c, m, a, b[n + 8], 20, 1163531501);
                        a = f(a, e, c, m, b[n + 13], 5, -1444681467);
                        m = f(m, a, e, c, b[n + 2], 9, -51403784);
                        c = f(c, m, a, e, b[n + 7], 14, 1735328473);
                        e = f(e, c, m, a, b[n + 12], 20, -1926607734);
                        a = l(e ^ c ^ m, a, e, b[n + 5], 4, -378558);
                        m = l(a ^ e ^ c, m, a, b[n + 8], 11, -2022574463);
                        c = l(m ^ a ^ e, c, m, b[n + 11], 16, 1839030562);
                        e = l(c ^ m ^ a, e, c, b[n + 14], 23, -35309556);
                        a = l(e ^ c ^ m, a, e, b[n + 1], 4, -1530992060);
                        m = l(a ^ e ^ c, m, a, b[n + 4], 11, 1272893353);
                        c = l(m ^ a ^ e, c, m, b[n + 7], 16, -155497632);
                        e = l(c ^ m ^ a, e, c, b[n + 10], 23, -1094730640);
                        a = l(e ^ c ^ m, a, e, b[n + 13], 4, 681279174);
                        m = l(a ^ e ^ c, m, a, b[n + 0], 11, -358537222);
                        c = l(m ^ a ^ e, c, m, b[n + 3], 16, -722521979);
                        e = l(c ^ m ^ a, e, c, b[n + 6], 23, 76029189);
                        a = l(e ^ c ^ m, a, e, b[n + 9], 4, -640364487);
                        m = l(a ^ e ^ c, m, a, b[n + 12], 11, -421815835);
                        c = l(m ^ a ^ e, c, m, b[n + 15], 16, 530742520);
                        e = l(c ^ m ^ a, e, c, b[n + 2], 23, -995338651);
                        a = h(a, e, c, m, b[n + 0], 6, -198630844);
                        m = h(m, a, e, c, b[n + 7], 10, 1126891415);
                        c = h(c, m, a, e, b[n + 14], 15, -1416354905);
                        e = h(e, c, m, a, b[n + 5], 21, -57434055);
                        a = h(a, e, c, m, b[n + 12], 6, 1700485571);
                        m = h(m, a, e, c, b[n + 3], 10, -1894986606);
                        c = h(c, m, a, e, b[n + 10], 15, -1051523);
                        e = h(e, c, m, a, b[n + 1], 21, -2054922799);
                        a = h(a, e, c, m, b[n + 8], 6, 1873313359);
                        m = h(m, a, e, c, b[n + 15], 10, -30611744);
                        c = h(c, m, a, e, b[n + 6], 15, -1560198380);
                        e = h(e, c, m, a, b[n + 13], 21, 1309151649);
                        a = h(a, e, c, m, b[n + 4], 6, -145523070);
                        m = h(m, a, e, c, b[n + 11], 10, -1120210379);
                        c = h(c, m, a, e, b[n + 2], 15, 718787259);
                        e = h(e, c, m, a, b[n + 9], 21, -343485551);
                        a = d(a, r);
                        e = d(e, p);
                        c = d(c, u);
                        m = d(m, t)
                    }
                    b = [a, e, c, m];
                    a = "";
                    for (e = 0; e < 4 * b.length; e++)
                        a += "0123456789abcdef".charAt(b[e >> 2] >> e % 4 * 8 + 4 & 15) + "0123456789abcdef".charAt(b[e >> 2] >> e % 4 * 8 & 15);
                    return a
                }
            }
        }();
        g.HASH = function () {
            function l(b, e) {
                b = [b[0] >>> 16, b[0] & 65535, b[1] >>> 16, b[1] & 65535];
                e = [e[0] >>> 16, e[0] & 65535, e[1] >>> 16, e[1] & 65535];
                var c = [0, 0, 0, 0];
                c[3] += b[3] + e[3];
                c[2] += c[3] >>> 16;
                c[3] &= 65535;
                c[2] += b[2] + e[2];
                c[1] += c[2] >>> 16;
                c[2] &= 65535;
                c[1] += b[1] + e[1];
                c[0] += c[1] >>> 16;
                c[1] &= 65535;
                c[0] += b[0] + e[0];
                c[0] &= 65535;
                return [c[0] << 16 | c[1], c[2] << 16 | c[3]]
            }
            function k(b, e) {
                b = [b[0] >>> 16, b[0] & 65535, b[1] >>> 16, b[1] & 65535];
                e = [e[0] >>> 16, e[0] & 65535, e[1] >>> 16, e[1] & 65535];
                var c = [0, 0, 0, 0];
                c[3] += b[3] * e[3];
                c[2] += c[3] >>> 16;
                c[3] &= 65535;
                c[2] += b[2] * e[3];
                c[1] += c[2] >>> 16;
                c[2] &= 65535;
                c[2] += b[3] * e[2];
                c[1] += c[2] >>> 16;
                c[2] &= 65535;
                c[1] += b[1] * e[3];
                c[0] += c[1] >>> 16;
                c[1] &= 65535;
                c[1] += b[2] * e[2];
                c[0] += c[1] >>> 16;
                c[1] &= 65535;
                c[1] += b[3] * e[1];
                c[0] += c[1] >>> 16;
                c[1] &= 65535;
                c[0] += b[0] * e[3] + b[1] * e[2] + b[2] * e[1] + b[3] * e[0];
                c[0] &= 65535;
                return [c[0] << 16 | c[1], c[2] << 16 | c[3]]
            }
            function f(b, e) {
                e %= 64;
                if (32 === e)
                    return [b[1], b[0]];
                if (32 > e)
                    return [b[0] << e | b[1] >>> 32 - e, b[1] << e | b[0] >>> 32 - e];
                e -= 32;
                return [b[1] << e | b[0] >>> 32 - e, b[0] << e | b[1] >>> 32 - e]
            }
            function h(b, e) {
                e %= 64;
                return 0 === e ? b : 32 > e ? [b[0] << e | b[1] >>> 32 - e, b[1] << e] : [b[1] << e - 32, 0]
            }
            function d(b, e) {
                return [b[0] ^ e[0], b[1] ^ e[1]]
            }
            function a(b) {
                b = d(b, [0, b[0] >>> 1]);
                b = k(b, [4283543511, 3981806797]);
                b = d(b, [0, b[0] >>> 1]);
                b = k(b, [3301882366, 444984403]);
                return b = d(b, [0, b[0] >>> 1])
            }
            return {
                hash128: function (b, e) {
                    b = b || "";
                    var c = e || 0;
                    e = b.length % 16;
                    var m = b.length - e
                        , n = [0, c];
                    c = [0, c];
                    for (var r, p, u = [2277735313, 289559509], t = [1291169091, 658871167], q = 0; q < m; q += 16)
                        r = [b.charCodeAt(q + 4) & 255 | (b.charCodeAt(q + 5) & 255) << 8 | (b.charCodeAt(q + 6) & 255) << 16 | (b.charCodeAt(q + 7) & 255) << 24, b.charCodeAt(q) & 255 | (b.charCodeAt(q + 1) & 255) << 8 | (b.charCodeAt(q + 2) & 255) << 16 | (b.charCodeAt(q + 3) & 255) << 24],
                            p = [b.charCodeAt(q + 12) & 255 | (b.charCodeAt(q + 13) & 255) << 8 | (b.charCodeAt(q + 14) & 255) << 16 | (b.charCodeAt(q + 15) & 255) << 24, b.charCodeAt(q + 8) & 255 | (b.charCodeAt(q + 9) & 255) << 8 | (b.charCodeAt(q + 10) & 255) << 16 | (b.charCodeAt(q + 11) & 255) << 24],
                            r = k(r, u),
                            r = f(r, 31),
                            r = k(r, t),
                            n = d(n, r),
                            n = f(n, 27),
                            n = l(n, c),
                            n = l(k(n, [0, 5]), [0, 1390208809]),
                            p = k(p, t),
                            p = f(p, 33),
                            p = k(p, u),
                            c = d(c, p),
                            c = f(c, 31),
                            c = l(c, n),
                            c = l(k(c, [0, 5]), [0, 944331445]);
                    r = [0, 0];
                    p = [0, 0];
                    switch (e) {
                        case 15:
                            p = d(p, h([0, b.charCodeAt(q + 14)], 48));
                        case 14:
                            p = d(p, h([0, b.charCodeAt(q + 13)], 40));
                        case 13:
                            p = d(p, h([0, b.charCodeAt(q + 12)], 32));
                        case 12:
                            p = d(p, h([0, b.charCodeAt(q + 11)], 24));
                        case 11:
                            p = d(p, h([0, b.charCodeAt(q + 10)], 16));
                        case 10:
                            p = d(p, h([0, b.charCodeAt(q + 9)], 8));
                        case 9:
                            p = d(p, [0, b.charCodeAt(q + 8)]),
                                p = k(p, t),
                                p = f(p, 33),
                                p = k(p, u),
                                c = d(c, p);
                        case 8:
                            r = d(r, h([0, b.charCodeAt(q + 7)], 56));
                        case 7:
                            r = d(r, h([0, b.charCodeAt(q + 6)], 48));
                        case 6:
                            r = d(r, h([0, b.charCodeAt(q + 5)], 40));
                        case 5:
                            r = d(r, h([0, b.charCodeAt(q + 4)], 32));
                        case 4:
                            r = d(r, h([0, b.charCodeAt(q + 3)], 24));
                        case 3:
                            r = d(r, h([0, b.charCodeAt(q + 2)], 16));
                        case 2:
                            r = d(r, h([0, b.charCodeAt(q + 1)], 8));
                        case 1:
                            r = d(r, [0, b.charCodeAt(q)]),
                                r = k(r, u),
                                r = f(r, 31),
                                r = k(r, t),
                                n = d(n, r)
                    }
                    n = d(n, [0, b.length]);
                    c = d(c, [0, b.length]);
                    n = l(n, c);
                    c = l(c, n);
                    n = a(n);
                    c = a(c);
                    n = l(n, c);
                    c = l(c, n);
                    return ("00000000" + (n[0] >>> 0).toString(16)).slice(-8) + ("00000000" + (n[1] >>> 0).toString(16)).slice(-8) + ("00000000" + (c[0] >>> 0).toString(16)).slice(-8) + ("00000000" + (c[1] >>> 0).toString(16)).slice(-8)
                }
            }
        }();
        g.TDEncrypt = function () {
            return function (l) {
                l = JSON.stringify(l);
                l = encodeURIComponent(l);
                var k = ""
                    , f = 0;
                do {
                    var h = l.charCodeAt(f++);
                    var d = l.charCodeAt(f++);
                    var a = l.charCodeAt(f++);
                    var b = h >> 2;
                    h = (h & 3) << 4 | d >> 4;
                    var e = (d & 15) << 2 | a >> 6;
                    var c = a & 63;
                    isNaN(d) ? e = c = 64 : isNaN(a) && (c = 64);
                    k = k + "23IL<N01c7KvwZO56RSTAfghiFyzWJqVabGH4PQdopUrsCuX*xeBjkltDEmn89.-".charAt(b) + "23IL<N01c7KvwZO56RSTAfghiFyzWJqVabGH4PQdopUrsCuX*xeBjkltDEmn89.-".charAt(h) + "23IL<N01c7KvwZO56RSTAfghiFyzWJqVabGH4PQdopUrsCuX*xeBjkltDEmn89.-".charAt(e) + "23IL<N01c7KvwZO56RSTAfghiFyzWJqVabGH4PQdopUrsCuX*xeBjkltDEmn89.-".charAt(c)
                } while (f < l.length);
                return k + "/"
            }
        }();
        return g
    }(jdtRiskEncryptUtil || {})
    , JdtRiskFingerPrint = function (g) {
        function l() {
            //var h = document.createElement("canvas");
            //return !(!h.getContext || !h.getContext("2d"))
            return new Object();
        }
        g = g || {};
        var k = ""
            , f = function () {
                var h = {};
                h.nativeForEach = Array.prototype.forEach;
                h.nativeMap = Array.prototype.map;
                h.each = function (d, a, b) {
                    if (null !== d)
                        if (h.nativeForEach && d.forEach === h.nativeForEach)
                            d.forEach(a, b);
                        else if (d.length === +d.length)
                            for (var e = 0, c = d.length; e < c && a.call(b, d[e], e, d) !== {}; e++)
                                ;
                        else
                            for (e in d)
                                if (d.hasOwnProperty(e) && a.call(b, d[e], e, d) === {})
                                    break
                }
                    ;
                h.map = function (d, a, b) {
                    var e = [];
                    if (null == d)
                        return e;
                    if (h.nativeMap && d.map === h.nativeMap)
                        return d.map(a, b);
                    h.each(d, function (c, m, n) {
                        e[e.length] = a.call(b, c, m, n)
                    });
                    return e
                }
                    ;
                h.execute = function (d) {
                    try {
                        if (this[d]) {
                            var a = (new Date).getTime()
                                , b = this[d]();
                            jdtRiskContext.d && console.log("FP function : [" + d + "] Cost time :", (new Date).getTime() - a);
                            return b
                        }
                    } catch (e) {
                        return jdtRiskContext.d && console.log("fp collect error", e),
                            ""
                    }
                }
                    ;
                h.getLanguage = function () {
                    return navigator.language
                }
                    ;
                h.getUserAgent = function () {
                    var d = navigator.userAgent.toLowerCase();
                    d.indexOf("jdapp") && (d = d.substring(0, 90));
                    return d
                }
                    ;
                h.getOsInfo = function () {
                    var d = h.getUserAgent()
                        , a = "NA"
                        , b = "NA";
                    try {
                        -1 != d.indexOf("win") && -1 != d.indexOf("95") && (a = "windows",
                            b = "95"),
                            -1 != d.indexOf("win") && -1 != d.indexOf("98") && (a = "windows",
                                b = "98"),
                            -1 != d.indexOf("win 9x") && -1 != d.indexOf("4.90") && (a = "windows",
                                b = "me"),
                            -1 != d.indexOf("win") && -1 != d.indexOf("nt 5.0") && (a = "windows",
                                b = "2000"),
                            -1 != d.indexOf("win") && -1 != d.indexOf("nt") && (a = "windows",
                                b = "NT"),
                            -1 != d.indexOf("win") && -1 != d.indexOf("nt 5.1") && (a = "windows",
                                b = "xp"),
                            -1 != d.indexOf("win") && -1 != d.indexOf("32") && (a = "windows",
                                b = "32"),
                            -1 != d.indexOf("win") && -1 != d.indexOf("nt 5.1") && (a = "windows",
                                b = "7"),
                            -1 != d.indexOf("win") && -1 != d.indexOf("6.0") && (a = "windows",
                                b = "8"),
                            -1 == d.indexOf("win") || -1 == d.indexOf("nt 6.0") && -1 == d.indexOf("nt 6.1") || (a = "windows",
                                b = "9"),
                            -1 != d.indexOf("win") && -1 != d.indexOf("nt 6.2") && (a = "windows",
                                b = "10"),
                            -1 != d.indexOf("linux") && (a = "linux"),
                            -1 != d.indexOf("unix") && (a = "unix"),
                            -1 != d.indexOf("sun") && -1 != d.indexOf("os") && (a = "sun os"),
                            -1 != d.indexOf("ibm") && -1 != d.indexOf("os") && (a = "ibm os/2"),
                            -1 != d.indexOf("mac") && -1 != d.indexOf("pc") && (a = "mac"),
                            -1 != d.indexOf("aix") && (a = "aix"),
                            -1 != d.indexOf("powerpc") && (a = "powerPC"),
                            -1 != d.indexOf("hpux") && (a = "hpux"),
                            -1 != d.indexOf("netbsd") && (a = "NetBSD"),
                            -1 != d.indexOf("bsd") && (a = "BSD"),
                            -1 != d.indexOf("osf1") && (a = "OSF1"),
                            -1 != d.indexOf("irix") && (a = "IRIX",
                                b = ""),
                            -1 != d.indexOf("freebsd") && (a = "FreeBSD"),
                            -1 != d.indexOf("symbianos") && (a = "SymbianOS",
                                b = d.substring(d.indexOf("SymbianOS/") + 10, 3))
                    } catch (e) { }
                    return {
                        os: a,
                        osVersion: b
                    }
                }
                    ;
                h.getBrowserInfo = function () {
                    var d = h.getUserAgent()
                        , a = "NA"
                        , b = "NA";
                    try {
                        -1 != d.indexOf("msie") && (a = "ie",
                            b = d.substring(d.indexOf("msie ") + 5),
                            b.indexOf(";") && (b = b.substring(0, b.indexOf(";"))));
                        -1 != d.indexOf("firefox") && (a = "Firefox",
                            b = d.substring(d.indexOf("firefox/") + 8));
                        -1 != d.indexOf("opera") && (a = "Opera",
                            b = d.substring(d.indexOf("opera/") + 6, 4));
                        -1 != d.indexOf("safari") && (a = "safari",
                            b = d.substring(d.indexOf("safari/") + 7));
                        -1 != d.indexOf("chrome") && (a = "chrome",
                            b = d.substring(d.indexOf("chrome/") + 7),
                            b.indexOf(" ") && (b = b.substring(0, b.indexOf(" "))));
                        -1 != d.indexOf("navigator") && (a = "navigator",
                            b = d.substring(d.indexOf("navigator/") + 10));
                        -1 != d.indexOf("applewebkit") && (a = "applewebkit_chrome",
                            b = d.substring(d.indexOf("applewebkit/") + 12),
                            b.indexOf(" ") && (b = b.substring(0, b.indexOf(" "))));
                        -1 != d.indexOf("sogoumobilebrowser") && (a = "\u641c\u72d7\u624b\u673a\u6d4f\u89c8\u5668");
                        if (-1 != d.indexOf("ucbrowser") || -1 != d.indexOf("ucweb"))
                            a = "UC\u6d4f\u89c8\u5668";
                        if (-1 != d.indexOf("qqbrowser") || -1 != d.indexOf("tencenttraveler"))
                            a = "QQ\u6d4f\u89c8\u5668";
                        -1 != d.indexOf("metasr") && (a = "\u641c\u72d7\u6d4f\u89c8\u5668");
                        -1 != d.indexOf("360se") && (a = "360\u6d4f\u89c8\u5668");
                        -1 != d.indexOf("the world") && (a = "\u4e16\u754c\u4e4b\u7a97\u6d4f\u89c8\u5668");
                        -1 != d.indexOf("maxthon") && (a = "\u9068\u6e38\u6d4f\u89c8\u5668")
                    } catch (e) { }
                    return {
                        browser: a,
                        browserVersion: b
                    }
                }
                    ;
                h.getColorDepth = function () {
                    return screen.colorDepth
                }
                    ;
                h.getScreenResolution = function () {
                    return [screen.height, screen.width].join("x")
                }
                    ;
                h.getTimezoneOffset = function () {
                    return (new Date).getTimezoneOffset()
                }
                    ;
                h.getSessionStorageSupport = function () {
                    try {
                        return !!window.sessionStorage
                    } catch (d) {
                        return !0
                    }
                }
                    ;
                h.getLocalStorageSupport = function () {
                    try {
                        return !!window.localStorage
                    } catch (d) {
                        return !0
                    }
                }
                    ;
                h.getIndexedDBSupport = function () {
                    return !!window.indexedDB
                }
                    ;
                h.getAddBehaviorSupport = function () {
                    return document.body && !!document.body.addBehavior
                }
                    ;
                h.getOpenDatabaseSupport = function () {
                    return !!window.openDatabase
                }
                    ;
                h.getNavigatorCpuClass = function () {
                    return navigator.cpuClass ? navigator.cpuClass : "NA"
                }
                    ;
                h.getNavigatorPlatform = function () {
                    return navigator.platform ? navigator.platform : "NA"
                }
                    ;
                h.getHardwareConcurrency = function () {
                    return navigator.hardwareConcurrency ? navigator.hardwareConcurrency : "NA"
                }
                    ;
                h.getDoNotTrack = function () {
                    return navigator.doNotTrack ? navigator.doNotTrack : "NA"
                }
                    ;
                h.getIEPluginsString = function () {
                    return window.ActiveXObject ? h.map("AcroPDF.PDF;Adodb.Stream;AgControl.AgControl;DevalVRXCtrl.DevalVRXCtrl.1;MacromediaFlashPaper.MacromediaFlashPaper;Msxml2.DOMDocument;Msxml2.XMLHTTP;PDF.PdfCtrl;QuickTime.QuickTime;QuickTimeCheckObject.QuickTimeCheck.1;RealPlayer;RealPlayer.RealPlayer(tm) ActiveX Control (32-bit);RealVideo.RealVideo(tm) ActiveX Control (32-bit);Scripting.Dictionary;SWCtl.SWCtl;Shell.UIHelper;ShockwaveFlash.ShockwaveFlash;Skype.Detection;TDCCtl.TDCCtl;WMPlayer.OCX;rmocx.RealPlayer G2 Control;rmocx.RealPlayer G2 Control.1".split(";"), function (d) {
                        try {
                            return new ActiveXObject(d),
                                d
                        } catch (a) {
                            return null
                        }
                    }).join(";") : ""
                }
                    ;
                h.getRegularPluginsString = function () {
                    return h.map(navigator.plugins, function (d) {
                        var a = h.map(d, function (b) {
                            return [b.type, b.suffixes].join("~")
                        }).join(",");
                        return [d.name, d.description, a].join("::")
                    }, this).join(";")
                }
                    ;
                h.getCanvasFp = function () {
                    var d = navigator.userAgent.toLowerCase();
                    if ((0 < d.indexOf("jdjr-app") || 0 <= d.indexOf("jdapp")) && (0 < d.indexOf("iphone") || 0 < d.indexOf("ipad")))
                        return null;
                    d = document.createElement("canvas");
                    var a = d.getContext("2d");
                    a.fillStyle = "red";
                    a.fillRect(30, 10, 200, 100);
                    a.strokeStyle = "#1a3bc1";
                    a.lineWidth = 6;
                    a.lineCap = "round";
                    a.arc(50, 50, 20, 0, Math.PI, !1);
                    a.stroke();
                    a.fillStyle = "#42e1a2";
                    a.font = "15.4px 'Arial'";
                    a.textBaseline = "alphabetic";
                    a.fillText("PR flacks quiz gym: TV DJ box when? \u2620", 15, 60);
                    a.shadowOffsetX = 1;
                    a.shadowOffsetY = 2;
                    a.shadowColor = "white";
                    a.fillStyle = "rgba(0, 0, 200, 0.5)";
                    a.font = "60px 'Not a real font'";
                    a.fillText("No\u9a97", 40, 80);
                    return d.toDataURL()
                }
                    ;
                h.getWebglFp = function () {
                    var d = navigator.userAgent;
                    d = d.toLowerCase();
                    if ((0 < d.indexOf("jdjr-app") || 0 <= d.indexOf("jdapp")) && (0 < d.indexOf("iphone") || 0 < d.indexOf("ipad")))
                        return null;
                    d = function (p) {
                        a.clearColor(0, 0, 0, 1);
                        a.enable(a.DEPTH_TEST);
                        a.depthFunc(a.LEQUAL);
                        a.clear(a.COLOR_BUFFER_BIT | a.DEPTH_BUFFER_BIT);
                        return "[" + p[0] + ", " + p[1] + "]"
                    }
                        ;
                    var a = h.getWebglCanvas();
                    if (!a)
                        return null;
                    var b = []
                        , e = a.createBuffer();
                    a.bindBuffer(a.ARRAY_BUFFER, e);
                    var c = new Float32Array([-.2, -.9, 0, .4, -.26, 0, 0, .732134444, 0]);
                    a.bufferData(a.ARRAY_BUFFER, c, a.STATIC_DRAW);
                    e.itemSize = 3;
                    e.numItems = 3;
                    c = a.createProgram();
                    var m = a.createShader(a.VERTEX_SHADER);
                    a.shaderSource(m, "attribute vec2 attrVertex;varying vec2 varyinTexCoordinate;uniform vec2 uniformOffset;void main(){varyinTexCoordinate=attrVertex+uniformOffset;gl_Position=vec4(attrVertex,0,1);}");
                    a.compileShader(m);
                    var n = a.createShader(a.FRAGMENT_SHADER);
                    a.shaderSource(n, "precision mediump float;varying vec2 varyinTexCoordinate;void main() {gl_FragColor=vec4(varyinTexCoordinate,0,1);}");
                    a.compileShader(n);
                    a.attachShader(c, m);
                    a.attachShader(c, n);
                    a.linkProgram(c);
                    a.useProgram(c);
                    c.vertexPosAttrib = a.getAttribLocation(c, "attrVertex");
                    c.offsetUniform = a.getUniformLocation(c, "uniformOffset");
                    a.enableVertexAttribArray(c.vertexPosArray);
                    a.vertexAttribPointer(c.vertexPosAttrib, e.itemSize, a.FLOAT, !1, 0, 0);
                    a.uniform2f(c.offsetUniform, 1, 1);
                    a.drawArrays(a.TRIANGLE_STRIP, 0, e.numItems);
                    null != a.canvas && b.push(a.canvas.toDataURL());
                    b.push("extensions:" + a.getSupportedExtensions().join(";"));
                    b.push("extensions:" + a.getSupportedExtensions().join(";"));
                    b.push("w1" + d(a.getParameter(a.ALIASED_LINE_WIDTH_RANGE)));
                    b.push("w2" + d(a.getParameter(a.ALIASED_POINT_SIZE_RANGE)));
                    b.push("w3" + a.getParameter(a.ALPHA_BITS));
                    b.push("w4" + (a.getContextAttributes().antialias ? "yes" : "no"));
                    b.push("w5" + a.getParameter(a.BLUE_BITS));
                    b.push("w6" + a.getParameter(a.DEPTH_BITS));
                    b.push("w7" + a.getParameter(a.GREEN_BITS));
                    b.push("w8" + function (p) {
                        var u, t = p.getExtension("EXT_texture_filter_anisotropic") || p.getExtension("WEBKIT_EXT_texture_filter_anisotropic") || p.getExtension("MOZ_EXT_texture_filter_anisotropic");
                        return t ? (u = p.getParameter(t.MAX_TEXTURE_MAX_ANISOTROPY_EXT),
                            0 === u && (u = 2),
                            u) : null
                    }(a));
                    b.push("w9" + a.getParameter(a.MAX_COMBINED_TEXTURE_IMAGE_UNITS));
                    b.push("w10" + a.getParameter(a.MAX_CUBE_MAP_TEXTURE_SIZE));
                    b.push("w11" + a.getParameter(a.MAX_FRAGMENT_UNIFORM_VECTORS));
                    b.push("w12" + a.getParameter(a.MAX_RENDERBUFFER_SIZE));
                    b.push("w13" + a.getParameter(a.MAX_TEXTURE_IMAGE_UNITS));
                    b.push("w14" + a.getParameter(a.MAX_TEXTURE_SIZE));
                    b.push("w15" + a.getParameter(a.MAX_VARYING_VECTORS));
                    b.push("w16" + a.getParameter(a.MAX_VERTEX_ATTRIBS));
                    b.push("w17" + a.getParameter(a.MAX_VERTEX_TEXTURE_IMAGE_UNITS));
                    b.push("w18" + a.getParameter(a.MAX_VERTEX_UNIFORM_VECTORS));
                    b.push("w19" + d(a.getParameter(a.MAX_VIEWPORT_DIMS)));
                    b.push("w20" + a.getParameter(a.RED_BITS));
                    b.push("w21" + a.getParameter(a.RENDERER));
                    b.push("w22" + a.getParameter(a.SHADING_LANGUAGE_VERSION));
                    b.push("w23" + a.getParameter(a.STENCIL_BITS));
                    b.push("w24" + a.getParameter(a.VENDOR));
                    b.push("w25" + a.getParameter(a.VERSION));
                    try {
                        var r = a.getExtension("WEBGL_debug_renderer_info");
                        r && (b.push("wuv:" + a.getParameter(r.UNMASKED_VENDOR_WEBGL)),
                            b.push("wur:" + a.getParameter(r.UNMASKED_RENDERER_WEBGL)))
                    } catch (p) { }
                    return b.join("\u00a7")
                }
                    ;
                h.getWebglCanvas = function () {
                    var d = document.createElement("canvas")
                        , a = null;
                    try {
                        var b = navigator.userAgent;
                        b = b.toLowerCase();
                        (0 < b.indexOf("jdjr-app") || 0 <= b.indexOf("jdapp")) && (0 < b.indexOf("iphone") || 0 < b.indexOf("ipad")) || (a = d.getContext("webgl") || d.getContext("experimental-webgl"))
                    } catch (e) { }
                    a || (a = null);
                    return a
                }
                    ;
                return h
            }();
        return {
            getFp: function (h) {
                k = k || jdtRiskStorageManager.load(collectConfig.store[_riskFpMode].fpKey, !1);
                var d = 1 * jdtLocalStorageManager.get(collectConfig.store[_riskFpMode].fpTsKey);
                if (!(k && 32 == k.length && (d || 0) >= (new Date).getTime())) {
                    var a = g;
                    a = a || {};
                    d = [];
                    var b = f.execute("getBrowserInfo")
                        , e = f.execute("getOsInfo");
                    if (!a[collectConfig.fp.userAgent]) {
                        var c = f.execute("getUserAgent")
                            , m = 1 * b.browserVersion;
                        "ie" == b.browser && 7 <= m ? d.push(c) : (c = navigator.userAgent,
                            0 <= c.indexOf("jdapp") && (c = c.substring(0, 90)),
                            d.push(c))
                    }
                    a[collectConfig.fp.language] || d.push(f.execute("getLanguage"));
                    d.push(b.browser);
                    d.push(b.browserVersion);
                    d.push(e.os);
                    d.push(e.osVersion);
                    a[collectConfig.fp.colorDepth] || d.push(f.execute("getColorDepth"));
                    a[collectConfig.fp.screenResolution] || d.push(f.execute("getScreenResolution"));
                    a[collectConfig.fp.timezoneOffset] || d.push(f.execute("getTimezoneOffset"));
                    a[collectConfig.fp.sessionStorage] || f.execute("getSessionStorageSupport") && d.push("sessionStorageKey");
                    a[collectConfig.fp.localStorage] || f.execute("getLocalStorageSupport") && d.push("localStorageKey");
                    a[collectConfig.fp.indexedDb] || f.execute("getIndexedDBSupport") && d.push("indexedDbKey");
                    a[collectConfig.fp.addBehavior] || f.execute("getAddBehaviorSupport") && d.push("addBehaviorKey");
                    a[collectConfig.fp.openDatabase] || f.execute("getOpenDatabaseSupport") && d.push("openDatabase");
                    a[collectConfig.fp.cpuClass] || d.push(f.execute("getNavigatorCpuClass"));
                    a[collectConfig.fp.platform] || d.push(f.execute("getNavigatorPlatform"));
                    a[collectConfig.fp.hardwareConcurrency] || d.push(f.execute("getHardwareConcurrency"));
                    a[collectConfig.fp.doNotTrack] || d.push(f.execute("getDoNotTrack"));
                    a[collectConfig.fp.plugins] || ("Microsoft Internet Explorer" === navigator.appName || "Netscape" === navigator.appName && /Trident/.test(navigator.userAgent) ? d.push(f.execute("getIEPluginsString")) : d.push(f.execute("getRegularPluginsString")));
                    !a[collectConfig.fp.canvas] && l() && (b = f.execute("getCanvasFp"),
                        jdtRiskContext.canvas_fp_md5 = jdtRiskEncryptUtil.MD5.hex_md5(b),
                        jdtRiskStorageManager.store(collectConfig.store.canvasFpKey, jdtRiskContext.canvas_fp_md5, !1),
                        d.push(b));
                    !a[collectConfig.fp.webgl] && l() && (a = f.execute("getWebglFp"),
                        d.push(a));
                    jdtRiskContext.d && console.log("fp keys:", d);
                    k = jdtRiskEncryptUtil.HASH.hash128(d.join("~~~"), 31);
                    jdtRiskStorageManager.store(collectConfig.store[_riskFpMode].fpKey, k, !1);
                    jdtLocalStorageManager.set(collectConfig.store[_riskFpMode].fpTsKey, (new Date).getTime() + 6E5)
                }
                h(k)
            }
        }
    }
    , jdtRiskCookieManager = function () {
        return {
            setCookie: function (g, l, k) {
                try {
                    if (l) {
                        "undefined" == typeof k && (k = 31104E3);
                        var f = new Date;
                        f.setTime(f.getTime() + 1E3 * k);
                        var h = "expires=" + f.toUTCString();
                        document.cookie = g + "=" + l + "; " + h + "; path=/; domain=" + jdtRiskUtil.getCurrentRootDomain()
                    }
                } catch (d) { }
            },
            getCookie: function (g) {
                try {
                    g += "=";
                    for (var l = document.cookie.split(";"), k = 0; k < l.length; k++) {
                        var f = l[k].trim();
                        if (0 == f.indexOf(g))
                            return f.substring(g.length, f.length)
                    }
                } catch (h) { }
                return ""
            }
        }
    }()
    , jdtLocalStorageManager = function () {
        return {
            set: function (g, l) {
                try {
                    l && window.localStorage && window.localStorage.setItem(g, l)
                } catch (k) { }
            },
            get: function (g) {
                try {
                    if (window.localStorage)
                        return window.localStorage.getItem(g)
                } catch (l) { }
                return ""
            }
        }
    }()
    , jdtRiskStorageManager = function (g) {
        g.db = void 0;
        return {
            store: function (l, k, f, h) {
                "undefined" == typeof f && (f = !0);
                if (f)
                    try {
                        jdtRiskCookieManager.setCookie(l, k, h)
                    } catch (d) { }
                try {
                    jdtLocalStorageManager.set(l, k)
                } catch (d) { }
                try {
                    window.sessionStorage && window.sessionStorage.setItem(l, k)
                } catch (d) { }
                try {
                    window.globalStorage && window.globalStorage[".localdomain"].setItem(l, k)
                } catch (d) { }
            },
            load: function (l, k, f) {
                "undefined" == typeof k && (k = !0);
                f = f || function (d) {
                    return !!d
                }
                    ;
                var h = null;
                if (k)
                    try {
                        if (h = jdtRiskCookieManager.getCookie(l),
                            f(h))
                            return h
                    } catch (d) { }
                try {
                    if (h = jdtLocalStorageManager.get(l),
                        f(h))
                        return h
                } catch (d) { }
                try {
                    if (window.sessionStorage && (h = window.sessionStorage[l],
                        f(h)))
                        return h
                } catch (d) { }
                try {
                    if (window.globalStorage && (h = window.globalStorage[".localdomain"][l],
                        f(h)))
                        return h
                } catch (d) { }
                return h
            }
        }
    }(jdtRiskStorageManager || {})
    , TDEnvCollector = function (g) {
        function l(f) {
            var h = {};
            h.name = f.name;
            void 0 !== f.version && (h.version = f.version);
            return h
        }
        g = g || {};
        var k = function () {
            return {
                execute: function (f) {
                    try {
                        if (this[f]) {
                            var h = (new Date).getTime()
                                , d = this[f]();
                            jdtRiskContext.d && console.log("ENV Collector function : [" + f + "] Cost time :", (new Date).getTime() - h);
                            return d
                        }
                    } catch (a) {
                        return jdtRiskContext.d && console.log("env collect error", a),
                            ""
                    }
                },
                getColorRgb: function () {
                    var f = {};
                    try {
                        var h = document.createElement("div")
                            , d = "ActiveBorder ActiveCaption AppWorkspace Background ButtonFace ButtonHighlight ButtonShadow ButtonText CaptionText GrayText Highlight HighlightText InactiveBorder InactiveCaption InactiveCaptionText InfoBackground InfoText Menu MenuText Scrollbar ThreeDDarkShadow ThreeDFace ThreeDHighlight ThreeDLightShadow ThreeDShadow Window WindowFrame WindowText".split(" ");
                        if (window.getComputedStyle)
                            for (var a = 0; a < d.length; a++)
                                document.body.appendChild(h),
                                    h.style.color = d[a],
                                    f[d[a]] = window.getComputedStyle(h).getPropertyValue("color"),
                                    document.body.removeChild(h)
                    } catch (b) { }
                    return f
                },
                getCanvasInfo: function () {
                    var f = {};
                    f.tdHash = jdtRiskContext.canvas_fp_md5 || jdtRiskStorageManager.load(collectConfig.store.canvasFpKey, !1);
                    var h = !1, d;
                    if (d = window.WebGLRenderingContext)
                        d = navigator.userAgent,
                            d = d.toLowerCase(),
                            d = (0 < d.indexOf("jdjr-app") || 0 <= d.indexOf("jdapp")) && (0 < d.indexOf("iphone") || 0 < d.indexOf("ipad")) ? !0 : !1,
                            d = !d;
                    if (d) {
                        d = ["webgl", "experimental-webgl", "moz-webgl", "webkit-3d"];
                        for (var a = [], b, e = 0; e < d.length; e++)
                            try {
                                var c = !1;
                                (c = document.createElement("canvas").getContext(d[e], {
                                    stencil: !0
                                })) && c && (b = c,
                                    a.push(d[e]))
                            } catch (n) { }
                        a.length && (h = {
                            name: a,
                            gl: b
                        })
                    }
                    if (h) {
                        b = h.gl;
                        f.contextName = h.name.join();
                        f.webglversion = b.getParameter(b.VERSION);
                        f.shadingLV = b.getParameter(b.SHADING_LANGUAGE_VERSION);
                        f.vendor = b.getParameter(b.VENDOR);
                        f.renderer = b.getParameter(b.RENDERER);
                        h = [];
                        try {
                            h = b.getSupportedExtensions(),
                                f.extensions = h
                        } catch (n) { }
                        try {
                            var m = b.getExtension("WEBGL_debug_renderer_info");
                            m && (f.wuv = b.getParameter(m.UNMASKED_VENDOR_WEBGL),
                                f.wur = b.getParameter(m.UNMASKED_RENDERER_WEBGL))
                        } catch (n) { }
                    }
                    return f
                },
                getBrowserMode: function () {
                    return {
                        documentMode: document.documentMode,
                        compatMode: document.compatMode
                    }
                },
                getSupportFonts: function () {
                    function f(r) {
                        var p = {};
                        c.style.fontFamily = r;
                        document.body.appendChild(c);
                        p.height = c.offsetHeight;
                        p.width = c.offsetWidth;
                        document.body.removeChild(c);
                        return p
                    }
                    function h(r) {
                        for (var p = 0; p < e.length; p++) {
                            var u = f(r + "," + b[p])
                                , t = e[p];
                            if (u.height !== t.height || u.width !== t.width)
                                return !0
                        }
                        return !1
                    }
                    var d = []
                        , a = "Abadi MT Condensed Light;Adobe Fangsong Std;Adobe Hebrew;Adobe Ming Std;Agency FB;Arab;Arabic Typesetting;Arial Black;Batang;Bauhaus 93;Bell MT;Bitstream Vera Serif;Bodoni MT;Bookman Old Style;Braggadocio;Broadway;Calibri;Californian FB;Castellar;Casual;Centaur;Century Gothic;Chalkduster;Colonna MT;Copperplate Gothic Light;DejaVu LGC Sans Mono;Desdemona;DFKai-SB;Dotum;Engravers MT;Eras Bold ITC;Eurostile;FangSong;Forte;Franklin Gothic Heavy;French Script MT;Gabriola;Gigi;Gisha;Goudy Old Style;Gulim;GungSeo;Haettenschweiler;Harrington;Hiragino Sans GB;Impact;Informal Roman;KacstOne;Kino MT;Kozuka Gothic Pr6N;Lohit Gujarati;Loma;Lucida Bright;Lucida Fax;Magneto;Malgun Gothic;Matura MT Script Capitals;Menlo;MingLiU-ExtB;MoolBoran;MS PMincho;MS Reference Sans Serif;News Gothic MT;Niagara Solid;Nyala;Palace Script MT;Papyrus;Perpetua;Playbill;PMingLiU;Rachana;Rockwell;Sawasdee;Script MT Bold;Segoe Print;Showcard Gothic;SimHei;Snap ITC;TlwgMono;Tw Cen MT Condensed Extra Bold;Ubuntu;Umpush;Univers;Utopia;Vladimir Script;Wide Latin".split(";")
                        , b = ["monospace", "sans-serif", "serif"]
                        , e = []
                        , c = document.createElement("span");
                    c.style.fontSize = "72px";
                    c.style.visibility = "hidden";
                    c.innerHTML = "mmmmmmmmmmlli";
                    for (var m = 0; m < b.length; m++)
                        e[m] = f(b[m]);
                    for (m = 0; m < a.length; m++) {
                        var n = a[m];
                        h(n) && d.push(n)
                    }
                    return d
                },
                getFeature: function () {
                    var f = {}, h = [], d;
                    for (d in navigator)
                        "object" != typeof navigator[d] && (f[d] = navigator[d]),
                            h.push(d);
                    f.enumerationOrder = h;
                    f.javaEnabled = navigator.javaEnabled();
                    try {
                        f.taintEnabled = navigator.taintEnabled()
                    } catch (a) { }
                    return f
                },
                getPlugins: function () {
                    var f = [], h = "4game;AdblockPlugin;AdobeExManCCDetect;AdobeExManDetect;Alawar NPAPI utils;Aliedit Plug-In;Alipay Security Control 3;AliSSOLogin plugin;AmazonMP3DownloaderPlugin;AOL Media Playback Plugin;AppUp;ArchiCAD;AVG SiteSafety plugin;Babylon ToolBar;Battlelog Game Launcher;BitCometAgent;Bitdefender QuickScan;BlueStacks Install Detector;CatalinaGroup Update;Citrix ICA Client;Citrix online plug-in;Citrix Receiver Plug-in;Coowon Update;DealPlyLive Update;Default Browser Helper;DivX Browser Plug-In;DivX Plus Web Player;DivX VOD Helper Plug-in;doubleTwist Web Plugin;Downloaders plugin;downloadUpdater;eMusicPlugin DLM6;ESN Launch Mozilla Plugin;ESN Sonar API;Exif Everywhere;Facebook Plugin;File Downloader Plug-in;FileLab plugin;FlyOrDie Games Plugin;Folx 3 Browser Plugin;FUZEShare;GDL Object Web Plug-in 16.00;GFACE Plugin;Ginger;Gnome Shell Integration;Google Earth Plugin;Google Earth Plug-in;Google Gears 0.5.33.0;Google Talk Effects Plugin;Google Update;Harmony Firefox Plugin;Harmony Plug-In;Heroes & Generals live;HPDetect;Html5 location provider;IE Tab plugin;iGetterScriptablePlugin;iMesh plugin;Kaspersky Password Manager;LastPass;LogMeIn Plugin 1.0.0.935;LogMeIn Plugin 1.0.0.961;Ma-Config.com plugin;Microsoft Office 2013;MinibarPlugin;Native Client;Nitro PDF Plug-In;Nokia Suite Enabler Plugin;Norton Identity Safe;npAPI Plugin;NPLastPass;NPPlayerShell;npTongbuAddin;NyxLauncher;Octoshape Streaming Services;Online Storage plug-in;Orbit Downloader;Pando Web Plugin;Parom.TV player plugin;PDF integrado do WebKit;PDF-XChange Viewer;PhotoCenterPlugin1.1.2.2;Picasa;PlayOn Plug-in;QQ2013 Firefox Plugin;QQDownload Plugin;QQMiniDL Plugin;QQMusic;RealDownloader Plugin;Roblox Launcher Plugin;RockMelt Update;Safer Update;SafeSearch;Scripting.Dictionary;SefClient Plugin;Shell.UIHelper;Silverlight Plug-In;Simple Pass;Skype Web Plugin;SumatraPDF Browser Plugin;Symantec PKI Client;Tencent FTN plug-in;Thunder DapCtrl NPAPI Plugin;TorchHelper;Unity Player;Uplay PC;VDownloader;Veetle TV Core;VLC Multimedia Plugin;Web Components;WebKit-integrierte PDF;WEBZEN Browser Extension;Wolfram Mathematica;WordCaptureX;WPI Detector 1.4;Yandex Media Plugin;Yandex PDF Viewer;YouTube Plug-in;zako".split(";"), d = navigator.userAgent.toLowerCase(), a;
                    if (a = d.match(/rv:([\d.]+)\) like gecko/))
                        var b = a[1];
                    if (a = d.match(/msie ([\d.]+)/))
                        b = a[1];
                    if (b)
                        for (d = "AcroPDF.PDF;Adodb.Stream;AgControl.AgControl;DevalVRXCtrl.DevalVRXCtrl.1;MacromediaFlashPaper.MacromediaFlashPaper;Msxml2.DOMDocument;Msxml2.XMLHTTP;PDF.PdfCtrl;QuickTime.QuickTime;QuickTimeCheckObject.QuickTimeCheck.1;RealPlayer;RealPlayer.RealPlayer(tm) ActiveX Control (32-bit);RealVideo.RealVideo(tm) ActiveX Control (32-bit);rmocx.RealPlayer G2 Control;Scripting.Dictionary;Shell.UIHelper;ShockwaveFlash.ShockwaveFlash;SWCtl.SWCtl;TDCCtl.TDCCtl;WMPlayer.OCX".split(";"),
                            b = 0; b < d.length; b++) {
                            var e = d[b];
                            try {
                                var c = new ActiveXObject(e);
                                a = {};
                                a.name = e;
                                try {
                                    a.version = c.GetVariable("$version")
                                } catch (m) { }
                                try {
                                    a.version = c.GetVersions()
                                } catch (m) { }
                                a.version && 0 < a.version.length || (a.version = "");
                                f.push(a)
                            } catch (m) { }
                        }
                    else {
                        d = navigator.plugins;
                        a = {};
                        for (b = 0; b < d.length; b++)
                            e = d[b],
                                a[e.name] = 1,
                                f.push(l(e));
                        for (b = 0; b < h.length; b++)
                            c = h[b],
                                a[c] || (e = d[c],
                                    e && f.push(l(e)))
                    }
                    return f
                },
                getScreenInfo: function () {
                    for (var f = {}, h = "availHeight availWidth colorDepth bufferDepth deviceXDPI deviceYDPI height width logicalXDPI logicalYDPI pixelDepth updateInterval".split(" "), d = 0; h.length > d; d++) {
                        var a = h[d];
                        void 0 !== screen[a] && (f[a] = screen[a])
                    }
                    return f
                },
                getPositionInfo: function () {
                    for (var f = {}, h = ["devicePixelRatio", "screenTop", "screenLeft"], d = 0; h.length > d; d++) {
                        var a = h[d];
                        void 0 !== window[a] && (f[a] = window[a])
                    }
                    return f
                },
                getStoreCheck: function () {
                    var f = {};
                    try {
                        f.cookie = navigator.cookieEnabled,
                            f.localStorage = !!window.localStorage,
                            f.sessionStorage = !!window.sessionStorage,
                            f.globalStorage = !!window.globalStorage,
                            f.indexedDB = !!window.indexedDB
                    } catch (h) { }
                    return f
                }
            }
        }();
        return {
            getEncryptedCollectInfo: function () {
                var f = g;
                f = f || {};
                var h = {}
                    , d = new Date;
                h.ts = {};
                h.ts.deviceTime = d.getTime();
                f[collectConfig.env.canvas] || (h.ca = k.execute("getCanvasInfo") || {});
                f[collectConfig.env.browserMode] || (h.m = k.execute("getBrowserMode") || {});
                f[collectConfig.env.fonts] || (h.fo = k.execute("getSupportFonts") || []);
                f[collectConfig.env.feature] || (h.n = k.execute("getFeature") || {});
                f[collectConfig.env.plugins] || (h.p = k.execute("getPlugins") || []);
                f[collectConfig.env.position] || (h.w = k.execute("getPositionInfo") || {});
                f[collectConfig.env.screen] || (h.s = k.execute("getScreenInfo") || {});
                f[collectConfig.env.color] || (h.sc = k.execute("getColorRgb") || {});
                f[collectConfig.env.storeCheck] || (h.ss = k.execute("getStoreCheck") || {});
                h.tz = d.getTimezoneOffset();
                h.lil = "";
                h.wil = "";
                h.ts.deviceEndTime = (new Date).getTime();
                jdtRiskContext.d && console.log("collect env data :", h);
                return jdtRiskEncryptUtil.TDEncrypt(h)
            }
        }
    }
    , SdkCollector = function (g) {
        function l(p, u) {
            window._bioDeviceSdkTokenCb = function (q) {
                jdtRiskContext.d && console.log("JD JS Bridge Result :", q);
                try {
                    var v = "object" == typeof q ? q : JSON.parse(q)
                        , y = v && "0" == v.status
                        , w = "";
                    y && (w = e ? JSON.parse(v.data).token : v.data.token);
                    u(y, "FINISHED", w)
                } catch (z) {
                    jdtRiskContext.d && console.log("JD JS SDK Callback ERROR", z);
                    a: {
                        try {
                            if (q) {
                                var x = (q + "").match(/"token":"(.*?)"/);
                                if (x && 1 < x.length) {
                                    w = x[1];
                                    break a
                                }
                            }
                        } catch (A) { }
                        w = ""
                    }
                    u(!!w, "FROM REGX", w)
                }
            }
                ;
            try {
                window.top == window.self || window.top._bioDeviceSdkTokenCb || (window.top._bioDeviceSdkTokenCb = window._bioDeviceSdkTokenCb)
            } catch (q) { }
            try {
                p = p ? 5 : 1;
                var t = JSON.stringify({
                    businessType: "bridgeBiologicalProbe",
                    callBackName: "_bioDeviceSdkTokenCb",
                    params: {
                        pin: "",
                        jsonData: {
                            type: r,
                            operation: p,
                            data: {
                                bizId: c,
                                duraTime: m,
                                interval: n
                            },
                            biometricData: {
                                bizId: c,
                                duraTime: m,
                                interval: n
                            }
                        }
                    }
                });
                navigator.userAgent.match(/supportJDSHWK/i) || 1 == window._is_jdsh_wkwebview ? window.webkit.messageHandlers.JDAppUnite.postMessage({
                    method: "notifyMessageToNative",
                    params: t
                }) : e ? window.XWebView && window.XWebView.callNative("BiometricApi", "biometricForJS", {
                    requestData: {
                        operation: p,
                        biometricData: {
                            bizId: c
                        }
                    }
                }, "_bioDeviceSdkTokenCb", "1") : window.JDAppUnite && window.JDAppUnite.notifyMessageToNative(t)
            } catch (q) {
                jdtRiskContext.d && console.log("JD SDK call ERROR", q),
                    u(!1, "JS BRIDGE CALL ERROR")
            }
        }
        function k(p, u) {
            try {
                "undefined" == typeof JrBridge || !JrBridge || !JrBridge._version || 0 > jdtRiskUtil.compareVersion(JrBridge._version, "2.0.0") ? u(!1, "JR BRIDGE NOT SUPPORT") : JrBridge.callNative({
                    type: r,
                    operation: p ? 5 : 1,
                    biometricData: {
                        bizId: c,
                        duraTime: m,
                        interval: n
                    }
                }, function (t) {
                    jdtRiskContext.d && console.log("JR JS Bridge Result :", t);
                    try {
                        var q = ("object" == typeof t ? t : JSON.parse(t)).token;
                        u(!!q, "FINISHED", q)
                    } catch (v) {
                        jdtRiskContext.d && console.log("JR JS SDK Callback ERROR", v),
                            u(!1, "JR CALLBACK ERROR")
                    }
                })
            } catch (t) {
                jdtRiskContext.d && console.log("JR SDK call ERROR", t),
                    u(!1, "JR BRIDGE CALL ERROR")
            }
        }
        function f(p) {
            try {
                var u = jdtRiskStorageManager.load(collectConfig.store.sdkTokenKey, !1);
                if (!u)
                    return !1;
                var t = JSON.parse(u)
                    , q = (new Date).getTime();
                if (t && t.tk && t.t) {
                    jdtRiskContext.isSupportApp = !0;
                    if (12E5 >= q - t.t && t.tk.startsWith("jdd"))
                        return p(!0, "FROM LOCAL CACHE", t.tk, !0),
                            !0;
                    jdtRiskContext.deviceInfo.sdkToken = t.tk
                }
            } catch (v) { }
            return !1
        }
        var h = !1
            , d = !1
            , a = !1
            , b = !1
            , e = !1
            , c = g.sdkBizId || "jsDefault"
            , m = g.duraTime || 2
            , n = g.interval || 50
            , r = g.type || "42";
        (function () {
            var p = navigator.userAgent.toLowerCase();
            b = p.match(/(iphone|ipad|ipod)/i);
            a = !b && (-1 < p.indexOf("android") || -1 < p.indexOf("adr"));
            e = !b && !a && -1 < p.indexOf("harmony");
            h = -1 < p.indexOf("jdapp");
            var u = navigator.userAgent.match(RegExp("clientVersion=([^&]*)(&|$)"));
            d = -1 < p.indexOf("jdjr") && u && 1 < u.length;
            jdtRiskContext.isSupportApp = h || d
        }
        )();
        return {
            getSdkToken: function (p) {
                if (!f(p))
                    if (h) {
                        jdtRiskContext.deviceInfo.clientVersion = navigator.userAgent.split(";")[2];
                        var u = 0 < jdtRiskUtil.compareVersion(jdtRiskContext.deviceInfo.clientVersion, "7.0.2");
                        u ? l(!0, function (t, q, v) {
                            t && v && v.startsWith("jdd") ? p(t, q, v) : l(!1, function (y, w, x) {
                                p(y, w, x)
                            })
                        }) : p(!1, "JD APP VERSION NOT SUPPORT")
                    } else
                        d ? (jdtRiskContext.deviceInfo.clientVersion = navigator.userAgent.match(RegExp("clientVersion=([^&]*)(&|$)"))[1],
                            (u = 0 < jdtRiskUtil.compareVersion(jdtRiskContext.deviceInfo.clientVersion, "4.6.0")) ? k(!0, function (t, q, v) {
                                t && v && v.startsWith("jdd") ? p(t, q, v) : k(!1, function (y, w, x) {
                                    p(y, w, x)
                                })
                            }) : p(!1, "JR APP VERSION NOT SUPPORT")) : window.JDTRiskBridgeUtil ? window.JDTRiskBridgeUtil.callAppBridge(navigator.userAgent, {
                                bizId: c
                            }, function (t, q, v) {
                                t ? p(!0, q, v.sdkToken) : p(!1, q)
                            }) : p(!1, "UNSUPPORTED APP")
            }
        }
    };
function doCollectFp(callParams) {
    //navigator.userAgent=callParams.userAgent;
    //document.location.href=callParams.href;
    function g(b, e) {
        jdtRiskContext.deviceInfo.sdkToken && (b.stk = jdtRiskContext.deviceInfo.sdkToken,
            jdtRiskContext.isRpTok = !0);
        b = jdtRiskEncryptUtil.TDEncrypt(b);
       // e = "d=" + e;
      
       return { bParams: b, dParams: e };
        b = jdtRiskUtil.getCurrentPageProtocol() + jdtRiskUtil.getFpServerDomain() + "/jsTk.do?a=" + b;
        jdtRiskUtil.sendRequest(b, e, function (c) {
            try {
                var m = JSON.parse(c);
                if (m && 0 == m.code && m.data) {
                    jdtRiskContext.deviceInfo.jsToken = m.data.token;
                    jdtRiskStorageManager.store(collectConfig.store[_riskFpMode].jsTokenKey, m.data.token);
                    jdtRiskContext.deviceInfo.eid = m.data.eid;
                    jdtRiskStorageManager.store(collectConfig.store[_riskFpMode].eidKey, m.data.eid);
                    try {
                        m.data.gia_d && 1 == m.data.gia_d && jdtRiskCookieManager.setCookie(collectConfig.store.giaDKey, m.data.gia_d, m.data.ds || 600),
                            m.data.deMap && jdtRiskUtil.cleanAndPushDeS(jdtRiskUtil.getBizId(), m.data.deMap[jdtRiskUtil.getBizId()])
                    } catch (n) { }
                }
                jdtRiskContext.isJsTokenFinished = !0
            } catch (n) {
                _globalState.errTrace.push({
                    code: "parseRequest",
                    msg: n.message,
                    stack: n.stack
                }),
                    console.error("resp parse error", n)
            }
        })
    }
    try {
        jdtRiskContext.deviceInfo.jsToken = jdtRiskStorageManager.load(collectConfig.store[_riskFpMode].jsTokenKey);
        (new JdtRiskFingerPrint(collectConfig.getFpExcludeOptions(_riskFpMode))).getFp(function (b) {
            b && (jdtRiskContext.deviceInfo.fp = b)
        });
        var l = (new TDEnvCollector(collectConfig.getEnvExcludeOptions(_riskFpMode))).getEncryptedCollectInfo()
            , k = "string" === typeof orderId ? orderId : ""
            , f = "undefined" !== typeof jdfp_pinenp_ext && jdfp_pinenp_ext ? 2 : 1
            , h = {
                pin: jdtRiskUtil.obtainPin(f),
                oid: k,
                bizId: jdtRiskUtil.getBizId(),
                fc: jdtRiskStorageManager.load(collectConfig.store[_riskFpMode].eidKey),
                mode: _riskFpMode,
                p: "https:" == document.location.protocol ? "s" : "h",
                fp: jdtRiskContext.deviceInfo.fp,
                ctype: f,
                v: jdtRiskContext.version,
                f: "3",
                o: jdtRiskUtil.getCurrentPageUrl(),
                qs: jdtRiskUtil.getUrlQueryStr(),
                jsTk: jdtRiskContext.deviceInfo.jsToken
            };
        h.fc = callParams.equipmentId;
        h.bizId = callParams.bizId;
        h.mode = callParams.mode;
        h.o = callParams.o;
        h.qs = callParams.qs;
        h.jsTk = callParams.jsTk;
      
        console.log(h);
        try {
            if ("undefined" != typeof gia_fp_qd_uuid && 0 <= gia_fp_qd_uuid.length)
                h.qi = gia_fp_qd_uuid;
            else {
                var d = jdtRiskCookieManager.getCookie("qd_uid");
                h.qi = void 0 == d ? "" : d
                console.log(h.qi);
            }
        } catch (b) { }
        if (jdtRiskContext.isSupportApp) {
            k = 0;
            var a = navigator.userAgent.toLowerCase();
            if (0 < a.indexOf("iphone") || 0 < a.indexOf("ipad"))
                k = 20;
            setTimeout(function () {
                return g(h, l)
            }, k)
        } else { 
            return g(h, l)
        }

       
    } catch (b) {
        _globalState.errTrace.push({
            code: "initFunc",
            msg: b.message,
            stack: b.stack
        }),
            console.error("init func error :", b)
    }
}

module.exports = {
    doCollectFp
}