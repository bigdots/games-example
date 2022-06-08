import {
  _decorator,
  Component,
  Node,
  Animation,
  SkeletalAnimationComponent,
} from 'cc'
import { camareManager } from '../framework/cameraManager'
import { clientEvent } from '../framework/clientEvent'
import { poolManager } from '../framework/poolManager'
import { ResManager } from '../framework/ResManager'
import { main } from '../main'
const { ccclass, property } = _decorator

@ccclass('palyerManager')
export class palyerManager extends Component {
  private _animationComponent: Animation | null = null

  private _role: Node | null = null

  private _speed: number = 5

  onLoad() {
    // 初始化角色
    clientEvent.on('gameinit', this.init.bind(this), this.node)
  }
  init() {
    console.log('createman')
    this._loadMan()
    camareManager.instance.changeCameraTarget(this.node)
  }
  private _loadMan() {
    // 回收节点
    while (this.node.children.length > 0) {
      poolManager.instance.putNode(this.node.children[0])
    }

    const manPreab = ResManager.instance.getAsset('model', 'man/newMan')
    this._role = poolManager.instance.getNode(manPreab, this.node)
    this._role.setPosition(0, 0, 0)
    this._role.setRotationFromEuler(0, 90, 0)
    // this._animationComponent = this._role.addComponent(
    //   SkeletalAnimationComponent
    // )
    // this._animationComponent.play('run')

    this._animationComponent = this._role.getComponent(
      SkeletalAnimationComponent
    )
    this._animationComponent.play('run')
  }

  update(dt) {
    const p = this.node.getPosition()
    this.node.setPosition(p.x + this._speed * dt, p.y, p.z)
  }
}
