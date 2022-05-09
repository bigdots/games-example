import { instantiate, Prefab, resources, _decorator } from 'cc'
const { ccclass } = _decorator

@ccclass('uiManager')
export class uiManager {
  private static _instance: uiManager

  static get instance() {
    if (!this._instance) {
      this._instance = new uiManager()
    }
    return this._instance
  }

  // 显示界面
  showUI(parent, uiName) {
    resources.load('UI/' + uiName, (err, prefab: Prefab) => {
      const node = instantiate(prefab)
      node.setParent(parent)
      node.addComponent(uiName + 'Control')
    })
  }
  // 添加事件
}
