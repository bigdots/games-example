import { AudioCtrl } from "./AudioCtrl";
import { find, log, Node } from "cc";
// import { PlatformNotify } from "../resources/Platform/PlatformNotify";
// import { PlatformJudge } from "../resources/Platform/PlatformJudge";


//特殊针对了，魅族，微信，和QQ,字节
export let AudioHelper = {

  _inited: false,
  init() {
    if (this._inited)
      return;


    this._inited = true;
    // PlatformNotify.addObserver(PlatformNotify.BGM_SWITCH, (val) => {
    //   if (val) {
    //     this.play('audio', CLIP.BGM, true);
    //   }
    //   else {
    //     this.stop('audio', CLIP.BGM);
    //   }
    // }, this);
  },


  innerAudios: {},

  // registered: false,
  // registerEvent() {
  //   if (this.registered)
  //     return;

  //   this.registered = true;

  //   NotificationCenter.addObserver(NCKeys.IS_MUSIC_ON_CHANGED, function (val) {
  //     if (val == false) {
  //       for (let key in this.innerAudios) {
  //         this.innerAudios[key].stop();
  //       }
  //     }
  //   }, this);

  // },

  play(nodeName: string, clipIndex: any, loop = false, vol = 1.0, newInstance = false) {

    // if (LocalData.isMusicOn == false)
    //   return;
    let node: Node = find(nodeName) as Node;
    if (node == null) {
      return log('audioHelper node not found:' + nodeName);
    }
    let audioCtrl = node.getComponent(AudioCtrl) as AudioCtrl;
    audioCtrl.play(clipIndex, loop, vol);

  },

  stop(nodeName: string, clipIndex: number) {

    let node: Node = find(nodeName) as Node;
    if (node == null) {
      return log('audioHelper node not found:' + nodeName);
    }
    let audioCtrl: AudioCtrl = node.getComponent(AudioCtrl) as AudioCtrl;
    audioCtrl.stop(clipIndex);

  },

  getPlayState(nodeName: string, clipIndex: number) {

    let node: Node = find(nodeName) as Node;
    if (node == null) {
      return log('audioHelper node not found:' + nodeName);
    }
    let audioCtrl: AudioCtrl = node.getComponent(AudioCtrl) as AudioCtrl;
    return audioCtrl.getPlayState(clipIndex);

  },

  getInnerAudioUrl(nodeName: string, clipIndex: number) {
    // if (nodeName == 'audio') {
    //   if (clipEnum == START_SCENE_CLIP) {
    //     return this.startSceneAudioNodeClipNames[clipIndex];
    //   }
    //   else {
    //     return this.gameSceneAudioNodeClipNames[clipIndex];
    //   }
    // }
    // else if (nodeName == 'gunAudio') {
    //   return this.gameSceneGunAudioNodeClipNames[clipIndex]
    // }

    return this.physicsSceneAudioNodeClipNames[clipIndex];
  },

  //开始场景audio Node上挂载的的音频的名字
  physicsSceneAudioNodeClipNames: [
    'res/audio/normal_button.mp3',
    'res/audio/back_button.mp3',
    'res/audio/bgm.mp3',
    'res/audio/planet_complete.mp3',
  ],

  needLoadAudioNode() {
    return true;
  }

}
