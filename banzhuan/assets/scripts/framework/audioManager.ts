import {
  assert,
  assetManager,
  AudioClip,
  AudioSource,
  clamp01,
  Component,
  log,
  resources,
} from 'cc'

export class AudioManager extends Component {
  private _audioSource?: AudioSource
  private _cachedAudioClipMap: Record<string, AudioClip> = {}

  public static instance: AudioManager

  onLoad() {
    if (!AudioManager.instance) {
      AudioManager.instance = this
    } else {
      this.destroy()
    }

    this._audioSource = this.node.addComponent(AudioSource)
  }

  public playMusic(name: string, loop: boolean) {
    const path = `audio/${name}`
    const audioSource = this._audioSource!
    assert(audioSource, 'AudioManager not inited!')

    let cachedAudioClip = this._cachedAudioClipMap[path]
    if (cachedAudioClip) {
      audioSource.clip = cachedAudioClip
      audioSource.play()
    } else {
      resources?.load(path, AudioClip, (err, clip) => {
        if (err) {
          console.warn(err)
          return
        }

        this._cachedAudioClipMap[path] = clip
        audioSource.clip = clip
        audioSource.loop = loop
        audioSource.play()
      })
    }
  }

  public playSound(name: string) {
    const audioSource = this._audioSource!
    assert(audioSource, 'AudioManager not inited!')

    const path = `audio/${name}`

    let cachedAudioClip = this._cachedAudioClipMap[path]
    if (cachedAudioClip) {
      audioSource.playOneShot(cachedAudioClip, 1)
    } else {
      resources?.load(path, AudioClip, (err, clip) => {
        if (err) {
          console.warn(err)
          return
        }

        this._cachedAudioClipMap[path] = clip
        audioSource.playOneShot(clip, 1)
      })
    }
  }

  // 设置音乐音量
  setMusicVolume(flag: number) {
    const audioSource = this._audioSource!
    assert(audioSource, 'AudioManager not inited!')

    flag = clamp01(flag)
    audioSource.volume = flag
  }

  stopMusic() {
    if (this._audioSource.playing) {
      this._audioSource.stop()
    }
  }
}
