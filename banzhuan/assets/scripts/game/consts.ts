import { Prefab, Vec3 } from 'cc'

enum GameState {
  GS_INIT,
  GS_PLAYING,
  GS_Arrived,
  GS_END,
  GS_OVER,
}

enum CAMERA_TYPE_LIST {
  READY,
  READY_TO_PLAYING,
  ENDROAD,
  REWARD,
  PLAYING,
}

const CAMERA_DATA = {
  READY: {
    //相对于角色，游戏开始阶段摄像机数据
    offsetPosInit: new Vec3(-2, 8, -9),
    offsetLookAtPos: new Vec3(0, 0, 0),
  },
  PLAYING: {
    //相对于角色，游戏过程中摄像机数据
    offsetPosInit: new Vec3(-2, 8, -9),
    offsetLookAtPos: new Vec3(0, 0, 0),
  },
  ADDBRICK_OFFSET: new Vec3(0, 0.0225, 0.045),
  ENDROAD: {
    //相对于终点平台，结算阶段摄像机数据
    offsetPosInit: new Vec3(0, 0.9, 2.6),
    offsetLookAtPos: new Vec3(0, 0.3, 0),
  },
  CAMERA_MAX_BRICKNUM: 20,
}

enum GameEvent {
  GS_INIT,
  GS_START,
  GS_END,
  CHANGE_PLAYER_COLOR,
  CHANGE_BRICKS_NUM,
  GAME_OVER,
  CHANGE_BRICKS_COLOR,
  ARRIVE_AT_THE_END,
  CHANGECAMERATYPE,
}

enum GROUP_TYPE {
  DEFAULT = 1,
  PLAYER = 16,
  BARRIER,
}

const Assets = {
  level1: [
    'datas/maps/map1',
    'GUI/startPanel',
    'GUI/resetPanel',
    'GUI/nextPanel',
    'prefab/car',
    'prefab/bricksgreen',
    'prefab/bricksred',
    'prefab/bricksyellow',
    'prefab/box',
    'prefab/road',
    'prefab/man',
    'prefab/colorLighty',
  ],
}

enum COLOR {
  GREEN = 1,
  RED,
  YELLOW,
}

export const Consts = {
  GameState,
  GameEvent,
  Assets,
  GROUP_TYPE,
  COLOR,
  CAMERA_TYPE_LIST,
  CAMERA_DATA,
}
