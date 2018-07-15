# vue2elm

vue elm 仿照饿了么外卖APP

## 安装

`npm install`

## 启动

`yarn serve`

## 打包

`yarn build` 或者 `npm run build`

打包完了以后再`dist`文件目录下,修改`index.html`中资源引用路径，把`/css`和`/js`分别改成`./css`和`./js`

在引用图片出现问题时，将`css`目录中的`*.css`文件中`/img`修改为`./../img`