import { Component, Node, _decorator } from 'cc'
const { ccclass } = _decorator

@ccclass('uiControl')
export class uiControl extends Component {
  protected vModel: Object = {}

  load_all_nodes(root: Node, path): void {
    const children = root.children
    for (let i = 0; i < children.length; i++) {
      const child = children[i]
      const pathName = `${path}${child.name}`
      this.vModel[pathName] = child
      this.load_all_nodes(child, pathName + '/')
    }
  }

  onLoad() {
    this.load_all_nodes(this.node, '')

    console.log(this.vModel)
  }
}
