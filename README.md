## 使用方法 ##
```
npm install virsical-cropper
// or
yarn add virsical-cropper
```
```
import Cropper from 'virsical-cropper';
import 'virsical-cropper/lib/main.min.css';

<div>
  <Cropper btnText={'选择照片'} />
</div>

```

### 参数: ###

```
btnText
```
#### 选择照片按钮文字<br/>type:&nbsp;&nbsp;string&nbsp;&nbsp;|&nbsp;&nbsp;默认值:&nbsp;&nbsp;'选择照片' ####
```
infoText
```
#### 提示信息文字<br/>type:&nbsp;&nbsp;string&nbsp;&nbsp;|&nbsp;&nbsp;默认值:&nbsp;&nbsp;'上传照片用于人脸识别开门或者签到' ####
```
uploadText
```
#### 上传提示信息文字<br/>type:&nbsp;&nbsp;string&nbsp;&nbsp;|&nbsp;&nbsp;默认值:&nbsp;&nbsp;'正在上传' ####
```
errorText
```
#### 超出上传大小提示信息文字<br/>type:&nbsp;&nbsp;string&nbsp;&nbsp;|&nbsp;&nbsp;默认值:&nbsp;&nbsp;'上传大小不能超过10M' ####
```
maxSize
```
#### 最大上传文件大小<br/>type:&nbsp;&nbsp;number&nbsp;&nbsp;|&nbsp;&nbsp;默认值:&nbsp;&nbsp;10（M） ####
```
accept
```
#### 支持上传图片格式<br/>type:&nbsp;&nbsp;string&nbsp;&nbsp;|&nbsp;&nbsp;默认值:&nbsp;&nbsp;'.jpg, .jpeg, .png' ####
```
imgSrc
```
#### 默认显示图片地址<br/>type:&nbsp;&nbsp;string&nbsp;&nbsp;|&nbsp;&nbsp;默认值:&nbsp;&nbsp;'' ####
```
onChange
```
#### 获取返回结果方法；参数为返回值 <br/>type:&nbsp;&nbsp;function&nbsp;&nbsp;|&nbsp;&nbsp;默认值: &nbsp;&nbsp;(e)=>{console.log(e)} ####

```
btnBackText
```
#### 返回按钮文字<br/>type:&nbsp;&nbsp;string&nbsp;&nbsp;|&nbsp;&nbsp;默认值:&nbsp;&nbsp;'返回'####
```
btnConfirmText
```
#### 确认按钮文字<br/>type:&nbsp;&nbsp;string&nbsp;&nbsp;|&nbsp;&nbsp;默认值:&nbsp;&nbsp;'确认'####
```
isMobile
```
#### 是否为移动端<br/>type:&nbsp;&nbsp;boolean&nbsp;&nbsp;|&nbsp;&nbsp;默认值:&nbsp;&nbsp;false####
```
toDataURLtype
```
#### 最终转换图片格式；参考[地址](https://blog.csdn.net/achejq/article/details/93240104)<br/>type:&nbsp;&nbsp;string&nbsp;&nbsp;|&nbsp;&nbsp;默认值:&nbsp;&nbsp;'image/jpeg' ####
```
minCropBoxWidth
```
#### [参考地址](https://blog.csdn.net/achejq/article/details/93240104)<br/>type:&nbsp;&nbsp;number&nbsp;&nbsp;|&nbsp;&nbsp;默认值:&nbsp;&nbsp;300 ####
```
minCropBoxHeight
```
#### [参考地址](https://blog.csdn.net/achejq/article/details/93240104)<br/>type:&nbsp;&nbsp;number&nbsp;&nbsp;|&nbsp;&nbsp;默认值:&nbsp;&nbsp;300 ####
```
width
```
#### [参考地址](https://blog.csdn.net/achejq/article/details/93240104)<br/>type:&nbsp;&nbsp;number&nbsp;&nbsp;|&nbsp;&nbsp;默认值:&nbsp;&nbsp;300 ####
```
height
```
#### [参考地址](https://blog.csdn.net/achejq/article/details/93240104)<br/>type:&nbsp;&nbsp;number&nbsp;&nbsp;|&nbsp;&nbsp;默认值:&nbsp;&nbsp;300 ####
