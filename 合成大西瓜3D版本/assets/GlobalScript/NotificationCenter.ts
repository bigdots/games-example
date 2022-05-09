import { assert } from "cc";

//一个全局的通知中心
export let NCKeys = {
  IS_MUSIC_ON_CHANGED: 'IS_MUSIC_ON_CHANGED', //
  EVENT_HIDE: 'EVENT_HIDE',
  EVENT_SHOW: 'EVENT_SHOW',

  MERGE_NEW_FRUIT: 'MERGE_NEW_FRUIT',
  RESET_GAME: 'RESET_GAME',
  REBORN_GAME: 'REBORN_GAME',
  REFRESH_CUR_FRUIT: 'REFRESH_CUR_FRUIT',
}

export let NotificationCenter = {

  _observers: {} as any,
  addObserver: function (key: any, fun: any, target: any) {

    assert(key != null, 'key  cant be null');
    assert(fun != null, 'fun  cant be null');
    assert(target != null, 'target  cant be null');

    if (this._observers[key] == null)
      this._observers[key] = [];

    this._observers[key].push({ fun: fun, target: target });
  },

  removeObserver: function (key: any, target: any) {
    if (target == null)
      assert(false, 'target must not be null');

    if (this._observers[key] == null)
      return;

    this._observers[key] = this._observers[key].filter(function (item: any) {
      return item.target != target;
    });
  },

  postNotice: function (key: any, data: any) {

    if (this._observers[key] == null)
      return;

    this._observers[key].forEach(function (item: any) {
      item.fun.call(item.target, data);
    })
  },
};

// window.NotificationCenter = NotificationCenter;
// window.NCKeys = NCKeys;

// export {NotificationCenter, NCKeys};


