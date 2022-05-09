import { _decorator, Component, Node, Tween, Vec3 } from 'cc';
import { CLIP } from '../../GlobalScript/AudioCtrl';
import { AudioHelper } from '../../GlobalScript/AudioHelper';
import { NCKeys, NotificationCenter } from '../../GlobalScript/NotificationCenter';
const { ccclass, property } = _decorator;

@ccclass('RefreshFruitNodeCtrl')
export class RefreshFruitNodeCtrl extends Component {

  state: 'hide' | 'show' = 'hide';

  @property(Node)
  public toolNode: Node = null;

  start() {
    // Your initialization goes here.
  }

  onShowButtonClick() {
    AudioHelper.play('audio', CLIP.BUTTON);
    Tween.stopAllByTarget(this.toolNode);
    if (this.state == 'hide') {
      this.state = 'show'
      let endPos = new Vec3(-52, -122, 0);
      let tween = new Tween(this.toolNode);
      tween
        .to(0.1, { position: endPos })
        .start();
    }
    else {
      this.state = 'hide';
      let endPos = new Vec3(260, -122, 0);
      let tween = new Tween(this.toolNode);
      tween
        .to(0.1, { position: endPos })
        .start();
    }
  }

  onFruitButtonClick(event, custom) {
    AudioHelper.play('audio', CLIP.BUTTON);
    let fruitId = parseInt(custom);
    NotificationCenter.postNotice(NCKeys.REFRESH_CUR_FRUIT, fruitId);
  }

}
