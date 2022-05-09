"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const fs_extra_1 = require("fs-extra");
const path_1 = require("path");
const weakMap = new WeakMap();
/**
 * @zh 如果希望兼容 3.3 之前的版本可以使用下方的代码
 * @en You can add the code below if you want compatibility with versions prior to 3.3
 */
// Editor.Panel.define = Editor.Panel.define || function(options: any) { return options }
module.exports = Editor.Panel.define({
    listeners: {
        show() {
            console.log('show');
        },
        hide() {
            console.log('hide');
        },
    },
    template: (0, fs_extra_1.readFileSync)((0, path_1.join)(__dirname, '../../../static/template/default/index.html'), 'utf-8'),
    style: (0, fs_extra_1.readFileSync)((0, path_1.join)(__dirname, '../../../static/style/default/index.css'), 'utf-8'),
    $: {
        fileSel: '#file',
        btn: 'ui-button',
    },
    methods: {
        hello() { },
    },
    ready() {
        var _a;
        (_a = this.$.btn) === null || _a === void 0 ? void 0 : _a.addEventListener('confirm', (e) => {
            const path = this.$.fileSel;
            // console.log(this.$.fileSel)
            // if (path) {
            // }
            console.log(2222);
            Editor.Message.send('ui_mvc', 'generate-ui-ctrl', path);
        });
        // this.$.fileSel?.addEventListener('confirm', function (e) {
        //   console.log(e.eventPhase.valueOf())
        // })
    },
    beforeClose() { },
    close() { },
});
