import { _decorator, Component, Node, Collider, Enum } from 'cc'
import { AudioManager } from '../framework/AudioManager'
import { clientEvent } from '../framework/clientEvent'
import { poolManager } from '../framework/poolManager'
import { Consts } from './consts'
const { ccclass, property } = _decorator

const COLLIDER_NAME = Enum({
  GREENBRICK: 1,
  YELLOWBRICK: 2,
  REDRICK: 3,
  BARRIER: 4,
  END_LINE: 5,
  COLOR_LIGHT_RED: 6,
  COLOR_LIGHT_YELLOW: 7,
  COLOR_LIGHT_GREEN: 8,
  FINISH_LINE: 9,
})

@ccclass('colliderItem')
export class colliderItem extends Component {
  @property({
    type: COLLIDER_NAME,
    displayOrder: 1,
    range: [1, 30, 1],
  })
  public colliderName: any = COLLIDER_NAME.GREENBRICK //碰撞体类型名称

  private _collider: Collider | null = null

  start() {
    // 碰撞检测
    this._collider = this.node.getComponent(Collider)
    this._collider.on('onCollisionEnter', this._handleCollider, this)
    this._collider.on('onTriggerEnter', this._handleTrigger, this)
  }

  private _handleCollider(ev) {
    const { otherCollider, selfCollider } = ev
    const otherColliderGroup = otherCollider.getGroup()

    if (otherColliderGroup !== Consts.GROUP_TYPE.PLAYER) {
      return
    }

    // 获取砖的颜色
    switch (this.colliderName) {
      case COLLIDER_NAME.BARRIER:
        this._handlerColliderBARRIER()
        break
      default:
        break
    }
  }

  private _handlerColliderBARRIER() {
    clientEvent.dispatchEvent(Consts.GameEvent.GAME_OVER)
  }

  private _handleTrigger(ev) {
    const { otherCollider, selfCollider } = ev
    const otherColliderGroup = otherCollider.getGroup()
    if (otherColliderGroup !== Consts.GROUP_TYPE.PLAYER) {
      return
    }
    switch (this.colliderName) {
      case COLLIDER_NAME.GREENBRICK:
        clientEvent.dispatchEvent(
          Consts.GameEvent.CHANGE_BRICKS_NUM,
          Consts.COLOR.GREEN
        )
        this.node.active = false
        // poolManager.instance.putNode(this.node)
        break
      case COLLIDER_NAME.YELLOWBRICK:
        clientEvent.dispatchEvent(
          Consts.GameEvent.CHANGE_BRICKS_NUM,
          Consts.COLOR.YELLOW
        )
        this.node.active = false
        // poolManager.instance.putNode(this.node)
        break
      case COLLIDER_NAME.REDRICK:
        clientEvent.dispatchEvent(
          Consts.GameEvent.CHANGE_BRICKS_NUM,
          Consts.COLOR.RED
        )
        this.node.active = false
        // poolManager.instance.putNode(this.node)
        break
      case COLLIDER_NAME.BARRIER:
        this._handlerColliderBARRIER()
        break
      case COLLIDER_NAME.COLOR_LIGHT_YELLOW:
        clientEvent.dispatchEvent(
          Consts.GameEvent.CHANGE_PLAYER_COLOR,
          Consts.COLOR.YELLOW
        )

        AudioManager.instance.playSound('changeColor')

        break
      case COLLIDER_NAME.COLOR_LIGHT_RED:
        clientEvent.dispatchEvent(
          Consts.GameEvent.CHANGE_PLAYER_COLOR,
          Consts.COLOR.RED
        )
        AudioManager.instance.playSound('changeColor')

        break
      case COLLIDER_NAME.COLOR_LIGHT_GREEN:
        clientEvent.dispatchEvent(
          Consts.GameEvent.CHANGE_PLAYER_COLOR,
          Consts.COLOR.GREEN
        )
        AudioManager.instance.playSound('changeColor')

        break
      case COLLIDER_NAME.FINISH_LINE:
        clientEvent.dispatchEvent(Consts.GameEvent.GS_END)
        break
      default:
        break
    }
  }

  update(deltaTime: number) {}
}
