import { Prefab } from 'cc'

enum GameState {
  GS_Ready,
  GS_PLAYING,
  GS_END,
}

enum GameEvent {
  GS_READY,
  GS_INIT,
  GS_START,
  GS_END,
  CHANGE_PLAYER_COLOR,
  CHANGE_BRICKS_NUM,
  GAME_OVER,
  CHANGE_BRICKS_COLOR,
}

enum GROUP_TYPE {
  DEFAULT = 1,
  PLAYER = 16,
  BARRIER,
}

const Assets = {
  level1: {
    datas: {
      accessType: null,
      urls: ['maps/map1'],
    },

    GUI: {
      accessType: Prefab,
      urls: ['startPanel', 'resetPanel'],
    },
    prefab: {
      accessType: Prefab,
      urls: [
        'datas/maps/map1',
        'GUI/startPanel',
        'GUI/resetPanel',
        'prefab/car',
        'prefab/brickgreen',
        'prefab/bricksgreen',
        'prefab/brickred',
        'prefab/bricksred',
        'prefab/brickyellow',
        'prefab/bricksyellow',
        'prefab/box',
        'prefab/road',
        'prefab/man',
        'prefab/colorLighty',
      ],
    },
  },
  level2: [
    'datas/maps/map1',
    'GUI/startPanel',
    'GUI/resetPanel',
    'prefab/car',
    'prefab/brickgreen',
    'prefab/bricksgreen',
    'prefab/brickred',
    'prefab/bricksred',
    'prefab/brickyellow',
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
}
