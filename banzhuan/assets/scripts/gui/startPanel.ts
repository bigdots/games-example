import { _decorator, Component, Node } from 'cc'
const { ccclass, property } = _decorator

@ccclass('startPanel')
export class startPanel extends Component {
  start() {
    const satrtBtn: Node = this.node.getChildByName('Button')

    satrtBtn.on(Node.EventType.TOUCH_END, (evt) => {
      console.error(evt)
    })
  }

  update(deltaTime: number) {}
}
