const Promise = require("bluebird");
const path = require("path");
const fs = require("fs-extra");
const xml2js = require("xml2js");
const _ = require("lodash");
const klawSync = require("klaw-sync");
const mergeFile = require("../utils/mergeFile");
let config = require("../utils/config");
const glob = require("glob");

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
        required: false
      }
    ],
    run(context) {
      const srcfolder = context.flags.srcfolder || 'splits';      
      const completesrcpath = path.resolve(srcfolder);  
      
      prepareConfiguration(completesrcpath).then(newconfig => {
        Promise.map(_.values(newconfig), eachConfig => {
          return processConfig(eachConfig);
        })
          .then(r => console.log("finished"))
          .catch(f => console.log("failed"));
      });

      
    }
  };
})();


function processConfig(eachConfig) {
  return new Promise((resolve, reject) => {
    Promise.map(
      eachConfig.files,
      eachFile => {
        return processFile(eachFile, eachConfig);
      },
      { concurrency: 1000 }
    )
      .then(v => resolve())
      .catch(e => reject());
  });
}

function processFile(eachfile, eachconfig) {
  return new Promise((resolve, reject) => {
    resolve();
    mergeFile(eachfile, '../', eachconfig).then(() =>
      resolve()
    );
  });
}

function getFileListFromPattern(pattern, key, toIgnoreFiles) {
  return new Promise((resolve, reject) => {
    glob(pattern, (err, matches) => {
      matches = matches.filter(
        eachMatch => (_.indexOf(toIgnoreFiles, eachMatch) === -1 ? true : false)
      );
      console.log(`${key} : ${matches.length}`);
      resolve({ key, matches });
    });
  });
}

function prepareConfiguration(srcpath) {
  return new Promise((resolve, reject) => {
    const updatedConfig = _.map(config, (value, key) => {
      return {
        files: value.files,
        tags: value.tags,
        metaTags: value.metaTags,
        key: key,
        rootTag: value.rootTag
      };
    });
    Promise.map(updatedConfig, eachConfig =>
      getFileListFromPattern(srcpath+'/'+eachConfig.files, eachConfig.key)
    ).then(values => {
      let filesWithType = _.mapValues(
        _.mapKeys(
          _.flatten(_.filter(_.values(_.map(_.groupBy(values, "key"))))),
          "key"
        ),
        "matches"
      );
      let newconfig = {};
      _.each(config, (value, key) => {
        newconfig[key] = value;
        newconfig[key].files = filesWithType[key];
        newconfig[key]['key'] = key;
      });      
      resolve(newconfig);
    });
  });
}
