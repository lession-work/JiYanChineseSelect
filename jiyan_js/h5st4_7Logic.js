const jdToken = require("./jd_token.js");
const CryptoJS = require("crypto-js");
const axios = require("axios");
const jdSecurity = require("./js_security_v3_0.1.5.js");


async function getH5st(h5stParams) {
    var deviceInfo=h5stParams.deviceInfo;
    var signParams=h5stParams.signParams;

    var body=signParams.body;
    var signAppId=signParams.signAppId;
    var dt=signParams.t;
    var functionId=signParams.functionId;
    var appId=signParams.appId;
    var client=signParams.client;
    var clientVersion=signParams.clientVersion;
    // var body = {"page":1,"pagesize":10,"other_related":"0","sceneval":2,"buid":325,"appCode":"msc588d6d5","time":1725712116122,"signStr":"c865a2c7a1422b0afb22aa0343bcd1f2"};
    // var dt=new Date().getTime();
    // var D = "25f73"
    var J = {
        "functionId":functionId,
        "appid": appId,
        "body": CryptoJS.SHA256(JSON.stringify(body)).toString(),
        "client":client,
        "clientVersion": clientVersion,
        "t": dt
    };
    console.log("开始请求4.7签名 %s ",JSON.stringify(J));

    var secObject=jdSecurity.init(deviceInfo);
    var res= await new secObject.ParamsSign({
        "appId": signAppId,
        "debug": !1,
        "onSign": function onSign() { },
        "onRequestTokenRemotely": function onRequestTokenRemotely() { },
        "onRequestToken": function onRequestToken() { }
    }).sign(J);
  
    // var requestUrl="https://api.jingxi.com/api?functionId=lite_wait4Payment";
    //     var postData="functionId=lite_wait4Payment&appid=jx_h5&t="+dt+"&channel=jxh5&clientVersion=1.2.5&client=jxh5&uuid=5931110665493403560&cthr=1&loginType=2&x-api-eid-token=jdd03CEO2MG3GMYVYREWQVU3BVTY4GAKGZJP667UTZO5KXRK4JZNZZMPQJAAER4C2BXXT66MRTAHAGZZK5OYXHWQX57UPVYAAAAMRZR2JIZYAAAAADAN25GIMHIFN6QX&body="+encodeURIComponent(JSON.stringify(body))+"&h5st="+encodeURIComponent(res.h5st);
    //     console.log("FFFFFFFFFFFFFFFFFFFFFFFFFFFFFF")
    //     console.log(JSON.stringify(postData));
       
    //     var  res = await axios({
    //         method: "post",
    //         data:postData,
    //         url: requestUrl,
    //         headers: {
    //         "origin": "https://trade.m.jd.com",
    //         "cookie":deviceInfo.cookie,
    //         "x-referer-page":"https://trade.m.jd.com/order/n_detail_jdm.shtml",
    //         "User-Agent": deviceInfo.userAgent,
    //         "x-rp-client":"h5_1.0.0",
    //         "content-type":"application/x-www-form-urlencoded",
    //         },
    //     });
        
    //     console.log(res.data);
    //     console.log(res.status);

    return res;
}

async function testRun(){
    var cookieStr = "pin=jd_chKbWxeUGCPn; unick=0z71f85mzg5tac; thor=D5C6FB07F71BD6A55E71C5FB1C502DA4F15391740B83FE7A1C454F4DEAAAAD099AA396AEAB41779CF9AA2CB0608089405E8395471AC0FB7679C4B11766C1D6C84EE8B30996F989FB059F6EF51B0D0AC1C8198B0F6EE4EE624073CB24314879195C8356B2A3E62A2F827FCCAD5A459ACC8325E5C6EF926A32DD4658AC64DED75977690164BDD03FE98C382827C3A222F99737373767239A9C7C537ED960F10120; light_key=AASBKE7rOxgWQziEhC_QY6yaRT3OsFIWvYFl0VhzBIM4rj2T9BJ268BwntrbMyuA_zlSFPfc; webp=1; mba_muid=17251870326981582965924; 3AB9D23F7A4B3C9B=CEO2MG3GMYVYREWQVU3BVTY4GAKGZJP667UTZO5KXRK4JZNZZMPQJAAER4C2BXXT66MRTAHAGZZK5OYXHWQX57UPVY; visitkey=5931110665493403560; flash=3_Kx5zUoJwx8oTag2DmBQM2gKht58v_mtUP1mW5Wilx0s-UFk6VhwThYUKZH3XZmafw_52UTZjQGdVuM8pbcYhkjEiXQeLGAzXASP-GLFHvaIR-7qg6OSzJ08SSGjPHbtDYjexzczV3cR6tcWdW5YMgFZmKoBhIp3uiFEwzSLrfHkGUaoPw9ovqlTRPe**; equipmentId=CEO2MG3GMYVYREWQVU3BVTY4GAKGZJP667UTZO5KXRK4JZNZZMPQJAAER4C2BXXT66MRTAHAGZZK5OYXHWQX57UPVY; fingerprint=0281a45c990e0e93cf64a4548eb76b52; deviceVersion=9.0.0.14110; deviceOS=android; deviceOSVersion=13; deviceName=QQ; pt_pin=jd_chKbWxeUGCPn; pwdt_id=jd_chKbWxeUGCPn; wxa_level=1; cid=3; appCode=msc588d6d5; block_call_jdapp=11; pt_key=AAJm1zkxADDp0YQEfYAy2taeL4ihRy6IyU9-JFC13v5ITiqWL9bCkn5PmBHIOv_MItzWV4948I8; pt_token=hojt1ezf; sfstoken=tk01mb8aa1cb3a8sMngxKzJDNW9hGmkKO73xwY8B+xcbZz9DJDFNp5xfsk0J620jqDPwUKZxUY1giimfMwn/sSygs76i; sbx_hot_h=null; __wga=1725629141780.1725629141780.1725622167792.1725023672615.1.30; __jdc=76161171; PPRD_P=UUID.17251870326981582965924-CT.138631.36.4-LOGID.1725629798710.1084062865; jxsid=17256298067876655666; __jdv=68990090%7Cdirect%7C-%7Cnone%7C-%7C1725629806811; e_wq_addr=CJCyCJY2DNu0EJcvD0CyCP8nDzS2XzC2DtZpCtCmCtqvD0CvdJVPD0YvdJq5D0ZpTXU2ENGyTXU2Dzu3TXU1HJKyXyV1DtK2HMV1DJdNHIV1DzG3DsV1DtVNHsV1ENPPGIV1DuDMGsV1DJDMHv8vdJYmDuGvdJU3G0UvdJu1DNcvD0CvdJVPD0YvdJq5D0YvdJY4DNSvdJY3EJcvdJVPCNSvdJYmDuGvdJU3G0UvdJc0DzYvdJY1G0YvdJqnHUOvdJZNGuSvdJUzGuYvdJYmDuGvdJU3G0UvdJu1DNcvdJu1DNcvdJY1C0YvdJVPEUCvdJVMHtuvdJu3DtSvD0CnCJKkENS4CzCnTJTNCtGkENCnDJS=; wq_addr=13216649497%7C20_1726_3666_23028%7C%u5E7F%u897F_%u6842%u6797%u5E02_%u606D%u57CE%u7476%u65CF%u81EA%u6CBB%u53BF_%u606D%u57CE%u9547%7C%u5E7F%u897F%u6842%u6797%u5E02%u606D%u57CE%u7476%u65CF%u81EA%u6CBB%u53BF%u606D%u57CE%u9547%u9547%u653F%u5E9C%u5BF9%u9762%7C110.828331%2C24.83152; __jd_ref_cls=MyJD_OrderfloorIcon; jxsid_s_u=https%3A//st.jingxi.com/order/orderlist_merge.shtml; 3AB9D23F7A4B3CSS=jdd03CEO2MG3GMYVYREWQVU3BVTY4GAKGZJP667UTZO5KXRK4JZNZZMPQJAAER4C2BXXT66MRTAHAGZZK5OYXHWQX57UPVYAAAAMRZR2JIZYAAAAADAN25GIMHIFN6QX; _gia_d=1; __jxjda=68990090.17251870326981582965924.1725187032.1725687278.1725712099.10; jxsid_s_t=1725712099105; __jda=76161171.17250232628661145797770.1725023263.1725712099.1725712099.56; __jdb=76161171.1.17250232628661145797770|56.1725712099";
    var userAgent ="Mozilla/5.0 (iPhone; CPU iPhone OS 16_6 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/16.6 Mobile/15E148 Safari/604.1";
    
    var body = {"page":1,"pagesize":10,"other_related":"0","sceneval":2,"buid":325,"appCode":"msc588d6d5","time":1725712116122,"signStr":"c865a2c7a1422b0afb22aa0343bcd1f2"};
    var dt=new Date().getTime();

    var D = "25f73"
    var J = {
        "functionId": "lite_wait4Payment",
        "appid": "jx_h5",
        "body": CryptoJS.SHA256(JSON.stringify(body)).toString(),
        "client": "jxh5",
        "clientVersion": "1.2.5",
        "t": dt
    };

    var secObject=jdSecurity.init(cookieStr,userAgent);

    var obj=new secObject.ParamsSign({
        "appId": D,
        "debug": !1,
        "onSign": function onSign() { },
        "onRequestTokenRemotely": function onRequestTokenRemotely() { },
        "onRequestToken": function onRequestToken() { }
    }).sign(J).then(async res => {
     
       // console.log(res);
        // if(1==1)
        // return;
        //dt=new Date().getTime();
        var requestUrl="https://api.jingxi.com/api?functionId=lite_wait4Payment";
        var postData="functionId=lite_wait4Payment&appid=jx_h5&t="+dt+"&channel=jxh5&clientVersion=1.2.5&client=jxh5&uuid=5931110665493403560&cthr=1&loginType=2&x-api-eid-token=jdd03CEO2MG3GMYVYREWQVU3BVTY4GAKGZJP667UTZO5KXRK4JZNZZMPQJAAER4C2BXXT66MRTAHAGZZK5OYXHWQX57UPVYAAAAMRZR2JIZYAAAAADAN25GIMHIFN6QX&body="+encodeURIComponent(JSON.stringify(body))+"&h5st="+encodeURIComponent(res.h5st);
        console.log("FFFFFFFFFFFFFFFFFFFFFFFFFFFFFF")
        console.log(JSON.stringify(postData));
       
        var  res = await axios({
            method: "post",
            data:postData,
            url: requestUrl,
            headers: {
            "origin": "https://trade.m.jd.com",
            "cookie":cookieStr,
            "x-referer-page":"https://trade.m.jd.com/order/n_detail_jdm.shtml",
            "User-Agent": userAgent,
            "x-rp-client":"h5_1.0.0",
            "content-type":"application/x-www-form-urlencoded",
            },
        });
        
        console.log(res.data);
        console.log(res.status);
  });
}
//testRun();
async function run(){
    var cookieStr = "pin=jd_chKbWxeUGCPn; unick=0z71f85mzg5tac; thor=D5C6FB07F71BD6A55E71C5FB1C502DA4F15391740B83FE7A1C454F4DEAAAAD099AA396AEAB41779CF9AA2CB0608089405E8395471AC0FB7679C4B11766C1D6C84EE8B30996F989FB059F6EF51B0D0AC1C8198B0F6EE4EE624073CB24314879195C8356B2A3E62A2F827FCCAD5A459ACC8325E5C6EF926A32DD4658AC64DED75977690164BDD03FE98C382827C3A222F99737373767239A9C7C537ED960F10120; light_key=AASBKE7rOxgWQziEhC_QY6yaRT3OsFIWvYFl0VhzBIM4rj2T9BJ268BwntrbMyuA_zlSFPfc; webp=1; mba_muid=17251870326981582965924; 3AB9D23F7A4B3C9B=CEO2MG3GMYVYREWQVU3BVTY4GAKGZJP667UTZO5KXRK4JZNZZMPQJAAER4C2BXXT66MRTAHAGZZK5OYXHWQX57UPVY; visitkey=5931110665493403560; flash=3_Kx5zUoJwx8oTag2DmBQM2gKht58v_mtUP1mW5Wilx0s-UFk6VhwThYUKZH3XZmafw_52UTZjQGdVuM8pbcYhkjEiXQeLGAzXASP-GLFHvaIR-7qg6OSzJ08SSGjPHbtDYjexzczV3cR6tcWdW5YMgFZmKoBhIp3uiFEwzSLrfHkGUaoPw9ovqlTRPe**; equipmentId=CEO2MG3GMYVYREWQVU3BVTY4GAKGZJP667UTZO5KXRK4JZNZZMPQJAAER4C2BXXT66MRTAHAGZZK5OYXHWQX57UPVY; fingerprint=0281a45c990e0e93cf64a4548eb76b52; deviceVersion=9.0.0.14110; deviceOS=android; deviceOSVersion=13; deviceName=QQ; pt_pin=jd_chKbWxeUGCPn; pwdt_id=jd_chKbWxeUGCPn; wxa_level=1; cid=3; appCode=msc588d6d5; block_call_jdapp=11; pt_key=AAJm1zkxADDp0YQEfYAy2taeL4ihRy6IyU9-JFC13v5ITiqWL9bCkn5PmBHIOv_MItzWV4948I8; pt_token=hojt1ezf; sfstoken=tk01mb8aa1cb3a8sMngxKzJDNW9hGmkKO73xwY8B+xcbZz9DJDFNp5xfsk0J620jqDPwUKZxUY1giimfMwn/sSygs76i; sbx_hot_h=null; __wga=1725629141780.1725629141780.1725622167792.1725023672615.1.30; __jdc=76161171; PPRD_P=UUID.17251870326981582965924-CT.138631.36.4-LOGID.1725629798710.1084062865; jxsid=17256298067876655666; __jdv=68990090%7Cdirect%7C-%7Cnone%7C-%7C1725629806811; e_wq_addr=CJCyCJY2DNu0EJcvD0CyCP8nDzS2XzC2DtZpCtCmCtqvD0CvdJVPD0YvdJq5D0ZpTXU2ENGyTXU2Dzu3TXU1HJKyXyV1DtK2HMV1DJdNHIV1DzG3DsV1DtVNHsV1ENPPGIV1DuDMGsV1DJDMHv8vdJYmDuGvdJU3G0UvdJu1DNcvD0CvdJVPD0YvdJq5D0YvdJY4DNSvdJY3EJcvdJVPCNSvdJYmDuGvdJU3G0UvdJc0DzYvdJY1G0YvdJqnHUOvdJZNGuSvdJUzGuYvdJYmDuGvdJU3G0UvdJu1DNcvdJu1DNcvdJY1C0YvdJVPEUCvdJVMHtuvdJu3DtSvD0CnCJKkENS4CzCnTJTNCtGkENCnDJS=; wq_addr=13216649497%7C20_1726_3666_23028%7C%u5E7F%u897F_%u6842%u6797%u5E02_%u606D%u57CE%u7476%u65CF%u81EA%u6CBB%u53BF_%u606D%u57CE%u9547%7C%u5E7F%u897F%u6842%u6797%u5E02%u606D%u57CE%u7476%u65CF%u81EA%u6CBB%u53BF%u606D%u57CE%u9547%u9547%u653F%u5E9C%u5BF9%u9762%7C110.828331%2C24.83152; __jd_ref_cls=MyJD_OrderfloorIcon; jxsid_s_u=https%3A//st.jingxi.com/order/orderlist_merge.shtml; 3AB9D23F7A4B3CSS=jdd03CEO2MG3GMYVYREWQVU3BVTY4GAKGZJP667UTZO5KXRK4JZNZZMPQJAAER4C2BXXT66MRTAHAGZZK5OYXHWQX57UPVYAAAAMRZR2JIZYAAAAADAN25GIMHIFN6QX; _gia_d=1; __jxjda=68990090.17251870326981582965924.1725187032.1725687278.1725712099.10; jxsid_s_t=1725712099105; __jda=76161171.17250232628661145797770.1725023263.1725712099.1725712099.56; __jdb=76161171.1.17250232628661145797770|56.1725712099";
    
    var initParams=
    {
        deviceInfo:
        {
            userAgent:"Mozilla/5.0 (iPhone; CPU iPhone OS 16_6 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/16.6 Mobile/15E148 Safari/604.1",
            cookie:cookieStr,
            href:"",
            origin:"",
            referrer:"",
            screenWidth:390,
            screenHeight:844,
            headChildElementCount:35,
            bodyChildElementCount:16,
            outerWidth:390,
            outerHeight:844,
            requestProxy:"",
        },
        signParams:{
            body:{"page":1,"pagesize":10,"other_related":"0","sceneval":2,"buid":325,"appCode":"msc588d6d5","time":1725712116122,"signStr":"c865a2c7a1422b0afb22aa0343bcd1f2"},
            t:new Date().getTime(),
            signAppId:"25f73",
            functionId:"lite_wait4Payment",
            appId:"jx_h5",
            client:"jxh5",
            clientVersion:"1.2.5",
        }
    };

    var h5stResult=await getH5st(initParams);
    // console.log("RESULT");
    // console.log(h5stResult);

    var requestUrl="https://api.jingxi.com/api?functionId=lite_wait4Payment";
    var postData="functionId=lite_wait4Payment&appid=jx_h5&t="+initParams.signParams.t+"&channel=jxh5&clientVersion=1.2.5&client=jxh5&uuid=5931110665493403560&cthr=1&loginType=2&x-api-eid-token=jdd03CEO2MG3GMYVYREWQVU3BVTY4GAKGZJP667UTZO5KXRK4JZNZZMPQJAAER4C2BXXT66MRTAHAGZZK5OYXHWQX57UPVYAAAAMRZR2JIZYAAAAADAN25GIMHIFN6QX&body="+encodeURIComponent(JSON.stringify(initParams.signParams.body))+"&h5st="+encodeURIComponent(h5stResult.h5st);
    console.log("FFFFFFFFFFFFFFFFFFFFFFFFFFFFFF")
    console.log(JSON.stringify(postData));
    var  res = await axios({
        method: "post",
        data:postData,
        url: requestUrl,
        headers: {
        "origin": "https://trade.m.jd.com",
        "cookie":initParams.deviceInfo.cookie,
        "x-referer-page":"https://trade.m.jd.com/order/n_detail_jdm.shtml",
        "User-Agent": initParams.deviceInfo.userAgent,
        "x-rp-client":"h5_1.0.0",
        "content-type":"application/x-www-form-urlencoded",
        },
    });
    
    console.log(res.data);
    console.log(res.status);
    
}
 //run();

 module.exports = {
    getH5st
}