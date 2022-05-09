import { _decorator } from 'cc'
import { uiControlBase } from './uiControlBase'
const { ccclass } = _decorator

@ccclass('playerCtrl')
export class playerCtrl extends uiControlBase {
  onLoad() {
    super.onLoad()
    console.log(this.vModel)
    this.vModel['Button'].on('touch-start', this.ontouchstart)
  }

  ontouchstart(e) {
    console.log('MVC')
  }
}
