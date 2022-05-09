import { _decorator } from 'cc'
import { FSMState } from '../framework/FSM/FSMState'

const { ccclass } = _decorator

enum gameState {
  Game_Ready,
  Game_Palying,
  Game_End,
}

@ccclass('Playing')
export class Playing extends FSMState {
  onEnter(): void {
    // 让屏幕监听触摸事件
  }

  onUpdate(): void {
    // 小球每隔一个间距就向上运动一段距离
  }
}
