import {
  _decorator,
  Component,
  Node,
  assetManager,
  AssetManager,
  Asset,
  SpriteFrame,
  resources,
} from 'cc'
import { ccPromise } from './ccPromise'
const { ccclass, property } = _decorator

@ccclass('ResManager')
export class ResManager {
  static _instance: ResManager | null = null
  private _cacheRes = {}

  public static get instance() {
    if (!this._instance) {
      this._instance = new ResManager()
    }

    return this._instance
  }

  resourcesLoad(url: string, type: any = null) {
    return new Promise((resolve, reject) => {
      resources.load(url, type, function (err: Error, asset: Asset) {
        if (err) {
          reject(err)
        }
        if (asset) {
          resolve(asset)
        }
      })
    }).catch((err) => {
      console.error(err)
    })
  }

  async load(path: string, type) {
    if (!this._cacheRes[path]) {
      this._cacheRes[path] = await this.resourcesLoad(path, type)
    }

    return this._cacheRes[path]
  }

  async loadArr(paths: string[], type = null, onProgress, onComplete) {
    let finish = 0,
      total = paths.length,
      asserts = []
    try {
      for (let i = 0; i < paths.length; i++) {
        const path = paths[i]
        const asset = await this.load(path, type)
        finish = finish + 1
        onProgress(finish, total, asset)
        asserts.push(asset)
      }
      console.error(this._cacheRes)
      onComplete(null, asserts)
    } catch (err) {
      onComplete(err, null)
    }
  }
}
