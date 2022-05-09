import { _decorator, Component, Label } from 'cc';
import { CLIP } from '../../../GlobalScript/AudioCtrl';
import { AudioHelper } from '../../../GlobalScript/AudioHelper';
import { NCKeys, NotificationCenter } from '../../../GlobalScript/NotificationCenter';


const { ccclass, property } = _decorator;

@ccclass('GameOverLayerCtrl')
export class GameOverLayerCtrl extends Component {

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
