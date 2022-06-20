import { _decorator, Component, Node } from 'cc'
import { clientEvent } from '../framework/clientEvent'
import { uiManager } from '../framework/uiManager'
import { Consts } from '../game/consts'
const { ccclass, property } = _decorator

@ccclass('startPanel')
export class startPanel extends Component {
  start() {
    const satrtBtn: Node = this.node.getChildByName('Button')

    satrtBtn.on(Node.EventType.TOUCH_END, (evt) => {
      clientEvent.dispatchEvent(Consts.GameEvent.GS_START)
      uiManager.instance.hideDialog('GUI', 'startPanel')
    })
  }

  update(deltaTime: number) {}
}
