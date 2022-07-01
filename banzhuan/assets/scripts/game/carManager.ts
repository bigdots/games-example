import {
  _decorator,
  Component,
  Node,
  Material,
  Vec3,
  MeshRenderer,
  RigidBody,
  resources,
  Prefab,
} from 'cc'
import { clientEvent } from '../framework/clientEvent'
import { poolManager } from '../framework/poolManager'
import { ccPromise } from '../framework/ccPromise'
import { Consts } from './consts'
const { ccclass, property } = _decorator

@ccclass('carManager')
export class carManager extends Component {
  @property(Material)
  public matRed: Material = null! //红色皮肤

  @property(Material)
  public matGreen: Material = null! //绿色皮肤

  @property(Material)
  public matYellow: Material = null! //黄色皮肤

  @property(Node)
  public brickParent: Node = null // 木板父节点

  private _currentcolor: number = Consts.COLOR.GREEN //默认绿色

  public brickNum: number = 0 // 界面上的砖块数

  private _initBricks: number = 10 // 初始砖块数

  start() {}

  static instance: carManager | null = null

  onLoad() {
    if (!carManager.instance) {
      carManager.instance = this
    } else {
      this.destroy()
    }

    clientEvent.on(Consts.GameEvent.CHANGE_BRICKS_NUM, this._changeBricks, this)
    clientEvent.on(
      Consts.GameEvent.CHANGE_PLAYER_COLOR,
      this._changeBrickColor,
      this
    )
  }

  private _changeMaterial(mat) {
    const bricks = this.brickParent.children

    for (let i = 0; i < bricks.length; i++) {
      const brick = bricks[i]
      brick.getComponent(MeshRenderer).setMaterial(mat, 0)
    }
  }

  private _changeBrickColor(type) {
    switch (type) {
      case Consts.COLOR.GREEN:
        this._changeMaterial(this.matGreen)
        break
      case Consts.COLOR.RED:
        this._changeMaterial(this.matRed)
        break
      case Consts.COLOR.YELLOW:
        this._changeMaterial(this.matYellow)
        break
      default:
        console.error('没有该皮肤')
    }
    this._currentcolor = type
  }

  arrived() {
    const rigidBody = this.node.addComponent(RigidBody)

    rigidBody.applyForce(new Vec3(0, 0, 500))
  }

  public async loadCar() {
    while (this.node.children.length > 0) {
      poolManager.instance.putNode(this.node.children[0])
    }

    const carPreab: any = await ccPromise.load('prefab/car', Prefab)
    const car = poolManager.instance.getNode(carPreab, this.node)

    car.setPosition(new Vec3(0, 0, 0))

    this._createBricks(this._initBricks) //一开始先创建5个砖块
  }

  private async _changeBricks(type) {
    if (this._currentcolor === type) {
      // 增加砖块
      this._createBricks(1)
    } else {
      // 减少砖块
      this._removeBricks(1)
    }
  }

  private _removeBricks(num) {
    if (!this.brickParent) {
      return
    }

    while (num > 0) {
      this.brickNum = this.brickNum - 1
      if (this.brickNum < 0) {
        console.error('gameover')
        clientEvent.dispatchEvent(Consts.GameEvent.GAME_OVER)
        return
      }
      this.brickParent.children[this.brickParent.children.length - 1].destroy()
      num = num - 1
    }
  }

  private async _createBricks(num) {
    if (!this.brickParent) {
      return
    }

    // 更新砖块
    let brickPrefab = null
    switch (this._currentcolor) {
      case Consts.COLOR.GREEN:
        brickPrefab = await ccPromise.load('prefab/brickgreen')
        break
      case Consts.COLOR.RED:
        brickPrefab = await ccPromise.load('prefab/brickgred')
        break
      case Consts.COLOR.YELLOW:
        brickPrefab = await ccPromise.load('prefab/brickyellow')
        break
      default:
        console.error('找到不到该类型的砖块', this._currentcolor)
    }

    while (num > 0) {
      const brick = poolManager.instance.getNode(brickPrefab, this.brickParent)
      const scale = brick.getScale()

      const y = (this.brickNum * scale.y).toFixed(3)
      console.error(0, this.brickNum * scale.y, 0)
      brick.setPosition(0, this.brickNum * scale.y, 0)
      this.brickNum = this.brickNum + 1

      num = num - 1
    }
  }

  async update(deltaTime: number) {}
}
