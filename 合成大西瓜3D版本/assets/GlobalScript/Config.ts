import { _decorator, Component, Node, Animation, CCString, CCObject } from "cc";

const { ccclass, property } = _decorator;

export enum LANGUAGE {
  CN = 0, //中文
  EN = 1,//英文
};

export let Config = {

  version: '1.8.0',

  language: LANGUAGE.CN,

}




globalThis.Config = Config;
