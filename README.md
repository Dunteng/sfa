# 项目介绍
这是一个基于Vue全家桶完成的 销售能力自动化系统 （sales force automation，SFA）

实现了采购员（用户）登录注销、公司签到、公司通告、商铺查询、下单、购物车功能等。

serverAPI 里是项目的后端代码，提供前端所需的接口。

front-end 是本项目的前端代码。



# 项目启动说明

## 开启后端接口服务

先安装nodemon。nodemon可在检测到目录中的文件更改时通过自动重新启动节点应用程序来帮助开发基于node.js的应用程序。本项目将用它来启动和管理后端接口项目。

```
npm install -g nodemon
```

nodemon将全局安装到您的系统路径。

后端代码`npm i`安装所有的依赖,，然后`nodemon app.js`运行后端代码提供开发的接口 。

```
cd ./serverAPI
npm i
nodemon app.js
```

至此后端服务支持已开启，运行于http://localhost:8889



## 开启前端项目

我在这个项目中使用yarn作为包管理工具

```
cd ./front-end
yarn install
yarn run serve
```

执行上面指令即可开启项目。



## 项目截图

![](https://pic2.zhimg.com/80/v2-049484481879fa9f302723b8abc707c5_720w.jpg) ![](https://pic1.zhimg.com/80/v2-2a8cd5831b694f9ee2bd9506ca826878_720w.jpg)

![](https://pic4.zhimg.com/80/v2-0f8aa212daf851c6b455730e88e545bb_720w.jpg) ![](https://pic3.zhimg.com/80/v2-55387e70fd158eb32552a706f0d9e9ca_720w.jpg)

![](https://pic4.zhimg.com/80/v2-3bd5e3b18da84d2105cab0d93a8a5f77_720w.jpg) ![](https://pic4.zhimg.com/80/v2-59c5b6ae6630800aeee3ddbff7590413_720w.jpg)

![](https://pic4.zhimg.com/80/v2-9205455fa56e1af37abacc53e0ed6cbb_720w.jpg) ![](https://pic4.zhimg.com/80/v2-98cca73702316041c09f63c528a4796b_720w.jpg)

