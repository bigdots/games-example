import {
  _decorator,
  Node,
  find,
  isValid,
  instantiate,
  Prefab,
  resources,
} from 'cc'
import { ccPromise } from './ccPromise'
import { poolManager } from './poolManager'
import { ResManager } from './ResManager'

const { ccclass, property } = _decorator

const SHOW_STR_INTERVAL_TIME = 800

@ccclass('uiManager')
export class uiManager {
  // UI界面池，调用过的界面都会被缓存起来，因为每类UI基本不会重复创建，所以不用官方节点池
  private _dictSharedPanel: any = {}
  // 是否正在加载UI界面
  private _dictLoading: any = {}

  private static _instance: uiManager

  public static get instance() {
    if (!this._instance) {
      this._instance = new uiManager()
    }

    return this._instance
  }

  /**
   * 检查当前界面是否正在展示
   * @param panelPath
   */
  public isDialogVisible(panelPath: string) {
    if (!this._dictSharedPanel.hasOwnProperty(panelPath)) {
      return false
    }

    let panel = this._dictSharedPanel[panelPath]
    // isValid 检查该对象是否不为 null 并且尚未销毁。
    return isValid(panel) && panel.active && panel.parent
  }

  /**
   * 显示界面
   * @param {String} panelPath
   * @param {Array} args
   * @param {Function} cb 回调函数，创建完毕后回调
   */
  public async showDialog(abName: string, url: string, cb?: Function) {
    const panelPath = `${abName}/${url}`
    if (this._dictLoading[panelPath]) {
      //如果正在创建
      return
    }

    let panel: Node | null = null
    // 如果已经有了，则从缓存中取
    if (this._dictSharedPanel.hasOwnProperty(panelPath)) {
      panel = this._dictSharedPanel[panelPath]
      // 添加到canvas
      this.addToCanvas(panel)
    } else {
      // 如果是新界面，则重新加载
      this._dictLoading[panelPath] = true

      const panelPrefab = await ccPromise.load(panelPath, Prefab)
      panel = instantiate(panelPrefab) as unknown as Node
      panel.setPosition(0, 0, 0)

      this._dictLoading[panelPath] = false
      this._dictSharedPanel[panelPath] = panel
      // 添加到canvas
      this.addToCanvas(panel)
    }
  }

  public addToCanvas(panel: Node) {
    if (!isValid(panel)) {
      return
    }
    panel.parent = find('Canvas')
    panel.active = true
  }

  /**
   * 隐藏界面
   * @param {String} panelPath
   * @param {fn} callback
   */
  public hideDialog(abName: string, url: string, callback?: Function) {
    const panelPath = `${abName}/${url}`
    if (!this._dictSharedPanel.hasOwnProperty(panelPath)) {
      return
    }

    let panel = this._dictSharedPanel[panelPath]

    if (panel && isValid(panel)) {
      panel.parent = null // 回收节点，但不是销毁
    }

    if (callback && typeof callback === 'function') {
      callback()
    }

    this._dictLoading[panelPath] = false
  }
}
