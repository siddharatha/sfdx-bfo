const _ = require("lodash");
const fs = require("fs-extra");
const Promise = require("bluebird");
const path = require("path");
const xml2js = require("xml2js");

function splitFile(fileName, targetFolder) {
  return new Promise((resolve, reject) => {
    console.log(`processing file ${fileName}`);
    const filedata = fs.readFileSync(fileName);
    var parser = new xml2js.Parser();
    parser.parseString(filedata, function(err, result) {
      const root =
        targetFolder + "/" + _.last(path.extname(fileName).split("."));
      fs.ensureDirSync(root);
      const corerefroot = root + "/" + path.basename(fileName);
      let thefirstitemofthekey;
      fs.ensureDirSync(corerefroot);
      fs.ensureFileSync(
        corerefroot + "/" + path.basename(fileName) + "-meta.xml"
      );
      let folderStructure = {
        rootFolder: path.basename(fileName),
        subfolders: [],
        metafileproperties: []
      };
      _.each(result, (value, key) => {        
        _.each(_.keysIn(value), eachKey => {
          thefirstitemofthekey = _.first(value[eachKey]);
          // console.log(thefirstitemofthekey);
          if (_.isObject(thefirstitemofthekey)) {
            fs.ensureDirSync(corerefroot + "/" + eachKey);
            let filenamevar = _.filter(
              _.keys(thefirstitemofthekey),
              keyname =>
                !isBooleanValue(_.first(_.get(thefirstitemofthekey, keyname)))
            );
            let booleanvars = _.filter(_.keys(thefirstitemofthekey), keyname =>
              isBooleanValue(_.first(_.get(thefirstitemofthekey, keyname)))
            );
            if (booleanvars.length === 0)
              folderStructure.metafileproperties.push(eachKey);                        
            else if (_.isArray(filenamevar) && filenamevar.length === 1) {
              folderStructure.subfolders.push({
                folderName: eachKey,
                fileNamekey: _.first(filenamevar),
                booleanvars: booleanvars,
                allvars: _.keysIn(thefirstitemofthekey)
              });
            } else if (
              _.isArray(filenamevar) &&
              _.find(filenamevar, eachfilename => eachfilename === "fullName")
            ) {
              folderStructure.subfolders.push({
                folderName: eachKey,
                fileNamekey: "fullName",
                booleanvars: booleanvars,
                allvars: _.keysIn(thefirstitemofthekey)
              });
            } else {
              folderStructure.metafileproperties.push(eachKey);
              console.log(eachKey,_.keysIn(thefirstitemofthekey))
            }
          } else {
            folderStructure.metafileproperties.push(eachKey);
            console.log(eachKey,_.keysIn(thefirstitemofthekey));
          }
        });
        debugger;
        fs.writeFileSync(`${root}.json`, JSON.stringify(folderStructure, null, 2));
        
        var metainfo = {};
        _.each(folderStructure.metafileproperties, eachmetaproperty => {
          // console.log(_.get(value, eachmetaproperty));
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

        _.each(folderStructure.subfolders, eachSubFolder => {
          dataofkey = _.get(value, eachSubFolder.folderName);          
          _.each(dataofkey, eachdata => {
            filename = _.get(eachdata, eachSubFolder.fileNamekey);
            var finalresult = false;
            _.each(eachSubFolder.booleanvars, eachBooleanVar => {
              // console.log(finalresult, theBooleanValue(_.first(eachdata[eachBooleanVar])), eachdata[eachBooleanVar],eachdata,eachBooleanVar);
              finalresult = finalresult || theBooleanValue(_.first(eachdata[eachBooleanVar]));
            });
            if (finalresult) {
              const finalfilename =
                corerefroot +
                "/" +
                eachSubFolder.folderName +
                "/" +
                filename +
                ".xml";
              fs.ensureFileSync(finalfilename);
              var builder = new xml2js.Builder({
                rootName: eachSubFolder.folderName,
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
            }
          });
        });
      });
      console.log(`Finished processing file ${fileName}`);
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

// splitFile("/Volumes/sidharth/sfdx-bfo/smallerset/profiles/SE - CCC Standard User.profile", "/Volumes/sidharth/sfdx-bfo/splits").then(() =>
//   console.log("test")
// );

module.exports = splitFile;
