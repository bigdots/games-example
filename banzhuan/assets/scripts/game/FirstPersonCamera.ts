import { _decorator, Component, EventMouse, Vec3, input, Input } from 'cc'
import { Quaternion } from './Quaternion'
const { ccclass, property } = _decorator

/**
 * 第一人称视角相机
 */
@ccclass('FirstPersonCamera')
export class FirstPersonCamera extends Component {
  @property
  xAxisMin: number = 140
  @property
  xAxisMax: number = 210

  private angleX: number = 0
  private angleY: number = 0

  start() {
    console.error(138)
    input.on(Input.EventType.MOUSE_MOVE, this.MouseMove, this)
  }

  /**
   * 根据鼠标偏移量，结合欧拉角进行旋转
   * @param e
   */
  private MouseMove(e: EventMouse) {
    console.error(975)
    this.angleX += -e.movementX
    this.angleY += -e.movementY
    console.log(this.angleY)
    this.angleY = this.Clamp(this.angleY, this.xAxisMin, this.xAxisMax)
    //this.node.rotation=Quat.fromEuler(new Quat(),this.angleY,this.angleX,0);
    //欧拉角转换为四元数
    this.node.rotation = Quaternion.GetQuatFromAngle(
      new Vec3(this.angleY, this.angleX, 0)
    )

    return
  }

  private Clamp(val: number, min: number, max: number): number {
    if (val <= min) val = min
    if (val >= max) val = max
    return val
  }
}
