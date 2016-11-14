const fs = require("fs");

const tsconfigString = fs.readFileSync("tsconfig.json","utf8");
const tsconfig = JSON.parse(tsconfigString).compilerOptions;

if (tsconfig.paths) {

    const configString = fs.readFileSync("config.js","utf8");
    const mapSectionStart = configString.indexOf("map");

    const paths = tsconfig.paths;
    for (path in paths) {
        //console.log(path);
        const locations = paths[path];
        locations.forEach(location => {
            const start = configString.indexOf(path,mapSectionStart);
            if (start>0) {
                const end = configString.indexOf(",",start);
                const pathConfig = configString.substring(start,end);
                const match = pathConfig.match(`${path}@.*"`);
                if (match && match.length>0) {
                    const matchingPath = match[0].substring(0,match[0].length-1);
                    //console.log("        "+matchingPath);

                    const updatedLocation;
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
