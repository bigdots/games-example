import { _decorator, Component, Node, find, LabelComponent } from 'cc'
import { clientEvent } from '../framework/clientEvent'
import { localStorageManager } from '../framework/localStorageManager'
import { uiManager } from '../framework/uiManager'
import { Consts } from '../game/consts'
const { ccclass, property } = _decorator

@ccclass('levelPanel')
export class levelPanel extends Component {
  start() {}

  onEnable() {
    const label: Node = find('Button/Label', this.node)
    const level = localStorageManager.instance.getLevel()
    if (level) {
      label.getComponent(LabelComponent).string = `关卡：${level}`
    }
  }

  update(deltaTime: number) {}
}
