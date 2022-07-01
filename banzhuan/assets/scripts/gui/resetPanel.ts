import { _decorator, Component, Node, director } from 'cc'
import { clientEvent } from '../framework/clientEvent'
import { uiManager } from '../framework/uiManager'
import { Consts } from '../game/consts'
const { ccclass, property } = _decorator

@ccclass('resetPanel')
export class resetPanel extends Component {
  start() {
    const resetBtn: Node = this.node.getChildByName('Button')

    resetBtn.on(Node.EventType.TOUCH_END, (evt) => {
      clientEvent.dispatchEvent(Consts.GameEvent.GS_INIT)
      uiManager.instance.hideDialog('GUI', 'resetPanel')
    })
  }

  update(deltaTime: number) {}
}
