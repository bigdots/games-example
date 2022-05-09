import { _decorator, Component, Node, Label, CCString, CCInteger, error } from "cc";
const { ccclass, property } = _decorator;

@ccclass("LabelTickCtrl")
export class LabelTickCtrl extends Component {

  @property(Label)
  public label: Label = null;

  @property({ type: CCString })
  public prefix: string = '';

  @property({ type: CCString, multiline: true })
  public suffix: string = '';

  //保留小数点后几位
  @property(CCInteger)
  public decimalPlaces: number = 0;

  protected curNumber: number = null;
  protected intervalPerUpdate: number = null;
  protected finalNumber: number = null;

  tickLabel(curNumber: number | null, finalNumber: number, duration: number = 1) {

    if (typeof finalNumber != 'number') {
      return error('finalNumber 必须是数字哦');
    }

    curNumber = (curNumber === null ? this.curNumber : curNumber);
    if (curNumber === null || curNumber == finalNumber) {
      this.curNumber = finalNumber;
      this.finalNumber = finalNumber;
      this.label.string = `${this.prefix}${this.finalNumber.toFixed(this.decimalPlaces)}${this.suffix}`;
    }
    else {
      this.curNumber = curNumber;
      this.finalNumber = finalNumber;
      this.intervalPerUpdate = (finalNumber - curNumber) / (duration * 33);
      this.unschedule(this.updateForNumber);
      this.schedule(this.updateForNumber, 0.03);
      this.label.string = `${this.prefix}${this.curNumber.toFixed(this.decimalPlaces)}${this.suffix}`;
    }
  }


  updateForNumber(dt) {
    this.curNumber += this.intervalPerUpdate;
    if ((this.intervalPerUpdate > 0 && this.curNumber > this.finalNumber)
      || (this.intervalPerUpdate < 0 && this.curNumber < this.finalNumber)
    ) {
      this.curNumber = this.finalNumber;
      this.unschedule(this.updateForNumber);
    }
    this.label.string = `${this.prefix}${this.curNumber.toFixed(this.decimalPlaces)}${this.suffix}`;
  }

  stop() {
    this.unschedule(this.updateForNumber);
    this.curNumber = null;
    this.finalNumber = null;
  }
}
