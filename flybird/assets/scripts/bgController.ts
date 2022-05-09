import { _decorator, Component, Node, Prefab } from 'cc'
import { birdController } from './birdController'
const { ccclass, property } = _decorator

/**
 * Predefined variables
 * Name = bgController
 * DateTime = Thu Apr 14 2022 11:03:51 GMT+0800 (中国标准时间)
 * Author = layayu
 * FileBasename = bgController.ts
 * FileBasenameNoExtension = bgController
 * URL = db://assets/scripts/bgController.ts
 * ManualUrl = https://docs.cocos.com/creator/3.4/manual/zh/
 *
 */

@ccclass('bgController')
export class bgController extends Component {
  // [1]
  // dummy = '';

  // [2]
  @property
  speed: number = 0

  @property
  width: number = 0

  @property(birdController)
  bird: birdController = null

  // @Prefab()

  start() {
    // [3]
    this.node.on(Node.EventType.MOUSE_DOWN, (e) => {
      // console.log(this.bird)
      this.bird.fly()
    })
  }

  update(dt: number) {
    const nodes = this.node.children
    for (let bg of nodes) {
      // console.log(bg, this.speed)
      const p = bg.getPosition()
      p.x -= this.speed * dt
      bg.setPosition(p.x, p.y)
      if (p.x <= -1 * this.width) {
        bg.setPosition(p.x + this.width * 2, p.y)
      }
    }
  }
}
