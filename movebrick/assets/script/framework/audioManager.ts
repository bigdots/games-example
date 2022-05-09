import { util } from './util'
import {
  _decorator,
  Component,
  Node,
  AudioClip,
  sys,
  AudioSource,
  game,
  director,
} from 'cc'
import { StorageManager } from './storageManager'
import { resourceUtil } from './resourceUtil'
import { lodash } from './lodash'
const { ccclass, property } = _decorator

interface AudioData {
  source: AudioSource
  isMusic: boolean
}

interface AudioDataMap {
  [name: string]: AudioData
}

@ccclass('AudioManager')
export class AudioManager {
  private _persistRootNode: Node = null!
  private _audioSources: AudioSource[] = [] // 音频播放组件列表
  static _instance: AudioManager
  dictWeaponSoundIndex: any = {}

  static get instance() {
    if (!this._instance) {
      this._instance = new AudioManager()
    }

    return this._instance
  }

  musicVolume: number = 0.8 // 音乐音量
  soundVolume: number = 1 // 音效音量
  audios: AudioDataMap = {} // 播放队列，里面存着可操作的音频对象，比如长音乐或者循环播放的音效文件
  arrSound: AudioData[] = [] // 正在播放的音效队列

  init() {
    if (this._persistRootNode) return //避免切换场景初始化报错
    this._persistRootNode = new Node('audio')
    director.getScene()!.addChild(this._persistRootNode)
    game.addPersistRootNode(this._persistRootNode) //在场景下添加一个空节点，并作为常驻节点

    this.musicVolume = this.getAudioSetting(true) ? 0.8 : 0
    this.soundVolume = this.getAudioSetting(false) ? 1 : 0 //音效声音大一点
  }

  /**
   * 在空节点上创建AudioSource组件，添加clip，并返回这个组件
   * @param clip
   * @returns
   */
  private _getAudioSource(clip: AudioClip) {
    let result: AudioSource | undefined

    // 循环遍历，已经存在的所有音频组件，如果已经播放完毕的，则不重新创建新组件，而是复用这个组件
    for (let i = 0; i < this._audioSources.length; ++i) {
      let audioSource = this._audioSources[i]
      if (!audioSource.playing) {
        result = audioSource
        break
      }
    }

    // 没有空置的音频组件，则重新创建一个
    if (!result) {
      result = this._persistRootNode.addComponent(AudioSource)
      this._audioSources.push(result)
    }

    result.node.off(AudioSource.EventType.ENDED)
    result.clip = clip
    result.currentTime = 0
    return result
  }

  /**
   * 获取全局音乐设置——关、开
   * @param isMusic
   * @returns
   */
  getAudioSetting(isMusic: boolean) {
    let state
    if (isMusic) {
      state = StorageManager.instance.getGlobalData('music')
    } else {
      state = StorageManager.instance.getGlobalData('sound')
    }

    return !state || state === 'true' ? true : false
  }

  /**
   * 播放音乐
   * @param {String} name 音乐名称可通过constants.AUDIO_MUSIC 获取
   * @param {Boolean} loop 是否循环播放
   */
  playMusic(name: string, loop: boolean = true) {
    let path = 'audio/music/' + name
    //微信特殊处理，除一开场的音乐，其余的放在子包里头
    // if (name !== 'click') {
    //     path =  path; //微信特殊处理，除一开场的音乐，其余的放在子包里头
    // }

    resourceUtil.loadRes(path, AudioClip, (err: any, clip: any) => {
      let source = this._getAudioSource(clip) // 创建并获取音频组件
      let tmp: AudioData = {
        source,
        isMusic: true,
      }
      this.audios[name] = tmp
      source.volume = this.musicVolume
      source.loop = loop
      source.play()
    })
  }

  /**
   * 播放音效
   * @param {String} name 音效名称可通过constants.AUDIO_SOUND 获取
   * @param {Boolean} loop 是否循环播放
   */
  playSound(name: string, loop: boolean = false) {
    // 静音，则不用再加载音效了
    if (!this.soundVolume) {
      return
    }

    //音效一般是多个的，不会只有一个
    let path = 'audio/sound/'
    // if (name !== 'click') {
    //     path = path; //微信特殊处理，除一开场的音乐，其余的放在子包里头
    // }

    resourceUtil.loadRes(path + name, AudioClip, (err: any, clip: any) => {
      let source = this._getAudioSource(clip)
      let tmp: AudioData = {
        source,
        isMusic: false,
      }
      this.arrSound.push(tmp)

      if (loop) {
        this.audios[name] = tmp
      }

      source.volume = this.soundVolume
      source.loop = loop
      source.play()

      // 播放完毕后，从音效队列移除
      source.node.on(AudioSource.EventType.ENDED, () => {
        lodash.remove(this.arrSound, (obj: AudioData) => {
          return obj.source === tmp.source
        })
      })
    })
  }

  // 暂停某个音频
  stop(name: string) {
    if (this.audios.hasOwnProperty(name)) {
      let audio = this.audios[name]
      audio.source.stop()
    }
  }
  /**
   * 暂停所有音频
   */
  stopAll() {
    for (const i in this.audios) {
      if (this.audios.hasOwnProperty(i)) {
        let audio = this.audios[i]
        audio.source.stop()
      }
    }
  }

  /**
   * 获取音乐音量
   * @returns
   */
  getMusicVolume() {
    return this.musicVolume
  }

  /**
   * 设置正在播放的音乐音量
   * @param flag
   */
  setMusic(flag: number) {
    this.musicVolume = flag
    for (let item in this.audios) {
      if (this.audios.hasOwnProperty(item) && this.audios[item].isMusic) {
        // this.changeState(item, flag);
        let audio = this.audios[item]
        audio.source.volume = this.musicVolume
      }
    }
  }

  //看广告时先将音乐暂停
  pauseAll() {
    console.log('pause all music!!!')

    for (let item in this.audios) {
      if (this.audios.hasOwnProperty(item)) {
        let audio = this.audios[item]
        audio.source.pause()
      }
    }
  }

  resumeAll() {
    for (let item in this.audios) {
      if (this.audios.hasOwnProperty(item)) {
        let audio = this.audios[item]
        audio.source.play()
      }
    }
  }

  /**
   * 设置——打开音月
   */
  openMusic() {
    this.setMusic(0.8)
    StorageManager.instance.setGlobalData('music', 'true')
  }

  /**
   * 设置——关闭音乐
   */
  closeMusic() {
    this.setMusic(0)
    StorageManager.instance.setGlobalData('music', 'false')
  }

  /**
   * 设置——打开音效
   */
  openSound() {
    this.setSound(1)
    StorageManager.instance.setGlobalData('sound', 'true')
  }
  /**
   * 设置——关闭音效
   */
  closeSound() {
    this.setSound(0)
    StorageManager.instance.setGlobalData('sound', 'false')
  }

  /**
   * 设置正在播放的音效音量
   * @param flag
   */
  setSound(flag: number) {
    this.soundVolume = flag
    for (let item in this.audios) {
      if (this.audios.hasOwnProperty(item) && !this.audios[item].isMusic) {
        // this.changeState(item, flag);
        let audio = this.audios[item]
        audio.source.volume = this.soundVolume
      }
    }

    for (let idx = 0; idx < this.arrSound.length; idx++) {
      let audio = this.arrSound[idx]
      audio.source.volume = this.soundVolume
    }
  }

  /**
   * 暂停正在播放的某个音效
   * @param name
   */
  stopSingleSound(name: string) {
    if (this.audios.hasOwnProperty(name) && !this.audios[name].isMusic) {
      let audio = this.audios[name]
      audio.source.stop()
    }
  }
}
