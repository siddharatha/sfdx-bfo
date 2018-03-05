const Promise = require("bluebird");
const path = require("path");
const fs = require("fs-extra");
const xml2js = require("xml2js");
const _ = require("lodash");
const readProfile = require("../utils/readProfile");

const promisefs = Promise.promisifyAll(fs);
let count = 0;

(function() {
  "use strict";

  module.exports = {
    topic: "bfo",
    command: "cleanup",
    description: "clean up what we have",
    help: "bfo:cleanup please pass source and target folder",
    flags: [
      {
        name: "srcfolder",
        char: "s",
        description: "source folder",
        hasValue: true,
        required: true
      },
      {
        name: "targetfolder",
        char: "t",
        description: "target folder",
        hasValue: true,
        required: true
      }
    ],
    run(context) {
      const srcfolder = context.flags.srcfolder;
      const targetfolder = context.flags.targetfolder;
      const completesrcpath = path.resolve(srcfolder);
      const completetargetpath = path.resolve(targetfolder);
      if (fs.existsSync(completesrcpath)) {
        fs.ensureDirSync(completetargetpath);
        promisefs
          .readdirAsync(completesrcpath)
          .then(filelist => {
            Promise.map(
              filelist,
              eachfilename => {
                return readProfile(
                  completesrcpath + "/" + eachfilename,
                  completetargetpath
                );
              },
              { concurrency: 20 }
            );
          })
          .catch(ex => console.log(ex));
      } else {
        console.log("source or target doesn't exist");
      }
    }
  };
})();
