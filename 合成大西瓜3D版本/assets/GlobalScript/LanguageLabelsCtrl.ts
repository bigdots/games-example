import { _decorator, Component, Node, Label, CCString } from 'cc';
import { Config } from './Config';
import { LanguageConfig } from './LanguageConfig';
const { ccclass, property } = _decorator;

@ccclass("LanguageParam")
class LanguageParam {
  @property(Label)
  public label: Label = null;

  @property(CCString)
  public languageKey: string = '';
}

@ccclass('LanguageLabelsCtrl')
export class LanguageLabelsCtrl extends Component {

  @property([LanguageParam])
  public labelParams: Array<LanguageParam> = [];

  onLoad() {
    for (let i = 0; i < this.labelParams.length; i++) {
      let labelParam = this.labelParams[i];
      if (labelParam.languageKey) {
        labelParam.label.string = LanguageConfig.get(labelParam.languageKey);
      }
    }
  }


}
