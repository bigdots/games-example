import { AudioManager } from './audioManager'
import {
  _decorator,
  Component,
  Node,
  Prefab,
  AnimationComponent,
  ParticleSystemComponent,
  Vec3,
  find,
  isValid,
  AnimationState,
  AnimationClip,
  UITransformComponent,
  Vec2,
  instantiate,
} from 'cc'
import { poolManager } from './poolManager'
import { resourceUtil } from './resourceUtil'
import { constant } from './constant'
// import { gameConstants } from '../game/utils/gameConstants';
// import { FlyReward } from '../ui/common/flyReward';

const { ccclass, property } = _decorator

@ccclass('EffectManager')
export class EffectManager extends Component {
  private _ndParent: Node = null!
  public get ndParent() {
    if (!this._ndParent) {
      this._ndParent = find('effectManager') as Node
    }

    return this._ndParent
  }

  static _instance: EffectManager

  static get instance() {
    if (this._instance) {
      return this._instance
    }

    this._instance = new EffectManager()
    return this._instance
  }

  /**
   * 播放动画
   * @param {string} path 动画节点路径
   * @param {string} aniName
   * @param {vec3} worPos 世界坐标
   * @param {boolean} isLoop 是否循环
   * @param {boolean} isRecycle 是否回收
   * @param {number} [scale=1] 缩放倍数
   * @param {Function} [callback=()=>{}] 回调函数
   */
  public playAni(
    path: string,
    aniName: string,
    worPos: Vec3 = new Vec3(),
    isLoop: boolean = false,
    isRecycle: boolean = false,
    scale: number = 1,
    callback: Function = () => {}
  ) {
    let childName: string = path.split('/')[1]
    let ndEffect: Node | null = this.ndParent.getChildByName(childName)

    let cb = () => {
      ndEffect?.setScale(new Vec3(scale, scale, scale))
      ndEffect?.setWorldPosition(worPos)
      let ani: AnimationComponent = ndEffect?.getComponent(
        AnimationComponent
      ) as AnimationComponent
      ani.play(aniName)
      let aniState: AnimationState = ani.getState(aniName) as AnimationState
      if (aniState) {
        if (isLoop) {
          aniState.wrapMode = AnimationClip.WrapMode.Loop
        } else {
          aniState.wrapMode = AnimationClip.WrapMode.Normal
        }
      }

      ani.once(AnimationComponent.EventType.FINISHED, () => {
        callback && callback()
        if (isRecycle && ndEffect) {
          poolManager.instance.putNode(ndEffect)
        }
      })
    }

    if (!ndEffect) {
      resourceUtil.loadModelRes(path).then((prefab: any) => {
        ndEffect = poolManager.instance.getNode(
          prefab as Prefab,
          this.ndParent
        ) as Node
        ndEffect.setScale(new Vec3(scale, scale, scale))
        ndEffect.setWorldPosition(worPos)
        cb()
      })
    } else {
      cb()
    }
  }

  /**
   * 移除特效
   * @param {string} name  特效名称
   * @param {Node}} ndParent 特效父节点
   */
  public removeEffect(name: string, ndParent: Node = this.ndParent) {
    let ndEffect: Node | null = ndParent.getChildByName(name)
    if (ndEffect) {
      let arrAni: AnimationComponent[] =
        ndEffect.getComponentsInChildren(AnimationComponent)
      arrAni.forEach((element: AnimationComponent) => {
        element.stop()
      })

      let arrParticle: [] = ndEffect?.getComponentsInChildren(
        ParticleSystemComponent
      ) as any
      arrParticle.forEach((element: ParticleSystemComponent) => {
        element?.clear()
        element?.stop()
      })
      poolManager.instance.putNode(ndEffect)
    }
  }

  /**
   * 播放粒子特效
   * @param {string} path 特效路径
   * @param {vec3}worPos 特效世界坐标
   * @param {number} [recycleTime=0] 特效节点回收时间，如果为0，则使用默认duration
   * @param  {number} [scale=1] 缩放倍数
   * @param {vec3} eulerAngles 特效角度
   * @param {Function} [callback=()=>{}] 回调函数
   * @param {Function} [isBanDestroy=false] 是否销毁
   */
  public playParticle(
    path: string,
    worPos: Vec3,
    recycleTime: number = 0,
    scale: number = 1,
    eulerAngles?: Vec3 | null,
    callback?: Function | null,
    isBanDestroy: boolean = false
  ) {
    resourceUtil.loadEffectRes(path).then((prefab: any) => {
      let ndEffect: Node = poolManager.instance.getNode(
        prefab as Prefab,
        this.ndParent
      ) as Node

      ndEffect.setScale(new Vec3(scale, scale, scale))
      ndEffect.setWorldPosition(worPos)

      if (eulerAngles) {
        ndEffect.eulerAngles = eulerAngles
      }

      let maxDuration: number = 0

      let arrParticle: ParticleSystemComponent[] =
        ndEffect.getComponentsInChildren(ParticleSystemComponent)
      arrParticle.forEach((item: ParticleSystemComponent) => {
        item.simulationSpeed = 1
        item?.play()

        let duration: number = item.duration
        maxDuration = duration > maxDuration ? duration : maxDuration
      })

      let seconds: number =
        recycleTime && recycleTime > 0 ? recycleTime : maxDuration

      if (isBanDestroy) return
      setTimeout(() => {
        if (ndEffect.parent) {
          callback && callback()
          //加上 终点特效会比较没问题 但是偶现蓝色光圈不出现
          arrParticle.forEach((item: ParticleSystemComponent) => {
            item?.clear()
            item?.stop()
          })
          poolManager.instance.putNode(ndEffect)
        }
      }, seconds * 1000)
    })
  }

  /**
   * 播放粒子特效
   * @param {string} path 特效路径
   * @param {vec3}worPos 特效世界坐标
   * @param {number} [recycleTime=0] 特效节点回收时间，如果为0，则使用默认duration
   * @param  {number} [scale=1] 缩放倍数
   * @param {vec3} eulerAngles 特效角度
   * @param {Function} [callback=()=>{}] 回调函数
   * @param {Function} [isBanDestroy=false] 是否销毁
   */
  public playParticleNotPool(
    path: string,
    worPos: Vec3,
    recycleTime: number = 0,
    scale: number = 1,
    eulerAngles?: Vec3 | null,
    callback?: Function | null,
    isBanDestroy: boolean = false
  ) {
    resourceUtil.loadEffectRes(path).then((prefab: any) => {
      let ndEffect: Node = instantiate(prefab)
      ndEffect.parent = this.ndParent

      ndEffect.setScale(new Vec3(scale, scale, scale))
      ndEffect.setWorldPosition(worPos)

      if (eulerAngles) {
        ndEffect.eulerAngles = eulerAngles
      }

      let maxDuration: number = 0

      let arrParticle: ParticleSystemComponent[] =
        ndEffect.getComponentsInChildren(ParticleSystemComponent)
      arrParticle.forEach((item: ParticleSystemComponent) => {
        item.simulationSpeed = 1
        item?.clear()
        item?.stop()
        item?.play()

        let duration: number = item.duration
        maxDuration = duration > maxDuration ? duration : maxDuration
      })

      let seconds: number =
        recycleTime && recycleTime > 0 ? recycleTime : maxDuration

      if (isBanDestroy) return
      setTimeout(() => {
        if (ndEffect.parent) {
          callback && callback()
          // poolManager.instance.putNode(ndEffect);
          ndEffect.destroy()
        }
      }, seconds * 1000)
    })
  }

  /**
   * 播放节点下面的动画和粒子
   *
   * @param {Node} targetNode 特效挂载节点
   * @param {string} effectPath 特效路径
   * @param {boolean} [isPlayAni=true] 是否播放动画
   * @param {boolean} [isPlayParticle=true] 是否播放特效
   * @param {number} [recycleTime=0] 特效节点回收时间，如果为0，则使用默认duration
   * @param {number} [scale=1] 缩放倍数
   * @param {Vec3} [pos=new Vec3()] 位移
   * @param {Function} [callback=()=>{}] 回调函数
   * @returns
   * @memberof EffectManager
   */
  public playEffect(
    targetNode: Node,
    effectPath: string,
    isPlayAni: boolean = true,
    isPlayParticle: boolean = true,
    recycleTime: number = 0,
    scale: number = 1,
    pos: Vec3 = new Vec3(),
    eulerAngles?: Vec3,
    callback?: Function
  ) {
    if (!targetNode.parent) {
      //父节点被回收的时候不播放
      return
    }

    resourceUtil.loadEffectRes(effectPath).then((prefab: any) => {
      let ndEffect: Node = poolManager.instance.getNode(
        prefab as Prefab,
        targetNode
      ) as Node
      ndEffect.setScale(new Vec3(scale, scale, scale))
      ndEffect.setPosition(pos)
      if (eulerAngles) {
        ndEffect.eulerAngles = eulerAngles
      }
      let maxDuration: number = 0

      if (isPlayAni) {
        let arrAni: AnimationComponent[] =
          ndEffect.getComponentsInChildren(AnimationComponent)

        arrAni.forEach((element: AnimationComponent, idx: number) => {
          element?.play()

          let aniName = element?.defaultClip?.name
          if (aniName) {
            let aniState = element.getState(aniName)
            if (aniState) {
              let duration = aniState.duration
              maxDuration = duration > maxDuration ? duration : maxDuration

              aniState.speed = 1
            }
          }
        })
      }

      if (isPlayParticle) {
        let arrParticle: ParticleSystemComponent[] =
          ndEffect.getComponentsInChildren(ParticleSystemComponent)
        arrParticle.forEach((element: ParticleSystemComponent) => {
          element.simulationSpeed = 1
          element?.clear()
          element?.stop()
          element?.play()

          let duration: number = element.duration
          maxDuration = duration > maxDuration ? duration : maxDuration
        })
      }

      let seconds: number =
        recycleTime && recycleTime > 0 ? recycleTime : maxDuration

      setTimeout(() => {
        if (ndEffect.parent) {
          callback && callback()
          poolManager.instance.putNode(ndEffect)
        }
      }, seconds * 1000)
    })
  }

  /**
     播放加速特效
     * @param ndParent 生成父节点
     */
  // public getRunFastEff(ndParent: Node) {
  //   resourceUtil
  //     .loadEffectRes(gameConstants.EFFECT_LIST.RUNFAST)
  //     .then((prefab: any) => {
  //       let ndEffect: Node = poolManager.instance.getNode(
  //         prefab as Prefab,
  //         ndParent
  //       ) as Node
  //       ndEffect.setRotationFromEuler(0, 180, 0)
  //       ndEffect.setPosition(0, 0.2, 0)

  //       let maxDuration: number = 0

  //       let arrParticle: ParticleSystemComponent[] =
  //         ndEffect.getComponentsInChildren(ParticleSystemComponent)
  //       arrParticle.forEach((item: ParticleSystemComponent) => {
  //         item.simulationSpeed = 1
  //         item?.play()

  //         let duration: number = item.duration
  //         maxDuration = duration > maxDuration ? duration : maxDuration
  //       })
  //     })
  // }

  /**
   * 回收当前不需要的加速特效
   * @param ndEffect
   * @returns
   */
  public putRunFastEff(ndEffect: Node) {
    if (!ndEffect.parent) return
    let arrParticle: ParticleSystemComponent[] =
      ndEffect.getComponentsInChildren(ParticleSystemComponent)

    arrParticle.forEach((item: ParticleSystemComponent) => {
      item?.clear()
      item?.stop()
    })
    poolManager.instance.putNode(ndEffect)
  }

  /**
   * 播放粒子特效
   * @param {string} path 特效路径
   * @param {vec3} pos 特效世界坐标
   * @param {number} eulerAnglesY 特效角度
   */
  public playFallWater(path: string, pos: Vec3, eulerAnglesY: number) {
    resourceUtil.loadEffectRes(path).then((prefab: any) => {
      let ndEffect: Node = poolManager.instance.getNode(
        prefab as Prefab,
        this.ndParent
      ) as Node
      // let ndEffect: Node = instantiate(prefab as Prefab) as Node;
      // ndEffect.parent = this.ndParent;
      ndEffect.setPosition(pos)

      ndEffect.setRotationFromEuler(0, eulerAnglesY, 0)

      let maxDuration: number = 0

      let arrParticle: ParticleSystemComponent[] =
        ndEffect.getComponentsInChildren(ParticleSystemComponent)
      arrParticle.forEach((item: ParticleSystemComponent) => {
        item.simulationSpeed = 1

        item.startRotationY.constant = eulerAnglesY

        item.play()

        let duration: number = item.duration
        maxDuration = duration > maxDuration ? duration : maxDuration
      })

      let seconds: number = maxDuration

      setTimeout(() => {
        if (ndEffect.parent) {
          arrParticle.forEach((item: ParticleSystemComponent) => {
            item?.clear()
            item?.stop()
          })
          // ndEffect.destroy()
          poolManager.instance.putNode(ndEffect)
        }
      }, seconds * 1000)
    })
  }
  /**
   * 显示飞入奖励
   */
  // public showFlyReward(targetNum: number, callback: Function = () => { }) {
  //     resourceUtil.createUI('common/flyReward', (err: any, node: Node) => {
  //         if (err) {
  //             callback && callback();
  //             return;
  //         }
  //         let rewardScript = node.getComponent(FlyReward) as FlyReward;
  //         rewardScript.createReward(targetNum, callback);
  //     })
  // }
}
