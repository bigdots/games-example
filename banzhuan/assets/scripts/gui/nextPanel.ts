import { _decorator, Component, Node } from 'cc'
import { clientEvent } from '../framework/clientEvent'
import { uiManager } from '../framework/uiManager'
import { Consts } from '../game/consts'
const { ccclass, property } = _decorator

@ccclass('nextPanel')
export class nextPanel extends Component {
  start() {
    console.error(this.node)
    const btn: Node = this.node.getChildByName('Button')

    btn.on(Node.EventType.TOUCH_END, (evt) => {
      clientEvent.dispatchEvent(Consts.GameEvent.GS_INIT)
      uiManager.instance.hideDialog('GUI', 'nextPanel')
    })
  }

  update(deltaTime: number) {}
}
