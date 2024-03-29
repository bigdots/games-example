import {
  _decorator,
  Component,
  Vec3,
  input,
  Input,
  EventMouse,
  Animation,
} from 'cc'
const { ccclass, property } = _decorator

@ccclass('PlayerController')
export class PlayerController extends Component {
  /* class member could be defined like this */
  // dummy = '';

  /* use `property` decorator if your want the member to be serializable */
  // @property
  // serializableDummy = 0;

  // for fake tween
  // 是否接收到跳跃指令
  private _startJump: boolean = false
  // 跳跃步长
  private _jumpStep: number = 0
  // 当前跳跃时间
  private _curJumpTime: number = 0
  // 每次跳跃时常
  private _jumpTime: number = 0.1
  // 当前跳跃速度
  private _curJumpSpeed: number = 0
  // 当前角色位置
  private _curPos: Vec3 = new Vec3()
  // 每次跳跃过程中，当前帧移动位置差
  private _deltaPos: Vec3 = new Vec3(0, 0, 0)
  // 角色目标位置
  private _targetPos: Vec3 = new Vec3()
  // 步数
  private _curMoveIndex = 0

  @property({ type: Animation })
  public BodyAnim: Animation | null = null

  start() {
    // Your initialization goes here.
    // input.on(Input.EventType.MOUSE_UP, this.onMouseUp, this)
  }

  reset() {
    this._curMoveIndex = 0
  }

  setInputActive(active: boolean) {
    if (active) {
      input.on(Input.EventType.MOUSE_UP, this.onMouseUp, this)
    } else {
      input.off(Input.EventType.MOUSE_UP, this.onMouseUp, this)
    }
  }

  onMouseUp(event: EventMouse) {
    if (event.getButton() === 0) {
      this.jumpByStep(1)
    } else if (event.getButton() === 2) {
      this.jumpByStep(2)
    }
  }

  onOnceJumpEnd() {
    this.node.emit('JumpEnd', this._curMoveIndex)
  }

  jumpByStep(step: number) {
    if (this._startJump) {
      return
    }

    this._curMoveIndex += step

    console.error(this._curMoveIndex)

    if (this.BodyAnim) {
      if (step === 1) {
        this.BodyAnim.play('jump')
      } else if (step === 2) {
        this.BodyAnim.play('jump2')
      }
    }
    this._startJump = true
    this._jumpStep = step
    this._curJumpTime = 0
    this._curJumpSpeed = this._jumpStep / this._jumpTime
    this.node.getPosition(this._curPos)
    Vec3.add(this._targetPos, this._curPos, new Vec3(this._jumpStep, 0, 0))

    this.onOnceJumpEnd()
  }

  update(deltaTime: number) {
    if (this._startJump) {
      this._curJumpTime += deltaTime
      if (this._curJumpTime > this._jumpTime) {
        // end
        this.node.setPosition(this._targetPos)
        this._startJump = false
      } else {
        // tween
        this.node.getPosition(this._curPos)
        this._deltaPos.x = this._curJumpSpeed * deltaTime
        Vec3.add(this._curPos, this._curPos, this._deltaPos)
        this.node.setPosition(this._curPos)
      }
    }
  }
}
