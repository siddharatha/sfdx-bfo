const _ = require("lodash");
const fs = require("fs-extra");
const Promise = require("bluebird");
const path = require("path");
const xml2js = require("xml2js");

function splitFile(fileName, targetFolder, config) {
  return new Promise((resolve, reject) => {
    const filedata = fs.readFileSync(fileName);
    var parser = new xml2js.Parser();
    console.log("processing " + fileName);
    parser.parseString(filedata, function(err, result) {
      const root =
        path.resolve(targetFolder) +
        "/" +
        _.last(path.extname(fileName).split("."));
      fs.ensureDirSync(root);
      const corerefroot = root + "/" + path.basename(fileName);
      let thefirstitemofthekey;
      fs.ensureDirSync(corerefroot);
      fs.ensureFileSync(
        corerefroot + "/" + path.basename(fileName) + "-meta.xml"
      );
      _.each(result, (value, key) => {
        let metainfo = {};
        _.each(config.metaTags, eachmetaproperty => {
          metainfo[eachmetaproperty] = _.get(value, eachmetaproperty);
        });
        var builder = new xml2js.Builder({
          rootName: key,
          xmldec: {
            version: "1.0",
            encoding: "UTF-8"
          }
        });
        var xml = builder.buildObject(metainfo);
        fs.writeFileSync(
          corerefroot + "/" + path.basename(fileName) + "-meta.xml",
          xml
        );
        _.each(config.tags, (configofkey, eachKey) => {
          let dataofkey = _.get(value, eachKey);
          _.each(dataofkey, eachdata => {
            name = _.get(eachdata, configofkey.nameTag);
            filename = _.template(configofkey.fileName)({ nameTag: name });
            var finalresult = false;
            _.each(configofkey.booleanTags, eachBooleanTag => {
              finalresult =
                finalresult ||
                theBooleanValue(_.first(eachdata[eachBooleanTag]));
            });
            if (finalresult || configofkey.booleanTags.length === 0) {
              const finalfilename = `${corerefroot}/${eachKey}/${filename}.${
                configofkey.fileFormat
              }`;
              if (configofkey.fileFormat === "xml") {
                fs.ensureFileSync(finalfilename);
                var builder = new xml2js.Builder({
                  rootName: eachKey,
                  xmldec: {
                    version: "1.0",
                    encoding: "UTF-8"
                  }
                });
                x = _.assign(
                  {
                    $: {
                      xmlns: "http://soap.sforce.com/2006/04/metadata"
                    }
                  },
                  eachdata
                );
                var xml = builder.buildObject(x);
                fs.writeFileSync(finalfilename, xml);
              } else if (configofkey.fileFormat === "json") {
                fs.ensureFileSync(finalfilename);
                let tobeusedtags = [];
                if (configofkey.booleanTags.length === 0) {
                  //labels
                  tobeusedtags = configofkey.allTags.filter(
                    i => i !== configofkey.nameTag
                  );
                } else {
                  tobeusedtags = configofkey.allTags.filter(
                    i =>
                      configofkey.booleanTags.indexOf(i) > -1 &&
                      i !== configofkey.nameTag
                  );
                }
                theobject = {};
                _.each(tobeusedtags, eachtag => {
                  theobject[eachtag] = _.first(_.get(eachdata, eachtag));
                });
                fs.writeJSONSync(finalfilename, theobject);
                //fs.writeFileSync(finalfilename, JSON.stringify(theobject));
              }
            }
          });
        });
      });
      resolve();
    });
  });
}

function isBooleanValue(data) {
  if (data && _.isString(data)) {
    var toprocess = data.toLowerCase().trim();
    switch (toprocess) {
      case "true":
      case "defaulton":
        return true;
      case "false":
      case "defaultoff":
      case "hidden":
        return true;
      default:
        false;
    }
  }
}

function theBooleanValue(data) {
  if (data && _.isString(data)) {
    var toprocess = data.toLowerCase().trim();
    switch (toprocess) {
      case "true":
      case "defaulton":
        return true;
      case "false":
      case "defaultoff":
      case "hidden":
        return false;
      default:
        false;
    }
  }
}

module.exports = splitFile;
