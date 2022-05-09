import { _decorator, Component, Node, CCInteger, ICollisionEvent, ColliderComponent, Collider, Vec3, Tween, SafeAreaComponent, safeMeasureText, RigidBody } from 'cc';
import { fruit_config } from '../Config/fruit_config';
import { CLIP } from '../GlobalScript/AudioCtrl';
import { AudioHelper } from '../GlobalScript/AudioHelper';
import { NCKeys, NotificationCenter } from '../GlobalScript/NotificationCenter';
const { ccclass, property } = _decorator;

@ccclass('FruitCtrl')
export class FruitCtrl extends Component {

  @property(CCInteger)
  public id: number = 0;

  public state: 'WAIT' | 'FREE' | 'MERGE' = 'FREE';

  public isPlayColliderAudio: Boolean = false;

  onLoad() {
    let scale = fruit_config[this.id].scale;
    this.node.scale = new Vec3(scale, scale, scale);
  }

  playBornAnimation(startScale?: number) {
    if (!startScale)
      startScale = fruit_config[this.id - 1].scale;

    this.node.scale = new Vec3(startScale, startScale, startScale);
    this.state = 'WAIT';
    let tween = new Tween(this.node);
    let scale = fruit_config[this.id].scale;
    tween
      .to(0.2, { scale: new Vec3(scale, scale, scale) })
      .call(() => {
        this.state = 'FREE';
      })
      .start();
  }

  onEnable() {
    let collider = this.getComponent(Collider);
    collider.on('onCollisionEnter', this.onCollisionEnter, this);
    collider.on('onCollisionStay', this.onCollisionStay, this);
  }

  onDisable() {
    let collider = this.getComponent(Collider);
    collider.on('onCollisionEnter', this.onCollisionEnter, this);
    collider.on('onCollisionStay', this.onCollisionStay, this);
  }

  onCollisionEnter(event: ICollisionEvent) {
    if (this.isPlayColliderAudio == false) {
      AudioHelper.play('audio', CLIP.DROP);
      this.isPlayColliderAudio = true;
    }
    this.solveCollision(event);
  }

  onCollisionStay(event: ICollisionEvent) {
    this.solveCollision(event);
  }

  onCollisionExit() {

  }

  solveCollision(event: ICollisionEvent) {
    if (this.id >= fruit_config.length - 1)
      return;

    if (this.state != 'FREE')
      return;

    if (!event.otherCollider)
      return;

    let otherCtrl: FruitCtrl = event.otherCollider.getComponent(FruitCtrl);
    if (!otherCtrl)
      return;

    if (otherCtrl.state != 'FREE')
      return;

    if (otherCtrl.id != this.id)
      return;


    this.state = 'MERGE';
    otherCtrl.state = 'MERGE';

    // this.getComponent(RigidBody).enabled = false;
    otherCtrl.getComponent(RigidBody).enabled = false;
    let tween = new Tween(otherCtrl.node);
    tween
      .to(0.1, { position: new Vec3(this.node.position) })
      .call(() => {
        this.node.destroy();
        otherCtrl.node.destroy();
        NotificationCenter.postNotice(NCKeys.MERGE_NEW_FRUIT, {
          id: this.id + 1,
          position: new Vec3(this.node.position)
        });
      })
      .start();
    AudioHelper.play('audio', CLIP.MERGRE, false, 0.3);

  }

  // update (deltaTime: number) {
  //     // Your update function goes here.
  // }
}
