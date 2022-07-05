import {
  _decorator,
  Component,
  Input,
  input,
  Vec3,
  Camera,
  PhysicsSystem,
  geometry,
  lerp,
  EventTouch,
  clamp,
  view,
  RigidBody,
} from 'cc'
import { clientEvent } from '../framework/clientEvent'
import { carManager } from './carManager'
import { Consts } from './consts'
import { GameManager } from './gameManager'
import { manManager } from './manManager'
const { ccclass, property } = _decorator

@ccclass('palyerManager')
export class palyerManager extends Component {
  static instance: palyerManager | null = null
  private _linearVelocity: Vec3 = new Vec3()

  @property(Camera)
  private _speedZ: number = 5
  private _speedX: number = 2

  private rigidBody: RigidBody

  onLoad() {
    if (palyerManager.instance === null) {
      palyerManager.instance = this
    } else {
      this.destroy()
      return
    }

    this.rigidBody = this.node.getComponent(RigidBody)

    clientEvent.on(
      Consts.GameEvent.CHANGE_PLAYER_COLOR,
      (type) => {
        manManager.instance.changeColor(type)
        carManager.instance.changeBrickColor(type)
      },
      this
    )
  }

  public arrived() {
    this._linearVelocity = new Vec3(0, 0, 0)
    manManager.instance.kick()
  }

  public async loadPLayer() {
    // 初始化角色
    await manManager.instance.loadMan()
    await carManager.instance.loadCar()
    this.node.setPosition(new Vec3(0, 0.2, 0))
    this._linearVelocity = new Vec3(0, 0, 0)
  }

  public playerMove() {
    // 允许触摸控制
    input.on(Input.EventType.TOUCH_MOVE, this.touchMove.bind(this))
    input.on(Input.EventType.TOUCH_END, this.touchEnd.bind(this))
    input.on(Input.EventType.TOUCH_CANCEL, this.touchCancel.bind(this))
    // 奔跑状态
    manManager.instance.animationPlay('run')
    this._linearVelocity = new Vec3(0, 0, this._speedZ)
  }

  public touchStart(touch: EventTouch) {
    this._linearVelocity.x = 0
  }

  public touchEnd(touch: EventTouch) {
    this._linearVelocity.x = 0
  }

  public touchCancel(touch: EventTouch) {
    this._linearVelocity.x = 0
  }

  public touchMove(touch: EventTouch) {
    let x = touch.getUIDelta().x

    if (Math.abs(x) <= 2) {
      this._linearVelocity.x = 0
      return
    }

    // 根据滑动的幅度设置速度
    this._speedX = Math.round(Math.abs(x) / 10)

    this._speedX = clamp(this._speedX, 5, 5)

    console.error(x, this._speedX)
    // 改变方向
    if (x > 0) {
      this._linearVelocity.x = -this._speedX
    } else if (x < 0) {
      this._linearVelocity.x = this._speedX
    } else {
      this._linearVelocity.x = 0
    }
  }

  public move(dt) {
    let v_0 = new Vec3()

    this.rigidBody.setLinearVelocity(this._linearVelocity)
    this.node.setRotationFromEuler(new Vec3(0, 0, 0))
  }

  public playerStop() {
    input.off(Input.EventType.TOUCH_MOVE)
    input.off(Input.EventType.TOUCH_END)
    input.off(Input.EventType.TOUCH_CANCEL)
    manManager.instance.animationPlay('idle')
    this._linearVelocity = new Vec3(0, 0, 0)
  }

  update(dt) {
    if ((GameManager.instance.state = Consts.GameState.GS_PLAYING)) {
      this.move(dt)
    }
  }
}
