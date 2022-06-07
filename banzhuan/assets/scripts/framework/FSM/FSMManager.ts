import { _decorator } from 'cc'
import { FSMState } from './FSMState'
const { ccclass } = _decorator

@ccclass('FSMManager')
export class FSMManager {
  // 状态列表
  stateList: FSMState[] = []
  // 当前状态iD
  currentStateID: number = -1

  // 改变状态
  changeState(stateID: number) {
    this.currentStateID = stateID

    this.stateList[this.currentStateID].onEnter()
  }

  // 更新调用
  onUpdate() {
    if (this.currentStateID !== -1) {
      this.stateList[this.currentStateID].onUpdate()
    }
  }
}
