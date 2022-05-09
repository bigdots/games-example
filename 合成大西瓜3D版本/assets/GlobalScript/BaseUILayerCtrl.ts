import { _decorator, Component, Node, Animation, CCString, CCObject, log } from "cc";
import { NCKeys, NotificationCenter } from "./NotificationCenter";
const { ccclass, property } = _decorator;

@ccclass("BaseUILayerCtrl")
export class BaseUILayerCtrl extends Component {

  @property({ type: CCString })
  public inActionName: string = '';

  @property({ type: CCString })
  public outActionName: string = '';

  @property({ type: Animation })
  public animation: Animation = null;

  start() {
    // Your initialization goes here.
  }

  onEnable() {
    this.playInAction();
  }

  playInAction() {
    this.animation.play(this.inActionName);
  }

  onInActionFinish() {
    log('InActionFinish');
    NotificationCenter.postNotice(NCKeys.PAGE_SHOW, { name: this.node.name, ctrl: this });
  }

  playOutAction() {
    this.animation.play(this.outActionName);
  }

  onOutActionFinish() {
    NotificationCenter.postNotice(NCKeys.PAGE_HIDE, { name: this.node.name, ctrl: this });
    this.node.destroy();
  }


  // update (deltaTime: number) {
  //     // Your update function goes here.
  // }
}
