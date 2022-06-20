import { _decorator, Component, Vec3, Prefab } from 'cc'
import { clientEvent } from '../framework/clientEvent'
import { poolManager } from '../framework/poolManager'
import { ResManager } from '../framework/ResManager'
import { Consts } from './consts'
const { ccclass, property } = _decorator
import CSV from 'comma-separated-values'

@ccclass('mapManager')
export class mapManager extends Component {
  static instance: mapManager | null = null
  init() {
    this._loadMap()
  }

  onLoad() {
    if (mapManager.instance === null) {
      mapManager.instance = this
    } else {
      this.destroy()
      return
    }

    clientEvent.on(
      Consts.GameEvent.GS_INIT,
      this._loadMap.bind(this),
      this.node
    )
  }

  private async _loadMap() {
    // 回收节点
    while (this.node.children.length > 0) {
      poolManager.instance.putNode(this.node.children[0])
    }

    const mapdata: any = await ResManager.instance.load('datas', 'maps/map1')

    const mapItems = new CSV(mapdata.text, {
      header: true,
      cellDelimiter: ';',
    }).parse()

    for (let i = 0; i < mapItems.length; i++) {
      const item = mapItems[i]
      const name: number = item.name

      const ndItemPrefab = (await ResManager.instance.load(
        'prefab',
        item.name,
        Prefab
      )) as unknown as Prefab

      const ndItem = poolManager.instance.getNode(ndItemPrefab, this.node)
      ndItem.setPosition(this._stringToVec3(item.position))
      ndItem.setScale(this._stringToVec3(item.scale))
      ndItem.setRotationFromEuler(this._stringToVec3(item.euler))
    }
  }

  private _stringToVec3(str) {
    const p = str.split(',')
    return new Vec3(p[0], p[1], p[2])
  }
}
