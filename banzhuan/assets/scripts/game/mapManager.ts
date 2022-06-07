import { _decorator, Component, Node, instantiate, Vec3 } from 'cc'
import { clientEvent } from '../framework/clientEvent'
import { csvManager } from '../framework/csvManager'
import { poolManager } from '../framework/poolManager'
import { ResManager } from '../framework/ResManager'
const { ccclass, property } = _decorator

@ccclass('mapManager')
export class mapManager extends Component {
  onLoad() {
    clientEvent.on(
      'gameinit',
      () => {
        console.log('createmap')
        this._loadMap()
      },
      this.node
    )
  }

  private _loadMap() {
    // 回收节点
    while (this.node.children.length > 0) {
      poolManager.instance.putNode(this.node.children[0])
    }

    const map1 = ResManager.instance.getAsset('datas', 'maps/map1')
    // console.log(map1)
    csvManager.instance.addTable('map1', map1.text)
    const mapItems = csvManager.instance.getTableArr('map1')
    for (let i = 0; i < mapItems.length; i++) {
      const item = mapItems[i]
      const name: number = item.name
      if (name < 2000 && name > 1000) {
        this._loadRoad(item)
      }

      if (name < 3000 && name > 2000) {
        this._loadBricks(item)
      }
    }
  }

  private _stringToVec3(str) {
    const p = str.split(',')
    return new Vec3(p[0], p[1], p[2])
  }

  private _loadRoad(data) {
    const roadPreab = ResManager.instance.getAsset('map', 'road/road')
    const road = poolManager.instance.getNode(roadPreab, this.node)
    road.setPosition(this._stringToVec3(data.position))
    road.setScale(this._stringToVec3(data.scale))
    road.setRotationFromEuler(this._stringToVec3(data.euler))
  }

  private _loadBricks(data) {
    let brickPreab = null
    if (data.name === '2001') {
      brickPreab = ResManager.instance.getAsset('map', 'brick/bricksblue')
    }
    if (data.name === '2002') {
      brickPreab = ResManager.instance.getAsset('map', 'brick/bricksred')
    }
    if (data.name === '2003') {
      brickPreab = ResManager.instance.getAsset('map', 'brick/bricksyellow')
    }
    if (!brickPreab) {
      return
    }

    const brick = poolManager.instance.getNode(brickPreab, this.node)
    brick.setPosition(this._stringToVec3(data.position))
    brick.setScale(this._stringToVec3(data.scale))
    brick.setRotationFromEuler(this._stringToVec3(data.euler))
  }
}
