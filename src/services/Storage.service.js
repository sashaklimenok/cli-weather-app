import { homedir } from "os";
import { join } from "path";
import { promises } from "fs";

export class Storage {
  constructor() {
    this.filePath = join(homedir(), "weather-data.json");
    this.data = {};
  }

  async isExist() {
    try {
      await promises.stat(this.filePath);
      return true;
    } catch (error) {
      return false;
    }
  }

  async getKeyValue(key) {
    if (await this.isExist(this.filePath)) {
      const file = await promises.readFile(this.filePath);
      return JSON.parse(file)[key];
    }
  }

  async saveKeyValue(key, value) {
    if (await this.isExist()) {
      const file = await promises.readFile(this.filePath);
      this.data = JSON.parse(file);
    }
    this.data[key] = value;
    try {
      await promises.writeFile(this.filePath, JSON.stringify(this.data));
    } catch (error) {
      console.error(error.message)
    }
  }
}
