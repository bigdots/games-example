import { _decorator, Component, Node, Quat, Vec3 } from 'cc'
import { Quaternion } from './Quaternion'
const { ccclass, property } = _decorator

/**
 * 围绕着指定物体旋转相机
 */
@ccclass('CameraRotationAround')
export class CameraRotationAround extends Component {
  @property(Node)
  target: Node = null

  private _angle: number = 0

  update(dt: number) {
    //超级简化版
    Quaternion.RotationAroundNode(this.node, this.target.position, Vec3.UP, 0.5)

    this.node.lookAt(this.target.position)
  }
}
