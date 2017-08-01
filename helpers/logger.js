const chalk = require("chalk");
const log = console.log;
const info = chalk.yellow;
const startActivity = chalk.bold.yellow;

module.exports = {
  activity: (activity) => {
    log(startActivity(activity));
  },
  info: (message) => {
    log(info(message));
  }
}
