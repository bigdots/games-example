import { _decorator, Component, Node, Collider } from 'cc'
const { ccclass, property } = _decorator

@ccclass('brickManager')
export class brickManager extends Component {
  private _collider: Collider | null = null
  start() {
    // 检测碰撞
    // this._collider = this.node.getComponent(Collider)
    // this._collider.on('onCollisionEnter', this._handleCollider, this)
  }

  // private _handleCollider(event) {
  //   console.error(event)
  // }

  update(deltaTime: number) {}
}
