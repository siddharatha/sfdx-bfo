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
      const root = path.resolve(targetFolder) + "/" + path.dirname(fileName);
      fs.ensureDirSync(root);
      const corerefroot = root + "/" + path.basename(fileName);
      let thefirstitemofthekey;
      fs.ensureDirSync(corerefroot);
      _.each(result, (value, key) => {
        let metainfo = {};
        _.each(config.metaTags, eachmetaproperty => {
          metainfo[eachmetaproperty] = _.first(_.get(value, eachmetaproperty));
        });
        var builder = new xml2js.Builder({
          rootName: key,
          xmldec: {
            version: "1.0",
            encoding: "UTF-8"
          }
        });
        var xml = builder.buildObject(metainfo);
        if (config.fileformat === "xml")
          fs.writeFileSync(
            corerefroot + "/" + path.basename(fileName) + "-meta.xml",
            xml
          );
        else
          fs.writeJSONSync(
            corerefroot + "/" + path.basename(fileName) + "-meta.json",
            metainfo,
            {
              spaces: 2
            }
          );
        _.each(config.tags, (configofkey, eachKey) => {
          let dataofkey = _.get(value, eachKey);
          let thearray = [];
          let booleanstuff = {};
          _.each(dataofkey, eachdata => {
            name = _.get(eachdata, configofkey.nameTag);
            filename = _.template(configofkey.fileName)({
              nameTag: name
            });
            var finalresult = false;
            if (config.trueconfig) {
              var finalresult = false;
              if (config.trueconfig)
                _.each(configofkey.booleanTags, eachBooleanTag => {
                  finalresult =
                    finalresult ||
                    theBooleanValue(_.first(eachdata[eachBooleanTag]));
                });
            } else {
              finalresult = true;
            }
            if (filename.indexOf("*") === -1) {
              if (finalresult || configofkey.booleanTags.length === 0) {
                if (configofkey.oneFilePerTag) {
                  const finalfilename = `${corerefroot}/${eachKey}/${filename}.${
                    config.fileformat
                  }`;
                  fs.ensureFileSync(finalfilename);
                  if (config.fileformat === "xml") {
                    var builder = new xml2js.Builder({
                      rootName: eachKey,
                      xmldec: {
                        version: "1.0",
                        encoding: "UTF-8"
                      }
                    });
                    towritetofile = generateInfoFromConfig(
                      configofkey,
                      eachdata
                    );
                    var xml = builder.buildObject(towritetofile);
                    fs.writeFileSync(finalfilename, xml);
                  } else if (config.fileformat === "json") {
                    towritetofile = generateInfoFromConfig(
                      configofkey,
                      eachdata
                    );
                    fs.writeJSONSync(finalfilename, towritetofile, {
                      spaces: 2
                    });
                  }
                } else {
                  booleanstuff = generateInfoFromConfig(configofkey, eachdata);
                  if (configofkey.nameTag && configofkey.nameTag != "null")
                    thearray.push(_.get(eachdata, configofkey.nameTag));
                  else {
                    thedata = {};
                    _.each(configofkey.allTags, eachtag => {
                      thedata[eachtag] = _.first(eachdata[eachtag]);
                    });
                    if (!_.isEmpty(thedata)) thearray.push(thedata);
                  }
                }
              }
            }
          });
          if (!_.isEmpty(thearray)) {
            const finalfilename = `${corerefroot}/${eachKey}/${filename}.${
              config.fileformat
            }`;
            fs.ensureFileSync(finalfilename);
            myobject = {};
            if (configofkey.nameTag && configofkey.nameTag != "null")
              myobject[configofkey.nameTag] = _.flatten(thearray);
            else myobject = _.flatten(thearray);
            myobject = _.assign(myobject, booleanstuff);
            fs.writeJSONSync(finalfilename, myobject, {
              spaces: 2
            });
          }
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

function generateInfoFromConfig(configofkey, eachdata) {
  let tobeusedtags = [];
  if (configofkey.booleanTags.length === 0) {
    //labels
    tobeusedtags = configofkey.allTags.filter(i => i !== configofkey.nameTag);
  } else {
    tobeusedtags = configofkey.allTags.filter(
      i => configofkey.booleanTags.indexOf(i) > -1 && i !== configofkey.nameTag
    );
  }
  theobject = {};
  _.each(tobeusedtags, eachtag => {
    theobject[eachtag] = _.first(_.get(eachdata, eachtag));
  });
  return theobject;
}

module.exports = splitFile;
