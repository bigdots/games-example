import {
  _decorator,
  Prefab,
  Node,
  SpriteComponent,
  SpriteFrame,
  ImageAsset,
  resources,
  error,
  Texture2D,
  instantiate,
  isValid,
  find,
  TextAsset,
  JsonAsset,
  Material,
  Asset,
} from 'cc'
const { ccclass } = _decorator

@ccclass('ccPromise')
export class ccPromise {
  /**
   * 加载资源
   * @param url   资源路径
   * @param type  资源类型
   * @method load
   */
  public static async load(url: string, type: any = null) {
    return new Promise((resolve, reject) => {
      resources.load(url, type, function (err: Error, data: Asset) {
        if (err) {
          reject(err)
        }
        if (data) {
          resolve(data)
        }
      })
    }).catch((err) => {
      console.error(err)
    })
  }
}
