import { _decorator, Component, Node, Prefab, instantiate, Tween, Vec3, Label, TERRAIN_HEIGHT_BASE } from 'cc';
import { LabelTickCtrl } from '../../GlobalScript/LabelTickCtrl';
import { GameOverLayerCtrl } from './gameOverLayer/GameOverLayerCtrl';

const { ccclass, property } = _decorator;

@ccclass('CanvasCtrl')
export class CanvasCtrl extends Component {

  @property(LabelTickCtrl)
  public scoreLabelTick: LabelTickCtrl = null;
  public score: number = 0;

  @property(Node)
  public watermelonContainer: Node = null;
  @property(Node)
  public watermelonTitle: Node = null;

  @property(Prefab)
  public watermelonPrefab: Prefab = null;


  @property(Prefab)
  public gameOverPrefab: Prefab = null;

  @property([Node])
  public hearts: Array<Node> = [];
  public life: number = 0


  start() {
    this.life = this.hearts.length;
  }

  reset() {
    this.score = 0;
    this.scoreLabelTick.tickLabel(null, 0, 0.1);
    this.watermelonContainer.destroyAllChildren();
    this.watermelonTitle.active = false;
    this.reborn();
  }

  reborn() {
    this.life = this.hearts.length;
    for (let i = 0; i < this.hearts.length; i++) {
      let node = this.hearts[i];
      node.active = true;
      let tween = new Tween(node);
      tween
        .to(0.1, { scale: new Vec3(1.1, 1.1, 1.1,) })
        .to(0.2, { scale: new Vec3(1, 1, 1,) })
        .start();
    }
  }

  subLife() {
    this.life--;

    let node = this.hearts[this.life];
    let tween = new Tween(node);
    tween
      .to(0.1, { scale: new Vec3(1.2, 1.2, 1.2,) })
      .to(0.1, { scale: new Vec3(0, 0, 0,) })
      .call(() => {
        node.active = false;
      })
      .start();

    return this.life > 0;
  }

  addScore(val) {
    this.score += val;
    this.scoreLabelTick.tickLabel(null, this.score, 1);
  }

  addWatermelon() {
    let node = instantiate(this.watermelonPrefab);
    node.parent = this.watermelonContainer;
    node.scale = Vec3.ZERO;
    let tween = new Tween(node);
    tween
      .to(0.4, { scale: Vec3.ONE }, { easing: 'elasticOut' })
      .start();
    this.watermelonTitle.active = true;
  }

  popGameOverLayer() {
    let node = instantiate(this.gameOverPrefab);
    node.getComponent(GameOverLayerCtrl)!.init(this.score);
    node.parent = this.node;
  }
}
