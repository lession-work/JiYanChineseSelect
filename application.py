# !/usr/bin/python3
# -*- coding: utf-8 -*-
# @Time    : 2020/10/8
# @Author  : YangShiMin
# @Email   : fausty@synnex.com
# @File    : application.py
# @Software: PyCharm
import base64
import os
import re
import sys
import time
import json
import logging
import requests

from urllib.parse import urlencode
from public_func import get_md5
from yolo.mode_one import generate_tt_click_points, run_click, generate_click_points
from track import get_track, get_click_track

formatter = '%(asctime)s - %(filename)s[line:%(lineno)d] -%(levelname)s: %(message)s'
logging.basicConfig(level=logging.INFO, stream=sys.stdout, format=formatter)


class JiYan(object):

    def __init__(self):
        self.s = requests.Session()
        self.gt = None
        self.w = None
        self.check_w = None
        self.challenge = None
        self.type_config = None
        # self.params_s = None
        self.type = None
        self.image_url = None
        self.image_path=None
        self.tj_check_result=None
        self.loginData=None
        self.validate=None
        self.proxies=None

    def get_gt_challenge(self):
        
        #url = f"https://www.geetest.com/demo/gt/register-click-official?t={int(time.time()) * 1000}"
        url = f"https://w.cas.sdo.com/authen/staticLogin.jsonp?callback=staticLogin_JSONPMethod&inputUserId=15019276504&password=bdQkW4KTN%2FO7sLJdtuSXL1%2BpF9mSpi%2BNqZHTpaP5kbt%2FSUVwslb0T31Iig3wy2XHxxe2zShe%2BxgGi%2BEnIv1ib3fBcE06G7KtLSIJfCAM%2B7uxkN4MMnBSzQt%2FSLKgT2EtOvIqzLq1yhnHXIlyephWke1pJeVtqreBXowpi%2B8nX%2B0%3D&appId=211&areaId=1000&serviceUrl=https%3A%2F%2Fpay.sdo.com%2F&productVersion=v5&frameType=3&locale=zh_CN&version=21&tag=20&authenSource=2&productId=2&scene=login&usage=aliCode&isEncrypt=1&autoLoginFlag=0&_={int(time.time()) * 1000}";
        headers = {
            "method": "GET",
            "scheme": "https",
            "accept": "application/json, text/plain, */*",
            "accept-encoding": "gzip, deflate, br",
            "accept-language": "zh,en-GB;q=0.9,en;q=0.8,zh-CN;q=0.7,ja;q=0.6",
            "cache-control": "no-cache",
            "pragma": "no-cache",
            "referer": "https://login.u.sdo.com/",
            "user-agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/547.36 (KHTML, like Gecko) "
                          "Chrome/85.0.4183.102 Safari/537.36",
        }

        res = self.s.get(url, headers=headers)
       
        if res.status_code == 200:
            logging.info("请求gt和challenge成功")
            # infos = res.json()
            # self.gt = infos["gt"]
            # self.challenge = infos["challenge"]
            #logging.info("get_gt_challenge config_infos %s",res.text)
            config_infos = re.search(r"staticLogin_JSONPMethod\((.*)\)", res.text)
            if config_infos:
                type_config_infos = json.loads(config_infos.group(1))
                if type_config_infos["return_code"] == 0:
                    logging.info("请求gt和challenge成功")
                    data = json.loads(config_infos.group(1))["data"]

                    self.loginData=data

                    data = json.loads(data["captchaParams"])
                    logging.info("data.gt  %s",data["gtData"]["gt"])
                    self.gt = data["gtData"]["gt"]
                    self.challenge = data["gtData"]["challenge"]
                else:
                    logging.info("请求验证码文件类型和文件名失败")
            else:
                logging.error("正则匹配文件类型信息时失败")
        else:
            logging.error("请求gt和challenge失败")

    def get_type(self):
        url = f"https://api.geevisit.com/gettype.php?gt={self.gt}&callback=geetest_{int(time.time()) * 1000}"
        headers = {
            "authority": "api.geevisit.com",
            "method": "GET",
            "scheme": "https",
            "accept": "*/*",
            "cache-control": "no-cache",
            "pragma": "no-cache",
            "referer": "https://login.u.sdo.com/",
            "user-agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/547.36 (KHTML, like Gecko) "
                          "Chrome/85.0.4183.102 Safari/537.36",
        }

        type_res = self.s.get(url, headers=headers,proxies=self.proxies)
        if type_res.status_code == 200:
            config_infos = re.search(r"geetest_\d+\((.*)\)", type_res.text)
            if config_infos:
                type_config_infos = json.loads(config_infos.group(1))
                if type_config_infos["status"] == "success":
                    logging.info("请求验证码文件类型和文件名成功")
                    self.type_config = json.loads(config_infos.group(1))["data"]
                else:
                    logging.info("请求验证码文件类型和文件名失败")
            else:
                logging.error("正则匹配文件类型信息时失败")
        else:
            logging.error("请求验证码文件类型和文件名失败")

    def get_w(self):
        url = "http://122.128.109.213:8090/get_init_w"
        data = {
            "gt": self.gt,
            "challenge": self.challenge,
            "config": self.type_config
        }
        res = requests.post(url, data=data)
        if res.status_code == 200:
            logging.info("请求w参数成功")
            self.w = res.text
        else:
            logging.error("请求w参数失败")

    def get_init_info(self):
        url = "https://api.geetest.com/get.php"
        headers = {
            "authority": "api.geetest.com",
            "method": "GET",
            "scheme": "https",
            "accept": "*/*",
            "cache-control": "no-cache",
            "pragma": "no-cache",
            "referer": "https://login.u.sdo.com/",
            "user-agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/547.36 "
                          "(KHTML, like Gecko) Chrome/85.0.4183.102 Safari/537.36",
        }

        body = {
            "gt": self.gt,
            "challenge": self.challenge,
            "lang": "zh-cn",
            "pt": 0,
            "client_type": "web",
            "w": self.w,
            "callback": f"geetest_{int(time.time()) * 1000}"
        }

        res = self.s.get(url, data=body, headers=headers,proxies=self.proxies)
        if res.status_code == 200:
            init_infos = re.search(r"geetest_\d+\((.*)\)", res.text)
            if init_infos:
                init_infos = json.loads(init_infos.group(1))
                if init_infos['status'] == 'success':
                    logging.info("获取点选验证码初始信息成功")
                    self.params_s = init_infos['data']['s']
                else:
                    logging.info("获取点选验证码初始信息失败")
            else:
                logging.error("正则匹配点选验证码信息失败")
        else:
            logging.error("请求点选验证码初始信息失败")

    def get_check_w(self):
        #logging.info("self gt = %s challenge = %s type_config=%s params_s= ",self.gt,self.challenge,self.type_config);
        print(self.type_config)
        url = "http://122.128.109.213:8090/get_check_w"
        data = {
            "gt": self.gt,
            "challenge": self.challenge,
            "config": self.type_config,
            "s": self.params_s,
            "tracks": json.dumps(get_track([(140, 595), (436, 630)]))
        }

        res = requests.post(url, data=data)
        logging.info("get_check_w %s",res.text);
        if res.status_code == 200:
            logging.info("请求点击验证的w参数成功")
            self.check_w = res.text
        else:
            logging.error("请求点击验证的w参数失败")

    def get_check_info(self):
        url = f"https://api.geevisit.com/ajax.php?gt={self.gt}&challenge={self.challenge}&" \
            f"lang=zh-cn&pt=0&client_type=web&w={self.check_w}&callback=geetest_{int(time.time()) * 1000}"
        headers = {
            "Accept": "*/*",
            "Cache-Control": "no-cache",
            "Connection": "keep-alive",
            "Host": "api.geevisit.com",
            "Pragma": "no-cache",
            "Referer": "https://login.u.sdo.com/",
            "User-Agent": "Mozilla/5.0 (Windows NT 10.0; WOW64) AppleWebKit/547.36 "
                          "(KHTML, like Gecko) Chrome/85.0.4183.102 Safari/537.36",
        }

        res = self.s.get(url, headers=headers,proxies=self.proxies)
        logging.info("get_check_info %s",res.text);
        if res.status_code == 200:
            check_infos = re.search(r"geetest_\d+\((.*)\)", res.text)
            if check_infos:
                check_infos = json.loads(check_infos.group(1))
                if check_infos['status'] == 'success':
                    self.type = check_infos.get("data", {}).get("result")
                    logging.info("无感验证返回信息成功")
                else:
                    logging.error("无感验证返回信息异常")
            else:
                logging.error("正则匹配无感验证信息失败")
        else:
            logging.error("请求无感验证信息失败")

    def get_image_info(self):
        url = "https://api.geevisit.com/get.php"
        headers = {
            "Accept": "text/html,application/xhtml+xml,application/xml;q=0.9,image/avif,image/webp,image/apng,*/*;q=0.8,application/signed-exchange;v=b3;q=0.7",
            "Cache-Control": "no-cache",
            "accept-language":"zh-CN,zh;q=0.9",
            "Connection": "keep-alive",
            "Host": "api.geevisit.com",
            "Pragma": "no-cache",
            "Referer": "https://login.u.sdo.com/",
            "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/547.36 (KHTML, like Gecko) Chrome/127.0.0.0 Safari/537.36",
        }

        data = {
            "is_next": True,
            "type": self.type,
            "gt": self.gt,
            "challenge": self.challenge,
            "lang": "zh-cn",
            "https": "false",
            "protocol": "https://",
            "api_server":"api.geevisit.com",
            "offline": "false",
            "product": "custom",
            "api_server": "api.geevisit.com",
            "isPC": True,
            "width": "240px",
            "autoReset": True,
            "area": "#area",
            "bg_color": "black",
            "callback": f"geetest_{int(time.time()) * 1000}",
        }
        
        encoded_params=urlencode(data);
        url = f"https://api.geevisit.com/get.php?{encoded_params}"
        logging.info("请求验证码图片参数 %s",url)
        
        res = self.s.get(url,headers=headers,proxies=self.proxies)
        if res.status_code == 200:
            logging.info("请求验证码图片信息成功 %s",res.text)
            image_infos = re.search(r"geetest_\d+\((.*)\)", res.text)
            if image_infos:
                image_infos = json.loads(image_infos.group(1))
                if image_infos["status"] == "success":
                    # self.params_s = image_infos["data"]["s"]
                    self.image_url = f"https://static.geetest.com{image_infos['data']['pic']}"
                    #self.image_url=f"https://static.geetest.com/captcha_v3/custom_batch/v3/30/2023-05-19T17/icon/b20bf35c14c9405195ddba512e4569f6.jpg"
                    return image_infos.get("data", {})
                else:
                    logging.error("请求验证码图片失败")
            else:
                logging.error("正则匹配验证码图片信息失败")
        else:
            logging.error("请求验证码图片信息失败")

    def get_image(self):
        headers = {
            "authority": "static.geetest.com",
            "method": "GET",
            "scheme": "https",
            "accept": "text/html,application/xhtml+xml,application/xml;q=0.9,image/avif,image/webp,image/apng,"
                      "*/*;q=0.8,application/signed-exchange;v=b3;q=0.9",
            "accept-encoding": "gzip, deflate, br",
            "accept-language": "en-GB,en;q=0.9,zh;q=0.8,zh-CN;q=0.7,ja;q=0.6",
            "cache-control": "no-cache",
            "pragma": "no-cache",
            "upgrade-insecure-requests": "1",
            "user-agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/547.36 (KHTML, like Gecko) "
                          "Chrome/85.0.4183.102 Safari/537.36",
        }
        logging.info("get_image %s ",self.image_url);
        image_res = requests.get(self.image_url, headers=headers)
        
        if image_res.status_code == 200:
            image_dir = os.path.join(os.getcwd(), "image")
            if not os.path.exists(image_dir):
                os.makedirs(image_dir)

            image_path = os.path.join(image_dir, f"{get_md5(image_res.content)}.jpg")
            with open(image_path, "wb") as f:
                try:
                    f.write(image_res.content)
                except Exception as e:
                    logging.error(f"保存验证码图片失败: {e.args}")
                else:
                    self.image_path=image_path;
                    logging.info(f"保存验证码图片成功: {image_path}")
        else:
            logging.error('请求验证码图片失败')

    def get_click_w(self, image_infos):
       
      
        url = "http://122.128.109.213:8090/get_click"
        #click_list, points = generate_click_points(run_click(os.path.join(os.getcwd(), "image", "image.jpg")))
        #click_list, points = generate_click_points(run_click(self.image_path))
        ##图鉴
        click_list, points = generate_tt_click_points(self.tj_check_result)
        track_list = get_click_track(click_list)
        #logging.info("get_click_w click_list %s",click_list);
        #logging.info("get_click_w track_list %s",track_list);
        #logging.info("get_click_w points %s",points);
        data = {
            "gt": self.gt,
            "challenge": self.challenge,
            "call_infos": json.dumps(image_infos),
            "tracks": json.dumps(track_list),
            "points": json.dumps(points)
        }
        
        res = requests.post(url, data=data)
        if res.status_code == 200:
            logging.info("请求点击汉字的w参数成功")
            return res.text
        else:
            logging.error("请求点击汉字的w参数失败")

    def get_validate(self, image_infos):
        url = "https://api.geetest.com/ajax.php?gt={gt}&challenge={challenge}&lang=zh-cn&" \
              "pt=0&client_type=web&w={w}&&callback=geetest_{t}"
        header = {
            "Accept": "*/*",
            "Accept-Encoding": "gzip, deflate, br",
            "Accept-Language": "zh-CN,zh;q=0.9,en-GB;q=0.8,en;q=0.7,ja;q=0.6",
            "Cache-Control": "no-cache",
            "Connection": "keep-alive",
            "Host": "api.geetest.com",
            "Pragma": "no-cache",
            "Referer": "https://www.geetest.com/",
            "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/547.36 (KHTML, like Gecko) "
                          "Chrome/86.0.4240.183 Safari/537.36",
        }

        time.sleep(1)
        url = url.format(gt=self.gt, challenge=self.challenge,
                         w=self.get_click_w(image_infos), t=int(time.time()) * 1000)
        res = self.s.get(url, headers=header,proxies=self.proxies)
        if res.status_code == 200:
            logging.info("请求点击验证成功 %s",res.text)
            infos = re.search(r"geetest_\d+\((.*)\)", res.text)
            if infos:
                validate_infos = json.loads(infos.group(1))
                if validate_infos["status"] == "success" and validate_infos["data"]["result"] == "success":
                    #print(validate_infos)
                    self.validate=validate_infos["data"]["validate"]
                    logging.info("点击验证成功 ---last %s ",validate_infos)
                else:
                    logging.error("点击验证失败")
            else:
                logging.error("正则匹配点击验证信息失败")
        else:
            logging.error("点击验证失败")

    def downImg(self):
         
        headers = {
            "authority": "static.geetest.com",
            "method": "GET",
            "scheme": "https",
            "accept": "text/html,application/xhtml+xml,application/xml;q=0.9,image/avif,image/webp,image/apng,"
                      "*/*;q=0.8,application/signed-exchange;v=b3;q=0.9",
            "accept-encoding": "gzip, deflate, br",
            "accept-language": "en-GB,en;q=0.9,zh;q=0.8,zh-CN;q=0.7,ja;q=0.6",
            "cache-control": "no-cache",
            "pragma": "no-cache",
            "upgrade-insecure-requests": "1",
            "user-agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/547.36 (KHTML, like Gecko) "
                          "Chrome/85.0.4183.102 Safari/537.36",
        }
        img_binary = requests.get(self.image_url,headers=headers)  # .content  # 获取图片的二进制格式
        content_type = img_binary.headers["Content-Type"].split('/')[1]
        #print(content_type)
        #print(img_binary.status_code)
        if img_binary.status_code == 200:
            base64_data = base64.b64encode(img_binary.content)
            # print(img_binary)
            s = base64_data.decode()
            s_base64=s
            #s_base64 = 'data:image/jpeg;base64,%s' % s
        else:
            s_base64 = ''
            
        return s_base64

    # 调用图鉴接口识别
    def tjGetImagePoints(self):
        #图鉴图片识别.image_url
         url = "http://api.ttshitu.com/predict"
         header = {
            "content-type": "application/json",
        }
         base64Url=self.downImg()
         #logging.info("图片base64 %s",base64Url)
         jsData = "{\"username\":\"294362741\",\"password\":\"96310hqh\",\"image\":\"" + base64Url + "\",\"typeid\":\"27\"}";
         res=requests.post(url,data=jsData,headers=header)
         logging.info("图鉴结果 %s",res.text)
         if res.status_code == 200:
            jsonRes=json.loads(res.text)
            if jsonRes["code"]=="0":
                self.tj_check_result= jsonRes["data"]["result"]
                #184,56|170,242|262,170
         else:
           logging.info("调用图鉴结果失败")
         
    def checkCodeLogin(self):
        
        url = "https://w.cas.sdo.com/authen/checkCodeLogin.jsonp"
        header = {
            "Accept": "*/*",
            "Accept-Encoding": "gzip, deflate, br",
            "Accept-Language": "zh-CN,zh;q=0.9,en-GB;q=0.8,en;q=0.7,ja;q=0.6",
            "Cache-Control": "no-cache",
            "Connection": "keep-alive",
            "Pragma": "no-cache",
            "Referer": "https://login.u.sdo.com/",
            "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/547.36 (KHTML, like Gecko) "
                          "Chrome/86.0.4240.183 Safari/537.36",
        }
     
        data = {
            "callback": "checkCodeLogin_JSONPMethod",
            "guid": self.loginData["guid"],
            "password": "gtest",
            "appId": 211,
            "areaId": 1000,
            "serviceUrl": "https://pay.sdo.com/",
            "productVersion": "v5",
            "frameType": 3,
            "productVersion": "zh_CN",
            "version": 21,
            "tag": 20,
            "authenSource": 2,
            "productId": 2,
            "authenSource": 1,
            "scene": "login",
            "usage": "aliCode",
            "_": int(time.time()) * 1000,
            "captchaInfo": {"picCode":"gtest","gtData":{"challenge":""+self.challenge+"","validate":""+self.validate+"","seccode":""+self.validate+"|jordan"}},
        }
       
        logging.info("请求cookie   %s", self.s.cookies);
        res = self.s.get(url,data=data, headers=header)
        logging.info("登录 %s ,结果 %s",res.status_code,res.text)

        
    def scheduler(self):
        #click_list, points= generate_tt_click_points("184,56|170,242|262,170")
        #logging.info("click_list %s",click_list)
        #logging.info("points %s",points)
        self.get_gt_challenge()
        self.get_type()
        self.get_w()
        self.get_init_info()
        self.get_check_w()
        self.get_check_info()
        image_infos = self.get_image_info()
        #jy.get_image()
        self.tjGetImagePoints()
        self.get_validate(image_infos)
        self.checkCodeLogin()

    def webScheduler(self,gt,change,proxyIp):
        #click_list, points= generate_tt_click_points("184,56|170,242|262,170")
        #logging.info("click_list %s",click_list)
        #logging.info("points %s",points)
        if proxyIp!='':
            self.proxies = {
                'https':proxyIp,
                'http':proxyIp
            }
            
        self.gt = gt
        self.challenge =change
        #self.get_gt_challenge()
        self.get_type()
        self.get_w()
        self.get_init_info()
        self.get_check_w()
        self.get_check_info()
        image_infos = self.get_image_info()
        #jy.get_image()
        self.tjGetImagePoints()
        self.get_validate(image_infos)
        return self.validate
        #self.checkCodeLogin()
if __name__ == "__main__":
    jy = JiYan()
    for i in range(1):
        jy.scheduler()
