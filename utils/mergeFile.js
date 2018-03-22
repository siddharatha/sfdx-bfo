const _ = require("lodash");
const fs = require("fs-extra");
const Promise = require("bluebird");
const path = require("path");
const xml2js = require("xml2js");
const klawSync = require("klaw-sync");
parser = new xml2js.Parser();

function mergeFile(srcfolder, targetfolder, config) {  
  return new Promise((resolve, rejects) => {        
    rootFolders = fs.readdirSync(path.resolve(srcfolder));
    const finalfile = _.first(_.first(rootFolders).split("-meta."));
    rootFolders = rootFolders.filter(eachfolder => eachfolder.indexOf('-meta.') === -1);
    
    Promise.map(
      rootFolders,
      eachFolder => {        
        return parseIndivFolder(srcfolder, eachFolder, config.tags[eachFolder].nameTag, config.tags[eachFolder].booleanTags);
      },
      { concurrency: 3 }
    ).then(alldata => {      
            
      finalres = _.assign(...alldata, {
        $: { xmlns: "http://soap.sforce.com/2006/04/metadata" }
      });
      var builder = new xml2js.Builder({
        rootName: config.rootTag,
        xmldec: {
          version: "1.0",
          encoding: "UTF-8"
        }        
      });      
      var xml = builder.buildObject(finalres);
      var finalfilename = process.cwd() + "/" + config.key + "/" + finalfile;
      fs.ensureFileSync(
        finalfilename,
        xml
      );
      fs.writeFileSync(finalfilename, xml);
      resolve();
    });
  });
}

function parseIndivFolder(srcfolder,thefolder,thetag,booleantags) {
  return new Promise((resolve, reject) => {
    allfolders = fs.readdirSync(srcfolder+'/'+thefolder);
    var theresponse = {};
    theresponse[thefolder] = 
    _.filter(_.map(allfolders, eachFile => {
      let jsondata = fs.readJSONSync(srcfolder + '/' +thefolder+'/'+eachFile);
      let filename = path.basename(eachFile);
      let finalboolvalue = false;
      if (booleantags.length > 0) {
        _.each(booleantags, eachtag => {
          finalboolvalue = finalboolvalue || theBooleanValue(jsondata[eachtag])
        });
      }
      else finalboolvalue = true;
      if (finalboolvalue) {
        let myobject = {}
        myobject[thetag] = _.first(filename.split('.json'));
        return _.assign(myobject, jsondata);
      }
      else return null;
      }));
    resolve(theresponse);
  })
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

// mergeFile("/Volumes/sidharth/sfdx-bfo/smallerset/splits/profiles/SE - SRV Advanced User Lightning.profile", "../", {});
module.exports = mergeFile;
