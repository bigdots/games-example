import { _decorator, Component, Node, Camera, find } from 'cc';
const { ccclass, property, executeInEditMode, executionOrder } = _decorator;

@ccclass('Billboard')
@executeInEditMode
export class Billboard extends Component {

  public cameraNode: Node = null;

  start() {
    this.cameraNode = find('Main Camera');
  }

  update() {
    this.node.forward = this.cameraNode.forward;
  }
  // update (deltaTime: number) {
  //     // Your update function goes here.
  // }
}
