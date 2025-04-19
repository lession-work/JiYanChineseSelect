# 使用官方 Python 运行时作为父镜像
FROM python:3.8

# 设置工作目录
WORKDIR /app
# 将当前目录内容复制到工作目录
COPY . /app
# 安装依赖
RUN pip install --no-cache-dir -r yolo/requirements.txt

# 暴露端口
EXPOSE 8889

# 运行应用
CMD ["python", "webService.py"]
