export class Argv {
  constructor() {
    this.args = process.argv;
  }

  getArgs() {
    const args = this.args.slice(2);
    const res = {};
    args.forEach((value, index, array) => {
      if (value.startsWith("-")) {
        if (index === array.length - 1) {
          res[value.substring(1)] = true;
        } else if (!array[index + 1].startsWith("-")) {
          res[value.substring(1)] = array[index + 1];
        } else {
          res[value.substring(1)] = true;
        }
      }
    });
    console.log(res);
    return res;
  }
}
