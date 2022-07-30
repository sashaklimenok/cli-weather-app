import chalk from "chalk";
import dedent from "dedent-js";

export class Log {
  error(error) {
    console.error(chalk.bgRed(" ERROR ") + " " + error);
  }

  success(message) {
    console.log(chalk.bgGreen(" SUCCESS ") + " " + message);
  }

  info(message) {
    console.log(chalk.bgCyan(" INFO "), +" " + message);
  }

  help() {
    console.log(
      dedent(`${chalk.bgCyan(" HELP ")}
      Without parameters - output of the weather
      -s [CITY] set a city
      -h output guide for help
      -t [API_KEY] save the API_KEY
      `)
    );
  }
}
