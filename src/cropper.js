
import React from 'react';

import Cropper from 'react-cropper';

import 'cropperjs/dist/cropper.css';
import * as styles from './index.css';
import { changeStyle } from './index'



function ismobile (test) {
  const u = navigator.userAgent;
  const app = navigator.appVersion;
  if (
    /AppleWebKit.*Mobile/i.test(navigator.userAgent) ||
    /MIDP|SymbianOS|NOKIA|SAMSUNG|LG|NEC|TCL|Alcatel|BIRD|DBTEL|Dopod|PHILIPS|HAIER|LENOVO|MOT-|Nokia|SonyEricsson|SIE-|Amoi|ZTE/.test(
      navigator.userAgent
    )
  ) {
    if (window.location.href.indexOf('?mobile') < 0) {
      try {
        if (/iPhone|mac|iPod|iPad/i.test(navigator.userAgent)) {
          return 0;
        }
        return 1;
      } catch (e) {
        window.console.log(e);
      }
    }
  } else if (u.indexOf('iPad') > -1) {
    return 0;
  } else {
    return 1;
  }
  return '';
}

export default class Crop extends React.PureComponent {
  constructor (props) {
    super(props);
    this.readyCopper = this.readyCopper.bind(this);
    // this.move = this.move.bind(this);
  }

  readyCopper () {
    const { width,
      height } = this.props;

    this.refs.cropper.setCropBoxData({ width: width, height: height, });
    if (!ismobile(1)) {
      this.refs.cropper.rotate('-90');
    }
    const info = this.refs.cropper.getData();
    console.log(info, 'info')

    // const res = this.refs.cropper.getCroppedCanvas().toDataURL(toDataURLtype);
    // return onChange(res)
  }

  render () {
    const {
      fileUrl,
      minCropBoxWidth,
      minCropBoxHeight,
      btnConfirmText,
      btnBackText,
      infoText,
      onChange,
      toDataURLtype,
      onChangeShowCropper,
      isMobile
    } = this.props;
    return (
      <div className={changeStyle(isMobile, 'image')} >

        <Cropper
          ref="cropper"
          src={fileUrl}
          style={{ height: '100%', width: '100%' }}
          AspectRatio
          guides
          dragMode="move"
          minCropBoxWidth={minCropBoxWidth}
          minCropBoxHeight={minCropBoxHeight}
          ready={this.readyCopper}
          crop={this._crop}
          cropBoxResizable={false}
          cropBoxMovable={false}
          cropmove={this.move}
        // viewMode={1}
        />
        <div className={changeStyle(isMobile, 'btnGroup')}>
          <div
            className={changeStyle(isMobile, 'btnCon')}
            onClick={() => {
              onChangeShowCropper(false)
            }}
          >
            {btnBackText}
          </div>
          <div
            className={changeStyle(isMobile, 'btnCon')}
            onClick={() => {
              onChangeShowCropper(false)
              const res = this.refs.cropper.getCroppedCanvas().toDataURL(toDataURLtype);
              return onChange(res)
            }}
          >
            {btnConfirmText}
          </div>
        </div>
        <div className={changeStyle(isMobile, 'tips')}>
          <div className={changeStyle(isMobile, 'tip')}>{infoText}</div>
        </div>
      </div>
    );
  }
}
