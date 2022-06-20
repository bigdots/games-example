import { _decorator, Component, Node, Material, CCInteger } from 'cc'
import { mapConstants } from './mapConstants'
const { ccclass, property } = _decorator

@ccclass('mapEditor')
export class mapEditor extends Component {
  @property(Material)
  matNumList: Array<Material> = [] //数字的材质列表 0-9

  @property({ displayName: ' ' })
  test1: string = mapConstants.MAPLOADER_STRING.SAVE_MAP_DATA
  @property({
    type: CCInteger,
    min: 1,
    step: 1,
    displayName: mapConstants.MAPLOADER_STRING.SAVE_MAP_NUM,
  })
  mapNameSave: number = 1

  _isFinish1 = true
  @property({ displayName: mapConstants.MAPLOADER_STRING.SAVE_MAP_CHECK })
  get getMapData() {
    return !this._isFinish1
  }
  set getMapData(v) {
    if (!this._isFinish1) {
      return
    }
    console.log(mapConstants.COMMON.START_CALCULATE)
    this._isFinish1 = false

    this._saveMap()
  }
  @property({ displayName: ' ' })
  test2: string = mapConstants.MAPLOADER_STRING.LOAD_MAP_DATA
  @property({
    type: CCInteger,
    min: 1,
    step: 1,
    displayName: mapConstants.MAPLOADER_STRING.LOAD_MAP_NUM,
  })
  mapNameLoad: number = 1

  _isFinish2 = true
  @property({ displayName: mapConstants.MAPLOADER_STRING.LOAD_MAP_CHECK })
  get setMapData() {
    return !this._isFinish2
  }
  set setMapData(v) {
    if (!this._isFinish2) {
      return
    }
    console.log(mapConstants.COMMON.START_CALCULATE)
    this._isFinish2 = false

    this._loadMap()
  }

  @property({ displayName: ' ' })
  test0: string = mapConstants.MAPLOADER_STRING.AMEND_MAPITEM_NAME1
  _isFinish0 = true
  @property({ displayName: mapConstants.MAPLOADER_STRING.AMEND_MAPITEM_NAME2 })
  get changeNdMapItemName() {
    return !this._isFinish0
  }
  set changeNdMapItemName(v) {
    if (!this._isFinish0) {
      return
    }
    console.log(mapConstants.MAPLOADER_STRING.AMEND_MAPITEM_NAME2)
    this._isFinish0 = false

    this._changendMapItemName()
  }

  private _changendMapItemName() {}

  private _saveMap() {}

  private _loadMap() {}
}
