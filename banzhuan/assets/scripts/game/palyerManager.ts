import {
  _decorator,
  Component,
  Node,
  Animation,
  SkeletalAnimationComponent,
  Input,
  input,
  Vec3,
  Camera,
  PhysicsSystem,
  geometry,
} from 'cc'
import { camareManager } from '../framework/cameraManager'
import { clientEvent } from '../framework/clientEvent'
import { poolManager } from '../framework/poolManager'
import { ResManager } from '../framework/ResManager'
import { main } from '../main'
const { ccclass, property } = _decorator

@ccclass('palyerManager')
export class palyerManager extends Component {
  @property(Camera)
  private camera: Camera | null = null

  private _animationComponent: Animation | null = null

  private _role: Node | null = null

  private _speed: number = 5

  private _pos: Vec3 = new Vec3()

  private _ray: geometry.Ray = new geometry.Ray()

  onLoad() {
    // 初始化角色
    clientEvent.on('gameinit', this.init.bind(this), this.node)

    input.on(Input.EventType.TOUCH_MOVE, (e) => {
      const touch = e.touch!
      this.camera.screenPointToRay(
        touch.getLocationX(),
        touch.getLocationY(),
        this._ray
      )

      if (PhysicsSystem.instance.raycast(this._ray)) {
        const raycastResults = PhysicsSystem.instance.raycastResults
        // for (let i = 0; i < raycastResults.length; i++) {
        //   const item = raycastResults[i]
        //   console.error(item)
        // }

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
    })
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

    this._animationComponent = this._role.getComponent(
      SkeletalAnimationComponent
    )
    this._animationComponent.play('run')
  }

  update(dt) {
    // const p = this.node.getPosition()
    // this._pos.z = p.z + this._speed * dt
    this.node.setPosition(this._pos)
  }
}
