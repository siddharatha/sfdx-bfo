const Promise = require("bluebird");
const path = require("path");
const fs = require("fs-extra");
const xml2js = require("xml2js");
const _ = require('lodash');
const readProfile = require('../readProfile');

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
                  completesrcpath+'/'+eachfilename,completetargetpath
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

function readXMLFile(srcpath,srcfilename,targetpath) {
  return new Promise((resolve, reject) => {    
    if (fs.existsSync(srcpath+'/'+srcfilename)) {
      var parser = new xml2js.Parser({ explicitChildren: true, explicitArray:false});
      promisefs.readFile(srcpath + '/' + srcfilename)
        .then(filedata => {         
          parser.parseString(filedata, function (err, result) { 
            promisefs.writeFileAsync(targetpath+'/'+srcfilename, JSON.stringify(result, null, 2));
            _.map(result, (value, key) => {                            
              _.map(_.keysIn(value), eachKey => {
                identify = _.first(value[eachKey]);
                if (_.isObject(identify)) {
                  console.log(eachKey, _.keys(identify))
                }                
              });
            })          
            // promisefs.writeFileAsync(targetfilename, JSON.stringify(filedata, null, 2))
            // .then(()=>resolve())
          });
        });      
    } else {
      reject(`${srcfilename} doesn't exist`);
    }
  });
}
