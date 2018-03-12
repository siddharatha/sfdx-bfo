const Promise = require("bluebird");
const path = require("path");
const fs = require("fs-extra");
const xml2js = require("xml2js");
const _ = require("lodash");
const klawSync = require("klaw-sync");
const mergeFile = require("../utils/mergeFile");

const promisefs = Promise.promisifyAll(fs);

(function() {
  "use strict";

  module.exports = {
    topic: "bfo",
    command: "merge",
    description: "merge from split files",
    help: "bfo:merge please pass source and target folder",
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
        const paths = klawSync(srcfolder, {
          nofile: true
        });
        const coredirs = _.flatten(
          _.filter(
            _.map(paths, eachpath => eachpath.path),
            eachPath => eachPath.indexOf(".") === -1
          )
        );
        if (coredirs.length === 0) coredirs.push(srcfolder);
        console.log(coredirs);
        _.each(coredirs, eachDir => {
          promisefs
            .readdirAsync(eachDir)
            .then(filelist => {
              Promise.map(
                filelist,
                eachfilename => {
                  return mergeFile(
                    eachDir + "/" + eachfilename,
                    completetargetpath
                  );
                },
                { concurrency: 20 }
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
