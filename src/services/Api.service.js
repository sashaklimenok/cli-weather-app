import https from "https";
import { CLI_KEYS } from "../constants/global.js";
import axios from "axios";

export class Api {
  constructor(storage) {
    this.storage = storage;
    this.url = new URL("https://api.openweathermap.org/data/2.5/weather");
  }

  getIcon(icon) {
    switch (icon.slice(0, -1)) {
      case "01":
        return "🌞";
      case "02":
        return "🌤️";
      case "03":
        return "☁️";
      case "04":
        return "☁️";
      case "09":
        return "🌧️";
      case "10":
        return "🌦️";
      case "11":
        return "🌩️";
      case "13":
        return "❄️";
      case "50":
        return "🌫️";
    }
  }

  async getParams(key) {
    const value = await this.storage.getKeyValue(CLI_KEYS[key]);
    if (!value) {
      throw new Error(
        `${key} is not define! Set your token via CLI. for more information use -h`
      );
    }

    return value;
  }

  async getWeather() {
    const { data } = await axios.get(this.url.href, {
      params: {
        appid: await this.getParams(CLI_KEYS.token),
        lang: "ru",
        units: "metric",
        q: await this.getParams(CLI_KEYS.city),
      },
    });

    return data;
  }

  getWeatherWithNodeHttps(city) {
    return new Promise(async (resolve, reject) => {
      const token = await this.getParams(CLI_KEYS.token);
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
