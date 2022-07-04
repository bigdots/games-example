import { _decorator, Component, Vec3, Prefab, resources, Asset } from 'cc'
import { clientEvent } from '../framework/clientEvent'
import { poolManager } from '../framework/poolManager'
import { ResManager } from '../framework/ResManager'
import { Consts } from './consts'
const { ccclass, property } = _decorator
// import CSV from 'comma-separated-values'
import Papa from 'papaparse'
import { ccPromise } from '../framework/ccPromise'
import { GameManager } from './gameManager'

@ccclass('mapManager')
export class mapManager extends Component {
  static instance: mapManager | null = null

  onLoad() {
    if (mapManager.instance === null) {
      mapManager.instance = this
    } else {
      this.destroy()
      return
    }
  }

  public async loadMap(level) {
    // 回收节点
    while (this.node.children.length > 0) {
      poolManager.instance.putNode(this.node.children[0])
    }

    const mapdata: any = await ResManager.instance.load(
      `datas/maps/map${level}`,
      null
    )

    const res = Papa.parse(mapdata.text, {
      header: true,
    })

    const mapItems = res.data

    for (let i = 0; i < mapItems.length; i++) {
      const item = mapItems[i]
      const name: number = item.name

      // console.error('name', item)

      const ndItemPrefab: any = await ResManager.instance.load(
        `prefab/${item.name}`,
        Prefab
      )

      const ndItem = poolManager.instance.getNode(ndItemPrefab, this.node)
      ndItem.setPosition(this._stringToVec3(item.position))
      ndItem.setScale(this._stringToVec3(item.scale))
      ndItem.setRotationFromEuler(this._stringToVec3(item.euler))
      console.error(ndItem.name)

      // 将所有砖块激活
      ndItem.children.forEach((item, index) => {
        item.active = true
      })
    }
  }

  private _stringToVec3(str) {
    const p = str.split(',')
    return new Vec3(p[0], p[1], p[2])
  }

  update() {}
}
