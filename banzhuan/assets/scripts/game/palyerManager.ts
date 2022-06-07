import { _decorator, Component, Node, Animation } from 'cc'
import { clientEvent } from '../framework/clientEvent'
import { poolManager } from '../framework/poolManager'
import { ResManager } from '../framework/ResManager'
const { ccclass, property } = _decorator

@ccclass('palyerManager')
export class palyerManager extends Component {
  private _animationComponent: Animation | null = null

  onLoad() {
    // 初始化角色
    clientEvent.on(
      'gameinit',
      () => {
        console.log('createman')
        this._loadMan()
      },
      this.node
    )

    this._animationComponent = this.node.addComponent(Animation)
  }
  private _loadMan() {
    // 回收节点
    while (this.node.children.length > 0) {
      poolManager.instance.putNode(this.node.children[0])
    }

    const manPreab = ResManager.instance.getAsset('model', 'man/newMan')
    const man = poolManager.instance.getNode(manPreab, this.node)
    man.setPosition(0, 0, 0)
    // man.setScale(1,1,1)
    man.setRotationFromEuler(0, 90, 0)

    this._animationComponent.play()
  }
}
