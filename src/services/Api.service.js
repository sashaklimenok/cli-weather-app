import https from "https";
import { CLI_KEYS } from "../constants/global.js";
import axios from "axios";

export class Api {
  constructor(storage) {
    this.storage = storage;
    this.url = new URL("https://api.openweathermap.org/data/2.5/weather");
  }

  async getToken() {
    const token = await this.storage.getKeyValue(CLI_KEYS.token);
    if (!token) {
      throw new Error(
        "Token is not define! Set your token via CLI. for more information use -h"
      );
    }

    return token;
  }

  async getWeather(city) {
    const { data } = await axios.get(this.url.href, {
      params: {
        appid: await this.getToken(),
        lang: "ru",
        units: "metric",
        q: city,
      },
    });

    return data;
  }

  getWeatherWithNodeHttps(city) {
    return new Promise(async (resolve, reject) => {
      const token = await this.getToken();
      this.url.searchParams.append("q", city);
      this.url.searchParams.append("appid", token);
      this.url.searchParams.append("lang", "ru");
      this.url.searchParams.append("units", "metric");
      let result = "";

      https.get(this.url, (response) => {
        response.on("data", (chunk) => {
          result += chunk;
        });
        response.on("end", () => {
          resolve(result);
        });
        response.on("error", (err) => reject(err));
      });
    });
  }
}
