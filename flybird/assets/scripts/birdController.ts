import {
  _decorator,
  Component,
  Node,
  v2,
  RigidBody2D,
  PhysicsSystem2D,
  Contact2DType,
  Label,
  director,
  Vec3,
} from 'cc'
import { scoreControl } from './scoreControl'
const { ccclass, property } = _decorator

@ccclass('birdController')
export class birdController extends Component {
  // [1]
  // dummy = '';

  // [2]
  @property
  speed: number = 0

  @property(scoreControl)
  score: scoreControl = null

  @property(Node)
  end: Node = null

  start() {
    // 注册全局碰撞回调函数
    //  PhysicsSystem2D
    if (PhysicsSystem2D.instance) {
      PhysicsSystem2D.instance.on(
        Contact2DType.BEGIN_CONTACT,
        this.onBeginContact,
        this
      )
    }
  }

  onload() {}

  fly() {
    // console.debug('我飞了')
    this.getComponent(RigidBody2D).linearVelocity = v2(0, this.speed)
  }

  onBeginContact(otherCollider, selfCollider, contact) {
    // this.score
    if (otherCollider.tag == 2) {
      this.score.updateScore()
    } else {
      // 结束游戏
      this.end.active = true
      // director.pause()
      // director.stopAnimation()
    }
  }

  // update (deltaTime: number) {
  //     // [4]
  // }
}
