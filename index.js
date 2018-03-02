const bfo = require("./commands/cleanUpFiles.js");

(function() {
  "use strict";

  exports.topics = [
    {
      name: "bfo",
      description: "cleanup the profile and permission set files"
    }
  ];

  exports.commands = [bfo];
})();
