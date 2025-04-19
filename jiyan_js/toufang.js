const axios = require("axios");
const id = '92';
const company = '北京绮遇网络科技有限公司';
const appName = '飞仙诀';
const license = '京ICP备2024081102号-1';
const address = '北京市通州区临河里街道净水园15号楼2层819';
const phone = '';

const site = 'https://bjqiyuwl.cn';
const agreement = site+'/index.php?ac=help&op=agreement';
const policy = site+'/index.php?ac=help&op=privacyPolicy';

const title = "《"+appName+"》" ;
const keywords = '';//"天剑奇缘,天剑奇缘官网,天剑奇缘礼包,天剑奇缘攻略,天剑奇,天剑,天,御剑红尘,免费回合,回合制网游,回合制游戏,q版游戏,女生玩的游戏,女生多的游戏,省钱游戏,最新网络游戏,天剑奇缘好玩吗" ;


	var regindex = 1;
	var accountOk = false;
	var opswOk = false;
	var repswOk = false;
	var safemailOk = false;
	var yxts_index = 0;
	var islogin = false;
	var playGameUrl = site+'/index.php?ac=play&id='+id;

	var reg = /^([a-zA-Z0-9_]{6,20}$)/;
	var reg_psw = /[=&\s]+/;
	var sucsname = '';

	function parmasAuthCode(obj) {
        var local_href="https://bjqiyuwl.cn/template/web/proj/index.html";
		let str = local_href.substring(local_href.indexOf('?') + 1);
		let strs = str.split('&');
		var channelUid = strs[strs.length - 1].split('=')[1];
		if (channelUid && strs[strs.length - 1].split('=')[0] ==
			'channelUid') { //从连接获取到channelUid
			if (channelUid != uni.getStorageSync('channelUid')) { //跟缓存对比，不一致就存新的
				uni.setStorageSync('channelUid', channelUid);
			}
		}
		var gameInfo = {
			"channelId": channelUid
		}
		var params = {};
		if (params.gameInfo) {
			params.gameInfo.channelId = channelUid;
		} else {
			params = Object.assign({}, {
				"gameInfo": gameInfo
			}, obj);
		}
		params.time = new Date().getTime().toString().slice(0, 10);
		params.ip = "192.168.1.1";
		params.gameInfo.gameId = 0;
		params.gameInfo.versionCode = '';
		params.gameInfo.gameVersion = '0';
		params.mobileInfo = {
			"model": "",
			"manufacturer": "",
			"osversion": "",
			"androidid": "",
		}
		params.gameInfo.versionCode = "";
		params.osType = "";
		params.apiType = "weiduan";
		if (obj) {
			params = Object.assign({}, params, obj);
		}
		var authcodeStr = encodeURIComponent(auth(JSON.stringify(params), "123456789",
			"ENCODE"));
		return authcodeStr
	}


	function auth(str, key, type) {
		/**
		 * @param    string      str 加密内容
		 * @param    string      key 密钥
		 * @param    string      type 方式
		 */
		if (type == 'ENCODE') { //加密
			return authcode(encodeURIComponent(str), "ENCODE", key);
		} else if (type == 'DECODE') { //解密
			return authcode(str, "DECODE", key);
		} else if (type == 'a_base64') { //base64编码
			return base64_encode(str);
		} else if (type == 'b_base64') { //base64解码
			return base64_decode(str);
		}
		/**
		 * @param    string      str 加密内容
		 * @param    string      operation 加密动作
		 * @param    string      key 密钥
		 * @param    int         expiry 有效时间秒
		 * @return   string      加密串
		 */
		function authcode(str, operation, key) {
			//初始化
			let tmpstr, tmp

			var operation = operation ? operation : 'DECODE';
			var key = key ? key : '';
			var expiry = expiry ? expiry : 0;

			var ckey_length = 4;
			key = md5(key);

			// 密匙a会参与加解密
			var keya = md5(key.substr(0, 16));
			// 密匙b会用来做数据完整性验证
			var keyb = md5(key.substr(16, 16));
			// 密匙c用于变化生成的密文
			// IE下不支持substr第一个参数为负数的情况
			if (ckey_length) {
				if (operation == 'DECODE') {
					var keyc = str.substr(0, ckey_length);
				} else {
					var md5_time = md5(microtime());
					var start = md5_time.length - ckey_length;
					var keyc = md5_time.substr(start, ckey_length)
				}
			} else {
				var keyc = '';
			}
			// 参与运算的密匙
			var cryptkey = keya + md5(keya + keyc);

			var strbuf;

			if (operation == 'DECODE') {
				str = str.substr(ckey_length);
				strbuf = base64_decode(str);
				//string = b.toString();
			} else {
				expiry = expiry ? expiry + time() : 0;
				tmpstr = expiry.toString();
				if (tmpstr.length >= 10)
					str = tmpstr.substr(0, 10) + md5(str + keyb).substr(0, 16) + str;
				else {
					var count = 10 - tmpstr.length;
					for (var i = 0; i < count; i++) {
						tmpstr = '0' + tmpstr;
					}
					str = tmpstr + md5(str + keyb).substr(0, 16) + str;
				}
				strbuf = str;
			}


			var box = new Array(256);
			for (var i = 0; i < 256; i++) {
				box[i] = i;
			}
			var rndkey = new Array();
			// 产生密匙簿
			for (var i = 0; i < 256; i++) {
				rndkey[i] = cryptkey.charCodeAt(i % cryptkey.length);
			}
			// 用固定的算法，打乱密匙簿，增加随机性，好像很复杂，实际上对并不会增加密文的强度
			for (var j = i = 0; i < 256; i++) {
				j = (j + box[i] + rndkey[i]) % 256;
				tmp = box[i];
				box[i] = box[j];
				box[j] = tmp;
			}

			// 核心加解密部分
			var s = '';
			//IE下不支持直接通过下标访问字符串的字符，需要先转换为数组
			strbuf = strbuf.split('');
			for (var a = j = i = 0; i < strbuf.length; i++) {
				a = (a + 1) % 256;
				j = (j + box[a]) % 256;
				tmp = box[a];
				box[a] = box[j];
				box[j] = tmp;
				// 从密匙簿得出密匙进行异或，再转成字符
				s += chr(ord(strbuf[i]) ^ (box[(box[a] + box[j]) % 256]));
			}

			if (operation == 'DECODE') {
				if ((s.substr(0, 10) == 0 || s.substr(0, 10) - time() > 0) && s.substr(10, 16) == md5(s.substr(
						26) + keyb)
					.substr(0,
						16)) {
					s = s.substr(26);
				} else {
					s = '';
				}

			} else {
				s = base64_encode(s);
				var regex = new RegExp('=', "g");
				s = s.replace(regex, '');
				s = keyc + s;
			}
			if (s.includes('%')) {
				return s;
			} else {
				return decodeURIComponent(s);
			}
		}

		function time() {
			var unixtime_ms = new Date().getTime();
			return parseInt(unixtime_ms / 1000);
		}

		function microtime(get_as_float) {
			var unixtime_ms = new Date().getTime();
			var sec = parseInt(unixtime_ms / 1000);
			return get_as_float ? (unixtime_ms / 1000) : (unixtime_ms - (sec * 1000)) / 1000 + ' ' + sec;
		}

		function chr(s) {
			return String.fromCharCode(s);
		}

		function ord(s) {
			return s.charCodeAt();
		}

		function md5(str) {
			return hex_md5(str);
		}


	}

	var hexcase = 0;

	function hex_md5(a) {
		return rstr2hex(rstr_md5(str2rstr_utf8(a)))
	}

	function hex_hmac_md5(a, b) {
		return rstr2hex(rstr_hmac_md5(str2rstr_utf8(a), str2rstr_utf8(b)))
	}

	function md5_vm_test() {
		return hex_md5("abc").toLowerCase() == "900150983cd24fb0d6963f7d28e17f72"
	}

	function rstr_md5(a) {
		return binl2rstr(binl_md5(rstr2binl(a), a.length * 8))
	}

	function rstr_hmac_md5(c, f) {
		var e = rstr2binl(c);
		if (e.length > 16) {
			e = binl_md5(e, c.length * 8)
		}
		var a = Array(16),
			d = Array(16);
		for (var b = 0; b < 16; b++) {
			a[b] = e[b] ^ 909522486;
			d[b] = e[b] ^ 1549556828
		}
		var g = binl_md5(a.concat(rstr2binl(f)), 512 + f.length * 8);
		return binl2rstr(binl_md5(d.concat(g), 512 + 128))
	}

	function rstr2hex(c) {
		try {
			hexcase
		} catch (g) {
			hexcase = 0
		}
		var f = hexcase ? "0123456789ABCDEF" : "0123456789abcdef";
		var b = "";
		var a;
		for (var d = 0; d < c.length; d++) {
			a = c.charCodeAt(d);
			b += f.charAt((a >>> 4) & 15) + f.charAt(a & 15)
		}
		return b
	}

	function str2rstr_utf8(c) {
		var b = "";
		var d = -1;
		var a, e;
		while (++d < c.length) {
			a = c.charCodeAt(d);
			e = d + 1 < c.length ? c.charCodeAt(d + 1) : 0;
			if (55296 <= a && a <= 56319 && 56320 <= e && e <= 57343) {
				a = 65536 + ((a & 1023) << 10) + (e & 1023);
				d++
			}
			if (a <= 127) {
				b += String.fromCharCode(a)
			} else {
				if (a <= 2047) {
					b += String.fromCharCode(192 | ((a >>> 6) & 31), 128 | (a & 63))
				} else {
					if (a <= 65535) {
						b += String.fromCharCode(224 | ((a >>> 12) & 15), 128 | ((a >>> 6) & 63), 128 | (a &
							63))
					} else {
						if (a <= 2097151) {
							b += String.fromCharCode(240 | ((a >>> 18) & 7), 128 | ((a >>> 12) & 63), 128 | ((
									a >>> 6) &
								63), 128 | (a & 63))
						}
					}
				}
			}
		}
		return b
	}

	function rstr2binl(b) {
		var a = Array(b.length >> 2);
		for (var c = 0; c < a.length; c++) {
			a[c] = 0
		}
		for (var c = 0; c < b.length * 8; c += 8) {
			a[c >> 5] |= (b.charCodeAt(c / 8) & 255) << (c % 32)
		}
		return a
	}

	function binl2rstr(b) {
		var a = "";
		for (var c = 0; c < b.length * 32; c += 8) {
			a += String.fromCharCode((b[c >> 5] >>> (c % 32)) & 255)
		}
		return a
	}

	function binl_md5(p, k) {
		p[k >> 5] |= 128 << ((k) % 32);
		p[(((k + 64) >>> 9) << 4) + 14] = k;
		var o = 1732584193;
		var n = -271733879;
		var m = -1732584194;
		var l = 271733878;
		for (var g = 0; g < p.length; g += 16) {
			var j = o;
			var h = n;
			var f = m;
			var e = l;
			o = md5_ff(o, n, m, l, p[g + 0], 7, -680876936);
			l = md5_ff(l, o, n, m, p[g + 1], 12, -389564586);
			m = md5_ff(m, l, o, n, p[g + 2], 17, 606105819);
			n = md5_ff(n, m, l, o, p[g + 3], 22, -1044525330);
			o = md5_ff(o, n, m, l, p[g + 4], 7, -176418897);
			l = md5_ff(l, o, n, m, p[g + 5], 12, 1200080426);
			m = md5_ff(m, l, o, n, p[g + 6], 17, -1473231341);
			n = md5_ff(n, m, l, o, p[g + 7], 22, -45705983);
			o = md5_ff(o, n, m, l, p[g + 8], 7, 1770035416);
			l = md5_ff(l, o, n, m, p[g + 9], 12, -1958414417);
			m = md5_ff(m, l, o, n, p[g + 10], 17, -42063);
			n = md5_ff(n, m, l, o, p[g + 11], 22, -1990404162);
			o = md5_ff(o, n, m, l, p[g + 12], 7, 1804603682);
			l = md5_ff(l, o, n, m, p[g + 13], 12, -40341101);
			m = md5_ff(m, l, o, n, p[g + 14], 17, -1502002290);
			n = md5_ff(n, m, l, o, p[g + 15], 22, 1236535329);
			o = md5_gg(o, n, m, l, p[g + 1], 5, -165796510);
			l = md5_gg(l, o, n, m, p[g + 6], 9, -1069501632);
			m = md5_gg(m, l, o, n, p[g + 11], 14, 643717713);
			n = md5_gg(n, m, l, o, p[g + 0], 20, -373897302);
			o = md5_gg(o, n, m, l, p[g + 5], 5, -701558691);
			l = md5_gg(l, o, n, m, p[g + 10], 9, 38016083);
			m = md5_gg(m, l, o, n, p[g + 15], 14, -660478335);
			n = md5_gg(n, m, l, o, p[g + 4], 20, -405537848);
			o = md5_gg(o, n, m, l, p[g + 9], 5, 568446438);
			l = md5_gg(l, o, n, m, p[g + 14], 9, -1019803690);
			m = md5_gg(m, l, o, n, p[g + 3], 14, -187363961);
			n = md5_gg(n, m, l, o, p[g + 8], 20, 1163531501);
			o = md5_gg(o, n, m, l, p[g + 13], 5, -1444681467);
			l = md5_gg(l, o, n, m, p[g + 2], 9, -51403784);
			m = md5_gg(m, l, o, n, p[g + 7], 14, 1735328473);
			n = md5_gg(n, m, l, o, p[g + 12], 20, -1926607734);
			o = md5_hh(o, n, m, l, p[g + 5], 4, -378558);
			l = md5_hh(l, o, n, m, p[g + 8], 11, -2022574463);
			m = md5_hh(m, l, o, n, p[g + 11], 16, 1839030562);
			n = md5_hh(n, m, l, o, p[g + 14], 23, -35309556);
			o = md5_hh(o, n, m, l, p[g + 1], 4, -1530992060);
			l = md5_hh(l, o, n, m, p[g + 4], 11, 1272893353);
			m = md5_hh(m, l, o, n, p[g + 7], 16, -155497632);
			n = md5_hh(n, m, l, o, p[g + 10], 23, -1094730640);
			o = md5_hh(o, n, m, l, p[g + 13], 4, 681279174);
			l = md5_hh(l, o, n, m, p[g + 0], 11, -358537222);
			m = md5_hh(m, l, o, n, p[g + 3], 16, -722521979);
			n = md5_hh(n, m, l, o, p[g + 6], 23, 76029189);
			o = md5_hh(o, n, m, l, p[g + 9], 4, -640364487);
			l = md5_hh(l, o, n, m, p[g + 12], 11, -421815835);
			m = md5_hh(m, l, o, n, p[g + 15], 16, 530742520);
			n = md5_hh(n, m, l, o, p[g + 2], 23, -995338651);
			o = md5_ii(o, n, m, l, p[g + 0], 6, -198630844);
			l = md5_ii(l, o, n, m, p[g + 7], 10, 1126891415);
			m = md5_ii(m, l, o, n, p[g + 14], 15, -1416354905);
			n = md5_ii(n, m, l, o, p[g + 5], 21, -57434055);
			o = md5_ii(o, n, m, l, p[g + 12], 6, 1700485571);
			l = md5_ii(l, o, n, m, p[g + 3], 10, -1894986606);
			m = md5_ii(m, l, o, n, p[g + 10], 15, -1051523);
			n = md5_ii(n, m, l, o, p[g + 1], 21, -2054922799);
			o = md5_ii(o, n, m, l, p[g + 8], 6, 1873313359);
			l = md5_ii(l, o, n, m, p[g + 15], 10, -30611744);
			m = md5_ii(m, l, o, n, p[g + 6], 15, -1560198380);
			n = md5_ii(n, m, l, o, p[g + 13], 21, 1309151649);
			o = md5_ii(o, n, m, l, p[g + 4], 6, -145523070);
			l = md5_ii(l, o, n, m, p[g + 11], 10, -1120210379);
			m = md5_ii(m, l, o, n, p[g + 2], 15, 718787259);
			n = md5_ii(n, m, l, o, p[g + 9], 21, -343485551);
			o = safe_add(o, j);
			n = safe_add(n, h);
			m = safe_add(m, f);
			l = safe_add(l, e)
		}
		return Array(o, n, m, l)
	}

	function md5_cmn(h, e, d, c, g, f) {
		return safe_add(bit_rol(safe_add(safe_add(e, h), safe_add(c, f)), g), d)
	}

	function md5_ff(g, f, k, j, e, i, h) {
		return md5_cmn((f & k) | ((~f) & j), g, f, e, i, h)
	}

	function md5_gg(g, f, k, j, e, i, h) {
		return md5_cmn((f & j) | (k & (~j)), g, f, e, i, h)
	}

	function md5_hh(g, f, k, j, e, i, h) {
		return md5_cmn(f ^ k ^ j, g, f, e, i, h)
	}

	function md5_ii(g, f, k, j, e, i, h) {
		return md5_cmn(k ^ (f | (~j)), g, f, e, i, h)
	}

	function safe_add(a, d) {
		var c = (a & 65535) + (d & 65535);
		var b = (a >> 16) + (d >> 16) + (c >> 16);
		return (b << 16) | (c & 65535)
	}

	function bit_rol(a, b) {
		return (a << b) | (a >>> (32 - b))
	};

	function base64_encode(str) {
		var base64EncodeChars = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/";
		var out, i, len;
		var c1, c2, c3;
		len = str.length;
		i = 0;
		out = "";
		while (i < len) {
			c1 = str.charCodeAt(i++) & 0xff;
			if (i == len) {
				out += base64EncodeChars.charAt(c1 >> 2);
				out += base64EncodeChars.charAt((c1 & 0x3) << 4);
				out += "==";
				break;
			}
			c2 = str.charCodeAt(i++);
			if (i == len) {
				out += base64EncodeChars.charAt(c1 >> 2);
				out += base64EncodeChars.charAt(((c1 & 0x3) << 4) | ((c2 & 0xF0) >> 4));
				out += base64EncodeChars.charAt((c2 & 0xF) << 2);
				out += "=";
				break;
			}
			c3 = str.charCodeAt(i++);
			out += base64EncodeChars.charAt(c1 >> 2);
			out += base64EncodeChars.charAt(((c1 & 0x3) << 4) | ((c2 & 0xF0) >> 4));
			out += base64EncodeChars.charAt(((c2 & 0xF) << 2) | ((c3 & 0xC0) >> 6));
			out += base64EncodeChars.charAt(c3 & 0x3F);
		}
		return out;
	}

	function base64_decode(str) {
		var base64DecodeChars = new Array(-1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -
			1, -1, -1, -
			1,
			-1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, 62, -1,
			-1, -1, 63,
			52, 53,
			54, 55, 56, 57, 58, 59, 60, 61, -1, -1, -1, -1, -1, -1, -1, 0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10,
			11, 12, 13,
			14, 15, 16,
			17, 18, 19, 20, 21, 22, 23, 24, 25, -1, -1, -1, -1, -1, -1, 26, 27, 28, 29, 30, 31, 32, 33, 34,
			35, 36, 37,
			38, 39,
			40, 41, 42, 43, 44, 45, 46, 47, 48, 49, 50, 51, -1, -1, -1, -1, -1);
		var c1, c2, c3, c4;
		var i, len, out;
		len = str.length;
		i = 0;
		out = "";
		while (i < len) {
			do {
				c1 = base64DecodeChars[str.charCodeAt(i++) & 0xff];
			} while (i < len && c1 == -1);
			if (c1 == -1)
				break;
			do {
				c2 = base64DecodeChars[str.charCodeAt(i++) & 0xff];
			} while (i < len && c2 == -1);
			if (c2 == -1)
				break;
			out += String.fromCharCode((c1 << 2) | ((c2 & 0x30) >> 4));
			do {
				c3 = str.charCodeAt(i++) & 0xff;
				if (c3 == 61)
					return out;
				c3 = base64DecodeChars[c3];
			} while (i < len && c3 == -1);
			if (c3 == -1)
				break;
			out += String.fromCharCode(((c2 & 0XF) << 4) | ((c3 & 0x3C) >> 2));
			do {
				c4 = str.charCodeAt(i++) & 0xff;
				if (c4 == 61)
					return out;
				c4 = base64DecodeChars[c4];
			} while (i < len && c4 == -1);
			if (c4 == -1)
				break;
			out += String.fromCharCode(((c3 & 0x03) << 6) | c4);
		}
		return out;
	}

	function utf16to8(str) {
		var out, i, len, c;
		out = "";
		len = str.length;
		for (i = 0; i < len; i++) {
			c = str.charCodeAt(i);
			if ((c >= 0x0001) && (c <= 0x007F)) {
				out += str.charAt(i);
			} else if (c > 0x07FF) {
				out += String.fromCharCode(0xE0 | ((c >> 12) & 0x0F));
				out += String.fromCharCode(0x80 | ((c >> 6) & 0x3F));
				out += String.fromCharCode(0x80 | ((c >> 0) & 0x3F));
			} else {
				out += String.fromCharCode(0xC0 | ((c >> 6) & 0x1F));
				out += String.fromCharCode(0x80 | ((c >> 0) & 0x3F));
			}
		}
		return out;
	}

	function utf8to16(str) {
		var out, i, len, c;
		var char2, char3;
		out = "";
		len = str.length;
		i = 0;
		while (i < len) {
			c = str.charCodeAt(i++);
			switch (c >> 4) {
				case 0:
				case 1:
				case 2:
				case 3:
				case 4:
				case 5:
				case 6:
				case 7:
					out += str.charAt(i - 1);
					break;
				case 12:
				case 13:
					char2 = str.charCodeAt(i++);
					out += String.fromCharCode(((c & 0x1F) << 6) | (char2 & 0x3F));
					break;
				case 14:
					char2 = str.charCodeAt(i++);
					char3 = str.charCodeAt(i++);
					out += String.fromCharCode(((c & 0x0F) << 12) | ((char2 & 0x3F) << 6) | ((char3 & 0x3F) <<
						0));
					break;
			}
		}
		return out;
	}

/**
 * 注册游戏账号,
 * userName 账号
 * password 密码
 * **/
async function regsitGameAccount(baseurl,userName,password){
    let authcodeStr = parmasAuthCode({
        "userInfo": {
            "userName": userName,
            "password": password,
            "regType": "account"
        }
    })

    let requestUrl=baseurl+"/api.php?ac=register&params="+encodeURIComponent(authcodeStr);
    console.log("注册账号 %s",requestUrl);

    var  res = await axios({
        method: "get",
        url: requestUrl,
        headers: {
          "origin": baseurl,
          "referer":baseurl+"/template/web/proj/index.html",
          "User-Agent": "Mozilla/5.0 (Linux; Android 13; SM-G981B) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/133.0.0.0 Mobile Safari/537.36",
          "x-requested-with":"XMLHttpRequest",
          "content-type":"application/x-www-form-urlencoded; charset=UTF-8",
          "accept":"application/json, text/javascript, */*; q=0.01"
        },
      });
      console.log("注册账号响应结果 %s ",res.data);
      var string = decodeURIComponent(res.data) //url解析
      string = string.replace('/[\\]/g', ''); //去除反斜杠
      string = string.replace('/\+/g', ' '); //去除+
      var str = auth(string, '123456789', 'DECODE') //解密
      var d = JSON.parse(str);
      console.log("注册结果 %s",JSON.stringify(d));
      return d;
}

/***
 * 登录账号
 * 账号 
 * 密码
 * 
*/
async function loginAccount(baseurl,userName,password){
    var authcodeStr = parmasAuthCode({
        "userInfo": {
            "userName": userName,
            "password": password,
            "regType": "account"
        }
    })
    let requestUrl=baseurl+"/api.php?ac=login&params="+encodeURIComponent(authcodeStr);
    console.log("登录账号 %s",requestUrl);

    var  res = await axios({
        method: "get",
        url: requestUrl,
        headers: {
          "origin": baseurl,
          "referer":baseurl+"/template/web/proj/index.html",
          "User-Agent": "Mozilla/5.0 (Linux; Android 13; SM-G981B) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/133.0.0.0 Mobile Safari/537.36",
          "x-requested-with":"XMLHttpRequest",
          "content-type":"application/x-www-form-urlencoded; charset=UTF-8",
          "accept":"application/json, text/javascript, */*; q=0.01"
        },
      });
      
      let loginCookie="";
      if (res.headers['set-cookie']) {
        var cookieArray=res.headers['set-cookie'];
        if(cookieArray){
            for(var i=0;i<cookieArray.length;i++){
                var item=cookieArray[i];
                if(item){
                    var itemArray=item.split(';');
                    loginCookie+=itemArray[0]+";";
                }
            }
        }
      }

      console.log("%s登录账号响应结果 %s ",loginCookie,res.data);
      var string = decodeURIComponent(res.data) //url解析
      string = string.replace('/[\\]/g', ''); //去除反斜杠
      string = string.replace('/\+/g', ' '); //去除+
      var str = auth(string, '123456789', 'DECODE') //解密
      var d = JSON.parse(str);
      console.log("登录账号结果 %s",JSON.stringify(d));
      return d;
}
//regsitGameAccount("121332233","a123456");
//loginAccount("121332233","a123456");
/*

console.log(authcodeStr);
var derCode="ae00PgpaBaeuhMsVroGmJ%2ByzjQYH73xoXhe8XEVXkyCH9zX8%2FGFlURhcoVw9%2Fgpq%2FxctxV5bTMRDIGyR89D1pKOqbOx381n7RLOS9oKqwzEorRR3aZp4lYinPIAoX92GdzCx64XKJ6%2BThjP2LhOtLF5RW4MCfliO8VSZIc7SF6onfhi0gmpn0ljBb75OpdlHU2H6PganYXs";
var string = decodeURIComponent(derCode) //url解析
string = string.replace('/[\\]/g', ''); //去除反斜杠
string = string.replace('/\+/g', ' '); //去除+
var str = auth(string, '123456789', 'DECODE') //解密
var d = JSON.parse(str);
console.log(str);
console.log("注册返回解密后", d.data);
*/
module.exports = {
    regsitGameAccount,
    loginAccount
}