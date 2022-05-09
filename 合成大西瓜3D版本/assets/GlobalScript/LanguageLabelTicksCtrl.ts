import { _decorator, Component, Node, CCString } from 'cc';
import { LabelTickCtrl } from './LabelTickCtrl';
import { LanguageConfig } from './LanguageConfig';
const { ccclass, property } = _decorator;

@ccclass('LanguageTickParam')
class LanguageTickParam {
  @property(LabelTickCtrl)
  public labelTick: LabelTickCtrl;

  @property({ type: CCString })
  public prefixKey: string = '';

  @property({ type: CCString })
  public suffixKey: string = '';
}

@ccclass('LanguageLabelTicksCtrl')
export class LanguageLabelTicksCtrl extends Component {

  @property([LanguageTickParam])
  public params: Array<LanguageTickParam> = [];

  onLoad() {
    for (let i = 0; i < this.params.length; i++) {
      let param = this.params[i];
      if (param.prefixKey) {
        param.labelTick.prefix = LanguageConfig.get(param.prefixKey);
      }
      if (param.suffixKey) {
        param.labelTick.suffix = LanguageConfig.get(param.suffixKey);
      }
    }
  }

}
