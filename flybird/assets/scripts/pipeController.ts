import { _decorator, Component, Node } from 'cc'
const { ccclass, property } = _decorator

@ccclass('pipeController')
export class pipeController extends Component {
  // [1]
  // dummy = '';

  // [2]
  @property
  speed: number = 0

  start() {
    // [3]
  }

  update(dt: number) {
    const p = this.node.getPosition()

    p.x -= this.speed * dt
    // console.log(p)

    this.node.setPosition(p)
    if (p.x < -200) {
      this.node.setPosition(p.x + 288 * 2, Math.round(Math.random() * 200) - 72)
    }
  }
}
