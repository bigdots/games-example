
import { _decorator, Component, Node, Label } from 'cc';
import { CLIP } from '../GlobalScript/AudioCtrl';
import { AudioHelper } from '../GlobalScript/AudioHelper';
import { NCKeys, NotificationCenter } from '../GlobalScript/NotificationCenter';
const { ccclass, property } = _decorator;

@ccclass('GameOVerLauer2')
export class GameOVerLauer2 extends Component {
  @property(Label)
  public scoreLabel!: Label;

  init(score: number) {
    this.scoreLabel.string = `${score}`;
  }

  onReplayButtonClick() {
    AudioHelper.play('audio', CLIP.BUTTON);
    NotificationCenter.postNotice(NCKeys.RESET_GAME, null);
    this.node.destroy();
  }

  onRebornButtonClick() {
    AudioHelper.play('audio', CLIP.BUTTON);
    NotificationCenter.postNotice(NCKeys.REBORN_GAME, null);
    this.node.destroy();
  }
}

/**
 * [1] Class member could be defined like this.
 * [2] Use `property` decorator if your want the member to be serializable.
 * [3] Your initialization goes here.
 * [4] Your update function goes here.
 *
 * Learn more about scripting: https://docs.cocos.com/creator/3.0/manual/en/scripting/
 * Learn more about CCClass: https://docs.cocos.com/creator/3.0/manual/en/scripting/ccclass.html
 * Learn more about life-cycle callbacks: https://docs.cocos.com/creator/3.0/manual/en/scripting/life-cycle-callbacks.html
 */
