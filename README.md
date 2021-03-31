# DSAV
Data Structure Algorithm Visualizations 数据结构算法可视化

# 使用方法
## clone 源码
```
git clone git@github.com:hechengjin/DSAV.git
```
## 安装依赖
```
npm install 
```
## 启动
```
 npm start
 or
 npm run start
```

# 工程创建步骤
使用npm前可以先查看和选择要使用的源，

安装nrm
```
npm install -g nrm  ---没安装要安装nrm
nrm ls --列出可以选择的源
nrm use taobao --选择要使用的源
npm config get registry  --查看当前npm使用的源
```

工程初始化
```
mkdir DSAVisual && cd DSAVisual
npm init -y
npm i --save-dev electron
```

安装相关依赖
```
npm install --save-dev iconv-lite  

npm install --save-dev getmac

npm install --save-dev ip
```

#使用electron-packager打包
安装
```
npm install electron-packager --save-dev
```
配置如下打包命令相关：
平台
```
"packWin" "packDarwin"  "packMas"  "packLinux"
platform must be a string matching: darwin, linux, mas, win32
```

执行打包命令：
npm run packWin

如果找不到相关依赖包，则要把它配置到dependencies中，可以再执行下
npm  install

苹果系统打包报如下错误
```
EPERM: operation not permitted, stat 'C:\Users\Administrator\AppData\Local\Temp\electron-packager\darwin-x64\DSAVisual-darwin-x64\DSAVisual.app\Contents\Frameworks\Squirrel.framework\Versions\Current'
```

# 其它
NPM依赖包版本号~和^和*的区别
~ 会匹配最近的小版本依赖包，比如~1.2.3会匹配所有1.2.x版本，但是不包括1.3.0
^ 会匹配最新的大版本依赖包，比如^1.2.3会匹配所有1.x.x的包，包括1.3.0，但是不包括2.0.0
* 这意味着安装最新版本的依赖包

