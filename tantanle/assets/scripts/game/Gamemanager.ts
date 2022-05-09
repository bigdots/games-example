import { _decorator, Component, NodePool } from 'cc'
import { FSMManager } from '../framework/FSM/FSMManager'
import { FSMState } from '../framework/FSM/FSMState'
import { End } from './End'
import { Playing } from './Playing'
import { Ready } from './Ready'
const { ccclass, property } = _decorator

enum gameState {
  Game_Ready,
  Game_Palying,
  Game_End,
}

@ccclass('Gamemanager')
export class Gamemanager extends Component {
  private gameFsmManager: FSMManager

  start() {
    // 初始化游戏状态机
    this.gameFsmManager = new FSMManager()
    const ready = new Ready(gameState.Game_Ready, this, this.gameFsmManager)
    const playing = new Playing(
      gameState.Game_Palying,
      this,
      this.gameFsmManager
    )
    const end = new End(gameState.Game_End, this, this.gameFsmManager)
    this.gameFsmManager.stateList = [ready, playing, end]
    this.gameFsmManager.changeState(gameState.Game_Ready)

    // 监听开始事件

    // 监听结束事件
  }

  onUpdate() {
    this.gameFsmManager.onUpdate()
  }
}
