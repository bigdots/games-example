import { assert, Game, log, sys } from "cc";
import { Config } from "./Config";

import { Base64 } from "./Base64";
import { NCKeys, NotificationCenter } from "./NotificationCenter";
import { Utils } from "./Utils";


let inited = false;

export let LocalData = {

  version: null,

  //最近的一次保存游戏的时间
  saveTimeStamp: 0,

  _isMusicOn: true,
  get isMusicOn() {
    return this._isMusicOn;
  },
  set isMusicOn(val) {
    this._isMusicOn = val;
    if (!inited) return;
    NotificationCenter.postNotice(NCKeys.IS_MUSIC_ON_CHANGED, val);
  },

  _isShakeOn: true,
  get isShakeOn() {
    return this._isShakeOn;
  },

  set isShakeOn(val) {
    this._isShakeOn = val;
  },

  //能量
  _energy: 0,
  get energy() {
    return this._energy;
  },

  set energy(val: number) {
    this._energy = val;

    if (!inited) return;
    NotificationCenter.postNotice(NCKeys.ENERGY_CHANGED, this._energy);
  },
  //为挂机离线收益计算提供时间,上一次计算自动收益的时间
  lastGetEnergyTimeStamp: 0,


  //钻石
  _diamond: 0,
  get diamond() {
    return this._diamond;
  },
  set diamond(val) {
    this._diamond = val;
    if (!inited) return;
    NotificationCenter.postNotice(NCKeys.DIAMOND_CHANGED, this._diamond);
  },

  galaxyDetailData: [
    //太阳系
    {
      unlock: true,
      watchVideo: 0,
      planets: [
        //  layerIndex 0 - 3 。 3表示已经完成了。  pieceIndex:0-299 表示拼接到哪个了
        { unlock: true, layerIndex: 0, pieceIndex: -1 },
        { unlock: false, layerIndex: 0, pieceIndex: -1 },
        { unlock: false, layerIndex: 0, pieceIndex: -1 },
        { unlock: false, layerIndex: 0, pieceIndex: -1 },
        { unlock: false, layerIndex: 0, pieceIndex: -1 },
        { unlock: false, layerIndex: 0, pieceIndex: -1 },
        { unlock: false, layerIndex: 0, pieceIndex: -1 },
        { unlock: false, layerIndex: 0, pieceIndex: -1 },
        { unlock: false, layerIndex: 0, pieceIndex: -1 },
      ]
    },
    //仙女
    {
      unlock: false,
      watchVideo: 0,
      planets: [

        { unlock: true, layerIndex: 0, pieceIndex: -1 },
        { unlock: false, layerIndex: 0, pieceIndex: -1 },
        { unlock: false, layerIndex: 0, pieceIndex: -1 },
        { unlock: false, layerIndex: 0, pieceIndex: -1 },
        { unlock: false, layerIndex: 0, pieceIndex: -1 },
        { unlock: false, layerIndex: 0, pieceIndex: -1 },
        { unlock: false, layerIndex: 0, pieceIndex: -1 },
        { unlock: false, layerIndex: 0, pieceIndex: -1 },
        { unlock: false, layerIndex: 0, pieceIndex: -1 },
      ]
    },
    //半人马
    {
      unlock: false,
      watchVideo: 0,
      planets: [
        { unlock: true, layerIndex: 0, pieceIndex: -1 },
        { unlock: false, layerIndex: 0, pieceIndex: -1 },
        { unlock: false, layerIndex: 0, pieceIndex: -1 },
        { unlock: false, layerIndex: 0, pieceIndex: -1 },
        { unlock: false, layerIndex: 0, pieceIndex: -1 },
        { unlock: false, layerIndex: 0, pieceIndex: -1 },
        { unlock: false, layerIndex: 0, pieceIndex: -1 },
        { unlock: false, layerIndex: 0, pieceIndex: -1 },
        { unlock: false, layerIndex: 0, pieceIndex: -1 },
      ]
    },
    //猎户
    {
      unlock: false,
      watchVideo: 0,
      planets: [
        { unlock: true, layerIndex: 0, pieceIndex: -1 },
        { unlock: false, layerIndex: 0, pieceIndex: -1 },
        { unlock: false, layerIndex: 0, pieceIndex: -1 },
        { unlock: false, layerIndex: 0, pieceIndex: -1 },
        { unlock: false, layerIndex: 0, pieceIndex: -1 },
        { unlock: false, layerIndex: 0, pieceIndex: -1 },
        { unlock: false, layerIndex: 0, pieceIndex: -1 },
        { unlock: false, layerIndex: 0, pieceIndex: -1 },
        { unlock: false, layerIndex: 0, pieceIndex: -1 },
      ]
    },

  ],




  //当前已经解锁了的星系序号
  galaxyIndex: 0,
  //当前已经解锁了的星球序号
  planetIndex: 0,
  //当前已经解锁到了的星球的层数
  layerIndex: 0,
  //当前已经解锁了的碎片的序号, 注意这个序号是从-1开始的
  pieceIndex: -1,
  //每次拼凑的数量
  pieceUpNumEachTime: 1,

  //三倍加速的时间截止戳
  _speedUpEndTimeStamp: 0,
  set speedUpEndTimeStamp(val) {
    this._speedUpEndTimeStamp = val;
    if (!inited)
      return;
    NotificationCenter.postNotice(NCKeys.SPPED_UP_TIMESTAMP_CHANED, this._speedUpEndTimeStamp);
  },
  get speedUpEndTimeStamp() {
    return this._speedUpEndTimeStamp;
  },

  //自动点击的时间结束戳
  _autoTouchTimeStamp: 0,
  set autoTouchTimeStamp(val) {
    this._autoTouchTimeStamp = val;
    if (!inited)
      return;
    NotificationCenter.postNotice(NCKeys.AUTO_TOUCH_TIMESTAMP_CHANED, this._autoTouchTimeStamp);
  },
  get autoTouchTimeStamp() {
    return this._autoTouchTimeStamp;
  },

  //自动点击的等级
  autoTouchLv: 0,

  //上一次免费抽奖时间
  lastFreeLotteryTimeStamp: 0,

  //右上角的等级
  _lv: 0,
  get lv() {
    return this._lv;
  },
  set lv(val) {
    this._lv = val;
  },
  //右上角的等级的进度条
  _lvProgress: 0,
  get lvProgress() {
    return this._lvProgress;
  },
  set lvProgress(val) {
    this._lvProgress = val;
    if (!inited)
      return;

    NotificationCenter.postNotice(NCKeys.LVPROGRESS_CHANED, this._lvProgress);
  },

  //每日签到即将得到的奖励 1 - 8。
  signinCanGetDay: 1,
  //上一次领取签到奖励的时戳
  signinGetTime: 0,
  //是否可以得到额外的奖励
  signinAnotherReward: true,


  //领取了每日签到奖励后会调用这个函数
  refreshSigninData: function (canGetDay, getTime) {
    this.signinCanGetDay = canGetDay;
    this.signinGetTime = getTime;

    if (!inited) return;
    // NotificationCenter.postNotice(NCKeys.SIGNIN_DATA_CHANGED, null);
  },

  satelliteDetailData: [
    0, 0, 0, 0, 0, 0, 0, 0, 0,
  ],

  // //已经解锁的卫星
  // _unlockSatelliteIds: [],
  // isSatelliteUnlock(id) {
  //   return this._unlockSatelliteIds.includes(id);
  // },
  // unlockSatelliteId(id) {
  //   if (this._unlockSatelliteIds.includes(id))
  //     return log(`卫星的${id}已经解锁了`);

  //   this._unlockSatelliteIds.push(id);
  //   // GlobalTemp.refreshSatelliteBuffer(this._unlockSatelliteIds);
  //   NotificationCenter.postNotice(NCKeys.UNLOCK_SATELLITE_ID_CHANGED, id);
  // },

  _cumShowVideo: 0,
  get cumShowVideo() {
    return this._cumShowVideo;
  },
  set cumShowVideo(val) {
    this._cumShowVideo = val;

    if (!inited) return;
    NotificationCenter.postNotice(NCKeys.CUMSHOWVIDEO_CHANGED, this._cumShowVideo);
  },

  //今日已经领取了多少次免费钻石
  todayFreeDiamondTime: 0,
  //今日已经分享得到了多少次免费钻石
  todayShareSucessTime: 0,
  //今天是否已经领取登录钻石
  todayGetedCollectDiamond: false,
  //最近一次使用钻石购买时间机器的时间戳
  laterBuyTimeMachineByDiamondTimeStamp: 0,
  //今日直接兑换钻石额度为多少
  todayExchangeRemainDiamond: 200,

  uuid: null, //唯一的标识符

  //用户的信息开始
  //用户的授权信息
  userAuthorizationOpenId: null,

  //用户的昵称, 因为用户的昵称可能含有非法的字符串。导致存档损坏。所以要先Base64一下
  _userAuthorizationNickname: null,
  setUserAuthorizationNickname(val) {
    if (val == null)
      this._userAuthorizationNickname = null;
    else
      this._userAuthorizationNickname = Base64.encode(val);
  },
  getUserAuthorizationNickname() {
    if (this._userAuthorizationNickname == null)
      return null;
    else
      return Base64.decode(this._userAuthorizationNickname);
  },

  //用户的头像的url
  userAuthorizationavatarUrl: null,
  userAuthorizationPlatform: null, //'WX_MINI_GAME', "QQ_PLAY", "WX_NATIVE", "QQ_NATIVE"
  //用户的信息结束

  //是否同意了用户协议
  agreePrivacyAgreement: false,
  //是否记住了用户协议
  rememberPrivacyAgreement: false,


  //false 表示没有执行， 
  gudioMark: {
    clickSun: false, //点击太阳
    clickGalaxy: false, //点击星系
    clickAutoTouch: false, //点击自动点击
    clickSpeedUp: false, //点击超级加速
    clickTimeMachine: false, //点击了时间机器
    clickMeteor: false, //软引导去点击流星
    clickLottery: false, //点击幸运转盘
  },

  initDefaultLocalData() {
    Object.assign(defaultLocalData, this);
  },

  init() {
    if (inited == true)
      return false;

    this.load();

    inited = true; //这句话放在最后一句
    return true;
  },

  load() {
    let str: string = sys.localStorage.getItem("create_universe");
    if (str != null && str != '') {
      try {
        var json = JSON.parse(str);
        Object.assign(this, json);

      } catch (e) {
        console.log('加载存档出错了', e);
        sys.localStorage.setItem("create_universe", '');
        this.load();
        return;
      }



      if (this.uuid == null) this.uuid = Utils.createUUID();
      //防止越界

      if (this.version != Config.version) {
        this.updateVersion();
        this.version = Config.version;

      }
    }
    else {
      //todo init存档
      this.version = Config.version;
      this.saveTimeStamp = Utils.getCurTime();
    }

    if (Utils.offsetDay(this.saveTimeStamp, Utils.getCurTime()) != 0) {
      //todo 重置今日任务
      this.todayFreeDiamondTime = 0;
      this.todayShareSucessTime = 0;
      this.todayExchangeRemainDiamond = 200;
      this.todayGetedCollectDiamond = false;
    }
  },

  save() {
    this.saveTimeStamp = dayjs().unix();
    let str: String = JSON.stringify(this);
    sys.localStorage.setItem('create_universe', str);

    //将自己的存档放到微信服务器上
    // this.WXSetUserCloudStorage();
  },



  clear() {
    sys.localStorage.removeItem("create_universe");
    Object.assign(this, defaultLocalData);
    this.load();
  },

  updateVersion() {
    if (this.version == '1.2.0') {
      this.todayGetedCollectDiamond = false;
      this.version = '1.3.0'
    }

    if (this.version == '1.3.0') {
      this.laterBuyTimeMachineByDiamondTimeStamp = 0;
      this.todayExchangeRemainDiamond = 200;
      this.version = '1.4.0'
    }
  }
}

let defaultLocalData: object = {};
globalThis.LocalData = LocalData;
