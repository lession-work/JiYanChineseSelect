var express = require('express');
var sdk = require("./fullpage_test.js");
var jdToken = require("./jd_token.js");
var jdH5st = require("./getH5st4_2.js");
var jdH5st4_7 = require("./h5st4_7Logic.js");
var h5st5_0Logic = require("./h5st5_0Logic.js");
var h5st5_1Logic = require("./h5st5_1Logic.js");
var click_sdk = require("./click_test")
var jx_address = require("./jx_address")
var bodyParser = require('body-parser');
var gameInteface = require("./toufang.js");
var xBogus = require("./xBogus.js");
var collina = require("./collina.js");
var realNameVerification = require("./real-name-verification.js");
var get_a_bogus_dy = require("./get_a_bogus_dy.js");
var webmssdk_ml_362 = require("./webmssdk_ml_362.js");

var api = express();

api.use(bodyParser.urlencoded({
    parameterLimit: 50000,
    limit: '50mb',
    extended: false
}));

api.get('/get_token', function(req, res){
    var token = sdk.get_token()
    res.send(token)
})

api.post('/get_init_w', function (req, res){
    var gt = req.body.gt;
    console.log("get_init_w");
    console.log(req.body);
    var challenge = req.body.challenge;
    var file_config = req.body.config;
    var w = sdk.init_w(gt, challenge, file_config);
    res.send(w);
})

api.post("/get_check_w", function (req, res) {
    var gt = req.body.gt;
    var challenge = req.body.challenge;
    var file_config = req.body.config;
    var s = req.body.s;
    var tracks = JSON.parse(req.body.tracks);
    var w = sdk.get_check_w(gt, challenge, file_config, s, tracks);
    res.send(w);
})

api.post("/get_click", function (req, res){
    var gt = req.body.gt;
    var challenge = req.body.challenge;
    var call_infos = JSON.parse(req.body.call_infos);
    var tracks = JSON.parse(req.body.tracks);
    var points = JSON.parse(req.body.points);
    var w = click_sdk.click_w(gt, challenge, call_infos, tracks, points)
    res.send(w);
})

api.post('/get_jd_token', function(req, res){
    try{
    var params =
    {
        equipmentId: req.body.equipmentId,
        bizId: req.body.bizId,
        mode: req.body.mode,
        o: req.body.action,
        qs: req.body.qs,
        jsTk: req.body.jsTk
    };
    var token = jdToken.doCollectFp(params);
    res.send(token)
}catch(e){
    console.log(e);
}
res.send("")
})

api.post('/get_jd_h5st', function(req, res){
   
    // const a = {
    //     "skuId": 100011293139,
    //     "cat": "652,828,842",
    //     "area": "19_1666_36267_36272",
    //     "shopId": "1000085868",
    //     "venderId": 1000085868,
    //     "paramJson": "{\"platform2\":\"100000000001\",\"specialAttrStr\":\"p0pp1pppppppp1ppppppppppppppp\",\"skuMarkStr\":\"00\"}",
    //     "num": 1,
    //     "bbTraffic": "",
    //     "canvasType": 1
    // }
    // const dt = 1710236575236
    // console.log("dt",dt)
    // const r = JSON.stringify(a)
    const d = {
        appid: req.body.appid,//"pc-item-soa",
        functionId:  req.body.functionId,//"pc_detailpage_wareBusiness",
        client: req.body.client,//"pc",
        clientVersion: req.body.clientVersion,//"1.0.0",
        t: req.body.dt,//dt,
        body: JSON.parse(req.body.body),//r
    }
    console.log(d);
    const l = JSON.parse(JSON.stringify(d));
    l.body = jdH5st.sha256(d.body)
    console.log("l.body",l.body)
    var h5st=jdH5st.getH5st(l);
    res.send(h5st)
})

api.post('/get_jd_h5st_4_7', async function(req, res){
    var result={code:0,data:{}};
    try{
    var signData= req.body.signData;
    console.log("jd 4.7签名参数 %s",signData);
    var h5stParams=JSON.parse(signData);
    var h5st=await jdH5st4_7.getH5st(h5stParams);
    result.data=h5st;
    }catch(ex){
        result.code=-1;
        result.data.err=ex;
    }
    res.send(result)
});

api.post('/get_jd_h5st_5_0', async function(req, res){
    var result={code:0,data:{}};
    try{
    var signData= req.body.signData;
    console.log("jd 5.0签名参数 %s",signData);
    var h5stParams=JSON.parse(signData);
    var h5st=await h5st5_0Logic.getH5st(h5stParams);
    result.data=h5st;
    }catch(ex){
        result.code=-1;
        result.data.err=ex;
    }
    res.send(result)
});

api.post('/get_jd_h5st_5_1', async function(req, res){
    var result={code:0,data:{}};
    try{
    var signData= req.body.signData;
    console.log("jd 5.1签名参数 %s",signData);
    var h5stParams=JSON.parse(signData);
    var h5st=await h5st5_1Logic.getH5st(h5stParams);
    result.data=h5st;
    }catch(ex){
        result.code=-1;
        result.data.err=ex;
    }
    res.send(result)
});

api.post('/get_jx_encode', async function(req, res){
    var result={code:0,data:{}};
    try{
    var signData= req.body.encodeStr;
    console.log("jd get_jx_encode %s",signData);
    result.data=jx_address.encode(signData);
    }catch(ex){
        result.code=-1;
        result.data.err=ex;
    }
    res.send(result)
});

api.post('/game_regist', async function(req, res){
    var result={code:0,data:{}};
    try{
    var baseurl=req.body.baseUrl;
    var userName= req.body.userName;
    var password=req.body.password;
    console.log("jd game_regist baseurl=%s userName=%s password=%s",baseurl,userName,password);
    result.data=await gameInteface.regsitGameAccount(baseurl,userName,password);
    }catch(ex){
        result.code=-1;
        result.data.err=ex;
    }
    res.send(result)
});

api.post('/game_login', async function(req, res){
    var result={code:0,data:{}};
    try{
    var baseurl=req.body.baseUrl;
    var userName= req.body.userName;
    var password=req.body.password;
    console.log("jd loginAccount baseurl=%s userName=%s password=%s",baseurl,userName,password);
    result.data=await gameInteface.loginAccount(baseurl,userName,password);
    }catch(ex){
        result.code=-1;
        result.data.err=ex;
    }
    res.send(result)
});

//抖音
api.post('/xBogus', async function(req, res){
    var result={code:0,data:{}};
    try{
    var url= req.body.url;
    var userAgent=req.body.userAgent;
    console.log("douYin xBogus url=%s userAgent=%s",url,userAgent);
    result.data.xBogus=await xBogus.initXBogus(url,userAgent);
    result.data.msToken=await xBogus.msToken(108);
    }catch(ex){
        result.code=-1;
        result.data.err=ex;
    }
    res.send(result)
});

//交易猫，阿里系
api.post('/collinaUa', async function(req, res){
    var result={code:0,data:{}};
    try{
    var userAgent=req.body.userAgent;
    console.log("阿里系 collinaUa userAgent=%s",userAgent);
    result.data.collinaUa=await collina.getCollinaValue(userAgent);
    }catch(ex){
        result.code=-1;
        result.data.err=ex;
    }
    res.send(result)
});
//交易猫，实名加密
api.post('/realNameVerification', async function(req, res){
    var result={code:0,data:{}};
    try{
    var realName=req.body.realName;
    var cardNumber=req.body.cardNumber;
    console.log("阿里系 realNameVerification realName=%s cardNumber=%s",realName,cardNumber);
    result.data.realName=await realNameVerification.encodeValue(realName);
    result.data.cardNumber=await realNameVerification.encodeValue(cardNumber);
    }catch(ex){
        result.code=-1;
        result.data.err=ex;
    }
    res.send(result)
});

//抖音h5,下单
api.post('/get_a_bogus_v2_init', async function(req, res){
    var result={code:0,data:{}};
    try{
    var price=req.body.price;
    var screenParams=JSON.parse(req.body.screenParams);
    var navigatorParams=JSON.parse(req.body.navigatorParams);
    var windowParams=JSON.parse(req.body.windowParams);
    var reqCookie=req.body.cookie;
    var cookie=req.headers["cookie"];
    if(cookie==undefined)
    cookie=reqCookie;
    var ip= req.headers["ip"];
    var port= req.headers["port"];
    var proxy=null;
    if(ip!=undefined)
    proxy={host:ip,port:port,protocol: "http",userName:req.headers["username"],password:req.headers["password"]};
    console.log("get_a_bogus_v2_init port=%s price=%s screenParams=%s navigatorParams=%s windowParams=%s cookie=%s",proxy,price,screenParams,navigatorParams,windowParams,cookie);
    var orderResult = await get_a_bogus_dy.get_a_bogus_v2_init(price,screenParams,navigatorParams,windowParams,cookie,proxy);
    result.data=orderResult;
    }catch(ex){
        console.log(ex);
        result.code=-1;
        result.data.err=ex;
    }
    res.send(result)
});

//抖音pc,下单
api.post('/get_a_bogus_v2_pc_init', async function(req, res){
    var result={code:0,data:{}};
    try{
    var price=req.body.price;
    var screenParams=JSON.parse(req.body.screenParams);
    var navigatorParams=JSON.parse(req.body.navigatorParams);
    var windowParams=JSON.parse(req.body.windowParams);
    var reqCookie=req.body.cookie;
    var cookie=req.headers["cookie"];
    if(cookie==undefined)
    cookie=reqCookie;
    var ip= req.headers["ip"];
    var port= req.headers["port"];
    var proxy=null;
    if(ip!=undefined)
    proxy={host:ip,port:port,protocol: "http",userName:req.headers["username"],password:req.headers["password"]};
    console.log("get_a_bogus_v2_pc_init port=%s price=%s screenParams=%s navigatorParams=%s windowParams=%s cookie=%s",proxy,price,screenParams,navigatorParams,windowParams,cookie);
    var orderResult = await get_a_bogus_dy.get_a_bogus_v2_pc_init(price,screenParams,navigatorParams,windowParams,cookie,proxy);
    result.data=orderResult;
    }catch(ex){
        console.log(ex);
        result.code=-1;
        result.data.err=ex;
    }
    res.send(result)
});
//抖音h5 查询订单
api.post('/trade_query', async function(req, res){
    var result={code:0,data:{}};
    try{
        var papi=req.body.papi;
        var trade_no=req.body.trade_no;
        var navigatorParams=JSON.parse(req.body.navigatorParams);
        var reqCookie=req.body.cookie;
        var cookie=req.headers["cookie"];
        if(cookie==undefined)
        cookie=reqCookie;
        var ip= req.headers["ip"];
        var port= req.headers["port"];
        var proxy=null;
        if(ip!=undefined)
        proxy={host:ip,port:port,protocol: "http",userName:req.headers["username"],password:req.headers["password"]};
        result.data = await get_a_bogus_dy.trade_query(papi,trade_no,navigatorParams,cookie,proxy)
    }catch(ex){
        result.code=-1;
        result.data.err=ex;
    }
    res.send(result)
});


//抖音h5 查询余额
api.post('/dy_walletInfo', async function(req, res){
    var result={code:0,data:{}};
    try{
        
        var navigatorParams=JSON.parse(req.body.navigatorParams);
        var reqCookie=req.body.cookie;
        var cookie=req.headers["cookie"];
        if(cookie==undefined)
        cookie=reqCookie;
        var ip= req.headers["ip"];
        var port= req.headers["port"];
        var proxy=null;
        if(ip!=undefined)
        proxy={host:ip,port:port,protocol: "http",userName:req.headers["username"],password:req.headers["password"]};
        
        var requestUrl = "https://www.douyin.com/webcast/wallet/info/?";
        requestUrl += "account_type=0";
        requestUrl += "&aid=1128";
        requestUrl += "&fp="+encodeURIComponent(get_a_bogus_dy.get_fp());
        requestUrl += "&msToken="+encodeURIComponent(get_a_bogus_dy.get_ms_token());
        
    
        var bogus=await xBogus.initXBogus(requestUrl,navigatorParams.userAgent);
        result.data = await get_a_bogus_dy.walletInfo(requestUrl,navigatorParams,bogus,cookie,proxy)
    }catch(ex){
        console.log(ex);
        result.code=-1;
        result.data.err=ex;
    }
    res.send(result)
});


//抖音h5  查询用户信息
api.post('/recharge_external_user_info_cache', async function(req, res){
    var result={code:0,data:{}};
    try{
        
        var navigatorParams=JSON.parse(req.body.navigatorParams);
        var reqCookie=req.body.cookie;
        var cookie=req.headers["cookie"];
        if(cookie==undefined)
        cookie=reqCookie;
        var ip= req.headers["ip"];
        var port= req.headers["port"];
        var proxy=null;
        if(ip!=undefined)
        proxy={host:ip,port:port,protocol: "http",userName:req.headers["username"],password:req.headers["password"]};
         
        result.data = await get_a_bogus_dy.recharge_external_user_info_cache(navigatorParams,cookie,proxy)
    }catch(ex){
        console.log(ex);
        result.code=-1;
        result.data.err=ex;
    }
    res.send(result)
});

//抖音pc 主页,下单
api.post('/get_a_bogus_v3_pc_order', async function(req, res){
    var result={code:0,data:{}};
    try{
    var price=req.body.price;
    var screenParams=JSON.parse(req.body.screenParams);
    var navigatorParams=JSON.parse(req.body.navigatorParams);
    var windowParams=JSON.parse(req.body.windowParams);
    var reqCookie=req.body.cookie;
    var cookie=req.headers["cookie"];
    if(cookie==undefined)
    cookie=reqCookie;
    var ip= req.headers["ip"];
    var port= req.headers["port"];
    var proxy=null;
    if(ip!=undefined)
    proxy={host:ip,port:port,protocol: "http",userName:req.headers["username"],password:req.headers["password"]};
    console.log("get_a_bogus_v3_pc_order port=%s price=%s screenParams=%s navigatorParams=%s windowParams=%s cookie=%s",proxy,price,screenParams,navigatorParams,windowParams,cookie);
    var orderResult = await webmssdk_ml_362.get_a_bogus_v2_init(price,screenParams,navigatorParams,windowParams,cookie,proxy);
    result.data=orderResult;
    }catch(ex){
        console.log(ex);
        result.code=-1;
        result.data.err=ex;
    }
    res.send(result)
});


//抖音pc 主页,查询订单
api.post('/get_a_bogus_v3_pc_query_order', async function(req, res){
    var result={code:0,data:{}};
    try{
    var orderNo=req.body.orderNo;
    var screenParams=JSON.parse(req.body.screenParams);
    var navigatorParams=JSON.parse(req.body.navigatorParams);
    var windowParams=JSON.parse(req.body.windowParams);
    var reqCookie=req.body.cookie;
    var cookie=req.headers["cookie"];
    if(cookie==undefined)
    cookie=reqCookie;
    var ip= req.headers["ip"];
    var port= req.headers["port"];
    var proxy=null;
    if(ip!=undefined)
    proxy={host:ip,port:port,protocol: "http",userName:req.headers["username"],password:req.headers["password"]};
    console.log("get_a_bogus_v3_pc_query_order port=%s orderNo=%s screenParams=%s navigatorParams=%s windowParams=%s cookie=%s",proxy,orderNo,screenParams,navigatorParams,windowParams,cookie);
    var orderResult = await webmssdk_ml_362.query_order(orderNo,screenParams,navigatorParams,windowParams,cookie,proxy);
    result.data=orderResult;
    }catch(ex){
        console.log(ex);
        result.code=-1;
        result.data.err=ex;
    }
    res.send(result)
});
//抖音h5 测试代理
api.post('/dy_test_proxy', async function(req, res){
    var result={code:0,data:{}};
    try{
        
        var ip= req.headers["ip"];
        var port= req.headers["port"];
        var proxy=null;
        if(ip!=undefined)
        proxy={host:ip,port:port,protocol: "http",userName:req.headers["username"],password:req.headers["password"]};
        result.data = await get_a_bogus_dy.diamond_buy_external_safe_tst(proxy)
    }catch(ex){
        result.code=-1;
        result.data.err=ex;
    }
    res.send(result)
});


var server = api.listen(8090, function (){
    console.log("服务启动成功");
})