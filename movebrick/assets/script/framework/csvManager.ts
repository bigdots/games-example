import { _decorator } from 'cc'
import { CSV } from './CSV'

const { ccclass, property } = _decorator

@ccclass('CSVManager')
export class CSVManager {
  /* class member could be defined like this */

  static _instance: CSVManager

  static get instance() {
    if (this._instance) {
      return this._instance
    }

    this._instance = new CSVManager()
    return this._instance
  }
  private _csvTables: any = {}
  private _csvTableForArr: any = {}
  private _tableCast: any = {}
  private _tableComment: any = {}

  addTable(tableName: string, tableContent: string, force?: boolean) {
    if (this._csvTables[tableName] && !force) {
      return
    }

    let tableData: any = {}
    let tableArr: any[] = []
    let opts = { header: true }
    const CSVInstance = new CSV()
    CSVInstance.parse(tableContent, opts, function (row: any, keyName: string) {
      tableData[row[keyName]] = row
      tableArr.push(row)
    })

    this._tableCast[tableName] = (CSVInstance as any).opts.cast
    this._tableComment[tableName] = (CSVInstance as any).opts.comment

    this._csvTables[tableName] = tableData
    this._csvTableForArr[tableName] = tableArr

    //this.csvTables[tableName].initFromText(tableContent);
  }

  /**
   * 根据表名获取表的所有内容
   * @param {string} tableName  表名
   * @returns {object} 表内容
   */
  getTableArr(tableName: string) {
    return this._csvTableForArr[tableName]
  }

  /**
   * 根据表名获取表的所有内容
   * @param {string} tableName  表名
   * @returns {object} 表内容
   */
  getTable(tableName: string) {
    return this._csvTables[tableName]
  }

  /**
   * 查询一条表内容
   * @param {string} tableName 表名
   * @param {string} key 列名
   * @param {any} value 值
   * @returns {Object} 一条表内容
   */
  queryOne(tableName: string, key: string, value: any) {
    var table = this.getTable(tableName)
    if (!table) {
      return null
    }

    if (key) {
      for (var tbItem in table) {
        if (!table.hasOwnProperty(tbItem)) {
          continue
        }

        if (table[tbItem][key] === value) {
          return table[tbItem]
        }
      }
    } else {
      return table[value]
    }
  }

  /**
   * 根据ID查询一条表内容
   * @param {string}tableName 表名
   * @param {string}ID
   * @returns {Object} 一条表内容
   */
  queryByID(tableName: string, ID: string) {
    //@ts-ignore
    return this.queryOne(tableName, null, ID)
  }

  /**
   * 查询key和value对应的所有行内容
   * @param {string} tableName 表名
   * @param {string} key 列名
   * @param {any} value 值
   * @returns {Object}
   */
  queryAll(tableName: string, key: string, value: any) {
    var table = this.getTable(tableName)
    if (!table || !key) {
      return null
    }

    var ret: any = {}
    for (var tbItem in table) {
      if (!table.hasOwnProperty(tbItem)) {
        continue
      }

      if (table[tbItem][key] === value) {
        ret[tbItem] = table[tbItem]
      }
    }

    return ret
  }

  /**
   * 选出指定表里所有 key 的值在 values 数组中的数据，返回 Object，key 为 ID
   * @param {string} tableName 表名
   * @param {string} key  列名
   * @param {Array}values 数值
   * @returns
   */
  queryIn(tableName: string, key: string, values: Array<any>) {
    var table = this.getTable(tableName)
    if (!table || !key) {
      return null
    }

    var ret: any = {}
    var keys = Object.keys(table)
    var length = keys.length
    for (var i = 0; i < length; i++) {
      var item = table[keys[i]]
      if (values.indexOf(item[key]) > -1) {
        ret[keys[i]] = item
      }
    }

    return ret
  }

  /**
   * 选出符合条件的数据。condition key 为表格的key，value 为值的数组。返回的object，key 为数据在表格的ID，value为具体数据
   * @param {string} tableName 表名
   * @param {any} condition 筛选条件
   * @returns
   */
  queryByCondition(tableName: string, condition: any) {
    if (condition.constructor !== Object) {
      return null
    }

    var table = this.getTable(tableName)
    if (!table) {
      return null
    }

    var ret: any = {}
    var tableKeys = Object.keys(table)
    var tableKeysLength = tableKeys.length
    var keys = Object.keys(condition)
    var keysLength = keys.length
    for (var i = 0; i < tableKeysLength; i++) {
      var item = table[tableKeys[i]]
      var fit = true
      for (var j = 0; j < keysLength; j++) {
        var key = keys[j]
        fit = fit && condition[key] === item[key] && !ret[tableKeys[i]]
      }

      if (fit) {
        ret[tableKeys[i]] = item
      }
    }

    return ret
  }

  queryOneByCondition(tableName: string, condition: any) {
    if (condition.constructor !== Object) {
      return null
    }

    var table = this.getTable(tableName)
    if (!table) {
      return null
    }

    var keys = Object.keys(condition)
    var keysLength = keys.length

    for (let keyName in table) {
      var item = table[keyName]

      var fit = true
      for (var j = 0; j < keysLength; j++) {
        var key = keys[j]
        fit = fit && condition[key] === item[key]
      }

      if (fit) {
        return item
      }
    }

    return null
  }
}
