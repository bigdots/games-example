import { _decorator, Component, Node, Material, Vec3, MeshRenderer } from 'cc'
import { clientEvent } from '../framework/clientEvent'
import { poolManager } from '../framework/poolManager'
import { ResManager } from '../framework/ResManager'
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

  private _currentcolor: number = Consts.COLOR.GREEN //默认绿色

  private _car: Node | null = null

  private _brickColor: number = Consts.COLOR.GREEN

  private _birckNums: number = 0

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
    const bricks = this._car.children

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

  public async loadCar() {
    while (this.node.children.length > 0) {
      poolManager.instance.putNode(this.node.children[0])
    }
    const carPreab: any = await ResManager.instance.load('prefab', 'car')
    this._car = poolManager.instance.getNode(carPreab, this.node)

    this._car.setPosition(new Vec3(0, 0.3, 0.8))
  }

  private async _changeBricks(type) {
    if (this._currentcolor === type) {
      // 增加砖块
      this._birckNums = this._birckNums + 1
      let brickPrefab = null
      switch (this._currentcolor) {
        case Consts.COLOR.GREEN:
          brickPrefab = await ResManager.instance.load('prefab', 'brickgreen')
          break
        case Consts.COLOR.RED:
          brickPrefab = await ResManager.instance.load('prefab', 'brickgred')
          break
        case Consts.COLOR.YELLOW:
          brickPrefab = await ResManager.instance.load('prefab', 'brickyellow')
          break
        default:
          console.error('找到不到该类型的砖块', type, this._currentcolor)
      }

      const brick = poolManager.instance.getNode(brickPrefab, this._car)
      // brick.parent = this._car
      const scale = brick.getScale()
      brick.setPosition(0, this._birckNums * scale.y, 0)
    } else {
      // 减少砖块
      this._birckNums = this._birckNums - 1
      if (this._birckNums < 0) {
        console.error('gameover')
        clientEvent.dispatchEvent(Consts.GameEvent.GAME_OVER)
        return
      }
      this._car.children[this._car.children.length - 1].destroy()
    }
  }

  update(deltaTime: number) {}
}
