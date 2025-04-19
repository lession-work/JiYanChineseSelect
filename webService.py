from http.server import SimpleHTTPRequestHandler
import logging
from socketserver import TCPServer
import sys
from urllib.parse import parse_qs

from application import JiYan

formatter = '%(asctime)s - %(filename)s[line:%(lineno)d] -%(levelname)s: %(message)s'
logging.basicConfig(level=logging.INFO, stream=sys.stdout, format=formatter)

class MyHTTPRequestHandler(SimpleHTTPRequestHandler):
    def do_GET(self):
        
         # 获取查询字符串参数
        query_components = parse_qs(self.path.split('?')[1])
        # 假设我们只关心名为'action'的参数
        action = query_components.get('action', [])
        logging.info("请求action %s ",action[0])

        responseResult="empty"
        if action[0]=="jyvalidate":
            responseResult=self.jYanLogic(query_components)
        
        logging.info("响应结果 %s",responseResult)
        responseBytes= bytearray(responseResult, "utf-8")
        logging.info("响应结果 %s",responseBytes)
        self.send_response(200)
        #self.send_header('Content-type', 'application/json')
        self.end_headers()
        self.wfile.write(responseBytes)
        self.wfile.flush()

    def jYanLogic(self,query_components):
        gt = query_components.get('gt', [])[0]
        challenge = query_components.get('challenge', [])[0]
        proxy = query_components.get('proxy', [])
        logging.info("jYanLogic gt = %s challenge= %s proxy=%s",gt,challenge,proxy)
        jy = JiYan()
        proxyStr=''
        length = len(proxy)
        if length>0:
            proxyStr=proxy[0]
        return jy.webScheduler(gt,challenge,proxyStr)

print("init")
httpd = TCPServer(('0.0.0.0', 8889), MyHTTPRequestHandler)
httpd.serve_forever()