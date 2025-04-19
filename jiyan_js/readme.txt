构建Docker镜像。
在项目的根目录下执行以下命令，构建Docker镜像：

docker build -t my-node-app .
这将根据Dockerfile中的指令构建一个名为my-node-app的Docker镜像。

创建并运行容器。
使用以下命令创建并运行一个容器：

docker run -p 4000:3000 -d my-node-app
这将创建一个新的容器，并将容器的3000端口映射到主机的4000端口。-d参数表示在后台运行容器。

现在，你可以通过访问http://localhost:4000来查看你的Node.js应用程序了。


docker build -t jy-node-app .
docker run -p 8090:8090 -d jy-node-app