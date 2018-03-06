const Promise = require("bluebird");
const path = require("path");
const fs = require("fs-extra");
const xml2js = require("xml2js");
const _ = require("lodash");
const splitFile = require("../utils/splitFile");
const simpleGit = require("simple-git");

const promisefs = Promise.promisifyAll(fs);

(function() {
  "use strict";

  module.exports = {
    topic: "bfo",
    command: "bitbucket:push",
    description: "bitbucket push ",
    help: "bfo:bitbucket:push",
    flags: [],
    run(context) {
      console.log(simpleGit);
    }
  };
})();
