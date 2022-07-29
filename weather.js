#!/usr/bin/env node

import { Argv } from "./services/Argv.service.js"
import { Log } from './services/Log.service.js'

class Weather {
  constructor({ argv, log }) {
    this.argv = argv;
    this.log = log
    this.init()
  }

  init() {
    this.argv.getArgs();
    this.log.help()
  }
}

new Weather({
  argv: new Argv(),
  log: new Log()
})