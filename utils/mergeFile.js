const _ = require("lodash");
const fs = require("fs-extra");
const Promise = require("bluebird");
const path = require("path");
const xml2js = require("xml2js");
const klawSync = require("klaw-sync");
parser = new xml2js.Parser();

function mergeFile(srcfolder, targetfolder) {
  return new Promise((resolve, rejects) => {
    console.log(path.resolve(srcfolder), path.resolve(targetfolder));
    rootFolders = fs.readdirSync(path.resolve(srcfolder));
    const finalfile = _.first(_.first(rootFolders).split("-meta.xml"));
    let thefirsttag = "";
    const filterFn = item => path.extname(item.path) === ".xml";
    const paths = klawSync(srcfolder, {
      filter: filterFn
    });
    Promise.map(
      paths,
      pat => {
        return parseIndivFile(pat.path, rootFolders);
      },
      { concurrency: 3 }
    ).then(alldata => {
      const rootnode = _.first(alldata);
      let res = {};
      _.each(alldata, eachEntry => {
        firstkey = _.first(_.keysIn(eachEntry));
        if (_.has(res, firstkey)) res[firstkey].push(eachEntry[firstkey]);
        else res[firstkey] = [eachEntry[firstkey]];
      });
      thefirsttag = _.first(_.keysIn(rootnode));
      delete res[thefirsttag];
      finalres = _.assign(rootnode[thefirsttag], res);
      var builder = new xml2js.Builder({
        rootName: thefirsttag,
        xmldec: {
          version: "1.0",
          encoding: "UTF-8"
        }
      });
      var xml = builder.buildObject(finalres);
      fs.ensureFileSync(
        targetfolder + "/" + thefirsttag + "/" + finalfile,
        xml
      );
      fs.writeFileSync(targetfolder + "/" + thefirsttag + "/" + finalfile, xml);
      resolve();
    });
  });
}

function parseIndivFile(eachFile, rootFolders) {
  return new Promise((resolve, reject) => {
    parser.parseString(fs.readFileSync(eachFile), (err, data) => {
      parser.reset();
      _.omit(data, "$");
      resolve(data);
    });
  });
}

//mergeFile("temp/labels/CustomLabels.labels", "newtemp");
module.exports = mergeFile;
