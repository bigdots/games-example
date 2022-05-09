import { _decorator, Component, Node, UITransform, CCFloat, Size, view, v3 } from 'cc';
const { ccclass, property } = _decorator;

@ccclass('LayoutForTopToolAndBanner')
export class LayoutForTopToolAndBanner extends Component {

  @property(CCFloat)
  public topOffset: number = 88;

  @property(CCFloat)
  public bottomOffset: number = 160;

  start() {
    let visibleSize: Size = view.getVisibleSize();
    let scale = 1;
    if (visibleSize.height - this.topOffset - this.bottomOffset < this.node.getComponent(UITransform).height) {
      scale = (visibleSize.height - this.topOffset - this.bottomOffset) / this.node.getComponent(UITransform).height;
    }
    this.node.scale = v3(scale, scale, scale);
    let oldPos = v3(this.node.position);
    oldPos.y = visibleSize.height / 2 - this.topOffset - this.node.getComponent(UITransform).height * (1 - this.node.getComponent(UITransform).anchorY) * scale;
    this.node.position = oldPos;
  }

  // update (deltaTime: number) {
  //     // Your update function goes here.
  // }
}
