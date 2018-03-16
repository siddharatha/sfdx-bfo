const _ = require("lodash");
const fs = require("fs-extra");
const Promise = require("bluebird");
const path = require("path");
const xml2js = require("xml2js");

function splitFile(fileName, targetFolder, config) {
  return new Promise((resolve, reject) => {
    const filedata = fs.readFileSync(fileName);
    var parser = new xml2js.Parser();
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
            // console.log(filename);
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

// splitFile(
//   "/Users/Sid/Work/sfdx-bfo/profiles/Admin.profile",
//   "/Users/Sid/Work/sfdx-bfo/",
//   {
//     tags: {
//       applicationVisibilities: {
//         nameTag: "application",
//         booleanTags: ["default", "visible"],
//         allTags: ["application", "default", "visible"],
//         oneFilePerTag: true,
//         fileName: "<%= nameTag %>.application",
//         fileFormat: "xml"
//       },
//       classAccesses: {
//         nameTag: "apexClass",
//         booleanTags: ["enabled"],
//         allTags: ["apexClass", "enabled"],
//         oneFilePerTag: false,
//         fileName: "<%= nameTag %>s.classAccesses",
//         fileFormat: "json"
//       },
//       customPermissions: {
//         nameTag: "name",
//         booleanTags: ["enabled"],
//         allTags: ["enabled", "name"],
//         oneFilePerTag: false,
//         fileName: "<%= nameTag %>s.customPermissions",
//         fileFormat: "json"
//       },
//       fieldPermissions: {
//         nameTag: "field",
//         booleanTags: ["editable", "readable"],
//         allTags: ["editable", "field", "readable"],
//         oneFilePerTag: true,
//         fileName: "<%= nameTag %>.fieldPermissions",
//         fileFormat: "xml"
//       },
//       objectPermissions: {
//         nameTag: "object",
//         booleanTags: [
//           "allowCreate",
//           "allowDelete",
//           "allowEdit",
//           "allowRead",
//           "modifyAllRecords",
//           "viewAllRecords"
//         ],
//         allTags: [
//           "allowCreate",
//           "allowDelete",
//           "allowEdit",
//           "allowRead",
//           "modifyAllRecords",
//           "object",
//           "viewAllRecords"
//         ],
//         oneFilePerTag: true,
//         fileName: "<%= nameTag %>.objectPermissions",
//         fileFormat: "xml"
//       },
//       pageAccesses: {
//         nameTag: "apexPage",
//         booleanTags: ["enabled"],
//         allTags: ["apexPage", "enabled"],
//         oneFilePerTag: false,
//         fileName: "<%= nameTag %>s.pageAccesses",
//         fileFormat: "json"
//       },
//       recordTypeVisibilities: {
//         nameTag: "recordType",
//         booleanTags: ["default", "visible"],
//         allTags: ["default", "recordType", "visible"],
//         oneFilePerTag: true,
//         fileName: "<%= nameTag %>.recordTypeVisibilities",
//         fileFormat: "xml"
//       },
//       tabVisibilities: {
//         nameTag: "tab",
//         booleanTags: ["visibility", "visible"],
//         allTags: ["tab", "visibility"],
//         oneFilePerTag: true,
//         fileName: "<%= nameTag %>.recordTypeVisibilities",
//         fileFormat: "xml"
//       },
//       userPermissions: {
//         nameTag: "name",
//         booleanTags: ["enabled"],
//         allTags: ["enabled", "name"],
//         oneFilePerTag: false,
//         fileName: "userPermissions",
//         fileFormat: "json"
//       },
//       layoutAssignments: {
//         nameTag: null,
//         booleanTags: [],
//         allTags: ["layout"],
//         oneFilePerTag: false,
//         fileName: "layoutAssignments",
//         fileFormat: "xml"
//       },
//       loginIpRanges: {
//         nameTag: null,
//         booleanTags: [],
//         allTags: ["endAddress", "startAddress"],
//         oneFilePerTag: false,
//         fileName: "loginIpRanges",
//         fileFormat: "xml"
//       }
//     },
//     metaTags: ["custom", "userLicense"],
//     files: "profiles/*.profile"
//   }
// ).then(() => console.log("test"));

module.exports = splitFile;
