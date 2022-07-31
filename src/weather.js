#!/usr/bin/env node

import { Argv, Storage, Log, Api, ExceptionFilter } from "./services/index.js";
import { CLI_KEYS } from "./constants/global.js";

class Weather {
  constructor({ argv, log, storage, api, exceptionFilter }) {
    this.argv = argv;
    this.log = log;
    this.storage = storage;
    this.api = api;
    this.exceptionFilter = exceptionFilter;
  }

  async saveToken(token) {
    if (!token.length) {
      this.log.error("token is required!");
      return;
    }
    try {
      await this.storage.saveKeyValue(CLI_KEYS.token, token);
      this.log.success("The token has been saved");
    } catch (error) {
      this.log.error(e.message);
    }
  }

  async run() {
    const args = this.argv.getArgs();
    if (args.h) {
      this.log.help();
    }
    if (args.s) {
      try {
        const data = await this.api.getWeather(args.s);
        console.log(data);
      } catch (error) {
        this.exceptionFilter.handleApiError(error.response.status);
      }
    }
    if (args.t) {
      this.saveToken(args.t);
    }
  }
}

const storage = new Storage();
const log = new Log();

const app = new Weather({
  storage,
  log,
  argv: new Argv(),
  api: new Api(storage),
  exceptionFilter: new ExceptionFilter(log),
});

app.run();
