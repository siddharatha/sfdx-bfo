const split = require("./commands/splitFiles.js");
const merge = require("./commands/mergeFiles.js");

(function() {
  "use strict";

  exports.topics = [
    {
      name: "bfo",
      description: "All commands for bFO - split, merge"
    }    
  ];

  exports.commands = [split,merge];
})();
