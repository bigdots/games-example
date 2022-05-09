import { _decorator, Component, Node, PhysicsSystem, Prefab, instantiate, Vec3, TERRAIN_HEIGHT_BASE, ModelComponent, RigidBody, director, v3, Quat, Tween, CapsuleCollider } from 'cc';
import { fruit_config } from '../Config/fruit_config';
import { CLIP } from '../GlobalScript/AudioCtrl';
import { AudioHelper } from '../GlobalScript/AudioHelper';
import { NCKeys, NotificationCenter } from '../GlobalScript/NotificationCenter';
import { Utils } from '../GlobalScript/Utils';
import { FruitCtrl } from './FruitCtrl';
import { CanvasCtrl } from './ui/CanvasCtrl';
const { ccclass, property } = _decorator;

@ccclass('GameSceneCtrl')
export class GameSceneCtrl extends Component {

  @property([Prefab])
  public fruitPrefabs: Array<Prefab> = [];

  @property(Node)
  public fruitContainer: Node = null;

  @property(CanvasCtrl)
  public canvasCtrl: CanvasCtrl = null;

  @property(Node)
  public labelingNode: Node = null;

  @property(Prefab)
  public smokePrefab: Prefab = null;

  public curFruit: Node = null;


  onLoad() {
    Utils.loadResWithCorrection('audio', Prefab, (err, prefab) => {
      if (err) return;
      let node: Node = instantiate(prefab);
      node.parent = director.getScene() as Node;
      AudioHelper.play('audio', CLIP.BGM, true, 0.3);
    });

    PhysicsSystem.instance.enable = true;
    this.schedule(this.updateForGameOver, 1);
  }

  onEnable() {
    NotificationCenter.addObserver(NCKeys.MERGE_NEW_FRUIT, this.onMergeNewFruit, this);
    NotificationCenter.addObserver(NCKeys.RESET_GAME, this.onRestGame, this);
    NotificationCenter.addObserver(NCKeys.REBORN_GAME, this.onRebornGame, this);
    NotificationCenter.addObserver(NCKeys.REFRESH_CUR_FRUIT, this.onRefreshCurFruit, this);
    this.createCurFruit();
  }

  onDisable() {
    NotificationCenter.removeObserver(NCKeys.MERGE_NEW_FRUIT, this);
    NotificationCenter.removeObserver(NCKeys.RESET_GAME, this);
    NotificationCenter.removeObserver(NCKeys.REBORN_GAME, this);
    NotificationCenter.removeObserver(NCKeys.REFRESH_CUR_FRUIT, this);
  }


  createCurFruit() {
    if (this.curFruit) return;
    let id = Utils.randomNextFruit();
    let position = new Vec3(0, 50, 0);
    let node: Node = instantiate(this.fruitPrefabs[id]);
    node.position = position;
    node.getComponent(RigidBody).enabled = false;
    node.parent = this.fruitContainer;
    let ctrl = node.getComponent(FruitCtrl);
    ctrl.playBornAnimation(0.1);
    this.curFruit = node;
    this.labelingNode.active = true;
    this.labelingNode.position = new Vec3(0, 25, 0);
  }

  dropFruit() {
    if (!this.curFruit)
      return;

    let rigidBody = this.curFruit.getComponent(RigidBody);
    rigidBody.enabled = true;
    rigidBody.setLinearVelocity(new Vec3(0, -60, 0));
    rigidBody.setAngularVelocity(new Vec3(1, 1, 1));
    this.curFruit = null;
    this.scheduleOnce(this.createCurFruit, 1);
    this.labelingNode.active = false;
  }

  offsetCurFruit(offset: Vec3) {
    let pos = v3(this.curFruit.position);
    pos.add(offset);

    if (pos.x <= -12) pos.x = -12;
    else if (pos.x > 12) pos.x = 12;

    if (pos.z < -12) pos.z = -12;
    else if (pos.z > 12) pos.z = 12;

    this.curFruit.position = pos;
    this.labelingNode.position = new Vec3(pos.x, 25, pos.z);
  }


  onRestGame() {
    this.fruitContainer.removeAllChildren();
    this.curFruit = null;
    this.createCurFruit();
    PhysicsSystem.instance.enable = true;
    this.canvasCtrl.reset();
    this.schedule(this.updateForGameOver, 1);
  }

  onRebornGame() {
    PhysicsSystem.instance.enable = true;
    this.canvasCtrl.reborn();
    this.schedule(this.updateForGameOver, 1);
  }

  onRefreshCurFruit(fruitId) {
    if (this.curFruit) this.curFruit.destroy();
    let id = fruitId;
    let position = new Vec3(0, 50, 0);
    let node: Node = instantiate(this.fruitPrefabs[id]);
    node.position = position;
    node.getComponent(RigidBody).enabled = false;
    node.parent = this.fruitContainer;
    let ctrl = node.getComponent(FruitCtrl);
    ctrl.playBornAnimation(0.1);
    this.curFruit = node;
    this.labelingNode.active = true;
    this.labelingNode.position = new Vec3(0, 25, 0);

    let particle: Node = instantiate(this.smokePrefab);
    particle.scale = new Vec3(fruit_config[id].scale, fruit_config[id].scale, fruit_config[id].scale);
    particle.position = node.position;
    particle.parent = director.getScene() as Node;
    setTimeout(() => {
      particle.destroy();
    }, 1000);

  }
  /*
    id, position
  */
  onMergeNewFruit(data) {
    let node: Node = instantiate(this.fruitPrefabs[data.id]);
    node.position = data.position;
    let eulerX = Math.random() * 360;
    let eulerY = Math.random() * 360;
    let eulerZ = Math.random() * 360;
    node.rotation = Quat.fromEuler(new Quat, eulerX, eulerY, eulerZ);
    node.parent = this.fruitContainer;
    node.getComponent(FruitCtrl).playBornAnimation();
    let particle: Node = instantiate(this.smokePrefab);
    particle.scale = new Vec3(fruit_config[data.id].scale, fruit_config[data.id].scale, fruit_config[data.id].scale);
    particle.position = data.position;

    particle.parent = director.getScene() as Node;
    setTimeout(() => {
      particle.destroy();
    }, 1000);
    this.canvasCtrl.addScore(fruit_config[data.id].score);

    //合成了大西瓜
    if (data.id == fruit_config.length - 1) {
      setTimeout(() => {
        AudioHelper.play('audio', CLIP.GREAT);
        let particle: Node = instantiate(this.smokePrefab);
        particle.scale = new Vec3(fruit_config[data.id].scale, fruit_config[data.id].scale, fruit_config[data.id].scale);
        particle.position = node.position;

        particle.parent = director.getScene() as Node;
        setTimeout(() => {
          particle.destroy();
        }, 1000);
        node.destroy();
        this.canvasCtrl.addWatermelon();
        this.canvasCtrl.reborn();
        // let tween = new Tween(node);
        // tween
        //   .to(0.2, { position: new Vec3(12, 30, 15) })
        //   .delay(15)
        //   .call(() => {
        //    
        //   })
        //   .start();
      }, 1000);
    }

  }


  updateForGameOver(deltaTime: number) {
    let children = this.fruitContainer.children;
    for (let i = 0; i < children.length; i++) {
      if (children[i].position.y <= -10) {
        children[i].destroy();
        if (this.canvasCtrl.subLife() == false) {
          this.canvasCtrl.popGameOverLayer();
          PhysicsSystem.instance.enable = false;
          this.unschedule(this.updateForGameOver);
        }
        return;
      }
    }
  }
}
