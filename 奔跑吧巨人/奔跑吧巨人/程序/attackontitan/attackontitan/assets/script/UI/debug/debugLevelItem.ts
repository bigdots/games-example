import { constant } from './../../framework/constant';
import { uiManager } from './../../framework/uiManager';
import { playerData } from './../../framework/playerData';

import { _decorator, Component, Node, LabelComponent } from 'cc';
import { clientEvent } from '../../framework/clientEvent';
import { GameLogic } from '../../framework/gameLogic';
const { ccclass, property } = _decorator;

@ccclass('DebugLevelItem')
export class DebugLevelItem extends Component {
    // [1]
    // dummy = '';

    // [2]
    // @property
    // serializableDummy = 0;

    @property(LabelComponent)
    lbLevelTxt: LabelComponent = null!;

    start () {
        // [3]
    }

    onBtnClick () {
        GameLogic.vibrateShort();

        playerData.instance.playerInfo.level = Number(this.lbLevelTxt.string);
        clientEvent.dispatchEvent(constant.EVENT_TYPE.ON_INIT_GAME);
        uiManager.instance.hideDialog("debug/debugPanel");
        uiManager.instance.hideDialog("parkour/parkourPanel");
    }

    // update (deltaTime: number) {
    //     // [4]
    // }
}

/**
 * [1] Class member could be defined like this.
 * [2] Use `property` decorator if your want the member to be serializable.
 * [3] Your initialization goes here.
 * [4] Your update function goes here.
 *
 * Learn more about scripting: https://docs.cocos.com/creator/3.0/manual/en/scripting/
 * Learn more about CCClass: https://docs.cocos.com/creator/3.0/manual/en/scripting/ccclass.html
 * Learn more about life-cycle callbacks: https://docs.cocos.com/creator/3.0/manual/en/scripting/life-cycle-callbacks.html
 */
