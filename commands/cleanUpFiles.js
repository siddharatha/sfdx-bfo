const Promise = require("bluebird");
const path = require("path");
const fs = require("fs-extra");
const xlm2js = require("xml2js");

const promisefs = Promise.promisifyAll(fs);

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
            return Promise.map(
              filelist,
              eachfilename => {
                return readXMLFile(
                  `${completesrcpath}/${eachfilename}`,
                  `${completetargetpath}/${eachfilename}`
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

function readXMLFile(srcfilename, targetfilename) {
  return new Promise((resolve, reject) => {
    if (fs.existsSync(srcfilename)) {
      var parser = Promise.promisifyAll(new xlm2js.Parser());
      return promisefs
        .readFileAsync(srcfilename)
        .then(data => parser.parseStringAsync(data))
        .then(parseddata =>
          promisefs.writeFileAsync(
            `${targetfilename}.json`,
            JSON.stringify(parseddata, null, 2)
          )
        );
    } else {
      reject(`${srcfilename} doesn't exist`);
    }
  });
}
