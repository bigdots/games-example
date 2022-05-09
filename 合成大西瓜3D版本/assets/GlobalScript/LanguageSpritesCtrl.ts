import { _decorator, Component, Node, Sprite, SpriteFrame } from 'cc';
import { Config } from './Config';
const { ccclass, property } = _decorator;

@ccclass('SpriteParam')
class SpriteParam {
  @property(Sprite)
  public sprite: Sprite = null;

  @property([SpriteFrame])
  public frames: Array<SpriteFrame> = [];
}

@ccclass('LanguageSpritesCtrl')
export class LanguageSpritesCtrl extends Component {

  @property([SpriteParam])
  public params: Array<SpriteParam> = [];

  start() {
    for (let i = 0; i < this.params.length; i++) {
      let param = this.params[i];
      param.sprite.spriteFrame = param.frames[Config.language];
    }
  }

  // update (deltaTime: number) {
  //     // Your update function goes here.
  // }
}
