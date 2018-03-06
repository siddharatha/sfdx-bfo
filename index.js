const split = require("./commands/splitFiles.js");
const merge = require("./commands/mergeFiles.js");
const doctor = require("./commands/doctor.js");
const bitbucketPull = require("./commands/bitbucketPull.js");
const bitbucketPush = require("./commands/bitbucketPush.js");
const bitbucketConnect = require("./commands/bitbucketConnect.js");

(function() {
  "use strict";

  exports.topics = [
    {
      name: "bfo",
      description: "All commands for bFO - split, merge"
    }
  ];

  exports.commands = [
    split,
    merge,
    doctor,
    bitbucketPull,
    bitbucketPush,
    bitbucketConnect
  ];
})();
