#!/usr/bin/env node

import { Argv, Storage, Log } from "./services/index.js";

class Weather {
  constructor({ argv, log, storage }) {
    this.argv = argv;
    this.log = log;
    this.storage = storage;
    this.init();
  }

  async saveToken(token) {
    try {
      await this.storage.saveKeyValue("token", token);
      this.log.success("The token has been saved");
    } catch (error) {
      this.log.error(e.message);
    }
  }

  init() {
    const args = this.argv.getArgs();
    if (args.h) {
      this.log.help();
    }
    if (args.s) {
    }
    if (args.t) {
      this.saveToken(args.t);
    }
  }
}

new Weather({
  argv: new Argv(),
  log: new Log(),
  storage: new Storage(),
});
