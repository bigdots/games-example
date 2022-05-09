import { _decorator, Component, Node } from 'cc'
import { FSMManager } from './FSMManager'
const { ccclass } = _decorator

@ccclass('FSMState')
export class FSMState {
  // 当前状态的id
  stateID: number
  // 状态拥有者
  Owner: Component

  // 所属状态机
  fsmManager: FSMManager

  constructor(stateID: number, Owner: Component, fsmManager: FSMManager) {
    this.stateID = stateID
    this.Owner = Owner
    this.fsmManager = fsmManager
  }

  // 进入状态，调用一次
  onEnter() {}

  // 状态更新中,每一帧调用一次
  onUpdate() {}
}
