const CryptoJS = require("crypto-js");
const axios = require("axios");
const ADLER32 = require("adler-32");
const jdToken = require("./jd_token.js");

class h5st {
  constructor(cookieStr, userAgent, config, url) {
    this.cookieStr = cookieStr;
    this.userAgent = userAgent;

    if (url) {
      try {
        this.url = url;
        this.origin = new URL(url).origin;
      } catch(e) {
        console.log('url传递错误')
      }
    }

    this.map = new Map();

    this.settings = {
      debug: !1,
      preRequest: !1,
      timeout: 2,
    };
    var Q_ = {
      DYNAMIC_TOKEN: "WQ_dy_algo_s_25f73_4.7",
      DYNAMIC_ALGORITHM: "WQ_dy_algo_s_25f73_4.7",
      VK: "WQ_vk1_25f73_4.7",
      FLAG: "WQ_f_v_file",
    };
    this.gb = { UNSIGNABLE_PARAMS: 1, APPID_ABSENT: 2, TOKEN_EMPTY: 3, GENERATE_SIGNATURE_FAILED: 4, UNHANDLED_ERROR: -1 };

    this._storagetokenKey = Q_.DYNAMIC_TOKEN;
    this._storageAlgnKey = Q_.DYNAMIC_ALGORITHM;
    this._storageFormatVersionKey = Q_.FLAG;
    this._storageFpKey = Q_.VK;
    
    this._version = "4.7";
    this._token = "";
    this._defaultToken = "";
    this._isNormal = !1;
    this._appId = "";
    this._defaultAlgorithm = {
      local_key_1: CryptoJS.MD5,
      local_key_2: CryptoJS.SHA256,
      local_key_3: CryptoJS.HmacSHA256,
    };
    this.algos = {
      MD5: CryptoJS.MD5,
      SHA256: CryptoJS.SHA256,
      SHA512: CryptoJS.SHA512,
      HmacSHA256: CryptoJS.HmacSHA256,
      HmacSHA512: CryptoJS.HmacSHA512,
      HmacMD5: CryptoJS.HmacMD5,
    };
    this._formatVersion = 4.7;
    this._fingerprint = "";
    config = Object.assign({}, this.settings, config);
    this.__iniConfig(config);
  }

  S_(t) {
    function w_(t, r) {
      r = r || 0;
      for (var n = t.length - r, e = new Array(n); n--; ) e[n] = t[n + r];
      return e;
    }

    if (t) {
      var n = "[sign] ",
        o = new Array(arguments.length > 1 ? arguments.length - 1 : 0),
        i = 1;
      for (var i = 1; i < arguments.length; i++) {
        o[i - 1] = arguments[i];
      }
      var a = w_(o);
      console.log([n].concat(a));
    }
  }
  x_(params) {
    console.log(JSON.stringify(params));
  }

  async __iniConfig(t) {
    var i = t.appId,
      a = t.preRequest,
      u = t.debug,
      c = t.timeout,
      f = t.onSign,
      s = t.onRequestToken,
      v = t.onRequestTokenRemotely;
    (!("string" == typeof t.appId) || !t.appId) && console.error("settings.appId must be a non-empty string");
    this._appId = i || "";
    if (this._appId) {
      this._storagetokenKey = "".concat(this._storagetokenKey, "_").concat(this._appId);
      this._storageAlgnKey = "".concat(this._storageAlgnKey, "_").concat(this._appId);
      this._storageFormatVersionKey = "".concat(this._storageFormatVersionKey, "_").concat(this._appId);
      this._storageFpKey = "".concat(this._storageFpKey, "_").concat(this._appId);
    }
    this._timeout = Number(c);
    this._debug = Boolean(u);
    this._onSign = "function" == typeof f ? f : this.x_;
    this._onRequestToken = "function" == typeof s ? s : this.x_;
    this._onRequestTokenRemotely = "function" == typeof v ? v : this.x_;
    this.S_(this._debug, "create instance with appId=".concat(this._appId));
    this.S_(this._debug, "create instance with timeout=".concat(this._timeout));
    if (a) await this.__requestDeps();
  }

  __genDefaultKey(t, r, n, e) {
    function C_(t) {
      return (t + "===".slice((t.length + 3) % 4)).replace(/-/g, "+").replace(/_/g, "/");
    }

    var z = this,
      D = "",
      B = "9>5*t5";
    var L = "".concat(t).concat(r).concat(n).concat(e).concat(B),
      M = CryptoJS.enc.Utf8.stringify(CryptoJS.enc.Base64.parse(C_(this.__parseToken(t, 16, 28))));
    var E = M.match(/^[123]([x+][123])+/);
    if (E) {
      var k = E[0].split(""),
        T = this._defaultAlgorithm,
        P = "";
      k.forEach(function (r) {
        var e = ["+", "x"];
        if (isNaN(r)) e.indexOf(r) >= 0 && (P = r);
        else {
          var u = "".concat("local_key_").concat(r);
          if (T[u])
            switch (P) {
              case "+":
                D = "".concat(D).concat(z.__algorithm(u, L, t));
                break;
              case "x":
                D = z.__algorithm(u, D, t);
                break;
              default:
                D = z.__algorithm(u, L, t);
            }
        }
      });
    }
    this.S_(this._debug, "__genDefaultKey input=" + L + ",express=" + M + ",key=" + D);
    return D;
  }

  __algorithm(t, r, n) {
    var o = this._defaultAlgorithm[t];
    return t === "local_key_3" ? o(r, n).toString(CryptoJS.enc.Hex) : o(r).toString(CryptoJS.enc.Hex);
  }

  __parseToken(t, r, n) {
    return t ? t.slice(r, n) : "";
  }

  __parseAlgorithm(t, r) {
    if (t && r) {
      this._token = t || "";
      this.__genKey = (r && new Function("return ".concat(r))()) || null;
      var a = this._token && this.__genKey;
      this._isNormal = a;
      return a;
    }
    return !1;
  }

  __genSignParams(t, r, n, e) {
    var signParams= [
      "".concat(n),
      "".concat(this._fingerprint),
      "".concat(this._appId),
      "".concat(this._isNormal ? this._token : this._defaultToken),
      "".concat(t),
      "".concat(this._version),
      "".concat(r),
      "".concat(e),
    ].join(";");

    return signParams;
  }

  __genSign(t, r) {
    var l = r
      .map(function (t) {
        return t.key + ":" + t.value;
      })
      .join("&");
      console.log("__genSign = %s",(t + l + t));
    var h = CryptoJS.SHA256(t + l + t).toString(CryptoJS.enc.Hex);
    console.log("__genSign = %s",h);
    this.S_(this._debug, "__genSign, paramsStr:".concat(l, ", signedStr:").concat(h));
    return h;
  }

  async __requestDeps() {
    function Xb() {
      var U = "6d0jhqw3pa";
      var nt = Vb(U, 4);
      var rt = Jb();
      var Q = tw(U, nt);
      var tt =
        Qb({ size: rt, num: Q }) +
        nt +
        Qb({
          size: 11 - rt,
          num: Q,
        }) +
        rt;
      var Z = tt.split("");
      var X = Z.slice(0, 14);
      var J = Z.slice(14);
      var V = [];
      for (; X.length > 0; ) V.push((35 - parseInt(X.pop(), 36)).toString(36));
      V = V.concat(J);
      var Y = V.join("");
      return Y;
    }
    function Vb(t, r) {
      var b,
        C = [],
        A = t.length,
        S = (function (t, r) {
          var lt;
          if (typeof Ld === "undefined" || t[Symbol.iterator] == null) {
            if (Array.isArray(t) || (lt = Yb(t)) || (r && t && typeof t.length === "number")) {
              lt && (t = lt);
              var dt = 0;
              return {
                s: function () {},
                n: function () {
                  if (dt >= t.length) {
                    return {
                      done: !0,
                    };
                  }
                  return {
                    done: !1,
                    value: t[dt++],
                  };
                },
                e: function (t) {
                  throw t;
                },
                f: function () {},
              };
            }
            throw new TypeError("Invalid attempt to iterate non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.");
          }
          var st,
            vt = !0,
            ht = !1;
          return {
            s: function () {
              lt = t[Symbol.iterator]();
            },
            n: function () {
              var r = lt.next();
              return (vt = r.done), r;
            },
            e: function (t) {
              (ht = !0), (st = t);
            },
            f: function () {
              try {
                !vt && lt.return != null && lt.return();
              } finally {
                if (ht) throw st;
              }
            },
          };
        })(t);
      try {
        for (S.s(); !(b = S.n()).done; ) {
          var z = b.value;
          if (Math.random() * A < r && (C.push(z), --r == 0)) break;
          A--;
        }
      } catch (t) {
        S.e(t);
      } finally {
        S.f();
      }
      for (var D = "", B = 0; B < C.length; B++) {
        var j = (Math.random() * (C.length - B)) | 0;
        (D += C[j]), (C[j] = C[C.length - B - 1]);
      }
      return D;
    }
    function Yb(t, r) {
      if (!t) return;
      if (typeof t === "string") return Ub(t, r);
      var D = t.slice(8, -1);
      D === "Object" && t.constructor && (D = t.constructor.name);
      if (D === "Map" || D === "Set") return Array.from(t);
      if ("Arguments" === D || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/["test"](D)) return Ub(t, r);
    }
    function Ub(t, r) {
      (r == null || r > t.length) && (r = t.length);
      for (var h = 0, l = new Array(r); h < r; h++) l[h] = t[h];
      return l;
    }
    function Jb() {
      return (Math.random() * 10) | 0;
    }
    function tw(t, r) {
      for (var d = 0; d < r.length; d++) {
        var x = t.indexOf(r[d]);
        x !== -1 && (t = t.replace(r[d], ""));
      }
      return t;
    }
    function Qb(t) {
      var _ = t.size,
        g = t.num;
      for (var y = ""; _--; ) y += g[(Math.random() * g.length) | 0];
      return y;
    }

    var storageFormatVersion = this.getSync(this._storageFormatVersionKey);
    this.S_(this._debug, "__requestDeps, storageFormatVersion:" + storageFormatVersion + ", _formatVersion:" + this._formatVersion);
    if (!storageFormatVersion || storageFormatVersion !== this._formatVersion) {
      this.removeSync(this._storageFpKey);
      this.removeSync(this._storagetokenKey);
      this.removeSync(this._storageAlgnKey);
      this.setSync(this._storageFormatVersionKey, this._formatVersion, { expire: 365 * (3600 * 24) });
    }
    this._fingerprint = this.getSync(this._storageFpKey);
    if (this._fingerprint) {
      this.S_(this._debug, "__requestDeps use cache fp, fp:" + this._fingerprint);
    } else {
      this._fingerprint = Xb();
      this.setSync(this._storageFpKey, this._fingerprint, { expire: 3600 * 24 * 365 });
      this.S_(this._debug, "__requestDeps use new fp, fp:" + this._fingerprint);
    }
    var token = CryptoJS.enc.Utf8.stringify(CryptoJS.enc.Base64.parse(this.getSync(this._storagetokenKey) || ""));
    var algorithm = CryptoJS.enc.Utf8.stringify(CryptoJS.enc.Base64.parse(this.getSync(this._storageAlgnKey) || ""));
    if (this.__parseAlgorithm(token, algorithm)) {
      var response = {
        code: 0,
        message: "use normalToken",
      };
      this._onRequestToken(response);
      this.S_(this._debug, "__requestDeps, use cache token, token:" + this._token);
      return;
    }
    var response = {
      code: 1,
      message: "use defaultToken",
    };
    this._onRequestToken(response);
    this.S_(this._debug, "__requestDeps, start __requestAlgorithm, fp:" + this._fingerprint);
    try {
      await this.__requestAlgorithm();
    } catch (error) {
      this.S_(this._debug, "__requestDeps request token failed, error: " + error);
    }
    this.S_(this._debug, "__requestDeps, end __requestAlgorithm, fp:".concat(this._fingerprint));
  }

  async __requestAlgorithm() {
    var Dt = this.Cw(0);
    
   // Dt.ai = this._appId;
    Dt.fp = this._fingerprint;
    console.log("FFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFF");
    console.log(JSON.stringify(Dt));
    console.log("FFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFF");
    var Bt = JSON.stringify(Dt, null, 2);
    this.S_(this._debug, "__requestAlgorithm envCollect=".concat(Bt));
    var jt = CryptoJS.AES.encrypt(Bt, CryptoJS.enc.Utf8.parse("wm0!@w-s#ll1flo("), {
      iv: CryptoJS.enc.Utf8.parse("0102030405060708"),
    });
    var fr = {
      fingerprint: this._fingerprint,
      appId: this._appId,
      version: this._version,
      timeout: this._timeout,
      env: jt.ciphertext.toString(),
      debug: this._debug,
    };
    var result = await this.im(fr, this._onRequestTokenRemotely);

    var h = result.algo,
      l = result.token,
      p = result.fp;
    var v = this.__parseAlgorithm(l, h);
    if (!v) return;
    var d = this.getSync(this._storageFpKey, 1);
    if (!p || (d && p === d)) {
      var w = this.__parseToken(l, 13, 15);
      var A = parseInt(w, 16);
      var C = 60 * A * 60;
      this.setSync(this._storagetokenKey, CryptoJS.enc.Base64.stringify(CryptoJS.enc.Utf8.parse(l)), { expire: C });
      this.setSync(this._storageAlgnKey, CryptoJS.enc.Base64.stringify(CryptoJS.enc.Utf8.parse(h)), { expire: C });
      this.S_(this._debug, "__requestAlgorithm request success!, token:".concat(l));
    } else {
      this.S_(this._debug, "__requestAlgorithm request success!,  but not save token:".concat(l, ", storageFp:").concat(d, ", fp:").concat(p));
    }
    return;
  }

  async im(t, r) {
    try {
      var { data, status } = await axios({
        url: "https://cactus.jd.com/request_algo",
        method: "post",
        data: {
          version: t.version,
          fp: t.fingerprint,
          appId: t.appId,
          timestamp: Date.now(),
          platform: "web",
          expandParams: t.env,
          fv: "h5_npm_v4.2.0",
        },
        headers: {
          "Content-Type": "application/json;charset=utf-8",
          Origin: "https://cactus.jd.com",
          Host: "cactus.jd.com",
          accept: "*/*",
          "User-Agent": this.userAgent,
        },
      });
      var a = {
        code: status,
        message: "",
      };
      r && r(a);
      if (status == 200 && data && data.data && data.data.result) {
        var f = data.data.result,
          s = f.algo,
          v = f.tk,
          h = f.fp;
        if (s && v) {
          var l = {
            algo: s,
            token: v,
            fp: h,
          };
          return l;
        } else {
          console.log("data.result format error.");
        }
      } else {
        console.log("request params error.");
      }
    } catch (e) {
      var b = e.code,
        w = e.message;
      r &&
        r({
          code: b,
          message: w,
        });
      console.log("request error, ".concat(b, ", ").concat(w));
    }
    return {};
  }

  __checkParams(t) {
    function jm(t) {
      return "[object Object]" === Object.prototype.toString.call(t);
    }
    function Lm(t) {
      return !!jm(t) && !Object.keys(t).length;
    }
    function b_(t) {
      var _m = ["h5st", "_stk", "_ste"];
      for (var r = Object.keys(t), n = 0; n < r.length; n++) {
        var e = r[n];
        if (_m.indexOf(e) >= 0) {
          return !0;
        }
      }
      return !1;
    }

    var b = null;
    if (!this._appId) {
      b = {
        code: this.gb.APPID_ABSENT,
        message: "appId is required",
      };
    }
    if (!jm(t)) {
      b = {
        code: this.gb.UNSIGNABLE_PARAMS,
        message: "params is not a plain object",
      };
    }
    if (Lm(t)) {
      b = {
        code: this.gb.UNSIGNABLE_PARAMS,
        message: "params is empty",
      };
    }
    if (b_(t)) {
      b = {
        code: this.gb.UNSIGNABLE_PARAMS,
        message: "params contains reserved param name.",
      };
    }
    if (b) return this._onSign(b), null;
    var g = Object.keys(t)
      .sort()
      .map(function (r) {
        return {
          key: r,
          value: t[r],
        };
      })
      .filter(function (t) {
        let type = typeof t.value;
        return ("number" == type && !isNaN(t.value)) || "string" == type || "boolean" == type;
      });
    if (g.length === 0) {
      var _ = {
        code: this.gb.UNSIGNABLE_PARAMS,
        message: 'params is empty after excluding "unsafe" params',
      };
      this._onSign(_);
      return null;
    }
    return g;
  }

  __makeSign(t, r) {
    function xb() {
      var t = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : Date.now(),
        e = arguments.length > 1 && void 0 !== arguments[1] ? arguments[1] : "yyyy-MM-dd",
        n = new Date(t),
        r = e,
        o = {
          "M+": n.getMonth() + 1,
          "d+": n.getDate(),
          "D+": n.getDate(),
          "h+": n.getHours(),
          "H+": n.getHours(),
          "m+": n.getMinutes(),
          "s+": n.getSeconds(),
          "w+": n.getDay(),
          "q+": Math.floor((n.getMonth() + 3) / 3),
          "S+": n.getMilliseconds(),
        };
      return (
        /(y+)/i.test(r) && (r = r.replace(RegExp.$1, "".concat(n.getFullYear()).substr(4 - RegExp.$1.length))),
        Object.keys(o).forEach(function (t) {
          if (new RegExp("(".concat(t, ")")).test(r)) {
            var e = "S+" === t ? "000" : "00";
            r = r.replace(RegExp.$1, 1 == RegExp.$1.length ? o[t] : "".concat(e).concat(o[t]).substr("".concat(o[t]).length));
          }
        }),
        r
      );
    }
    function uw(t) {
      var ht = {
        magic: "tk",
        version: "02",
        platform: "w",
        expires: "41",
        producer: "l",
        expr: gw(),
        cipher: fw(t),
      };
      ht.adler32 = cw(ht.magic + ht.version + ht.platform + ht.expires + ht.producer + ht.expr + ht.cipher);
      return ht.magic + ht.version + ht.platform + ht.adler32 + ht.expires + ht.producer + ht.expr + ht.cipher;
    }
    function gw() {
      var G = {
        size: 32,
        dictType: "max",
        customDict: null,
      };
      var N = d_(G);
      var R = ["1", "2", "3"];
      var Y = ["+", "x"];
      var F = 2 + Math.floor(Math.random() * 4);
      var K = "";
      for (var W = 0; W < F; W++) (K += R[Math.floor(3 * Math.random())]), W < F - 1 && (K += Y[Math.floor(2 * Math.random())]);
      K.length < 9 && (K += N.substr(0, 9 - K.length));
      var H = CryptoJS.enc.Utf8.parse(K);
      var q = CryptoJS.enc.Base64.stringify(H);
      return A_(q);
    }
    function d_() {
      var t,
        r = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : {},
        n = r.size,
        e = void 0 === n ? 10 : n,
        o = r.dictType,
        i = void 0 === o ? "number" : o,
        a = r.customDict,
        u = "";
      if (a && "string" == typeof a) t = a;
      else
        switch (i) {
          case "alphabet":
            t = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ";
            break;
          case "max":
            t = "0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ_-";
            break;
          case "number":
          default:
            t = "0123456789";
        }
      for (; e--; ) u += t[(Math.random() * t.length) | 0];
      return u;
    }
    function A_(t) {
      return t.replace(/\+/g, "-").replace(/\//g, "_").replace(/=/g, "");
    }
    function fw(t) {
      d_({
        size: 32,
        dictType: "max",
        customDict: null,
      });
      var J = "";
      var Z = Date.now();
      var V = "z7";
      var $ = "qem7+)g%Dhw5";
      var Q = sw(t, Z, V, $);
      J += lw(Q);
      J += lw(V);
      J += lw($);
      J += xw(Z);
      J += lw(t);
      var X = CryptoJS.enc.Hex.parse(J);
      var tt = CryptoJS.AES.encrypt(X, CryptoJS.enc.Utf8.parse("x6e@RoHi$Fgy7!5k"), { iv: CryptoJS.enc.Utf8.parse("0102030405060708") });
      return A_(CryptoJS.enc.Base64.stringify(tt.ciphertext));
    }
    function sw(t, r, n, e) {
      var nt = new Uint8Array(16);
      nt.forEach(function (r, n, e) {
        e[n] = t.charCodeAt(n);
      });
      var et = pw(r),
        ot = new Uint8Array(2);
      ot.forEach(function (t, r, e) {
        e[r] = n.charCodeAt(r);
      });
      var at = new Uint8Array(12);
      at.forEach(function (t, r, n) {
        n[r] = e.charCodeAt(r);
      });
      var ut = new Uint8Array(38);
      ut.set(ot), ut.set(at, 2), ut.set(et, 14), ut.set(nt, 22);
      var ct = adler32.buf(ut);
      var st = "00000000" + (ct = ct >>> 0).toString(16);
      return st["substr"](st.length - 8);
    }
    function pw(t) {
      var C = (function () {
          var n = new ArrayBuffer(2);
          return new DataView(n).setInt16(0, 256, !0), new Int16Array(n)[0] === 256;
        })(),
        A = Math.floor(t / Math.pow(2, 32)),
        S = t % Math.pow(2, 32),
        z = new ArrayBuffer(8),
        D = new DataView(z);
      return C ? (D.setUint32(0, S, C), D.setUint32(4, A, C)) : (D.setUint32(0, A, C), D.setUint32(4, S, C)), new Uint8Array(z);
    }
    function xw(t) {
      return vw(pw(t));
    }
    function lw(t) {
      var h = new Uint8Array(t.length);
      h.forEach(function (r, n, e) {
        e[n] = t.charCodeAt(n);
      });
      return vw(h);
    }
    function vw(t) {
      return t
        .map(function (t) {
          return "00" + (t & 255).toString(16).slice(-2);
        })
        .join("");
    }
    function cw(t) {
      var h = ADLER32.str(t);
      h >>>= 0;
      var y = "00000000" + h.toString(16);
      return y["substr"](y.length - 8);
    }

    var f = "";
    var b = Date.now();
    var s = xb(b, "yyyyMMddhhmmssSSS");
    var v = s + "74";
    if (this._isNormal) {
      f = this.__genKey(this._token, this._fingerprint, v, this._appId, this.algos).toString() || "";
    } else {
      this._defaultToken = uw(this._fingerprint);
      f = this.__genDefaultKey(this._defaultToken, this._fingerprint, v, this._appId);
    }
    var h = {};
    if (f) {
      var l = this.__genSign(f, t);
      var p = t.map(function (t) {
          return t.key;
        })
        .join(",");
      var d = this.__genSignParams(l, b, s, r);
      var x = {
        key: f,
        signStr: l,
        _stk: p,
        _ste: 1,
        h5st: d,
      };
      console.log("XXXXXXXXXXXXXXXXXXXXXXXX %s",x)

      this.S_(this._debug, "__makeSign, result:" + JSON.stringify(x, null, 2));
      var h = {
        _stk: p,
        _ste: 1,
        h5st: d,
      };
      var g = {
        code: 0,
        message: "success",
      };
      this._onSign(g);
      return h;
    }
    if (this._token || this._defaultToken) {
      var _ = {
        code: this.gb.GENERATE_SIGNATURE_FAILED,
        message: "generate key failed",
      };
      this._onSign(_);
    } else {
      var m = {
        code: this.gb.TOKEN_EMPTY,
        message: "token is empty",
      };
      this._onSign(m);
    }
  }

  __collect() {
    var T = this.Cw(1);
    T.fp = this._fingerprint;
    var P = JSON.stringify(T, null, 2);
    this.S_(this._debug, "__collect envCollect=".concat(P));
    var I = CryptoJS.AES.encrypt(P, CryptoJS.enc.Utf8.parse("DNiHi703B0&17hh1"), {
      iv: CryptoJS.enc.Utf8.parse("0102030405060708"),
    });
    return I.ciphertext.toString();
  }

  async sign(t) {
    try {
      var e = Date.now();
      var o = this.__checkParams(t);
      if (o == null) {
        return t;
      }
      await this.__requestDeps();
      var collectedData = this.__collect();
      var a = this.__makeSign(o, collectedData);
      this.S_(this._debug, "sign elapsed time!".concat(Date.now() - e, "ms"));
      return Object.assign({}, t, a);
    } catch (e) {
      var J = {
        code: this.gb.UNHANDLED_ERROR,
        message: "unknown error",
      };
      this._onSign(J);
      return t;
    }
  }

  getSync(e) {
    return this.map.get(e);
  }

  removeSync(e) {
    this.map.delete(e);
  }

  setSync(k, v) {
    this.map.set(k, v);
  }

  Cw(o) {
    var temp = this;

    function mw(t) {
      if (temp.cookieStr) {
        var r = new RegExp("(^| )" + t + "(?:=([^;]*))?(;|$)"),
          n = temp.cookieStr.match(r);
        if (!n || !n[2]) return "";
        var e = n[2];
        try {
          return /(%[0-9A-F]{2}){2,}/.test(e) ? decodeURIComponent(e) : unescape(e);
        } catch (t) {
          return unescape(e);
        }
      }
    }
    function d_() {
      var t,
        r = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : {},
        n = r.size,
        e = void 0 === n ? 10 : n,
        o = r.dictType,
        i = void 0 === o ? "number" : o,
        a = r.customDict,
        u = "";
      if (a && "string" == typeof a) t = a;
      else
        switch (i) {
          case "alphabet":
            t = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ";
            break;
          case "max":
            t = "0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ_-";
            break;
          case "number":
          default:
            t = "0123456789";
        }
      for (; e--; ) u += t[(Math.random() * t.length) | 0];
      return u;
    }

    var ft = ["pp", "sua", "random", "referer", "v", "extend"];
    //var ft = ["pp", "sua", "random",  "extend"];
    var ct = {};
    var st = function (key, func) {
      try {
        if ((o === 1 && ft.includes(key)) || o === 0) {
          ct[key] = func();
        }
      } catch (e) {
        console.log(e);
      }
    };

    // st("wc", function (t) {
    //   //   return /Chrome/.test(window.navigator.userAgent) && !window.chrome ? 1 : 0;
    //   return 0;
    // });
    // st("wd", function (t) {
    //   //   return navigator.webdriver ? 1 : 0;
    //   return 0;
    // });
    // st("l", function (t) {
    //   //   return navigator.language;
    //   return "zh-CN";
    // });
    // st("ls", function (t) {
    //   //   return navigator.languages.join(",");
    //   return "zh-CN,zh";
    // });
    // st("ml", function (t) {
    //   //   return navigator.mimeTypes.length;
    //   return 0;
    // });
    // st("pl", function (t) {
    //   //   return navigator.plugins.length;
    //   return 0;
    // });
    // st("av", function (t) {
    //   //   return navigator.appVersion;
    //   let av = temp.userAgent.match(/(?<=\/)[0-9]\.0[^'"\n]+/g);
    //   return av.length > 0 ? av[0] : "";
    // });
    // st("ua", function (t) {
    //   //   return window.navigator.userAgent;
    //   return temp.userAgent;
    // });
    st("sua", function (t) {
      var regex = new RegExp("Mozilla/5.0 \\((.*?)\\)");
      //   var matches = window.navigator.userAgent.match(regex);
      var matches = temp.userAgent.match(regex);
      return matches && matches[1] ? matches[1] : "";
    });
    st("pp", function (t) {
      var u = {};
      var i = mw("pwdt_id");
      var c = mw("pin");
      var a = mw("pt_pin");
      i && (u.p1 = i);
      c && (u.p2 = c);
      //a && (u.p3 = a);
      return u;
    });
    st("extend", function () {
      // var e = navigator.permissions.query({
      //     name: "notifications"
      // })
      // var Y = 0;
      // ("cdc_adoQpoasnfa76pfcZLmcfl_Array" in window || "cdc_adoQpoasnfa76pfcZLmcfl_Promise" in window || "cdc_adoQpoasnfa76pfcZLmcfl_Symbol" in window) && (Y |= 1);
      // ("$chrome_asyncScriptInfo" in window.document || "$cdc_asdjflasutopfhvcZLmcfl_" in window.document) && (Y |= 2);
      // var n = {
      //     pm: Notification.permission === "denied" && e.state === "prompt" ? 1 : 0,
      //     wd: window.navigator.webdriver ? 1 : 0,
      //     l: !navigator.languages || navigator.languages.length === 0 ? 1 : 0,
      //     ls: navigator.plugins.length,
      //     bu1: rm,
      //     wk: Y
      // }
      // return n;
      //return { bu1: "0.1.9", l: 0, ls: 0, wd: 0, wk: 0 };
      return {"pm": 0,"wd": 0,"l": 0,"ls": 0,"wk": 0,"bu1": "9.9.9"};
    });
    // st("pp1", function (t) {
    //   var c = mw("pwdt_id");
    //   var u = mw("pin");
    //   var a = mw("pt_pin");
    //   if (!c && !u && !a) {
    //     var i = temp.cookieStr;
    //     if (i) return i;
    //   }
    //   return "";
    // });
    // st("pm", function () {
    //   //   var result = navigator.permissions.query({ name: "notifications" });
    //   //   return { ps: result.state, np: Notification.permission };
    //   return {
    //     ps: "prompt",
    //     np: "default",
    //   };
    // });
    // st("w", function (t) {
    //   //   return window.screen.width;
    //   return 1536;
    // });
    // st("h", function (t) {
    //   //   return window.screen.height;
    //   return 864;
    // });
    // st("ow", function (t) {
    //   //   return window.outerWidth;
    //   return 1536;
    // });
    // st("oh", function (t) {
    //   //   return window.outerHeight;
    //   return 864;
    // });
    // st("url", function (t) {
    //   //   return location.href;
    //   return temp.url;
    // });
    // st("og", function (t) {
    //   //   return location.origin;
    //   return temp.origin;
    // });
    // st("pf", function (t) {
    //   //   return window.platform;
    //   return undefined;
    // });
    // st("pr", function (t) {
    //   //   return window.devicePixelRatio;
    //   return 1.25;
    // });
    // st("re", function (t) {
    //   //   return document.referrer;
    //   return "";
    // });
    st("random", function (t) {
      return d_({ size: 10, dictType: "max", customDict: null });
    });
    st("referer", function (t) {
      //   var i = new RegExp("[^?]*"),
      //     u = document.referrer.match(i);
      //   if (!u || !u[0]) return "";
      //   return u[0];
      return "";
    });
    st("v", function (t) {
      return "h5_npm_v4.2.0";
    });
    // console.log("FFFFFFFFFFFFFF")
    // console.log(ct);
    // console.log("SSSSSSSSSSSSSSSSSSSS")
    return ct;
  }
}

async function main() {
  var cookieStr = "shshshfpa=76886ac7-a4c5-687e-ed75-2a6a97fa400d-1725023285; shshshfpx=76886ac7-a4c5-687e-ed75-2a6a97fa400d-1725023285; jcap_dvzw_fp=h3WOO6CWdVqM5BalULg7BKEd5dXAo8R7MCirTT1lx0NOjxH9fKcAFWcIeeQF4k1isP2dwP_7e_41WR_fxAPNfw==; __jdu=17250232628661145797770; areaId=18; PCSYCityID=CN_430000_430200_0;thor=D5C6FB07F71BD6A55E71C5FB1C502DA4F15391740B83FE7A1C454F4DEAAAAD09136BF995DB2C8744607C819E636139F6A071A2AA6E49F27E553FBAD7744AA82D5C4FE1A7D399796F4E4954FE1A4676A36D879A089CBECF17FE88CFA14DB2F4A8840283B223CCBD75D2EBE92760BE77BE88887B9D6C26FBEA96E7CF0CA6CF84D33354CF611E0479CC5F76218858AD844807E6D3A12D31F2EBAF3552636B443B89; light_key=AASBKE7rOxgWQziEhC_QY6yaygBW6Bz87VQ-QoIegQYiID4mBm-dgbyD71xojbYpaej392YF; pinId=SoNNql2wV34qNipFWW2KWg; pin=jd_chKbWxeUGCPn; unick=0z71f85mzg5tac; _tp=s9%2BStz%2BZOrpIxWY3UuW9aA%3D%3D; _pst=jd_chKbWxeUGCPn; retina=1; cid=9; webp=1; mba_muid=17250232628661145797770; visitkey=8521920287988887885; sc_width=412; equipmentId=AJX63VVF27FWOYY2C2AK2IDE7Z3EKH2Q4OAYU4LN7PNRBJGFDMEDADCC7GNEI2UOVSUMAAOCIU2U3H6K2G7OGARDB4; whwswswws=; ipLoc-djd=18-1488-1492-30666;  3AB9D23F7A4B3C9B=AJX63VVF27FWOYY2C2AK2IDE7Z3EKH2Q4OAYU4LN7PNRBJGFDMEDADCC7GNEI2UOVSUMAAOCIU2U3H6K2G7OGARDB4; wxa_level=1;  cartNum=0; downloadAppPlugIn_downCloseDate=1725380775198_86400000; fingerprint=0281a45c990e0e93cf64a4548eb76b52; pt_key=AAJm1zkxADDp0YQEfYAy2taeL4ihRy6IyU9-JFC13v5ITiqWL9bCkn5PmBHIOv_MItzWV4948I8; pt_pin=jd_chKbWxeUGCPn; pt_token=fy8y03o0; pwdt_id=jd_chKbWxeUGCPn; sfstoken=tk01m87491acda8sM3gxKzJ4MmVjJm9mMLzABXHcEvKEgoPt53c/BE/h7FC3/2+yYZ2SUXifLFC1XOeHvUN8mGDypML3;  jxsid=17254219396940589363; PPRD_P=UUID.17250232628661145797770-LOGID.1725435484117.36298198; autoOpenApp_downCloseDate_autoOpenApp_autoPromptly=1725435484253_1; chat.jd.com=20170206; __jdc=76161171; share_cpin=; share_open_id=; share_gpin=; channel=; source_module=; erp=; appCode=ms0ca95114; wqmnx1=MDEyNjM4Ni9tL19qbGQ2YzI9X3NEZXRGZHclJWwuRkQxOE01byBPbCBwaS5NIFYxaTRpM1luQjFVRiFI; __jda=76161171.17250232628661145797770.1725023263.1725470199.1725476706.32; __jdb=76161171.1.17250232628661145797770|32.1725476706; mba_sid=1725476706899685830700777250.1; __wga=1725476709326.1725476709326.1725467944227.1725023672615.1.20; jxsid_s_t=1725476709362; 3AB9D23F7A4B3CSS=jdd03AJX63VVF27FWOYY2C2AK2IDE7Z3EKH2Q4OAYU4LN7PNRBJGFDMEDADCC7GNEI2UOVSUMAAOCIU2U3H6K2G7OGARDB4AAAAMRXZWRPYYAAAAACA2OCDSPUCOKBAX; _gia_d=1; shshshfpb=BApXSaL9lvfRAfsTXVoKGyl-8Qx0sPPHXBmdDNapu9xJ1PdZfQoXeuRjclC7PFKVDfeD8B6fn;";
  var userAgent ="Mozilla/5.0 (iPhone; CPU iPhone OS 16_6 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/16.6 Mobile/15E148 Safari/604.1";
  var h5stObj = new h5st(cookieStr, userAgent, {
    debug: false,
    preRequest: false,
    timeout: 2,
    appId: "2088b", 
    onSign: function onSign(e) {
      e.code;
    },
    onRequestTokenRemotely: function onRequestTokenRemotely(e) {
      e.code, e.message;
    },
    onRequestToken: function onRequestToken(e) {
      e.code, e.message;
    },
  });

  var body = {"appType":3,"bizType":"2","deviceUUId":"","platform":3,"sceneval":"2","source":"m_inner_myJd.orderFloor_orderlist","systemBaseInfo":"{\"pixelRatio\":3,\"screenWidth\":390,\"screenHeight\":844,\"windowWidth\":390,\"windowHeight\":844,\"statusBarHeight\":null,\"safeArea\":{\"bottom\":0,\"height\":0,\"left\":0,\"right\":0,\"top\":0,\"width\":0},\"bluetoothEnabled\":false,\"locationEnabled\":false,\"wifiEnabled\":false,\"deviceOrientation\":\"portrait\",\"benchmarkLevel\":-1,\"brand\":\"iPhone\",\"model\":\"iPhone\",\"system\":\"iOS\",\"platform\":\"Win32\",\"SDKVersion\":\"\",\"enableDebug\":false,\"language\":\"zh-CN\",\"version\":\"\",\"theme\":\"dark\",\"fontSizeSetting\":null,\"albumAuthorized\":false,\"cameraAuthorized\":false,\"locationAuthorized\":false,\"microphoneAuthorized\":false,\"notificationAuthorized\":false,\"notificationAlertAuthorized\":false,\"notificationBadgeAuthorized\":false,\"notificationSoundAuthorized\":false,\"phoneCalendarAuthorized\":false,\"locationReducedAccuracy\":false,\"environment\":\"\"}","orderListTag":1,"curTab":"waitPay","keyword":"","page":1,"pageSize":10,"tenantCode":"jgm","bizModelCode":"2","bizModeClientType":"M","bizModeFramework":"Taro","externalLoginType":1,"token":"3852b12f8c4d869b7ed3e2b3c68c9436","appId":"m91d27dbf599dff74"};
  var dt=new Date();
  var a = await h5stObj.sign({
    functionId: "m_core",
    appid: "order_list_m",
    clientVersion: "",
    client: "Win32",
    t:dt,
    body: CryptoJS.SHA256(JSON.stringify(body)).toString(),
  });

  //console.log(a);
//   if(1==1)
//   return;

  var params =
  {
      equipmentId: 'AJX63VVF27FWOYY2C2AK2IDE7Z3EKH2Q4OAYU4LN7PNRBJGFDMEDADCC7GNEI2UOVSUMAAOCIU2U3H6K2G7OGARDB4',
      bizId: 'gold_m',
      mode: 'strict',
      o: 'trade.m.jd.com/order/orderlist_jdm.shtml',
      qs: 'sceneval=2&jxsid=17254219396940589363&appCode=ms0ca95114&orderType=all&ptag=7155.1.11&source=m_inner_myJd.orderFloor_orderlist',
      jsTk: '',
      userAgent:userAgent,
      href:"https://trade.m.jd.com/order/orderlist_jdm.shtml?sceneval=2&jxsid=17254219396940589363&appCode=ms0ca95114&orderType=all&ptag=7155.1.11&source=m_inner_myJd.orderFloor_orderlist",
  };
  var token = jdToken.doCollectFp(params);
  console.log(token);

  var jdtokenRequestUrl="https://jra.jd.com/jsTk.do?a="+encodeURIComponent(token.bParams);
  var postData={d:token.dParams};
  console.log(jdtokenRequestUrl);
  const { data, status } = await axios({
    method: "post",
    url: jdtokenRequestUrl,
    data:postData,
    headers: {
      "origin": "https://trade.m.jd.com",
      "cookie":cookieStr,
      "x-referer-page":"https://trade.m.jd.com/order/n_detail_jdm.shtml",
      "User-Agent": userAgent,
      "x-rp-client":"h5_1.0.0",
      "content-type":"application/x-www-form-urlencoded",
    },
  });
  


 requestUrl="https://api.m.jd.com/client.action?t="+dt+"&loginType=2&loginWQBiz=golden-trade&appid=m_core&client=Win32&clientVersion=&build=&osVersion=iOS&screen=390*844&networkType=4g&partner=&forcebot=&d_brand=iPhone&d_model=iPhone&lang=zh-CN&scope=&sdkVersion=&openudid=&uuid=17250232628661145797770&x-api-eid-token="+data.data.token+"&functionId=order_list_m&body="+encodeURIComponent(JSON.stringify(body))+"&h5st="+encodeURIComponent(a.h5st);
 console.log(requestUrl);
 //
//cookie = 'shshshfpa=4b770525-82d6-9dc2-191f-49213e2808af-1693276292; shshshfpx=4b770525-82d6-9dc2-191f-49213e2808af-1693276292; pinId=LxgJESmodokf_AhbrnKClw; pin=jinshiyuan1123; unick=jinshiyuan1123; _tp=qTmSS0pjZ%2BpSltacjzri4w%3D%3D; _pst=jinshiyuan1123; __jdv=76161171|direct|-|none|-|1697592319693; mba_muid=16934744924511616091388; user-key=11a484e2-f35f-4a4f-9827-c95f59dd47eb; __jdu=16983895067841432816868; TrackID=1HFZlWtgARPlbI1mTVFpwZ3u_SB09-1Q_bI6WyUS8IpkISJ6MmmNv6LbsWxET-X7MWNjLiNaACNKV-1Vht0fWcs89QNcw4qXk4Rqhs0xYx08; thor=EEFDDDF33A2E1B1574F38D3AEF89005246E4DF7F7341012C233F05A1CE1050707F2B2C7784309754BA0DF8532A4DF03135775FD5699D900B1443BD2FB2076E4CE284DDE4DF56071F679BE3AC90F368F539C29EBBA1F6CAEB5149648AA360E7948AB67D04395B9891D618EC1E696E8BC2635F84B0B83609EB90421520EB98293C7DF602769976770087AF3D1CBA2510AB; flash=2_7fZdpf_i3XDxiQCGotfuowSRGt_716ZFdTPZqfOjcmExH9AiqitrXU-JV6KP5hIbOio7x8_X8iS7NHJGVpeQRnyZjGY7IVA643W1OyW4DRq*; areaId=12; ipLoc-djd=12-904-907-50559; joyya=1698717531.1698727780.24.0oyeyhv; 3AB9D23F7A4B3C9B=7XKWKVW52FZTKEZTBRHLN5KSUEOMU4POIZAQBRA6ZODCWLPXFZ3VTUJEEWD6VNMV5C6RX3F4J4JIIGCLO65JD33MS4; 3AB9D23F7A4B3CSS=jdd037XKWKVW52FZTKEZTBRHLN5KSUEOMU4POIZAQBRA6ZODCWLPXFZ3VTUJEEWD6VNMV5C6RX3F4J4JIIGCLO65JD33MS4AAAAMLRDXCJ6YAAAAAD7HKTBXNJK6MCMX; __jda=122270672.16983895067841432816868.1698389507.1698735389.1698809391.6; __jdc=122270672; shshshfpb=AAjAp7oiLEncFJYLWncIZH0khPigIrxaTJ2KSSQAAAAA'
  var  res = await axios({
    method: "get",
    url: requestUrl,
    headers: {
      "origin": "https://trade.m.jd.com",
      "cookie":cookieStr,
      "x-referer-page":"https://trade.m.jd.com/order/n_detail_jdm.shtml",
      "User-Agent": userAgent,
      "x-rp-client":"h5_1.0.0"
    },
  });

   console.log(res.data);
   console.log(res.status);

}

main();


// module.exports = {
//     getH5st,
//     sha256
// }