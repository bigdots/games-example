import { _decorator, Component, Node, Label } from 'cc'
const { ccclass, property } = _decorator

@ccclass('scoreControl')
export class scoreControl extends Component {
  // [1]
  // dummy = '';

  // [2]
  @property
  score: number = 0

  updateScore() {
    this.score += 2
    // this.node.getComponent(Label).string = this.score
    this.node.getComponent(Label).string = this.score.toString()
  }

  start() {
    // [3]
  }

  // update (deltaTime: number) {
  //     // [4]
  // }
}
