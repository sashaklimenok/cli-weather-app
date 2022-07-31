#!/usr/bin/env node
import chalk from "chalk";
import dedent from "dedent-js";

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

  async saveParams(key, value) {
    if (!value.length) {
      this.log.error(`${key} is required!`);
      return;
    }
    try {
      await this.storage.saveKeyValue(key, value);
      this.log.success(`The ${key} has been saved`);
    } catch (error) {
      this.log.error(e.message);
    }
  }

  printForecast(res) {
    console.log(
      dedent(`
      ${chalk.cyan(`The weather in ${res.name.toUpperCase()}`)} 
      ${res.weather[0].description} ${this.api.getIcon(res.weather[0].icon)}
      Temperature: ${chalk.cyan(`${res.main.temp} (feels like ${res.main.feels_like})`)}
      Humidity: ${chalk.cyan(`${res.main.humidity} %`)}
      Wind Speed: ${chalk.cyan(`${res.wind.speed}`)}
      `)
    );
  }

  async getForecast() {
    try {
      const data = await this.api.getWeather();
      this.printForecast(data)
    } catch (error) {
      this.exceptionFilter.handleApiError(
        error?.response?.status ?? error.message
      );
    }
  }

  async run() {
    const args = this.argv.getArgs();
    if (args.h) {
      this.log.help();
      return;
    }
    if (args.s) {
      this.saveParams(CLI_KEYS.city, args.s);
      return;
    }
    if (args.t) {
      this.saveParams(CLI_KEYS.token, args.t);
      return;
    }

    this.getForecast();
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
