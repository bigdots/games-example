import { _decorator, Component, Node, ProgressBar, error } from 'cc';
const { ccclass, property } = _decorator;

@ccclass('ProgressBarTickCtrl')
export class ProgressBarTickCtrl extends Component {
  @property(ProgressBar)
  public progressBar: ProgressBar = null;


  protected curNumber: number = null;
  protected intervalPerUpdate: number = null;
  protected finalNumber: number = null;

  tickProgress(curNumber: number | null, finalNumber: number, duration: number = 1) {

    if (typeof finalNumber != 'number') {
      return error('finalNumber 必须是数字哦');
    }

    curNumber = (curNumber === null ? this.curNumber : curNumber);
    if (curNumber === null || curNumber == finalNumber) {
      this.curNumber = finalNumber;
      this.finalNumber = finalNumber;
      this.progressBar.progress = finalNumber;
    }
    else {
      this.curNumber = curNumber;
      this.finalNumber = finalNumber;
      this.intervalPerUpdate = (finalNumber - curNumber) / (duration * 33);
      this.unschedule(this.updateForNumber);
      this.schedule(this.updateForNumber, 0.03);
      this.progressBar.progress = this.curNumber;
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
    this.progressBar.progress = this.curNumber;
  }

  stop() {
    this.unschedule(this.updateForNumber);
    this.curNumber = null;
    this.finalNumber = null;
  }
}
