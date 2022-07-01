import { _decorator, Component, Node, RigidBody, Vec3 } from 'cc'
const { ccclass, property } = _decorator

@ccclass('test')
export class test extends Component {
  start() {}

  update(deltaTime: number) {}

  onLoad() {
    const rigidBody = this.getComponent(RigidBody)
    setTimeout(() => {
      rigidBody.setLinearVelocity(new Vec3(0, 0, 2))
    }, 2000)
  }
}
