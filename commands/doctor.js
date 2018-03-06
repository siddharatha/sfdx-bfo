const Promise = require("bluebird");
const path = require("path");
const fs = require("fs-extra");
const xml2js = require("xml2js");
const _ = require("lodash");
const splitFile = require("../utils/splitFile");

const promisefs = Promise.promisifyAll(fs);
let count = 0;

(function() {
  "use strict";

  module.exports = {
    topic: "bfo",
    command: "doctor",
    description:
      "doctor runs all checks to make sure your repo is intact to perform commits",
    help: "bfo:doctor",
    flags: [],
    run(context) {
      console.log("bfo doctor analysis");
      if (fs.existsSync(".git")) {
        console.log("good you are connected to a git repo");
      } else {
        console.log("you are not in a git repo");
      }
      return true;
    }
  };
})();
