import {
  _decorator,
  Component,
  Input,
  input,
  Vec3,
  Camera,
  PhysicsSystem,
  geometry,
  Collider,
} from 'cc'
import { camareManager } from '../framework/cameraManager'
import { clientEvent } from '../framework/clientEvent'
import { carManager } from './carManager'
import { Consts } from './consts'
import { manManager } from './manManager'
const { ccclass, property } = _decorator

@ccclass('palyerManager')
export class palyerManager extends Component {
  static instance: palyerManager | null = null

  private _update: Function | null = null

  @property(Camera)
  private camera: Camera | null = null
  private _speed: number = 5
  private _oldpos: Vec3 = new Vec3()
  private _pos: Vec3 = new Vec3()
  private _ray: geometry.Ray = new geometry.Ray()

  onLoad() {
    if (palyerManager.instance === null) {
      palyerManager.instance = this
    } else {
      this.destroy()
      return
    }

    clientEvent.on(
      Consts.GameEvent.GS_INIT,
      this._gameInit.bind(this),
      this.node
    )
    clientEvent.on(
      Consts.GameEvent.GS_START,
      this._gameStart.bind(this),
      this.node
    )
  }

  _gameInit() {
    manManager.instance.loadMan()
    carManager.instance.loadCar()

    camareManager.instance.changeCameraTarget(this.node)
  }

  _gameStart() {
    // 允许触摸控制
    input
      .on(Input.EventType.TOUCH_MOVE, this.throttle(this._move, 16))
      .bind(this)
    // 奔跑状态
    // this._animationComponent.play('run')
    this._update = this._startUpdate
  }

  _startUpdate(dt) {
    const p = this.node.getPosition()
    this._pos.z = p.z + this._speed * dt
    this.node.setPosition(this._pos)
  }
  throttle(func, wait) {
    let timeout
    let that = this
    return function () {
      if (!timeout) {
        timeout = setTimeout(() => {
          timeout = null
          func.call(that, arguments[0])
        }, wait)
      }
    }
  }

  _move(e) {
    const touch = e.touch!
    this.camera.screenPointToRay(
      touch.getLocationX(),
      touch.getLocationY(),
      this._ray
    )

    if (PhysicsSystem.instance.raycast(this._ray)) {
      const raycastResults = PhysicsSystem.instance.raycastResults

      let x = parseFloat(raycastResults[0].hitPoint.x.toFixed(2))
      if (x > 0) {
        x = Math.min(1, raycastResults[0].hitPoint.x)
      } else {
        x = Math.max(-1, raycastResults[0].hitPoint.x)
      }

      this._pos.set(x, this._pos.y, this._pos.z)
    } else {
      console.log('raycast does not hit the target node !')
    }
  }

  update(dt) {
    if (this._update) {
      this._update(dt)
    }
  }
}
