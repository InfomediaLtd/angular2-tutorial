var fs = require('fs');
var packageJson = JSON.parse(fs.readFileSync('package.json'));

var result = {"devDependencies": {},"ambientDevDependencies": {}};

// generate dt dependencies
(packageJson.typingsDependencies.registry||[]).forEach(value => {
    result.ambientDevDependencies[value] = "github:DefinitelyTyped/DefinitelyTyped/" + value + "/" + value + ".d.ts";
});

// generate local d.ts dependencies
(packageJson.typingsDependencies.file||[]).forEach((path) => {
    var dependencyName = path.replace(/@VERSION.*/, "");
    var parentPath = dependencyName.replace(/[^\/]*$/, "");
    var namePrefix = dependencyName.replace(parentPath,"");
    var matchingFolders = fs.readdirSync(parentPath)
                            .filter(name => name.startsWith(namePrefix+"@"))
                            .filter(name => fs.lstatSync(parentPath + "/" + name).isDirectory());
    if (matchingFolders.length > 0) {
        result.devDependencies[namePrefix] = "file:" + path.replace(/VERSION/, matchingFolders[0].replace(/.*@/,""));
    } else {
        console.log("Couldn't find a single match for '" + path + "' in " + parentPath);
    }
});

fs.writeFile("typings.json", JSON.stringify(result, null, 4), err => console.log(err||"Created typings.json"));
