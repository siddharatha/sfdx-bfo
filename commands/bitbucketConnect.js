const Promise = require("bluebird");
const path = require("path");
const fs = require("fs-extra");
const xml2js = require("xml2js");
const _ = require("lodash");
const splitFile = require("../utils/splitFile");
const simpleGit = require("simple-git");
const inquirer = require("inquirer");
const promisefs = Promise.promisifyAll(fs);

(function() {
  "use strict";

  module.exports = {
    topic: "bfo",
    command: "bitbucket:connect",
    description: "bitbucket connect ",
    help: "bfo:bitbucket:connect",
    flags: [],
    run(context) {
      console.log("Welcome to connect to bFO");
      var questions = [
        {
          type: "input",
          name: "repourl",
          message: "What is your repo url ?"
        },
        {
          type: "input",
          name: "nextquestion",
          message: "whatsup"
        }
      ];

      inquirer.prompt(questions).then(answers => {
        console.log(JSON.stringify(answers, null, "  "));
      });
    }
  };
})();
