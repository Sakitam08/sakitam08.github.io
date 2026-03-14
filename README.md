# 个人技术服务网站 - 多平台版本

本项目将个人技术服务网站转换为微信小程序和安卓APP两个平台的版本。

## 项目结构

```
├── wechat-miniprogram/  # 微信小程序版本
├── android-app/         # 安卓APP版本
├── index.html           # 原始网站HTML文件
├── style.css            # 原始网站CSS文件
├── script.js            # 原始网站JavaScript文件
└── README.md            # 项目说明文件
```

## 微信小程序版本

### 项目结构

```
wechat-miniprogram/
├── app.json          # 小程序配置文件
├── app.wxss          # 全局样式文件
├── app.js            # 全局逻辑文件
├── pages/            # 页面目录
│   ├── index/        # 首页
│   ├── about/        # 关于我
│   ├── services/     # 服务项目
│   ├── portfolio/    # 技术练习案例
│   ├── contact/      # 联系方式
│   └── message/      # 在线留言
└── images/           # 图片资源
```

### 如何使用

1. 安装微信开发者工具
2. 打开微信开发者工具，选择「导入项目」
3. 选择 `wechat-miniprogram` 目录作为项目根目录
4. 填写小程序AppID（如果没有，可以使用测试号）
5. 点击「导入」按钮
6. 点击「预览」按钮，使用微信扫码查看效果

## 安卓APP版本

### 项目结构

```
android-app/
└── app/
    └── src/
        └── main/
            ├── java/com/example/technologyservice/  # Java代码
            ├── res/layout/                          # 布局文件
            ├── assets/                              # 静态资源
            └── AndroidManifest.xml                  # 应用配置文件
```

### 如何使用

1. 安装Android Studio
2. 打开Android Studio，选择「Open an existing project」
3. 选择 `android-app` 目录作为项目根目录
4. 等待项目同步完成
5. 连接Android设备或启动模拟器
6. 点击「Run」按钮运行应用

### 注意事项

- 安卓APP使用WebView加载本地HTML文件，需要将网站的HTML、CSS、JavaScript和图片文件复制到 `android-app/app/src/main/assets` 目录中
- 确保所有资源文件的路径正确，特别是图片和样式文件

## 功能说明

### 微信小程序

- 首页：展示服务介绍和主要按钮
- 关于我：个人介绍和技能展示
- 服务项目：详细的服务内容介绍
- 技术练习案例：展示技术练习作品，支持图片预览
- 联系方式：多种联系方式和复制功能
- 在线留言：表单提交功能

### 安卓APP

- 使用WebView加载完整的网站内容
- 支持网页内导航和交互
- 实现了返回按钮的功能

## 技术栈

### 微信小程序
- WXML
- WXSS
- JavaScript

### 安卓APP
- Java
- WebView
- Android SDK

## 注意事项

1. 微信小程序需要在微信开发者工具中进行开发和调试
2. 安卓APP需要在Android Studio中进行开发和调试
3. 确保所有图片资源正确放置在对应目录中
4. 微信小程序的图片路径需要使用相对路径，如 `/images/1.png`
5. 安卓APP的图片路径需要与HTML文件中的路径保持一致
