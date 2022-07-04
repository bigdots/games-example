// import {
//   _decorator,
//   Component,
//   Node,
//   assetManager,
//   AssetManager,
//   Asset,
//   SpriteFrame,
// } from 'cc'
// const { ccclass, property } = _decorator

// @ccclass('ResManager')
// export class ResManager {
//   static _instance: ResManager | null = null

//   public static get instance() {
//     if (!this._instance) {
//       this._instance = new ResManager()
//     }

//     return this._instance
//   }

//   private abBunds: any = {}
//   private total: number = 0
//   private now: number = 0
//   private progressFunc: Function | null = null
//   private endFunc: Function | null = null
//   private nowAb: number = 0
//   private totalAb: number = 0

//   public init(): void {}

//   private _loadBundle(abName): Promise<AssetManager.Bundle> {
//     return new Promise((resolve, reject) => {
//       let bundle = assetManager.getBundle(abName)
//       if (bundle) {
//         resolve(bundle)
//         return
//       }

//       assetManager.loadBundle(abName, (err, bundle) => {
//         if (err) {
//           reject(err)
//           return
//         }
//         resolve(bundle)
//       })
//     })
//   }

//   public async load(abName: string, url: string, type = null) {
//     let bundle = await this._loadBundle(abName)
//     return new Promise((resolve, reject) => {
//       bundle.load(url, type, (err, asset) => {
//         if (err) {
//           reject(err)
//           return
//         }
//         resolve(asset)
//       })
//     })
//   }

//   public async laodbacth(urls: Array<any>) {
//     const loadArr: any = urls.map((ele) => {
//       const cell = ele.indexOf('/')
//       const abName = ele.substring(0, cell)
//       const url = ele.substring(cell + 1, ele.length)

//       return this.load(abName, url)
//     })

//     return Promise.all(loadArr)
//   }

//   public async loadDir(abName: string, dir: string, type) {
//     let bundle = await this._loadBundle(abName)

//     return new Promise((resolve, reject) => {
//       bundle.loadDir(dir, type, (err, assets) => {
//         if (err) {
//           reject(err)
//           return
//         }
//         resolve(assets)
//       })
//     })
//   }

//   public async loadScene(abName, sceneName) {
//     let bundle = await this._loadBundle(abName)
//     return new Promise((resolve, reject) => {
//       bundle.loadScene(sceneName, (err, scene) => {
//         if (err) {
//           reject(err)
//           return
//         }
//         resolve(scene)
//       })
//     })
//   }

//   // 分割线
//   private loadAssetsBundle(abName: string, endFunc: Function): void {
//     assetManager.loadBundle(abName, (err, bundle) => {
//       if (err !== null) {
//         console.log('[ResMgr]:Load AssetsBundle Error: ' + abName)
//         this.abBunds[abName] = null
//       } else console.log('[ResMgr]:Load AssetsBundle Success:' + abName)
//       this.abBunds[abName] = bundle

//       if (endFunc) {
//         endFunc()
//       }
//     })
//   }

//   public async release(abName: string, url: string, type) {
//     let bundle = assetManager.getBundle(abName)
//     if (!bundle) {
//       return
//     }
//     bundle.release(url, type)
//   }
//   public async releaseAll(abName: string) {
//     let bundle = assetManager.getBundle(abName)
//     if (!bundle) {
//       return
//     }
//     bundle.releaseAll()
//   }

//   private loadRes(abBundle: any, url: any, typeClasss: any): void {
//     abBundle.load(url, typeClasss, (error: any, asset: any) => {
//       this.now++
//       if (error) {
//         console.log('load Res ' + url + ' error: ' + error)
//       } else {
//         console.log('1oad Res ' + url + ' success!')
//       }
//       if (this.progressFunc) {
//         this.progressFunc(this.now, this.total)
//       }
//       console.log(this.now, this.total)
//       if (this.now >= this.total) {
//         if (this.endFunc !== null) {
//           this.endFunc()
//         }
//       }
//     })
//   }

//   public getAsset(abName: string, resUrl: string): any {
//     var bondule = assetManager.getBundle(abName)
//     if (bondule === null) {
//       console.log('[error]: ' + abName + ' AssetsBundle not loaded !!!')
//       return null
//     }

//     return bondule.get(resUrl)
//   }

//   public releaseResPackage(resPkg: any) {
//     for (var key in resPkg) {
//       var urlSet = resPkg[key].urls
//       for (var i = 0; i < urlSet.length; i++) {
//         var bondule: any = assetManager.getBundle(key)
//         if (bondule === null) {
//           console.log('[error]: ' + key + ' AssetsBundle not loaded !!!')
//           continue
//         }
//         assetManager.releaseAsset(bondule.get(urlSet[i]))
//       }
//     }
//   }

//   private loadAssetsInAssetsBundle(resPkg: any): void {
//     for (var key in resPkg) {
//       var urlSet = resPkg[key].urls

//       var typeClass = resPkg[key].assetType

//       for (var i = 0; i < urlSet.length; i++) {
//         this.loadRes(this.abBunds[key], urlSet[i], typeClass)
//       }
//     }
//   }
//   // {GUI: {accessType:cc.prefab,urls:[]}}
//   public preloadResPackage(resPkg: any, progressFunc: any, endFunc: any): void {
//     this.total = 0
//     this.now = 0
//     this.totalAb = 0
//     this.nowAb = 0

//     this.progressFunc = progressFunc
//     this.endFunc = endFunc

//     for (var key in resPkg) {
//       this.totalAb++
//       this.total += resPkg[key].urls.length
//     }

//     for (var key in resPkg) {
//       this.loadAssetsBundle(key, () => {
//         this.nowAb++

//         if (this.nowAb === this.totalAb) {
//           this.loadAssetsInAssetsBundle(resPkg)
//         }
//       })
//     }
//   }
// }
