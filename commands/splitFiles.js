const Promise = require("bluebird");
const path = require("path");
const fs = require("fs-extra");
const xml2js = require("xml2js");
const _ = require("lodash");
const splitFile = require("../utils/splitFile");
const klawSync = require("klaw-sync");
let config = require("../utils/config");
const promisefs = Promise.promisifyAll(fs);
const glob = require("glob");
const colors = require("colors");
(function() {
  "use strict";

  module.exports = {
    topic: "bfo",
    command: "split",
    description: "split files provided into target folder",
    help: "bfo:split -t targetfolder",
    flags: [
      {
        name: "targetfolder",
        char: "t",
        description: "target folder",
        hasValue: true,
        required: false
      },
      {
        name: "trueconfig",
        char: "b",
        description: "true config",
        hasValue: true,
        required: false
      },
      {
        name: "fileformat",
        char: "f",
        description: "file format",
        hasValue: true,
        required: false
      }
    ],
    run(context) {
      const targetfolder = context.flags.targetfolder || "splits";
      const trueconfig = context.flags.trueconfig
        ? theBooleanValue(context.flags.trueconfig)
        : false;
      const fileformat = context.flags.fileformat || "json";
      console.log(
        `Analyzing the folder structure to split \nTarget Folder is ${colors.green(
          targetfolder
        )} \n ${
          trueconfig
            ? "Will generate only for " + colors.green("true") + " values"
          : "Will generate both " + colors.green("true") +" and "+
              colors.red("false") +
              " values. If you are running on complete profile set , it might take upto 2 hrs."
        } \nThe file format chosen is ${colors.yellow(fileformat)}`
      );
      prepareConfiguration().then(newconfig => {
        console.log(
          `Preparing list of files from configration,\nplease refer here to understand the config: ${colors.blue(
            "https://bitbucket.org/snippets/sesa206167/keRRKa"
          )}`
        );
        Promise.map(_.values(newconfig), eachConfig => {
          _.assign(
            eachConfig,
            { targetfolder },
            { trueconfig },
            { fileformat }
          );
          return processConfig(eachConfig);
        })
          .then(r => console.log("finished"))
          .catch(f => console.log("failed"));
      });
    }
  };
})();

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

function prepareConfiguration() {
  return new Promise((resolve, reject) => {
    const updatedConfig = _.map(config, (value, key) => {
      // console.log(value);
      return {
        files: value.files,
        tags: value.tags,
        metaTags: value.metaTags,
        key: key,
        toIgnoreFiles: value.toIgnoreFiles
      };
    });
    Promise.map(updatedConfig, eachConfig =>
      getFileListFromPattern(
        eachConfig.files,
        eachConfig.key,
        _.get(eachConfig, "toIgnoreFiles", [])
      )
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
      });
      // console.log(_.keysIn(newconfig));
      resolve(newconfig);
    });
  });
}

function processConfig(eachConfig) {
  return new Promise((resolve, reject) => {
    Promise.map(
      eachConfig.files,
      eachFile => {
        const {
          tags,
          metaTags,
          targetfolder,
          trueconfig,
          fileformat
        } = eachConfig;
        return processFile(eachFile, {
          tags,
          metaTags,
          targetfolder,
          trueconfig,
          fileformat
        });
      },
      { concurrency: 1000 }
    )
      .then(v => resolve())
      .catch(e => reject());
  });
}

function processFile(eachfile, eachconfig) {
  return new Promise((resolve, reject) => {
    splitFile(eachfile, eachconfig.targetfolder, eachconfig).then(() => {      resolve();
    });
  });
}

function theBooleanValue(data) {
  if (data && _.isString(data)) {
    var toprocess = data.toLowerCase().trim();
    switch (toprocess) {
      case "true":
      case "yes":
        return true;
        break;
      case "false":
        return false;
        break;
      default:
        false;
    }
  }
}
