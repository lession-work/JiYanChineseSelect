const { spawn,exec,spawnSync } = require('child_process');
const path = require("path");

function exec_dy_sign(url,method,screenParams,navigatorParams,windowParams,cookieStr){
    return new Promise(resolve =>{
        // let screenParams={"availWidth": 1707,"availHeight": 912,"width": 1707,"height": 960,"colorDepth": 24,"pixelDepth": 24};
        // let navigatorParams={
        //     "userAgent": "Mozilla/5.0 (iPhone; CPU iPhone OS 16_6 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/16.6 Mobile/15E148 Safari/604.1",
        //     "vendorSubs": {"ink": 1743780386637},
        //     "platform": "MacIntel"
        // };
        //let windowParams={"innerWidth":2560,"innerHeight":1271,"outerWidth":2560,"outerHeight":1392,"screenX":0,"screenY":0,"pageYOffset":0};
        //let cookieStr="__ac_nonce=06805140d00bcceccb810; __ac_signature=_02B4Z6wo00f01gPRNFgAAIDBPnguxIBm6IID8TDAAOj.e2; ttwid=1%7Cn9WmikemXrNpqmS21MfSylBrmISb8EPTxDmYJrotd-8%7C1745163277%7C485d997dc02dc0568b09f024d649bec11c5ddbe8fbe9bcaa932a4d1a93926fec; UIFID_TEMP=5a0fbbb49c6c57acd77ca86d66dd2e8e2f1fcf7b3fa6b8a56e480f684bd08589718aa65671d3e2760e4af61b6cc2c83ad8b9a6dc57944c499588c9bcc5b9bfde817eee21f281224602e6ec674ab10875; x-web-secsdk-uid=09c70c34-4ea5-4615-a683-90921dd1db09; =douyin.com; s_v_web_id=verify_m9pt5y0e_0eH0YB7N_XqD6_4Dv8_BbBb_m6WoOa1UrHCk; device_web_cpu_core=4; device_web_memory_size=8; architecture=amd64; hevc_supported=true; home_can_add_dy_2_desktop=%220%22; dy_swidth=1920; dy_sheight=1080; stream_recommend_feed_params=%22%7B%5C%22cookie_enabled%5C%22%3Atrue%2C%5C%22screen_width%5C%22%3A1920%2C%5C%22screen_height%5C%22%3A1080%2C%5C%22browser_online%5C%22%3Atrue%2C%5C%22cpu_core_num%5C%22%3A4%2C%5C%22device_memory%5C%22%3A8%2C%5C%22downlink%5C%22%3A10%2C%5C%22effective_type%5C%22%3A%5C%224g%5C%22%2C%5C%22round_trip_time%5C%22%3A50%7D%22; strategyABtestKey=%221745163293.249%22; volume_info=%7B%22isUserMute%22%3Afalse%2C%22isMute%22%3Afalse%2C%22volume%22%3A0.5%7D; passport_csrf_token=370b092c1c8b9ee58c8b5f19e052379f; passport_csrf_token_default=370b092c1c8b9ee58c8b5f19e052379f; xgplayer_user_id=760878776315; FORCE_LOGIN=%7B%22videoConsumedRemainSeconds%22%3A180%7D; xg_device_score=6.905294117647059; fg_uid=RID2025042023344606B5E186D053C1ADA6B4; fpk1=U2FsdGVkX19gtn0Pxo6OOyOyNjVUaBu8LFqnfqlJppgKFrmrk1O1S9Il1vm2WxYjW5ynnq3JthT7dAoAGh3etw==; fpk2=41770e408d453f0e18b6cf535e220c84; biz_trace_id=0b7aeb44; __security_mc_1_s_sdk_cert_key=f54c1cd6-48b2-83e5; __security_mc_1_s_sdk_sign_data_key_web_protect=bdb24968-430d-8423; __security_mc_1_s_sdk_crypt_sdk=f70216ed-459b-8338; bd_ticket_guard_client_data=eyJiZC10aWNrZXQtZ3VhcmQtdmVyc2lvbiI6MiwiYmQtdGlja2V0LWd1YXJkLWl0ZXJhdGlvbi12ZXJzaW9uIjoxLCJiZC10aWNrZXQtZ3VhcmQtcmVlLXB1YmxpYy1rZXkiOiJCR0VKL3ZFdjdHRUs3SmFDM3RLWjF1cEZZcHoxdC9aRjZqMzhaSDdMV3BEWDJpckFzKzM1OEI5VytlVW5VRXdWTWN4Vkx5eXVGU1pCK1B5ejUyOTdjR3c9IiwiYmQtdGlja2V0LWd1YXJkLXdlYi12ZXJzaW9uIjoyfQ%3D%3D; bd_ticket_guard_client_web_domain=2; sdk_source_info=7e276470716a68645a606960273f276364697660272927676c715a6d6069756077273f276364697660272927666d776a68605a607d71606b766c6a6b5a7666776c7571273f275e58272927666a6b766a69605a696c6061273f27636469766027292762696a6764695a7364776c6467696076273f275e5827292771273f273c353234353636333430313234272927676c715a75776a716a666a69273f2763646976602778; bit_env=CZjuGq0kwwV86GHTbk9oqCcwpvxI17lq7Akgd2InX4OK0FXPSwbA0D8MStlkb3h1F_7dgdEr56tzITen72bPxjf5hMIauCsRct4OApQNiPTI01MKY3U8TlHp8qK9F6tlLaVGzd8VnpEfLMp-QuOnYXmeoAxYBYjlh56PB6PQ0RtGCAbh3RmnLdec2gUexAeR5gGk5h7ySGOnnN5h-nb-56QBK1jRwdMZZIFljHsNXQJ6uMQ9HgDmfK8MBqoS2eYm_yt3uc8DS4zd_9p1JqYsz2-3ls64llNDP7pGRZvtNytt-fXF9hdpnxV65a0ysA2maxTjd7W5D4avM-p2qAZB1A1MnqEZBky6YNDLlN0zi5IM7G4oo5yYYf1blCIRhDxi_OUAUB4rrWrHeNI4gA6rTvvUOTU74cgfPpay2CUg1kO98yieOnnMzVPiG8seYJ2MBDgxURnnGBUKvAAX2HUneB7zqxYZWEAjfjaIogin3b2MOP27dLlEv-NgT23YsNej; gulu_source_res=eyJwX2luIjoiMGFlMWE3M2ZhMmUzMjFiMWEzNDkxZGU4MDQ1ZTY3ZTk1N2ExNDAzNmVkYjc3ZmY5YTk5ZTQ2Yjg0NDdjYWM5ZCJ9; passport_auth_mix_state=v1udwmgr5h9l9jkrm9gaf40q8whwjze2ybeiy6j9ubkx3vz1; passport_mfa_token=CjdL2gAvQYNnf9J61OD4vE1T3sGjRoNrgrYgvJDl4f9ennS69E%2F2%2FwpKojYLFDY4AaJKMc7U9jpLGkoKPAAAAAAAAAAAAABO5sU58n7lDcWH7FfjLJzYfZEOV2NfUOqaiBUUgEeH%2Fn1PcaTADHQAOp0Mgt5xCg4nIBDkoe8NGPax0WwgAiIBA35cAvc%3D; d_ticket=c363b8b3b32a492da46f7a587d11a9375e002; odin_tt=af41574186e389dd456ae7482b07bf8cce1054af3e1f77f5cb48f8ae4975959760126c3b3affd508b74051e13e87272ad1ebe4cf1ca6947e28e5a56e16c94bce; passport_assist_user=CkF5jdXc3KYsN_ZU_TZ8cyW9ykprhK3Npc2GW_OqbZGtMt6gRMrm9kLMGRqoinuhdrod380rrHlW20NSUETtGBJ7fRpKCjwAAAAAAAAAAAAATuYi20ke42LCkkyHL_-O-siBm5bCuZQBw98ZX5U9XyDIFt05usT1NU3PjayXHrHNSqkQhKLvDRiJr9ZUIAEiAQMji0Kj; n_mh=af1ZmseP_K06TOjG99VC3DovWWme-Vzk8P8XxzMJpuw; sid_guard=bfdbe49ee7e2d02667d750f2d7dd0ef9%7C1745163313%7C5184000%7CThu%2C+19-Jun-2025+15%3A35%3A13+GMT; uid_tt=327b15cad198e9c6dd39e9812cb95b06; uid_tt_ss=327b15cad198e9c6dd39e9812cb95b06; sid_tt=bfdbe49ee7e2d02667d750f2d7dd0ef9; sessionid=bfdbe49ee7e2d02667d750f2d7dd0ef9; sessionid_ss=bfdbe49ee7e2d02667d750f2d7dd0ef9; is_staff_user=false; sid_ucp_v1=1.0.0-KGIyOWU4MjA3ZGM1OWRkZmMxMWM5Y2U2Mjg2OWExYmUxYjhjYTc0YzUKIQjQ5KCi982TBxCxqJTABhjvMSAMMNqI3b8GOAdA9AdIBBoCbHEiIGJmZGJlNDllZTdlMmQwMjY2N2Q3NTBmMmQ3ZGQwZWY5; ssid_ucp_v1=1.0.0-KGIyOWU4MjA3ZGM1OWRkZmMxMWM5Y2U2Mjg2OWExYmUxYjhjYTc0YzUKIQjQ5KCi982TBxCxqJTABhjvMSAMMNqI3b8GOAdA9AdIBBoCbHEiIGJmZGJlNDllZTdlMmQwMjY2N2Q3NTBmMmQ3ZGQwZWY5; bd_ticket_guard_server_data=eyJ0aWNrZXQiOiJoYXNoLlp5a214QjQwaGo2RW5TZWNhWS9rcm81UXJPckoxcWVGNUR0M3ppMllLREk9IiwidHNfc2lnbiI6InRzLjIuZjg2YWE4Yzg5OThjZDlkNjVlMzg4OTQ4YzFjODExYzk0OTZlOWFkYTQ2MGE3M2MxZTU2ZDhlMTg4YTk5MGJhN2M0ZmJlODdkMjMxOWNmMDUzMTg2MjRjZWRhMTQ5MTFjYTQwNmRlZGJlYmVkZGIyZTMwZmNlOGQ0ZmEwMjU3NWQiLCJjbGllbnRfY2VydCI6InB1Yi5CR0VKL3ZFdjdHRUs3SmFDM3RLWjF1cEZZcHoxdC9aRjZqMzhaSDdMV3BEWDJpckFzKzM1OEI5VytlVW5VRXdWTWN4Vkx5eXVGU1pCK1B5ejUyOTdjR3c9IiwibG9nX2lkIjoiMjAyNTA0MjAyMzM1MTMzMEZDNzgxNDdFRUM0M0E2OTM5RCIsImNyZWF0ZV90aW1lIjoxNzQ1MTYzMzEzfQ%3D%3D; bd_ticket_guard_web_domain=2; login_time=1745163325877; IsDouyinActive=false; UIFID=5a0fbbb49c6c57acd77ca86d66dd2e8e2f1fcf7b3fa6b8a56e480f684bd0858975edd351fb9eb2fe63dc90588441dee5b77044b0a039db7513fbd15696e60ab8a1c148349facd18b3ae6b7cba224f714128646c1340ee15b802778c90c8582a418fa1f2f7fa87cdac07342c7b156417dfc2641713470219b8f0e120405b1d55526af1a8b93c54c73894f38f2600f6c85a34daac61eec1c1555067d54cd624f44; publish_badge_show_info=%220%2C0%2C0%2C1745163326402%22; stream_player_status_params=%22%7B%5C%22is_auto_play%5C%22%3A0%2C%5C%22is_full_screen%5C%22%3A0%2C%5C%22is_full_webscreen%5C%22%3A0%2C%5C%22is_mute%5C%22%3A0%2C%5C%22is_speed%5C%22%3A1%2C%5C%22is_visible%5C%22%3A0%7D%22; SelfTabRedDotControl=%5B%5D; FOLLOW_LIVE_POINT_INFO=%22MS4wLjABAAAAUNePuNeXFMHzU_Xnqt87UTYW-kpBLh6MQROoUxkhg5nq08JPBKnvEf-jj-2wJ3nZ%2F1745164800000%2F0%2F1745163329718%2F0%22"
        // let url="https://mssdk.bytedance.com/web/common?ms_appid=10006&msToken=de0J5MnKsCbpnO5TxQxCCkpNvCy3asIcAqXJVJBOGPkHl8eD8e-GlRhrJ7m1hRaBOCdB86RWNeJwg1rEAm0TxFRBc2RORxK-Fvw3Oqq76pY4vmYFTdEGLya9fD9DZ-TNVuFLuCVlD80b7-bx6-F4UbSxtMIma7kh572A14CtKQNL";
        // let method="POST";

        const child = spawn('node', ['douyin_sign_v2.js',JSON.stringify(screenParams),JSON.stringify(navigatorParams),JSON.stringify(windowParams),cookieStr,url,method]);

        child.stdout.on('data', (data) => {
          
            let datStr=data.toString();
            console.log(datStr);
            if(datStr.startsWith("sign_Value=")){
                child.kill();
                resolve(datStr.replace("sign_Value=","").replace("\n",""));
            }
        });
        
        child.stderr.on('data', (data) => {
            console.error(`stderr: ${data}`);
        });
        
        child.on('close', (code) => {
            console.log(`child process exited with code ${code}`);
        });
    });
}
//var res =await exec_dy_sign();
//console.log(res);
module.exports = {
    exec_dy_sign,
}