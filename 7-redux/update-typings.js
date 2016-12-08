const fs = require("fs");

var tsconfigString = fs.readFileSync("tsconfig.json","utf8");
const tsconfig = JSON.parse(tsconfigString).compilerOptions;

if (tsconfig.paths) {

    const configString = fs.readFileSync("config.js","utf8");
    const mapSectionStart = configString.indexOf("map");

    const paths = tsconfig.paths;
    for (path in paths) {
        //console.log(path);
        var locations = paths[path];
        locations.forEach(location => {
            var start = configString.indexOf(path,mapSectionStart);
            if (start>0) {
                var end = configString.indexOf(",",start);
                var pathConfig = configString.substring(start,end);
                var match = pathConfig.match(`${path}@.*"`);
                if (match && match.length>0) {
                    var matchingPath = match[0].substring(0,match[0].length-1);
                    //console.log("        "+matchingPath);

                    var updatedLocation;
                    if (location.match(new RegExp(`${path}@.*(["'/])`,'g'))) {
                        updatedLocation = location.replace(new RegExp(`${path}@.*(["'/])`,'g'),`${matchingPath}$1`);
                    } else {
                        updatedLocation = location.replace(new RegExp(`${path}@.*$`,'g'),`${matchingPath}`);
                    }
                    //console.log("        " + location + " -> " + updatedLocation)

                    // replace in tsconfig
                    tsconfigString = tsconfigString.replace(location,updatedLocation)                    
                }
            }
        });
    }
}
//console.log(tsconfigString);
fs.writeFile("tsconfig.json", tsconfigString, err => console.log(err||"Updated tsconfig.json"));
