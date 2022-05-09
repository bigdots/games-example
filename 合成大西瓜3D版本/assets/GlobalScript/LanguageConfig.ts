import { Config } from "./Config";

export let LanguageConfig = {



  get(key) {
    return this[key][Config.language];
  }

};

globalThis.LanguageConfig = LanguageConfig;