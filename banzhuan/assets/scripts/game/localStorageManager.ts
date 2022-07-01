import { _decorator, Component, Node, sys } from 'cc'
const { ccclass, property } = _decorator

function guid() {
  return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function (c) {
    var r = (Math.random() * 16) | 0,
      v = c == 'x' ? r : (r & 0x3) | 0x8

    return v.toString(16)
  })
}

interface playerData {
  level: number
}

@ccclass('localStorageManager')
export class localStorageManager {
  static _instacne: localStorageManager | null = null

  public static get instance(): localStorageManager {
    if (!this._instacne) {
      this._instacne = new localStorageManager()
    }
    return this._instacne
  }

  public getStorage(key: string): string {
    const value = sys.localStorage.getItem(key)
    try {
      return JSON.parse(value)
    } catch (e) {
      return value
    }
  }

  public setStrorage(key, data): void {
    try {
      sys.localStorage.setItem(key, JSON.stringify(data))
    } catch (e) {
      sys.localStorage.setItem(key, data)
    }
  }

  public getPlayer(): string {
    let userId = this.getStorage('userId') as string
    if (!userId) {
      // 重新创建一个用户
      userId = guid()
      this.setStrorage('userId', userId)
    }
    return userId
  }

  public getLevel(): string {
    let level = this.getStorage('level') as string

    if (!level) {
      level = '1'
      this.setStrorage('level', level)
    }

    return level
  }

  public updateLevel(): void {
    let level = this.getLevel()
    level = level + 1
    this.setStrorage('level', level)
  }
}
