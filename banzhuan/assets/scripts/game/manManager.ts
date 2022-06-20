import {
  _decorator,
  Component,
  Node,
  Material,
  SkeletalAnimationComponent,
  SkinnedMeshRenderer,
} from 'cc'
import { clientEvent } from '../framework/clientEvent'
import { poolManager } from '../framework/poolManager'
import { ResManager } from '../framework/ResManager'
import { Consts } from './consts'
const { ccclass, property } = _decorator

@ccclass('manManager')
export class manManager extends Component {
  @property(Material)
  public matRed: Material = null! //红色皮肤

  @property(Material)
  public matGreen: Material = null! //绿色皮肤

  @property(Material)
  public matYellow: Material = null! //黄色皮肤

  private _animationComponent: Animation | null = null
  private _manSkinnedMeshRenderer: SkinnedMeshRenderer | null = null

  private _role: Node | null = null
  static instance: manManager | null = null

  start() {}

  onLoad() {
    if (!manManager.instance) {
      manManager.instance = this
    } else {
      this.destroy()
    }

    clientEvent.on(
      Consts.GameEvent.CHANGE_PLAYER_COLOR,
      this._changeColor,
      this
    )
    // this._animationComponent.play('run')
  }

  public async loadMan() {
    while (this.node.children.length > 0) {
      poolManager.instance.putNode(this.node.children[0])
    }
    const manPreab: any = await ResManager.instance.load('prefab', 'man')
    const man = poolManager.instance.getNode(manPreab, this.node)
    man.setPosition(0, 0, 0)

    // 动画控件
    this._animationComponent = man.getComponent(
      SkeletalAnimationComponent
    ) as unknown as Animation

    // 获取皮肤组件
    const manModel = man.getChildByName('man01')
    this._manSkinnedMeshRenderer = manModel.getComponent(SkinnedMeshRenderer)

    return man
  }

  private _changeColor(type) {
    switch (type) {
      case Consts.COLOR.GREEN:
        this._manSkinnedMeshRenderer.setMaterial(this.matGreen, 0)
        break
      case Consts.COLOR.RED:
        this._manSkinnedMeshRenderer.setMaterial(this.matRed, 0)
        break
      case Consts.COLOR.YELLOW:
        this._manSkinnedMeshRenderer.setMaterial(this.matYellow, 0)
        break
      default:
        console.error('没有该皮肤')
    }
  }

  update(deltaTime: number) {}
}
