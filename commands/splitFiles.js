const Promise = require("bluebird");
const path = require("path");
const fs = require("fs-extra");
const xml2js = require("xml2js");
const _ = require("lodash");
const splitFile = require("../utils/splitFile");
const klawSync = require("klaw-sync");

const promisefs = Promise.promisifyAll(fs);

(function() {
  "use strict";

  module.exports = {
    topic: "bfo",
    command: "split",
    description: "split files provided into target folder",
    help: "bfo:split -s sourcefolder -t targetfolder",
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
        const paths = klawSync(srcfolder, {
          nofile: true
        });
        const coredirs = _.map(paths, eachpath => eachpath.path);
        fs.ensureDirSync(completetargetpath);
        console.log(coredirs);
        _.each(coredirs, eachDir => {
          promisefs
            .readdirAsync(eachDir)
            .then(filelist => {
              Promise.map(
                filelist,
                eachfilename => {
                  return splitFile(
                    eachDir + "/" + eachfilename,
                    completetargetpath
                  );
                },
                { concurrency: 1000 }
              );
            })
            .catch(ex => console.log(ex));
        });
      } else {
        console.log("source or target doesn't exist");
      }
    }
  };
})();
