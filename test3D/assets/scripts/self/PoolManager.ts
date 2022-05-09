import { _decorator, Prefab, Node, instantiate, NodePool } from 'cc'
const { ccclass, property } = _decorator

/**
 * 节点池管理类
 */

/**
 * 节点池字典
 */
interface IDictPool {
  [name: string]: NodePool
}

/**
 * 预制体字典
 */
interface IDictPrefab {
  [name: string]: Prefab
}

@ccclass('PoolManager')
export class PoolManager {
  private _dictPool: IDictPool
  private _dictPrefab: IDictPrefab
  private static _instance: PoolManager

  static instance() {
    if (!this._instance) {
      this._instance = new PoolManager()
    }

    return this._instance
  }

  getNode(prefab: Prefab, parent: Node) {
    const name = prefab.data.name
    this._dictPrefab[name] = prefab

    if (!this._dictPool[name]) {
      this._dictPool[name] = new NodePool()
    }

    let node: Node = null
    const pool = this._dictPool[name] //获取当前预制体的容器

    if (pool.size() > 0) {
      node = pool.get()
    } else {
      node = instantiate(prefab)
    }

    node.parent = parent
    node.active = true
    return node
  }

  putNode(node: Node) {
    const name = node.name
    node.parent = null

    if (!this._dictPool[name]) {
      this._dictPool[name] = new NodePool()
    }

    this._dictPool[name].put(node)
  }
}
