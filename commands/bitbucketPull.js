const Promise = require("bluebird");
const path = require("path");
const fs = require("fs-extra");
const xml2js = require("xml2js");
const _ = require("lodash");
const splitFile = require("../utils/splitFile");
const git = require("simple-git/promise");

const promisefs = Promise.promisifyAll(fs);

(function() {
  "use strict";

  module.exports = {
    topic: "bfo",
    command: "bitbucket:pull",
    description: "bitbucket pull ",
    help: "bfo:bitbucket:pull",
    flags: [
      {
        name: "repourl",
        char: "r",
        description: "repo url",
        hasValue: true,
        required: true
      },
      {
        name: "branch",
        char: "b",
        description: "branch name",
        hasValue: true,
        required: true
      }
    ],
    run(context) {
      const remote = context.flags.repourl;
      const branch = context.flags.branch;
      git()
        .silent(true)
        .clone(remote)
        .then(() => console.log("finished"))
        .catch(err => console.error("failed: ", err));
    }
  };
})();
