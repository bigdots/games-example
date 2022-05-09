import { readFileSync } from 'fs-extra'
import { join } from 'path'
import { createApp, App } from 'vue'
const weakMap = new WeakMap<any, App>()
/**
 * @zh 如果希望兼容 3.3 之前的版本可以使用下方的代码
 * @en You can add the code below if you want compatibility with versions prior to 3.3
 */
// Editor.Panel.define = Editor.Panel.define || function(options: any) { return options }
module.exports = Editor.Panel.define({
  listeners: {
    show() {
      console.log('show')
    },
    hide() {
      console.log('hide')
    },
  },
  template: readFileSync(
    join(__dirname, '../../../static/template/default/index.html'),
    'utf-8'
  ),
  style: readFileSync(
    join(__dirname, '../../../static/style/default/index.css'),
    'utf-8'
  ),
  $: {
    fileSel: '#file',
    btn: 'ui-button',
  },
  methods: {
    hello() {},
  },
  ready() {
    this.$.btn?.addEventListener('confirm', (e) => {
      const path = this.$.fileSel
      // console.log(this.$.fileSel)
      // if (path) {
      // }
      console.log(2222)
      Editor.Message.send('ui_mvc', 'generate-ui-ctrl', path)
    })

    // this.$.fileSel?.addEventListener('confirm', function (e) {
    //   console.log(e.eventPhase.valueOf())
    // })
  },
  beforeClose() {},
  close() {},
})
