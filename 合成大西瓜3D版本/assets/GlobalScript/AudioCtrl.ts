import { _decorator, Component, AudioClip, CCString } from "cc";

const { ccclass, property } = _decorator;

export enum CLIP {
  BGM = 0,
  DROP = 1,
  MERGRE = 2,
  BUTTON = 3,
  GREAT = 4,
};

//注意 给上边的枚举添加任意新的东西之后都要记得取AudioHelper里添加新的路径和资源文件到魅族的包里

@ccclass("AudioCtrl")
export class AudioCtrl extends Component {

  @property(CCString)
  public sceneName: string = '';

  @property([AudioClip])
  public clips: Array<AudioClip> = [];

  start() {

  }

  onDestroy() {
    for (let i = 0; i < this.clips.length; i++) {
      if (this.clips[i]) {
        this.clips[i].stop();
      }
    }
  }

  playOneShot(clipIndex: any, vol = 1.0) {
    if (this.clips[clipIndex]) {
      this.clips[clipIndex].playOneShot(vol);
    }
  }

  play(clipIndex: any, loop = false, vol = 1.0) {
    if (this.clips[clipIndex]) {
      if (loop == true) {
        this.clips[clipIndex].setVolume(vol);
        this.clips[clipIndex].setLoop(loop);
        this.clips[clipIndex].play();
      }
      else {
        this.clips[clipIndex].playOneShot(vol)
      }
    }
  }

  getPlayState(clipIndex: number) {
    if (this.clips[clipIndex]) {
      return this.clips[clipIndex].state;
    }
    return null;
  }

  stop(clipIndex: number) {
    if (this.clips[clipIndex] && this.clips[clipIndex].state == AudioClip.PlayingState.PLAYING) {
      this.clips[clipIndex].stop();
    }
  }
}