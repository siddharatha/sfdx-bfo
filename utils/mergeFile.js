const _ = require("lodash");
const fs = require("fs-extra");
const Promise = require("bluebird");
const path = require("path");
const xml2js = require("xml2js");
const klawSync = require('klaw-sync')
parser = new xml2js.Parser()


function mergeFile(srcfolder, targetfolder) {
    return new Promise((resolve, rejects) => {
        console.log(path.resolve(srcfolder), path.resolve(targetfolder));
        rootFolders = fs.readdirSync(path.resolve(srcfolder));
        const filterFn = item => path.extname(item.path) === '.xml'
        const paths = klawSync(srcfolder, {
            filter: filterFn
        });
        Promise.map(paths, pat => {
            return parseIndivFile(pat.path, rootFolders)
            },{concurrency:3})
            .then(alldata => {
                const root = alldata[0];
                let res = {};
                _.each(alldata, eachEntry => {
                    firstkey = _.first(_.keysIn(eachEntry));
                    if (_.has(res, firstkey))
                        res[firstkey].push(eachEntry[firstkey]);
                    else
                        res[firstkey] = [eachEntry[firstkey]];
                });
                debugger;
                fs.writeFileSync('test.json', JSON.stringify(alldata, null, 2));
                resolve();
            })

    })
}

function parseIndivFile(eachFile, rootFolders) {
    return new Promise((resolve, reject) => {
        parser.parseString(fs.readFileSync(eachFile), (err, data) => {
            parser.reset();
            //rootFolders.indexOf(Object.keys(data)[0])
            resolve(data);
        });
    })
}

mergeFile('temp/profile/Admin.profile', 'newtemp')
//module.exports = mergeFile;