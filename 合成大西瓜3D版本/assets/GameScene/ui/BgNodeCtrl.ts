import { _decorator, Component, Node, view, UITransform, Vec3 } from 'cc';
const { ccclass, property } = _decorator;

@ccclass('BgNodeCtrl')
export class BgNodeCtrl extends Component {
  /* class member could be defined like this */
  // dummy = '';

  /* use `property` decorator if your want the member to be serializable */
  // @property
  // serializableDummy = 0;

  start() {
    let visibleSize = view.getVisibleSize();
    let scale = visibleSize.height / this.node.getComponent(UITransform).height
    if (scale > 1) {
      this.node.scale = new Vec3(scale, scale, scale);
    }
  }

  // update (deltaTime: number) {
  //     // Your update function goes here.
  // }
}
