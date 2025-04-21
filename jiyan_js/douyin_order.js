const axios = require("axios");
const httpsProxyAgent = require('https-proxy-agent');
var dayexec = require("./dayexec.js");
const log4js= require("log4js");
const url_tool = require('url');
const querystring_tool = require('querystring');
const { log } = require("console");

// 配置日志记录器
log4js.configure({
    appenders: {
      out: { type: "stdout" }, // 输出到控制台
      app: {
        type: "file", // 使用 file appender 进行文件输出
        filename: "logs/app.log", // 日志文件路径（不需要扩展名，自动添加）
        pattern: "yyyy-MM-dd", // 日志文件轮换的模式，按天轮换
        alwaysIncludePattern: true, // 始终在文件名中添加日期后缀
        daysToKeep: 90, // 保留最近 90 天的日志文件
        compress: true, // 启用日志文件压缩（.gz 格式）
      },
    },
    categories: {
      default: { appenders: ["out", "app"], level: "info" }, // 设置日志级别和输出方式
    },
  });
const logger =log4js.getLogger();

function generateRandomString(length) {
    let result = '';
    const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    const charactersLength = characters.length;
    
    for (let i = 0; i < length; i++) {
      result += characters.charAt(Math.floor(Math.random() * charactersLength));
    }
    
    return result;
  }

function replaceCookie(cookies,oldCookie){
    if(cookies==null)
    return;
    let key= cookies.split('=')[0];
    var cookieArray=oldCookie.split(';');
    var newCookie="";
    for(var i=0;i<cookieArray.length;i++){
        var item=cookieArray[i];
        if(item=='')
        continue;
       let itemArray=item.split('=');

       if(itemArray.length!=2)
        {newCookie+=item+";";
        }else{
            if(itemArray[0]===key){
            newCookie+=cookies+";";
            }else {
                newCookie+=item+";";
            }
        }
    }
    return newCookie;
}

function getCookieItem(cookies,key){
    if(cookies==null || cookies.length<1){
        if(key=="s_v_web_id") return get_ms_token();
    }
    var cookieArray=cookies.split(';');
    for(var i=0;i<cookieArray.length;i++){
        var item=cookieArray[i];
        if(item.trim()=="")
        continue;
        item=item.trim();
        var itemArray= item.split('=');
        if(itemArray[0]==key && itemArray.length>1)
        return itemArray[1];
    }
}

function getTraceid(){
    var now = new Date();
var year = now.getFullYear();
var month = now.getMonth() + 1;
var date = now.getDate();
var hour = now.getHours();
var minute = now.getMinutes();
var second = now.getSeconds();
 
// 将单个数字前面补零
month = month < 10 ? '0' + month : month;
date = date < 10 ? '0' + date : date;
hour = hour < 10 ? '0' + hour : hour;
minute = minute < 10 ? '0' + minute : minute;
second = second < 10 ? '0' + second : second;
 
var currentTime = year + month + date + hour + minute + second;
var ticks =(new Date().valueOf()/10000000);
currentTime=currentTime+parseInt(ticks);
return currentTime +generateRandomString(12);
}


function get_fp() {
    var e = "0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz".split("")
      , t = e.length
      , n = Date.now().toString(36)
      , r = [];
    r[8] = r[13] = r[18] = r[23] = "_",
    r[14] = "4";
    for (var o = 0, i = void 0; o < 36; o++)
        r[o] || (i = 0 | Math.random() * t,
        r[o] = e[19 == o ? 3 & i | 8 : i]);
    return "verify_" + n + "_" + r.join("")
}

function get_ms_token(length = 182) {
    const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789-_';
    let result = '';
    for (let i = 0; i < length; i++) {
        result += chars.charAt(Math.floor(Math.random() * chars.length));
    }
    return encodeURIComponent(result);
  }

function isIOS() {
    var userAgent = navigator.userAgent;
    return /iPad|iPhone|iPod/.test(userAgent) || (navigator.platform === 'MacIntel' && navigator.maxTouchPoints > 1);
}


/**正则表达式，匹配数据 */
function match_Sec_user_id(htmlContent){
    let matches = htmlContent.match(/(<script\b([^"<>]+|"[^"]*")*>)([\s\S]*?)(<\/script>)/g);
    
    for(var i=0;i<matches.length;i++){
        var item=matches[i];
       
        if(item.indexOf("sec_user_id")>0){
            var idx=item.indexOf("sec_user_id");
            item=item.substring(idx);
            idx=item.indexOf(":");
            item=item.substring(idx);
            idx=item.indexOf('"');
            item=item.substring(idx+1);

            idx=item.indexOf('\\');
            item=item.substring(0,idx);
            return item;
        }
    }
}


/**
 * 访问充值页面 h5 get_exchange_income
 * */
async function get_exchange_income(navigatorParams,cookie,proxy) {
    var initUrl="https://www.douyin.com/webcast/wallet_diamond_api/login_browser_allow_list/";
    var { data, status,headers } = await axios({
        url: initUrl,
        method: "GET",
        httpsAgent: new httpsProxyAgent.HttpsProxyAgent(`http://${proxy.userName}:${proxy.password}@${proxy.host}:${proxy.port}`),
        headers: {
          "accept": "application/json, text/plain, */*",
          "upgrade-insecure-requests": "1",
          "cookie":cookie,
          "accept-language": "zh-CN,zh;q=0.9",
          "referer": "https://www.douyin.com/pay?scene=douyin_mobile",
          "user-agent": navigatorParams.userAgent,
        },
      });  
      
     
      let odin_tt= headers['set-cookie'][0];
      logger.info("douyin_mobile  odin_tt %s ",odin_tt);
      odin_tt=odin_tt.split(';')[0];
      replaceCookie(odin_tt,cookie); 
    }



/**
 * 访问充值页面 h5 recharge_external_user_info_cache
 * */
async function recharge_external_user_info_cache(navigatorParams,cookie,proxy) {
    var platform=isIOS(navigatorParams.userAgent)?"iphone":"android";
    var initUrl="https://www.douyin.com/webcast/wallet_diamond_api/recharge_external_user_info_cache/list/?aid=1128&guide_source=douyin_mobile&source=5&platform="+platform;
    var { data, status,headers } = await axios({
        url: initUrl,
        method: "GET",
        httpsAgent: new httpsProxyAgent.HttpsProxyAgent(`http://${proxy.userName}:${proxy.password}@${proxy.host}:${proxy.port}`),
        headers: {
          "accept": "application/json, text/plain, */*",
          "upgrade-insecure-requests": "1",
          "cookie":cookie,
          "accept-language": "zh-CN,zh;q=0.9",
          "referer": "https://www.douyin.com/pay?scene=douyin_mobile",
          "user-agent": navigatorParams.userAgent,
        },
      });  
      return data;
}


/**
 * 访问充值页面 h5
 * */
async function douyin_mobile(navigatorParams,cookie,proxy) {
    var initUrl="https://www.douyin.com/pay?scene=douyin_mobile";
    var { data, status,headers } = await axios({
        url: initUrl,
        method: "GET",
        httpsAgent: new httpsProxyAgent.HttpsProxyAgent(`http://${proxy.userName}:${proxy.password}@${proxy.host}:${proxy.port}`),
        headers: {
          "accept": "text/html,application/xhtml+xml,application/xml;q=0.9,image/avif,image/webp,image/apng,*/*;q=0.8,application/signed-exchange;v=b3;q=0.7",
          "upgrade-insecure-requests": "1",
          "cookie":cookie,
          "accept-language": "zh-CN,zh;q=0.9",
          "user-agent": navigatorParams.userAgent,
        },
      });  
      // let ttwid= headers['set-cookie'][0];
      // logger.info("douyin_mobile  ttwid %s ",ttwid);
      // ttwid=ttwid.split(';')[0];
      // var newCookie= replaceCookie(ttwid,cookie); 
      return match_Sec_user_id(data);
    }



/**
 * 获取第一步 
 * */
async function diamond_buy_external_safe(initUrl,method,navigatorParams,cookie,proxy) {
    var { data, status,headers } = await axios({
        url: initUrl,
        method: method,
        httpsAgent: new httpsProxyAgent.HttpsProxyAgent(`http://${proxy.userName}:${proxy.password}@${proxy.host}:${proxy.port}`),
        headers: {
          "x-secsdk-csrf-request": "1",
          "x-secsdk-csrf-version": "2.0.4",
          "accept": "*/*",
          "cookie":cookie,
          "referer": "https://www.douyin.com/pay?scene=douyin_mobile",
          "user-agent": navigatorParams.userAgent,
        },
      });
      
      if(status==200)
      //console.log(headers);
      return headers["x-ware-csrf-token"];
      else
      return null;
}
/**
 * 获取第二步 
 * */
async function diamond_buy_external_safe_pay(initUrl,method,csrfToken,navigatorParams,cookie,proxy) {
    var { data, status,headers } = await axios({
        url: initUrl,
        method: method,
        httpsAgent: new httpsProxyAgent.HttpsProxyAgent(`http://${proxy.userName}:${proxy.password}@${proxy.host}:${proxy.port}`),
        headers: {
          "x-secsdk-csrf-request": "1",
          "x-secsdk-csrf-version": "2.0.4",
          "accept": "application/json, text/plain, */*",
          "cookie":cookie,
          "referer": "https://www.douyin.com/pay?scene=douyin_mobile",
          "user-agent": navigatorParams.userAgent,
          "x-secsdk-csrf-token":csrfToken,
          "origin":"https://www.douyin.com",
        },
      });
      if(status==200){return data;}
      return null;
}


/**
 * 访问充值页面 h5 recharge_external_user_info_cache
 * */
async function recharge_external_user_info_cache(navigatorParams,cookie,proxy) {
    var platform=isIOS(navigatorParams.userAgent)?"iphone":"android";
    var initUrl="https://www.douyin.com/webcast/wallet_diamond_api/recharge_external_user_info_cache/list/?aid=1128&guide_source=douyin_mobile&source=5&platform="+platform;
    var { data, status,headers } = await axios({
        url: initUrl,
        method: "GET",
        httpsAgent: new httpsProxyAgent.HttpsProxyAgent(`http://${proxy.userName}:${proxy.password}@${proxy.host}:${proxy.port}`),
        headers: {
          "accept": "application/json, text/plain, */*",
          "upgrade-insecure-requests": "1",
          "cookie":cookie,
          "accept-language": "zh-CN,zh;q=0.9",
          "referer": "https://www.douyin.com/pay?scene=douyin_mobile",
          "user-agent": navigatorParams.userAgent,
        },
      });  
      return data;
}


/**
 * @param  orderParams  订单参数
 * @param screenParams 浏览器screen 对象
 * @param navigator 浏览器navigator对象
 * @param windowParams 
 */
async function get_a_bogus_v2_init(price,screenParams,navigatorParams,windowParams,cookie,proxy){
  
    logger.info('get_a_bogus_v2_init price %s  screenParams %s windowParams %s navigatorParams %s cookie %s proxy %s'
    ,price,screenParams,windowParams,navigatorParams,cookie,proxy);

    sec_uid = await douyin_mobile(navigatorParams,cookie,proxy)
    //get_exchange_income(navigatorParams,proxy);
    //
  
    var msToken=get_ms_token();
    var initUrl="https://www.douyin.com/webcast/wallet_api/diamond_buy_external_safe/";
    
    initUrl+="?msToken="+encodeURIComponent(msToken);
    var method="HEAD";
    var sign=await dayexec.exec_dy_sign(initUrl,method,screenParams,navigatorParams,windowParams,cookie);
    initUrl+="&a_bogus="+encodeURI(sign); 
    var csrfToken=await diamond_buy_external_safe(initUrl,method,navigatorParams,cookie,proxy);
    logger.info("diamond_buy_external_safe x-ware-csrf-token %s",csrfToken);
    if(csrfToken==null)
    return null;

    var csrfTokenArray= csrfToken.split(',');
    var csrfToken_V = csrfTokenArray[1]; 
    //
    var platform=isIOS(navigatorParams.userAgent)?"iphone":"android";
    var extra={"domin_type":1,"uuid":"","sharkParams":"{\"screen_size\":{\"x\":"+screen.width+",\"y\":"+screen.height+"}}","create_pay_type":"1","caijing_pay_params":"{\"ptcode\":\"alipay\",\"channel_support_scene\":\"ALI_H5\",\"support_evoke_channels\":\"\",\"trace_id\":\""+getTraceid()+"\",\"risk_info\":\"{\\\"platform_type\\\":\\\"H5_new\\\"}\",\"jh_pass_through\":\"{\\\"is_superpay_active\\\":\\\"false\\\",\\\"jh_ext_info\\\":null,\\\"prepay_continue\\\":\\\"1\\\",\\\"super_pay_support_channel\\\":null}\",\"ptcode_info\":\"{}\"}","guide_app_id":null,"aig_author_id":0,"libra_version_ids":"","is_default_package":"0"};
    initUrl="https://www.douyin.com/webcast/wallet_api/diamond_buy_external_safe/?diamond_id=888888&source=5";
    initUrl+="&way=0&aid=1128&";
    initUrl+="&fp="+encodeURI(getCookieItem(cookie,"s_v_web_id"));
    initUrl+="&platform="+platform;
    initUrl+="&customized_price="+price;
    initUrl+="&biz_extra="+encodeURIComponent('{"is_default_package":"0"}');
    initUrl+="&extra="+encodeURI(JSON.stringify(extra));
    initUrl+="&guide_source=douyin_mobile";
    initUrl+="&two_factory_auth_verify_info=";
    initUrl+="&recharge_for_own_sec_uid="+encodeURIComponent(sec_uid);
    initUrl+="&msToken="+encodeURIComponent(msToken);
    method="POST";
    sign=await dayexec.exec_dy_sign(initUrl,method,screenParams,navigatorParams,windowParams,cookie);
    initUrl+="&a_bogus="+encodeURI(sign);

   var payResult=  await diamond_buy_external_safe_pay(initUrl,method,csrfToken_V,navigatorParams,cookie,proxy);
   logger.info("diamond_buy_external_safe initUrl %s  payResult %s",initUrl,JSON.stringify(payResult));
   return payResult;
}


/**
 * 查询订单状态
 * **/
async function trade_query(papi,trade_no,navigatorParams,cookie,proxy){
    var platform=isIOS(navigatorParams.userAgent)?"iphone":"android";
    var os=platform=="iphone"?"IOS":"ANDROID";
    var process={"type":"papi","data":papi};
    var risk_info={"device_platform":platform};
    var biz_content={"trade_no":trade_no};
    var device_info={"ua":navigatorParams.userAgent,"os":os,"is_h5":true,"front_type":"h5","scm_build_version":"1.0.0.51","device_platform":platform};

    var initUrl="https://tp-pay.snssdk.com/gateway-cashier2/tp/cashier/trade_query";
    initUrl+="?process="+encodeURIComponent(JSON.stringify(process));
    initUrl+="&scene=h5&risk_info="+encodeURIComponent(JSON.stringify(risk_info));
    initUrl+="&biz_content="+encodeURIComponent(JSON.stringify(biz_content));
 
    var processB64=Buffer.from(JSON.stringify(process)).toString('base64');
    var refUrl="https://tp-pay.snssdk.com/cashdesk?amount=&papi_id="+papi+"&process="+processB64+"&trade_no_for_query="+trade_no;
  
    var { data, status,headers } = await axios({
        url: initUrl,
        method: "POST",
        httpsAgent: new httpsProxyAgent.HttpsProxyAgent(`http://${proxy.userName}:${proxy.password}@${proxy.host}:${proxy.port}`),
        headers: {
          "accept": "application/json, text/plain, */*",
          "content-type": "application/x-www-form-urlencoded",
          "cookie":cookie,
          "accept-language": "zh-CN,zh;q=0.9",
          "fe-request-from": "AJAX",
          "origin": "https://tp-pay.snssdk.com",
          "x-from": "H5",
          "devinfo": encodeURIComponent(device_info),
          "referer": refUrl,
          "user-agent": navigatorParams.userAgent,
        },
      }); 

      return data;
}

//抖音小店

/**
 * 获取m 
 * */
async function btm_mapping_csrf_token(initUrl,method,navigatorParams,cookie,proxy) {
    var { data, status,headers } = await axios({
        url: initUrl,
        method: method,
        httpsAgent: new httpsProxyAgent.HttpsProxyAgent(`http://${proxy.userName}:${proxy.password}@${proxy.host}:${proxy.port}`),
        headers: {
          "x-secsdk-csrf-request": "1",
          "x-secsdk-csrf-version": "2.0.4",
          "accept": "*/*",
          "cookie":cookie,
          "referer": "https://www.douyin.com/pay?scene=douyin_mobile",
          "user-agent": navigatorParams.userAgent,
        },
      });
      
      if(status==200)
      //console.log(headers);
      return headers["x-ware-csrf-token"];
      else
      return null;
}

async function marketing_common_recharge_last(initUrl,method,csrfToken,postData,navigatorParams,cookie,proxy) {
  var { data, status,headers } = await axios({
      url: initUrl,
      data:postData,
      method: method,
      httpsAgent: new httpsProxyAgent.HttpsProxyAgent(`http://${proxy.userName}:${proxy.password}@${proxy.host}:${proxy.port}`),
      headers: {
        "accept": "application/json, text/plain, */*",
        "cookie":cookie,
        "referer": "https://buyin.jinritemai.com/dashboard/marketing/fund?universal_page_params_id=a9c4cea0-e6c5-4942-8b44-d44e1f1df2c8",
        "user-agent": navigatorParams.userAgent,
        "x-secsdk-csrf-token":csrfToken,
      },
    });
    if(status==200){return data;}
    return null;
}


/**
 * 小店创建订单第一步
 * **/
async function tp_cashier_trade_create(cashdesk_pc_url,navigatorParams,cookie,proxy) {
    // 解析URL字符串
  const parsedUrl = url_tool.parse(cashdesk_pc_url);
  // 解析查询参数
  const queryObject = querystring_tool.parse(parsedUrl.query);

  var risk_info={"os_version":"","version_code":"","did":"","iid":"","aid":"","app_name":"","device_platform":"","device_type":"","user_agent":navigatorParams.userAgent};
  var biz_content={"params":{"app_id":queryObject.app_id,"body":queryObject.body,"currency":queryObject.currency,"exts":queryObject.exts,"merchant_id":queryObject.merchant_id,"notify_url":queryObject.notify_url,"out_order_no":queryObject.out_order_no,"payment_type":queryObject.payment_type,"product_code":queryObject.product_code,"product_id":queryObject.product_id,"risk_info":queryObject.risk_info,"sign":queryObject.sign,"sign_type":queryObject.sign_type,"subject":queryObject.subject,"timestamp":queryObject.timestamp,"total_amount":queryObject.total_amount,"trade_time":queryObject.trade_time,"trade_type":queryObject.trade_type,"trans_code":queryObject.trans_code,"uid":queryObject.uid,"valid_time":queryObject.valid_time,"version":queryObject.version}};
  var deviceInfo={"req_ip":"","ua":navigatorParams.userAgent,"version":"3.1.1"}
  

  let initUrl="https://tp-pay.snssdk.com/gateway-cashier/tp.cashier.trade_create";
  var postData="scene=pc"
  postData+="&risk_info="+encodeURIComponent(JSON.stringify(risk_info));
  postData+="&biz_content="+encodeURIComponent(JSON.stringify(biz_content));

  let method="POST";
  var { data, status,headers } = await axios({
      url: initUrl,
      method: method,
      data:postData,
      httpsAgent: new httpsProxyAgent.HttpsProxyAgent(`http://${proxy.userName}:${proxy.password}@${proxy.host}:${proxy.port}`),
      headers: {
        "accept": "application/json, text/plain, */*",
        "cookie":cookie,
        "referer": "https://buyin.jinritemai.com/dashboard/marketing/fund?universal_page_params_id=a9c4cea0-e6c5-4942-8b44-d44e1f1df2c8",
        "user-agent": navigatorParams.userAgent,
        "devinfo":JSON.stringify(deviceInfo),
        "x-tt-env":"prod"
      },
    });
    if(status==200){return data;}
    return null;
}


/**
 * 小店创建订单第二步
 * **/
async function tp_cashier_trade_confirm(tp_cashier_trade_create_result,navigatorParams,cookie,proxy) {
  if(tp_cashier_trade_create_result.code!='CA0000')
    return {code:-1,message:'tp_cashier_trade_create err',data:tp_cashier_trade_create_result};
    
  var risk_info={"user_agent":navigatorParams.userAgent};
  var process=tp_cashier_trade_create_result.process;//字符串
  
  var tp_cashier_trade_create_result_trade_info=tp_cashier_trade_create_result.data.trade_info;
  var biz_content={"trade_no":tp_cashier_trade_create_result_trade_info.trade_no,"ptcode":tp_cashier_trade_create_result.data.default_ptcode,"ptcode_info":tp_cashier_trade_create_result.data.paytype_items[0],"subway":tp_cashier_trade_create_result_trade_info.subway};
  var deviceInfo={"req_ip":"","ua":navigatorParams.userAgent,"version":"3.1.1"}

  let initUrl="https://tp-pay.snssdk.com/gateway-cashier/tp.cashier.trade_confirm";
  var postData="scene=pc"
  postData+="&risk_info="+encodeURIComponent(JSON.stringify(risk_info));
  postData+="&process="+encodeURIComponent(process);
  postData+="&channel_support_scene="+encodeURIComponent("WX_NATIVE,PC");
  postData+="&biz_content="+encodeURIComponent(JSON.stringify(biz_content));

  let method="POST";
  var { data, status,headers } = await axios({
      url: initUrl,
      method: method,
      data:postData,
      httpsAgent: new httpsProxyAgent.HttpsProxyAgent(`http://${proxy.userName}:${proxy.password}@${proxy.host}:${proxy.port}`),
      headers: {
        "accept": "application/json, text/plain, */*",
        "cookie":cookie,
        "referer": "https://buyin.jinritemai.com/dashboard/marketing/fund?universal_page_params_id=a9c4cea0-e6c5-4942-8b44-d44e1f1df2c8",
        "user-agent": navigatorParams.userAgent,
        "devinfo":JSON.stringify(deviceInfo),
        "x-tt-env":"prod"
      },
    });
    console.log(data);
    if(status==200){return data;}
    return null;
}



/**
 * 小店查询店铺
 * **/
async function tp_cashier_trade_query(process,trade_no,navigatorParams,cookie,proxy) {

  var risk_info={"user_agent":navigatorParams.userAgent};
  
  var biz_content={"trade_no":trade_no};
  var deviceInfo={"req_ip":"","ua":navigatorParams.userAgent,"version":"3.1.1"}

  let initUrl="https://tp-pay.snssdk.com/gateway-cashier/tp.cashier.trade_query";
  var postData="scene=pc"
  postData+="&risk_info="+encodeURIComponent(JSON.stringify(risk_info));
  postData+="&process="+encodeURIComponent(process);
  postData+="&biz_content="+encodeURIComponent(JSON.stringify(biz_content));

  let method="POST";
  var { data, status,headers } = await axios({
      url: initUrl,
      method: method,
      data:postData,
      httpsAgent: new httpsProxyAgent.HttpsProxyAgent(`http://${proxy.userName}:${proxy.password}@${proxy.host}:${proxy.port}`),
      headers: {
        "accept": "application/json, text/plain, */*",
        "cookie":cookie,
        "referer": "https://buyin.jinritemai.com/dashboard/marketing/fund?universal_page_params_id=a9c4cea0-e6c5-4942-8b44-d44e1f1df2c8",
        "user-agent": navigatorParams.userAgent,
        "devinfo":JSON.stringify(deviceInfo),
        "x-tt-env":"prod"
      },
    });
    console.log(data);
    if(status==200){return data;}
    return null;
}


/**
 * 小店充值
 * @param  orderParams  订单参数
 * @param screenParams 浏览器screen 对象
 * @param navigator 浏览器navigator对象
 * @param windowParams 
 */
async function marketing_common_recharge(price,screenParams,navigatorParams,windowParams,cookie,proxy){
    var msToken=get_ms_token();
    var verifyFp=encodeURI(getCookieItem(cookie,"s_v_web_id"));
    var initUrl="https://buyin.jinritemai.com/pc/selection/common/btm_mapping?";
    initUrl+="verifyFp="+verifyFp
    initUrl+="&fp="+verifyFp
    initUrl+="&msToken="+encodeURIComponent(msToken);

    var method="HEAD";
    var sign=await dayexec.exec_dy_sign(initUrl,method,screenParams,navigatorParams,windowParams,cookie);
    initUrl+="&a_bogus="+encodeURI(sign); 

    var csrfToken=await btm_mapping_csrf_token(initUrl,method,navigatorParams,cookie,proxy);
    logger.info("btm_mapping_csrf_token x-ware-csrf-token %s",csrfToken);
    if(csrfToken==null)
    return null;
  
    var csrfTokenArray= csrfToken.split(',');
    var csrfToken_V = csrfTokenArray[1]; 
    initUrl="https://buyin.jinritemai.com/api/buyin/marketing/common/recharge?";
    initUrl+="_bid=mcenter_buyin";
    initUrl+="&_="+new Date().getTime();
    initUrl+="&s=1126299";
    initUrl+="&msToken="+encodeURIComponent(msToken);
    initUrl+="&verifyFp="+verifyFp;
    initUrl+="&fp="+verifyFp;
    method="POST";
    sign=await dayexec.exec_dy_sign(initUrl,method,screenParams,navigatorParams,windowParams,cookie);
    initUrl+="&a_bogus="+encodeURI(sign);

    var postData="amount="+price+"&coupon_type=2";
    var result=await marketing_common_recharge_last(initUrl,method,csrfToken,postData,navigatorParams,cookie,proxy)
    //console.log(result);
    return result;
}


/**
 * 小店充值
 * @param  orderParams  订单参数
 * @param screenParams 浏览器screen 对象
 * @param navigator 浏览器navigator对象
 * @param windowParams 
 */
async function xiaodian_create_order(price,screenParams,navigatorParams,windowParams,cookie,proxy){
 let marketing_common_recharge_result=await marketing_common_recharge(price,screenParams,navigatorParams,windowParams,cookie,proxy);

 if(marketing_common_recharge_result.code!=0)
   return {code:-1,message:'marketing_common_recharge_result error',data:marketing_common_recharge_result};
  let pcUrl= marketing_common_recharge_result.data.cashdesk_pc_url;

  try{
   var tp_cashier_trade_create_res = await tp_cashier_trade_create(pcUrl,navigatorParams,cookieStr,proxyInfo);
   var lastResult=await tp_cashier_trade_confirm(tp_cashier_trade_create_res,navigatorParams,cookieStr,proxyInfo);
   let returnResult= {code:0,message:'compled',process:tp_cashier_trade_create_res.process,data:lastResult};
   return returnResult;
  }catch(ex){
    logger.error(ex);
    return {code:-2,message:'xiaodian_create_order error',data:ex};
  }
}

/**
 * 小店用户信息 h5 account
 * */
async function jinritemai_account(navigatorParams,cookie,proxy) { 
  var verifyFp=encodeURI(getCookieItem(cookie,"s_v_web_id"));
  var msToken=get_ms_token();

  var initUrl="https://darenim.jinritemai.com/chat/api/sd/by/account?";
  initUrl+="PIGEON_BIZ_TYPE=5";
  initUrl+="&verifyFp="+verifyFp;
  initUrl+="&fp="+verifyFp;
  initUrl+="&msToken="+encodeURIComponent(msToken);
  var method="GET";

  var sign=await dayexec.exec_dy_sign(initUrl,method,screenParams,navigatorParams,windowParams,cookie);
  initUrl+="&a_bogus="+encodeURI(sign);

  var { data, status,headers } = await axios({
      url: initUrl,
      method: method,
      httpsAgent: new httpsProxyAgent.HttpsProxyAgent(`http://${proxy.userName}:${proxy.password}@${proxy.host}:${proxy.port}`),
      headers: {
        "accept": "application/json, text/plain, */*",
        "upgrade-insecure-requests": "1",
        "cookie":cookie,
        "accept-language": "zh-CN,zh;q=0.9",
        "referer": "https://buyin.jinritemai.com/",
        "user-agent": navigatorParams.userAgent,
      },
    });  
    console.log(data);
    return data;
}

let screenParams={"availWidth": 1707,"availHeight": 912,"width": 1707,"height": 960,"colorDepth": 24,"pixelDepth": 24};
let navigatorParams={
    "userAgent": "Mozilla/5.0 (iPhone; CPU iPhone OS 16_6 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/16.6 Mobile/15E148 Safari/604.1",
    "vendorSubs": {"ink": 1743780386637},
    "platform": "MacIntel"
};
let windowParams={"innerWidth":2560,"innerHeight":1271,"outerWidth":2560,"outerHeight":1392,"screenX":0,"screenY":0,"pageYOffset":0};
let cookieStr="gfkadpd=2631,22740; x-web-secsdk-uid=eade8e5b-e5e0-4367-8ac2-9519bd867920; s_v_web_id=verify_m9qppydo_zLvAB7xo_Uw5Z_4Kfu_9Klh_qdsOG3TvoRpB; _tea_utm_cache_3813=undefined; scmVer=1.0.1.8845; passport_csrf_token=c74440e8dc5b1794fabbfa2b4e5c5850; passport_csrf_token_default=c74440e8dc5b1794fabbfa2b4e5c5850; ttcid=28adfafbdffc474ca6126702f23bcd7423; tt_scid=TyNW8t7L3f1RCKJCftwox.BEcX.0IcW1XcMNOHja6W8JOyBGsD.GVaBHKh798rG.8ed0; ttwid=1%7CYCbgGt7z2KfRVs8pHVbkoAngZaBl2eiW4BPM1WqyVsg%7C1745219391%7C5bbc6a83c10079829a7014dd8115d641b6d03ce38d1c4b7001cfc63f92aa867d; uid_tt=aca3f91202cb8f966bf14936a8604985; uid_tt_ss=aca3f91202cb8f966bf14936a8604985; sid_tt=b41eada2784202ecdc9ce26ca71af053; sessionid=b41eada2784202ecdc9ce26ca71af053; sessionid_ss=b41eada2784202ecdc9ce26ca71af053; is_staff_user=false; odin_tt=c418ca34db5ce08719504d9613e7306191e9421fdd376756b0eec0600dede33ce3b10b8d5a10fa917a870f69de8b09fbd3dcb79668700a5a7139b7449eb7bcf7; ucas_c0_buyin=CkEKBTEuMC4wELOIgYje6PuCaBi9LyDMwqDthc3nAyiPETC-2rDejsy0AUDI3pfABkjIktTCBlCzvLPYzNe712dYfhIUgm-tKZCHMsn04a7W-NTNQKyGul4; ucas_c0_ss_buyin=CkEKBTEuMC4wELOIgYje6PuCaBi9LyDMwqDthc3nAyiPETC-2rDejsy0AUDI3pfABkjIktTCBlCzvLPYzNe712dYfhIUgm-tKZCHMsn04a7W-NTNQKyGul4; sid_guard=b41eada2784202ecdc9ce26ca71af053%7C1745219400%7C5184000%7CFri%2C+20-Jun-2025+07%3A10%3A00+GMT; sid_ucp_v1=1.0.0-KDBjODc0ZDRlNjI1ZmFhMzRmMTI5OTNhODE0ODQyOTMyYzI3MjNiN2UKGAi-2rDejsy0ARDI3pfABhiPESAMOAhAJhoCbGYiIGI0MWVhZGEyNzg0MjAyZWNkYzljZTI2Y2E3MWFmMDUz; ssid_ucp_v1=1.0.0-KDBjODc0ZDRlNjI1ZmFhMzRmMTI5OTNhODE0ODQyOTMyYzI3MjNiN2UKGAi-2rDejsy0ARDI3pfABhiPESAMOAhAJhoCbGYiIGI0MWVhZGEyNzg0MjAyZWNkYzljZTI2Y2E3MWFmMDUz; SASID=SID2_7495658396751266060; BUYIN_SASID=SID2_7495658396751266060; buyin_shop_type=24; buyin_account_child_type=1128; buyin_app_id=1128; buyin_shop_type_v2=24; buyin_account_child_type_v2=1128; buyin_app_id_v2=1128; csrf_session_id=e6c9abb85cddb9dacc3ae49a8b152c4a"
let proxyInfo={host:'geo.iproyal.com',port:12321,protocol: "http",userName:'XJXBF4NEenE3iaE7',password:'ypqMqR7ilJvdkqZ4_session-7lCxxziR_lifetime-48h_streaming-1'};


//fddx();
//let prox={"type":"cache","data":"250422001810902818655753749579758624345319412000028011"};
//tp_cashier_trade_query(JSON.stringify(prox),"SP2025042200090925949517303856",navigatorParams,cookieStr,proxyInfo)
//jinritemai_account(navigatorParams,cookieStr,proxyInfo);
//xiaodian_create_order(22,screenParams,navigatorParams,windowParams,cookieStr,proxyInfo);
module.exports = {
    get_a_bogus_v2_init,
    recharge_external_user_info_cache,
    trade_query,
    jinritemai_account,//小店获取用户信息
    tp_cashier_trade_query,//小店查单
    xiaodian_create_order,//小店查询订单
}