import { Camera, UITransform, Sprite, SpriteFrame, RenderTexture, Vec3, Prefab, instantiate, Node, Material, Color, Vec2, isValid, Texture2D, ImageAsset, Label, MeshRenderer, loader, url, find, getWorldTransformUntilRoot, log, Quat, ccenum, random, v3 } from "cc";
import { fruit_config } from "../Config/fruit_config";
// import { PlatformJudge } from "../resources/Platform/PlatformJudge";
// import { LocalData } from "./LocalData";



import { NotificationCenter, NCKeys } from "./NotificationCenter";



let _ax: number = 0;
let _ay: number = 0;
let _az: number = 0;
let _bx: number = 0;
let _by: number = 0;
let _bz: number = 0;

export let Utils = {

  //将一个摄像机的画面输出到一个精灵上，注意精灵必须有spriteFrame
  // transformCameraToSprite(camera: Camera, sprite: Sprite) {
  //   const spriteframe = sprite.spriteFrame;
  //   const sp = new SpriteFrame();
  //   sp.reset({
  //     originalSize: spriteframe.getOriginalSize(),
  //     rect: spriteframe.getRect(),
  //     offset: spriteframe.getOffset(),
  //     isRotate: spriteframe.isRotated(),
  //     borderTop: spriteframe.insetTop,
  //     borderLeft: spriteframe.insetLeft,
  //     borderBottom: spriteframe.insetBottom,
  //     borderRight: spriteframe.insetRight,
  //   });

  //   const rendetTex = new RenderTexture();
  //   rendetTex.reset({
  //     width: sprite.node.getComponent(UITransform).width,
  //     height: sprite.node.getComponent(UITransform).height,
  //     colorFormat: RenderTexture.PixelFormat.RGBA8888,
  //     depthStencilFormat: RenderTexture.DepthStencilFormat.DEPTH_24_STENCIL_8
  //   });
  //   camera.targetTexture = rendetTex;
  //   sp.texture = rendetTex;
  //   sprite.spriteFrame = sp;
  // },

  //在有些平台上转化相机不好使
  // canTransformCameraToSprite() {
  //   return sys.platform !== sys.QQ_PLAY;
  // },

  /*
    {
      msg:
      sureCb:
      cancelCb;
      leftTitle:'取消',
      rightTitle:'确定';
      priority:100,
    }
  */
  // _alertLayerPrefab: null,
  popAlert(config: any, parent: Node) {
    log(config.msg);
    // this.loadResWithCorrection('prefabs/alertLayer/alertLayer', Prefab, (err, prefab) => {
    //   if (err) return log(err);
    //   let node = instantiate(prefab);
    //   node.getComponent(AlertLayerCtrl).init(config);
    //   if (config.leftTitle) {
    //     find('bg/cancelButton/Label', node).getComponent(Label).string = config.leftTitle;
    //   }
    //   if (config.rightTitle) {
    //     find('bg/sureButton/Label', node).getComponent(Label).string = config.rightTitle;
    //   }
    //   if (config.priority) {
    //     node._uiProps.uiTransformComp.priority = config.priority;
    //   }
    //   parent = parent || find('Canvas') || find('touchCanvas');
    //   if (isValid(parent)) {
    //     node.parent = parent;
    //   }
    // });

  },

  popToast(msg, duration: number = 1.5) {
    log(msg);
    // let toastCtrl: ToastNodeCtrl = find('Canvas/toast').getComponent(ToastNodeCtrl);
    // toastCtrl.showMsg(msg, duration);
  },

  // popCompleteToast(galaxyIndex, planetIndex) {
  //   let ctrl = find('Canvas/playingNode/topNode/completeToast').getComponent(CompleteToastCtrl);
  //   ctrl.init(galaxyIndex, planetIndex);
  // },

  isValid(node: Node) {
    return isValid(node, true) && node.parent != null;
  },

  //返过点pt 到 begin和end两点之间的直线形成的垂足
  // getFootOfPerpendicular(pt: Vec3, begin: Vec3, end: Vec3): Vec3 {
  //   let retVal: Vec3 = new Vec3();

  //   let dx = begin.x - end.x;
  //   let dy = begin.y - end.y;
  //   let dz = begin.z - end.z;
  //   if (Math.abs(dx) < 0.00000001 && Math.abs(dy) < 0.00000001 && Math.abs(dz) < 0.00000001) {
  //     retVal = begin;
  //     return retVal;
  //   }

  //   let u = (pt.x - begin.x) * (begin.x - end.x) +
  //     (pt.y - begin.y) * (begin.y - end.y) + (pt.z - begin.z) * (begin.z - end.z);
  //   u = u / ((dx * dx) + (dy * dy) + (dz * dz));

  //   retVal.x = begin.x + u * dx;
  //   retVal.y = begin.y + u * dy;
  //   retVal.z = begin.z + u * dz;

  //   return retVal;
  // },

  //将时间转化为 xx时xx分xx秒
  formatSecondToHMS(value: number) {
    let hours = Math.floor(value / 3600);
    let min = Math.floor((value % 3600) / 60);
    let sec = value % 60;
    if (hours > 0) {
      return `${hours}时${min}分`;
    }
    else if (min > 0) {
      return `${min}分${sec}秒`;
    }
    else {
      return `${sec}秒`;
    }
  },

  // formatSecondToHMS2(value: number) {
  //   let hours = Math.floor(value / 3600);
  //   let min = Math.floor((value % 3600) / 60);
  //   let sec = value % 60;
  //   if (hours > 0) {
  //     return `${hours}:${min}:${sec}`;
  //     // return `${hours}时${min}分`;
  //   }
  //   else if (min > 0) {
  //     return `${min}:${numeral(sec).format('00')}`;
  //   }
  //   else {
  //     return `0:${numeral(sec).format('00')}`;
  //   }
  // },

  //设置材质的 albedo 值
  // setMatAlbedo(mat: Material, color: Color) {
  //   const pass = mat.passes[0];
  //   const hAlbedo = pass.getHandle('albedo');
  //   pass.setUniform(hAlbedo, color);
  // },

  // setMatMainColor(mat: Material, color: Color) {
  //   const pass = mat.passes[0];
  //   const hMainColor = pass.getHandle('mainColor');
  //   pass.setUniform(hMainColor, color);
  // },

  // //设置材质的 albedo 值
  // setMatEmissive(mat: Material, color: Color) {
  //   const pass = mat.passes[0];
  //   const hEmissive = pass.getHandle('emissive');
  //   pass.setUniform(hEmissive, color);
  // },

  //hpProgrss 0-1
  // _hpProgress: color(0, 0, 0, 0),
  // setHpColor(mat: Material, hpColor: Color, hpProgress: number) {
  //   const pass = mat.passes[0];
  //   const hHpColor = pass.getHandle('hpColor');
  //   pass.setUniform(hHpColor, hpColor);
  //   this._hpProgress.r = hpProgress * 255;
  //   const hHpProgress = pass.getHandle('hpProgress');
  //   pass.setUniform(hHpProgress, this._hpProgress);
  // },


  // setNodeMatCascade(node: Node, mat: Material, shadowCastingMode: number) {
  //   let model = node.getComponent(MeshRenderer);
  //   if (model) {
  //     model.material = mat;
  //     model.shadowCastingMode = shadowCastingMode;
  //   }
  //   if (node.children.length > 0) {
  //     for (let i in node.children) {
  //       this.setNodeMatCascade(node.children[i], mat);
  //     }
  //   }
  // },


  //计算两个点之间的距离的平方，再这里不开方以节省性能
  // vec3DistancePow2(p0: Vec3, p1: Vec3) {
  //   _ax = p0.x;
  //   _ay = p0.y;
  //   _az = p0.z;

  //   _ax -= p1.x;
  //   _ay -= p1.y;
  //   _az -= p1.z;

  //   return _ax * _ax + _ay * _ay + _az * _az;
  // },

  //计算两个点之间的距离的平方，再这里不开方以节省性能
  // vec2DistancePow2(p0: Vec2, p1: Vec2) {
  //   _ax = p0.x;
  //   _ay = p0.y;

  //   _ax -= p1.x;
  //   _ay -= p1.y;
  //   return _ax * _ax + _ay * _ay;
  // },





  // smallShake() {
  //   if (LocalData.isShakeOn) {
  //     JsNativeBridge.smallShake();
  //   }
  // },

  // mediumShake() {
  //   if (LocalData.isShakeOn) {
  //     JsNativeBridge.mediumShake();
  //   }
  // },

  // heavyShake() {
  //   if (LocalData.isShakeOn) {
  //     JsNativeBridge.heavyShake();
  //   }
  // },

  //计算 从 toTime到 fromTime 之间经过了几天, 单位秒
  offsetDay: function (fromTime, toTime) {
    let fromString = dayjs(fromTime * 1000).format('YYYY-MM-DD');
    let toString = dayjs(toTime * 1000).format('YYYY-MM-DD');

    // let toDayOfYear = dayjs(toTime * 1000).dayOfYear();
    // return toDayOfYear - fromDatOfYear;
    return dayjs(toString).diff(dayjs(fromString), 'day')
  },

  getCurTime: function () {
    let localTime = dayjs().unix();
    return localTime;
  },

  //计算 从 toTime到 fromTime 之间经过了几天, 单位秒
  // offsetDay: function (fromTime, toTime) {
  //   let fromDatOfYear = dayjs(fromTime * 1000).dayOfYear();
  //   let toDayOfYear = dayjs(toTime * 1000).dayOfYear();
  //   return toDayOfYear - fromDatOfYear;
  // },

  //当前是现在时间的多少秒
  // secondOfDay(second) {
  //   second += 28800;
  //   return second % 86400;
  // },


  // //今天的0点0时0分的时间戳
  // todayBeganTimeStamp() {
  //   let dayString = dayjs().format('YYYY-MM-DD');
  //   return dayjs(dayString, 'YYYY-MM-DD').unix();
  // },


  // loadHeadIcon: function (headSprite: Sprite, url: string, width: number) {
  //   if (url == '' || url == null) return;
  //   // url = 'https://ss1.baidu.com/6ONXsjip0QIZ8tyhnq/it/u=1948968049,2186058924&fm=173&app=49&f=JPEG?w=526&h=449&s=D68225E157279F5942D174250300E0C4';
  //   loader.load({ url: url, type: 'png' }, function (err, image: ImageAsset) {
  //     if (err) {
  //       return log(err);
  //     }

  //     if (isValid(headSprite.node)) {
  //       let frame = new SpriteFrame();
  //       frame.texture = image._texture;
  //       headSprite.spriteFrame = frame;
  //       headSprite.node.getComponent(UITransform).width = width;
  //       headSprite.node.getComponent(UITransform).height = width;
  //     }
  //   });
  // },

  // loadHeadIconAndVerification: function (headSprite, url, width, cb) {
  //   if (url == '' || url == null) return;
  //   //url = 'https://ss1.baidu.com/6ONXsjip0QIZ8tyhnq/it/u=1948968049,2186058924&fm=173&app=49&f=JPEG?w=526&h=449&s=D68225E157279F5942D174250300E0C4';
  //   loader.load({ url: url, type: 'png' }, function (err, image: ImageAsset) {
  //     if (err) {
  //       return log(err);
  //     }

  //     if (isValid(headSprite.node) && cb()) {
  //       let frame = new SpriteFrame();
  //       frame.texture = image._texture;
  //       headSprite.spriteFrame = frame;
  //       headSprite.node.getComponent(UITransform).width = width;
  //       headSprite.node.getComponent(UITransform).height = width;
  //     }
  //   });
  // },


  // loadAdIcon: function (headSprite: Sprite, url: string, cb: any) {
  //   if (url == '' || url == null) return;
  //   // url = 'https://ss1.baidu.com/6ONXsjip0QIZ8tyhnq/it/u=1948968049,2186058924&fm=173&app=49&f=JPEG?w=526&h=449&s=D68225E157279F5942D174250300E0C4';
  //   loader.load({ url: url, type: 'png' }, function (err, image: ImageAsset) {
  //     if (err) {
  //       return log(err);
  //     }

  //     if (isValid(headSprite.node)) {
  //       let frame = new SpriteFrame();
  //       frame.texture = image._texture;
  //       headSprite.spriteFrame = frame;
  //       cb && cb(image.width, image.height);
  //     }
  //   });
  // },

  // formatString('{0},{1},哈哈哈','Hello','World') ==> 'Hello,World,哈哈哈'
  // formatString: function () {
  //   if (arguments.length == 0)
  //     return '';

  //   var str = arguments[0];
  //   for (var i = 1; i < arguments.length; i++) {
  //     var re = new RegExp('\\{' + (i - 1) + '\\}', 'gm');
  //     str = str.replace(re, arguments[i]);
  //   }
  //   return str;
  // },

  // parseObjectToQuery(obj: object) {
  //   let strings = [];
  //   for (let key in obj) {
  //     if (obj.hasOwnProperty(key)) {
  //       strings.push(key + '=' + obj[key]);
  //     }
  //   }
  //   return strings.join('&');
  // },

  // interpolation(curValue: Vec3, triggerValue: Vec3, step: number): Vec3 {
  //   let betweent = Vec3.distance(triggerValue, curValue);
  //   if (betweent <= step)
  //     return triggerValue;

  //   let offset = v3(triggerValue.x - curValue.x, triggerValue.y - curValue.y, triggerValue.z - curValue.z);
  //   let per = step / betweent;
  //   curValue.x += (per * offset.x);
  //   curValue.y += (per * offset.y);
  //   curValue.z += (per * offset.z);
  //   return curValue;
  // },

  // 带有纠错的loadRes
  path2repeatTime: {} as any,
  loadResWithCorrection(url: string, type: any, completeCallback: (error: Error, resource: any) => void): void {
    this.path2repeatTime[url] = 3;
    this._loadResWithCorrection(url, type, completeCallback);
  },

  _loadResWithCorrection(url: string, type: any, completeCallback: any) {
    loader.loadRes(url, type, (err, resource) => {
      if (err) {
        this.path2repeatTime[url]--;
        if (this.path2repeatTime[url] == 0) {
          // if (PlatformJudge.isWX || PlatformJudge.isQQ) {
          //   window.wx.showModal({
          //     title: '错误',
          //     content: '加载资源失败，请检查网络后点击确定按钮重试',
          //     success: (res) => {
          //       this.path2repeatTime[url] = 3;
          //       this._loadResWithCorrection(url, type, completeCallback);
          //     }
          //   })
          // }
          // else if (PlatformJudge.isOppo) {
          //   qg.showModal({
          //     title: '错误',
          //     content: '加载资源失败，请检查网络后点击确定按钮重试',
          //     showCancel: false,
          //     success: function () {
          //       this.path2repeatTime[url] = 3;
          //       this._loadResWithCorrection(url, type, completeCallback);
          //     }.bind(this)
          //   })
          // }
          // else if (PlatformJudge.isVivo) {
          //   qg.showDialog({
          //     title: '错误',
          //     message: '加载资源失败，请检查网络后点击确定按钮重试',
          //     buttons: [{ text: '确定', }],
          //     complete: () => {
          //       this.path2repeatTime[url] = 3;
          //       this._loadResWithCorrection(url, type, completeCallback);
          //     }
          //   })
          // }
          // else if (PlatformJudge.isTT) {
          //   tt.showModal({
          //     title: '错误',
          //     content: '下载资源失败，请检查网络，并且重启游戏',
          //     showCancel: false,
          //     success: (res) => {
          //       this.path2repeatTime[url] = 3;
          //       this._loadResWithCorrection(url, type, completeCallback);
          //     }
          //   })
          // }
          // else {
          Utils.popAlert({
            msg: '下载资源失败，请检查网络，并且重启游戏',
            sureCb: (res) => {
              this.path2repeatTime[url] = 3;
              this._loadResWithCorrection(url, type, completeCallback);
            },
            cancelCb: (res) => {
              this.path2repeatTime[url] = 3;
              this._loadResWithCorrection(url, type, completeCallback);
            },
          }, null);
          // }
        }
        else {
          log('重试:' + url + ' 还剩' + this.path2repeatTime[url]);
          this._loadResWithCorrection(url, type, completeCallback);
        }
        return log(err);
      }
      completeCallback(err, resource);
    });
  },

  //带有纠错的loadRes
  pathArray2repeatTime: {},
  loadResArrayWithCorrection(urls: Array<string>, completeCallback: (error: Error, resources: Array<any>) => void): void {
    this.pathArray2repeatTime[urls.join('_')] = 3;
    this._loadResArrayWithCorrection(urls, completeCallback);
  },

  _loadResArrayWithCorrection(urls, completeCallback) {
    loader.loadResArray(urls, (err, resources) => {
      if (err) {
        this.pathArray2repeatTime[urls.join('_')]--;
        if (this.pathArray2repeatTime[urls.join('_')] == 0) {
          // if (PlatformJudge.isWX || PlatformJudge.isQQ) {
          //   window.wx.showModal({
          //     title: '错误',
          //     content: '加载资源失败，请检查网络后点击确定按钮重试',
          //     success: (res) => {
          //       this.pathArray2repeatTime[urls.join('_')] = 3;
          //       this._loadResArrayWithCorrection(urls, completeCallback);
          //     }
          //   })
          // }
          // else if (PlatformJudge.isOppo) {
          //   qg.showModal({
          //     title: '错误',
          //     content: '加载资源失败，请检查网络后点击确定按钮重试',
          //     showCancel: false,
          //     success: function () {
          //       this.pathArray2repeatTime[urls.join('_')] = 3;
          //       this._loadResArrayWithCorrection(urls, completeCallback);
          //     }.bind(this)
          //   })
          // }
          // else if (PlatformJudge.isVivo) {
          //   qg.showDialog({
          //     title: '错误',
          //     message: '加载资源失败，请检查网络后点击确定按钮重试',
          //     buttons: [{ text: '确定', }],
          //     complete: () => {
          //       this.pathArray2repeatTime[urls.join('_')] = 3;
          //       this._loadResArrayWithCorrection(urls, completeCallback);
          //     }
          //   })
          // }
          // else if (PlatformJudge.isTT) {
          //   tt.showModal({
          //     title: '错误',
          //     content: '下载资源失败，请检查网络，并且重启游戏',
          //     showCancel: false,
          //     success: (res) => {
          //       this.pathArray2repeatTime[urls.join('_')] = 3;
          //       this._loadResArrayWithCorrection(urls, completeCallback);
          //     }
          //   })
          // }
          // else {
          Utils.popAlert({
            msg: '下载资源失败，请检查网络，并且重启游戏',
            sureCb: (res) => {
              this.pathArray2repeatTime[urls.join('_')] = 3;
              this._loadResArrayWithCorrection(urls, completeCallback);
            },
            cancelCb: (res) => {
              this.pathArray2repeatTime[urls.join('_')] = 3;
              this._loadResArrayWithCorrection(urls, completeCallback);
            },
          }, null);
          // }
        }
        else {
          log('重试:' + urls.join('_') + ' 还剩' + this.pathArray2repeatTime[urls.join('_')]);
          this._loadResArrayWithCorrection(urls, completeCallback);
        }
        return log(err);
      }
      completeCallback(err, resources);
    });
  },


  /*
    url:xxx/xxxx,
    params:{key1:value1, key2:value2},
    cb(err:string, data:object)
  */
  // httpGet(url, params, cb) {
  //   url = url + '?' + this.parseObjectToQuery(params);
  //   log(url);
  //   var http = new XMLHttpRequest();
  //   http.onloadend = function () {
  //     if (http.status == 200) {
  //       log('GET 得到', http.responseText);
  //       cb(null, JSON.parse(http.responseText));
  //     }
  //     else {
  //       cb(true);
  //     }
  //   };
  //   http.open('GET', url, true);
  //   http.send();
  // },


  /*
    接受一个数组  [0.3, 0.4, 0.6]。根据权重返回序号
  */
  randomWeighted(array: Array<number>) {
    let count = 0;
    for (let i = 0; i < array.length; i++)
      count += array[i];

    let num = Math.random() * count;
    let weighted = 0;
    for (let i = 0; i < array.length; i++) {
      weighted += array[i];
      if (num <= weighted) {
        return i;
      }
    }

    return array.length - 1;
  },



  // timeToMinute(times) {
  //   if (times <= 0)
  //     return '00:00';

  //   var t = '';
  //   if (times > -1) {
  //     var min = Math.floor(times / 60) % 60;
  //     var sec = times % 60;

  //     if (min < 10) { t += "0"; }
  //     t += min + ":";
  //     if (sec < 10) { t += "0"; }
  //     t += sec.toFixed(2);
  //   }
  //   t = t.substring(0, t.length - 3);
  //   return t;
  // },

  createUUID() {
    function S4() {
      return (((1 + Math.random()) * 0x10000) | 0).toString(16).substring(1);
    }
    return (S4() + S4() + "-" + S4() + "-" + S4() + "-" + S4() + "-" + S4() + S4() + S4());
  },



  shuffle(arr) {
    for (let i = arr.length - 1; i >= 0; i--) {
      let rIndex = Math.floor(Math.random() * (i + 1));
      let temp = arr[rIndex];
      arr[rIndex] = arr[i];
      arr[i] = temp;
    }
    return arr;
  },

  //todo 格式化字符串
  // formatNumber: function (number) {
  //   //对了，数字单位是KMBT   后面是aa ab ac ad ，，，，，，，，，az ba bb 每1000倍进一位
  //   // return number;
  //   let preSolveNumber = function (number) {

  //     let str = number.toExponential(8);
  //     let strArry = str.split('e');
  //     let length = parseInt(strArry[1]);
  //     let hex = Math.floor(length / 3)
  //     let off = length - hex * 3;
  //     let preNum = parseFloat(strArry[0]);
  //     preNum *= Math.pow(10, off);
  //     // if (hex * 3 == length) {
  //     //   hex -= 2;
  //     // }
  //     // else {
  //     //   hex--;
  //     // }
  //     // if (hex < 0) hex = 0;
  //     // let preNum = preStr.substr(0, length - hex * 3);
  //     // preNum = parseInt(preNum);
  //     return { preNum: preNum/*numeral(preNum).format('0,0')*/, threeZeroMu: hex };
  //   };


  //   let result = preSolveNumber(number);
  //   if (result.threeZeroMu < 5) {
  //     let hexStr = ['', 'K', 'M', 'B', 'T'];
  //     return result.preNum.toFixed(2) + hexStr[result.threeZeroMu];
  //   }
  //   else {
  //     let hex = result.threeZeroMu - 5;
  //     let first = Math.floor(hex / 26);
  //     let second = hex % 26;
  //     // log('first, second', first, second);

  //     if (first > 26) {
  //       return '999999zz';
  //     }
  //     else {
  //       let last = String.fromCharCode(first + 97) + String.fromCharCode(second + 97);
  //       return result.preNum.toFixed(2) + last;
  //     }
  //   }
  // },

  // getNumberInfoByLocalData() {
  //   let galaxyIndex = LocalData.galaxyIndex;
  //   let planetIndex = LocalData.planetIndex;
  //   let layerIndex = LocalData.layerIndex;

  //   if (galaxyIndex >= galaxys_config.length) {
  //     galaxyIndex = galaxys_config.length - 1;
  //     planetIndex = galaxys_config[galaxyIndex].planets.length - 1;
  //     layerIndex = galaxys_config[galaxyIndex].planets[planetIndex].layers.length - 1;
  //   }
  //   return number_config[`${galaxyIndex}_${planetIndex}_${layerIndex}`];

  // },

  // popMeteorLayer() {
  //   Utils.loadResWithCorrection('prefabs/meteorLayer/meteorLayer', Prefab, (err, prefab) => {
  //     if (find('Canvas/meteorLayer')) return;
  //     if (err) return log(err);
  //     let node = instantiate(prefab);
  //     node.parent = find('Canvas');
  //   })
  // },

  //计算从四元数q1到四元数q2一共转过了多少弧度
  radianFromQ1SubQ2(q1: Quat, q2: Quat) {
    // let q3 = Quat.invert(new Quat, q1);
    // let q4 = Quat.multiply(new Quat, q3, q2);
    // let radian = 2 * Math.atan2(Math.sqrt(q4.x * q4.x + q4.y * q4.y + q4.z * q4.z), q4.w);
    // radian = radian % 3.1415926;
    // log(radian);
    let radian = Math.acos(Math.abs(Quat.dot(q1, q2))) * 2;
    // radian = radian * 180 / Math.PI * 2;
    log(radian);
    return radian;
  },

  // tryPopRuinsLayer(rate) {
  //   if (find('Canvas/gudieLayer/grayLayer').active)
  //     return;
  //   if (find('Canvas/gudieLayer/person').active)
  //     return;
  //   if (Math.random() > rate)
  //     return;

  //   Utils.loadResWithCorrection('prefabs/ruinsLayer/ruinsLayerWX', Prefab, (err, prefab) => {
  //     if ((find('Canvas/ruinsLayerWX'))) return;
  //     if (err) return log(err);
  //     let node = instantiate(prefab);
  //     node.parent = find('Canvas');
  //   })
  // },

  offsetNodePos(node: Node, offset: Vec3) {
    let pos: Vec3 = v3(node.position);
    pos.add(offset);
    node.position = pos;
  },

  //随机出来下一个水果的id
  randomNextFruit() {
    let random = Math.random();
    let cum = 0;
    for (let i = 0; i < fruit_config.length; i++) {
      cum += fruit_config[i].rate;
      if (cum > random) {
        return fruit_config[i].id;
      }
    }

  }
};

// globalThis.Utils = Utils;