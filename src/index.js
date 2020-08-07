import React from 'react';
import ImageCompressor from 'image-compressor.js';
import PropTypes from 'prop-types'
import EXIF from 'exif-js';

import './index.css';
import Crop from './cropper';


export const changeStyle = (isMobile, className) => {
  if (isMobile) {
    return className + 'App'
  } else {
    return className
  }
}

function getStyle(obj, attr) {
  if (obj.currentStyle) {//IE
    return obj.currentStyle[attr];
  } else {
    return getComputedStyle(obj, false)[attr];
  }
}

function isQ() {
  var ua = navigator.userAgent.toLowerCase();
  if (ua.match(/MicroMessenger/i) == 'micromessenger') {
    return true;
    //  alert("微信")
  } else if (ua.match(/QQ/i) == 'qq') {
    return true;
  } else {
    return false;
    //  alert("不是微信浏览器或手机qq浏览器");
  }
}

// 如果图片有exif信息，通过读取来旋转图片
const getRotationAngle = (e, callback) => {
  let file = e.target.files[0];
  //图片方向角
  let Orientation = null;
  if (file) {
    //获取照片方向角属性，用户旋转控制
    EXIF.getData(file, function () {
      EXIF.getAllTags(this);
      Orientation = EXIF.getTag(this, 'Orientation');
      // 判断是iOS
      if (navigator.userAgent.match(/iphone/i)) {
        if (Orientation ===1 || !Orientation) {
          callback(0);
        } else if (Orientation !== '' && Orientation !== 1) {
          switch (Orientation) {
            case 6://需要顺时针（向左）90度旋转
              callback(270)
              break;
            case 8://需要逆时针（向右）90度旋转
              callback(90);
              break;
            case 3://需要180度旋转
              callback(180);
              break;
          }
        }
      }
      //return;
    });
  }
}


class ReactDemo extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      showCropper: false,
      fileUrl: '',
      defaultCompress: {
        maxWidth: 300,
        maxHeight: 300,
        convertSize: 10000,
        isShowToast: false,
        isError: false
      },
      angle: 0
    }
    this.onFileChange = this.onFileChange.bind(this)
    this.getBase64 = this.getBase64.bind(this);
    this.changeShowCropper = this.changeShowCropper.bind(this);

  }

  componentDidMount() {
    const doc = document.querySelector('.image');
    if (doc) {
      let width = getStyle(doc, 'width');
      width = width.split('p')[0];
      doc.style.height = width
    }

  }

  getBase64(img, callback) {
    const reader = new FileReader();
    reader.addEventListener('load', () => callback(reader.result));
    reader.readAsDataURL(img);
  }

  onFileChange(e) {
    getRotationAngle(e, (angle) => {
      this.setState({ angle: angle })
    });
    const { compress, maxSize,maxSizeErrorHandle,loadingHandle } = this.props;
    // 开始加载图片，调用回调通知图片加载中
    loadingHandle(true);
    const { files } = e.target;
    const { defaultCompress } = this.state;
    const resCompress = { ...defaultCompress, ...compress };
    const fileSize = files[0].size || 0
    // 文件size超过限制后，通过回调触发外部提示
    if (fileSize > maxSize * 1024 * 1024) {
      maxSizeErrorHandle(maxSize);
      loadingHandle(false);
      // 图片超过最大size限制后，清空input value，解决用同一张图片不停上传无提示问题。
      const cropperInput = document.getElementById('cropperInput');
      if(cropperInput){
        cropperInput.value='';
      }
      return;
    }

    if (files) {
      const imageCompressor = new ImageCompressor();
      imageCompressor
        .compress(files[0], resCompress)
        .then(result => {
          this.getBase64(result, res => {
            // 图片加载完毕，调用回调通知图片加载完成
            loadingHandle(false);
            this.setState({
              fileUrl: res,
              showCropper: true,
            });
          });
        });
    }
  }

  changeShowCropper(showCropper) {
    this.setState({
      showCropper
    })
  }


  render() {
    const { showCropper, fileUrl, angle } = this.state;
    const { btnText, infoText,  accept,  isMobile, imgSrc, onChange, minCropBoxWidth, minCropBoxHeight, width, height, toDataURLtype, btnBackText, btnConfirmText, needRotate } = this.props;
    return (
      <div className={changeStyle(isMobile, 'wrapper')}>
          <div className={changeStyle(isMobile, 'container')}>
            {!showCropper &&
            <div className={changeStyle(isMobile, 'content')}>
              <div className={changeStyle(isMobile, 'image')}>
                <img className={changeStyle(isMobile, 'img')} src={imgSrc} alt="" />

              </div>

              <div className={changeStyle(isMobile, 'btnGroup')}>
                <div className={changeStyle(isMobile, 'fileBtn')}>
                  {isQ() ?
                    <input id="cropperInput" className={changeStyle(isMobile, 'file')} capture="camera" type="file"
                           onChange={this.onFileChange} accept={accept} mutiple="mutiple" /> :
                    <input id="cropperInput" className={changeStyle(isMobile, 'file')} type="file"
                           onChange={this.onFileChange} accept={accept} mutiple="mutiple" />
                  }
                  <div className={changeStyle(isMobile, 'btn')}>
                    {btnText}
                  </div>
                </div>
              </div>
              <div className={changeStyle(isMobile, 'tips')}>
                <div className={changeStyle(isMobile, 'tip')}>{infoText}</div>
              </div>
            </div>
            }
            {showCropper &&
            <div className={changeStyle(isMobile, 'content')}>
              <Crop
                fileUrl={fileUrl}
                onChange={onChange}
                minCropBoxWidth={minCropBoxWidth}
                minCropBoxHeight={minCropBoxHeight}
                width={width}
                height={height}
                toDataURLtype={toDataURLtype}
                btnBackText={btnBackText}
                btnConfirmText={btnConfirmText}
                infoText={infoText}
                isMobile={isMobile}
                needRotate={needRotate}
                onChangeShowCropper={showCropper => this.changeShowCropper(showCropper)}
                onChangeShowCropper={showCropper => this.changeShowCropper(showCropper)}
                defaultAngle={angle}
              />
            </div>
            }
          </div> 

      </div>)
  }
}

ReactDemo.defaultProps = {
  btnText: '选择照片',
  btnBackText: '返回',
  btnConfirmText: '确认',
  infoText: '上传照片用于人脸识别开门或者签到',
  compress: {
    maxWidth: 300,
    maxHeight: 300,
    convertSize: 10000,
  },
  accept: '.jpg, .jpeg, .png',
  onChange: (e) => {
    console.log('result', e)
  },
  minCropBoxWidth: 100,
  minCropBoxHeight: 100,
  width: 300,
  height: 300,
  toDataURLtype: 'image/jpeg',
  imgSrc: '',
  isMobile: false,
  maxSize: 10,
  needRotate: true
}

ReactDemo.propTypes = {
  btnText: PropTypes.string,
  btnBackText: PropTypes.string,
  btnConfirmText: PropTypes.string,
  infoText: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.element,
  ]),
  uploadText: PropTypes.string,
  compress: PropTypes.object,
  accept: PropTypes.string,
  onChange: PropTypes.func,
  minCropBoxWidth: PropTypes.number,
  minCropBoxHeight: PropTypes.number,
  width: PropTypes.number,
  height: PropTypes.number,
  maxSize: PropTypes.number,
  toDataURLtype: PropTypes.string,
  imgSrc: PropTypes.string,
  errorText: PropTypes.string,
  isMobile: PropTypes.bool,
  needRotate: PropTypes.bool,
  loadingHandle:PropTypes.func.isRequired,
  maxSizeErrorHandle:PropTypes.func.isRequired

}


export default ReactDemo;
