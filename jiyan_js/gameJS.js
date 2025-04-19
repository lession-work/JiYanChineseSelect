function parmasAuthCode(obj) {
    let str = window.location.href.substring(window.location.href.indexOf('?') + 1);
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

