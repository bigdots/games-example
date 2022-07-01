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
  private _stateX: number = 0
  private _oldX: number = 0

  @property(Camera)
  private _speed: Vec3 = new Vec3(0, 0, 0)

  onLoad() {
    if (palyerManager.instance === null) {
      palyerManager.instance = this
    } else {
      this.destroy()
      return
    }
  }

  public arrived() {
    this._speed = new Vec3(0, 0, 0)
    // carManager.instance.useGravity()
    manManager.instance.kick()
  }

  public async loadPLayer() {
    await manManager.instance.loadMan()
    await carManager.instance.loadCar()
    this.node.setPosition(new Vec3(0, 0, 0))
    this._speed = new Vec3(0, 0, 0)
  }

  public playerMove() {
    // 允许触摸控制
    input.on(Input.EventType.TOUCH_MOVE, this.touchMove.bind(this))
    input.on(Input.EventType.TOUCH_END, this.touchEnd.bind(this))
    input.on(Input.EventType.TOUCH_CANCEL, this.touchCancel.bind(this))
    // 奔跑状态
    manManager.instance.animationPlay('run')
    this._speed = new Vec3(1, 0, 5)
  }

  public touchEnd(touch: EventTouch) {
    this._stateX = 0
  }

  public touchCancel(touch: EventTouch) {
    this._stateX = 0
  }

  public touchMove(touch: EventTouch) {
    let x = touch.getUIDelta().x
    if (x > 0) {
      this._stateX = -this._speed.x // 左右
    } else if (x < 0) {
      this._stateX = this._speed.x
    } else {
      this._stateX = 0
    }

    //前后移动间距为3才视为移动，避免太灵敏
    if (Math.abs(x - this._oldX) <= 3) {
      this._stateX = 0
      this._oldX = 0
    } else {
      this._oldX = x
    }
  }

  public move(dir, speed) {
    const p = new Vec3()
    this.node.getWorldPosition(p)
    Vec3.scaleAndAdd(p, p, dir, speed)
    p.x = clamp(p.x, -1, 1) // x的范围只能是-1~1之间
    this.node.position = p
  }

  public playerStop() {
    input.off(Input.EventType.TOUCH_MOVE)
    input.off(Input.EventType.TOUCH_END)
    input.off(Input.EventType.TOUCH_CANCEL)
    manManager.instance.animationPlay('idle')
    this._speed = new Vec3(0, 0, 0)
  }

  update(dt) {
    if ((GameManager.instance.state = Consts.GameState.GS_PLAYING)) {
      this.move(new Vec3(this._stateX, 0, this._speed.z * dt), 0.5)
    }
  }
}
