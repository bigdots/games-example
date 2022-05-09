import {
  _decorator,
  Component,
  Prefab,
  instantiate,
  Node,
  CCInteger,
  Vec3,
  resources,
} from 'cc'
import { resourceUtil } from '../framework/resourceUtil'
import { PlayerController } from './PlayerController'
const { ccclass, property } = _decorator

// 赛道格子类型，坑（BT_NONE）或者实路（BT_STONE）
enum BlockType {
  BT_NONE,
  BT_STONE,
}

enum GsState {
  gs_init,
  gs_palying,
  gs_end,
}

@ccclass('GameManager')
export class GameManager extends Component {
  private roadLen: number = 80

  @property(Number)
  speed: 0

  @property(Node)
  mapNode: Node

  @property(Node)
  Palyer: Node

  start() {
    this._initGame()
  }

  _initGame() {
    // 初始化玩家

    // 初始化道路

    this._loadMap()
  }

  private _loadMap() {
    this.mapNode.removeAllChildren()

    // 加载 Prefab
    resources.load('prefabs/road', Prefab, (err: any, roadPre: Prefab) => {
      this._genRoad(roadPre)
    })
  }

  private _genRoad(roadPre) {
    for (let i = 0; i < this.roadLen; i++) {
      const newNode = instantiate(roadPre)
      this.mapNode.addChild(newNode)
      newNode.setPosition(i, 0, 0)
    }
  }

  update(dt) {
    if (this.Palyer) {
      const p = this.Palyer.getPosition()
      const x = p.x + this.speed * dt
      this.Palyer.setPosition(x, 0, 0)
    }
  }

  // // 赛道预制
  // @property({ type: Prefab })
  // public cubePrfb: Prefab | null = null
  // // 赛道长度
  // @property
  // public roadLength = 50
  // private _road: BlockType[] = []
  // // private curState: GsState
  // @property({ type: PlayerController })
  // playerCtrl: PlayerController | null = null
  // @property({ type: Node })
  // startMenu: Node | null = null
  // start() {
  //   this.curState = GsState.gs_init
  //   this.playerCtrl?.node.on('JumpEnd', this.onPlayerJumpEnd, this)
  // }
  // onPlayerJumpEnd(moveIndex: number) {
  //   if (moveIndex < this.roadLength) {
  //     // 跳到了坑上
  //     if (this._road[moveIndex] == BlockType.BT_NONE) {
  //       this.curState = GsState.gs_init
  //     }
  //   } else {
  //     // 跳过了最大长度
  //     this.curState = GsState.gs_init
  //   }
  // }
  // init() {
  //   if (this.startMenu) {
  //     this.startMenu.active = true
  //   }
  //   // 生成赛道
  //   this.generateRoad()
  //   if (this.playerCtrl) {
  //     // 禁止接收用户操作人物移动指令
  //     this.playerCtrl.setInputActive(false)
  //     // 重置人物位置
  //     console.error(2222222222)
  //     this.playerCtrl.node.setPosition(new Vec3())
  //     this.playerCtrl.reset()
  //   }
  //   console.error(this.playerCtrl.node)
  // }
  // set curState(value: GsState) {
  //   switch (value) {
  //     case GsState.gs_init:
  //       this.init()
  //       break
  //     case GsState.gs_palying:
  //       if (this.startMenu) {
  //         this.startMenu.active = false
  //       }
  //       // 设置 active 为 true 时会直接开始监听鼠标事件，此时鼠标抬起事件还未派发
  //       // 会出现的现象就是，游戏开始的瞬间人物已经开始移动
  //       // 因此，这里需要做延迟处理
  //       setTimeout(() => {
  //         if (this.playerCtrl) {
  //           this.playerCtrl.setInputActive(true)
  //         }
  //       }, 0.1)
  //       break
  //     case GsState.gs_end:
  //       break
  //   }
  // }
  // onStartButtonClicked() {
  //   this.curState = GsState.gs_palying
  // }
  // generateRoad() {
  //   // 防止游戏重新开始时，赛道还是旧的赛道
  //   // 因此，需要移除旧赛道，清除旧赛道数据
  //   console.error(this.node.children)
  //   this.node.removeAllChildren()
  //   console.error(this.node.children)
  //   this._road = []
  //   // 确保游戏运行时，人物一定站在实路上
  //   this._road.push(BlockType.BT_STONE)
  //   // 确定好每一格赛道类型
  //   for (let i = 1; i < this.roadLength; i++) {
  //     // 如果上一格赛道是坑，那么这一格一定不能为坑
  //     if (this._road[i - 1] === BlockType.BT_NONE) {
  //       this._road.push(BlockType.BT_STONE)
  //     } else {
  //       this._road.push(Math.floor(Math.random() * 2))
  //     }
  //   }
  //   // 根据赛道类型生成赛道
  //   for (let j = 0; j < this._road.length; j++) {
  //     let block: Node = this.spawnBlockByType(this._road[j])
  //     // 判断是否生成了道路，因为 spawnBlockByType 有可能返回坑（值为 null）
  //     if (block) {
  //       this.node.addChild(block)
  //       block.setPosition(j, -1.5, 0)
  //     }
  //   }
  // }
  // spawnBlockByType(type: BlockType) {
  //   if (!this.cubePrfb) {
  //     return null
  //   }
  //   let block: Node | null = null
  //   // 赛道类型为实路才生成
  //   switch (type) {
  //     case BlockType.BT_STONE:
  //       block = instantiate(this.cubePrfb)
  //       break
  //   }
  //   return block
  // }
  // // update (deltaTime: number) {
  // //     // Your update function goes here.
  // // }
}
