import { _decorator, Component, Node, Vec3 } from 'cc'
const { ccclass, property } = _decorator

@ccclass('camareManager')
export class camareManager extends Component {
  private ndTarget: Node = null! //当前的跟随的目标节点
  private cameraType: number = 0 //摄像机类型 ——gameConstants.CAMERA_TYPE_LIST
  private position: Vec3 = new Vec3() //当前位置坐标
  private rotation: Vec3 = new Vec3() //当前偏移角度坐标

  static instance: camareManager | null = null

  onLoad() {
    // this._node = this.node
    if (camareManager.instance === null) {
      camareManager.instance = this
    } else {
      this.destroy()
      return
    }
  }

  changeCameraTarget(parentNode) {
    // this.ndTarget = parentNode
    this.node.parent = parentNode
  }

  changeCameraPosition(pos: Vec3) {
    this.node.setPosition(pos)
    // this.position = pos
  }

  changeCameraRotation(euler: Vec3) {
    this.node.setRotationFromEuler(euler)
    // this.rotation = euler
  }

  update(dt) {}
}
