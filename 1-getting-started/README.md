The following describes how to create a project in Angular 2 using:
SystemJS module loader
JSPM package manager
TypeScript language
This tutorial assumes you have npm installed. If not, download and install node.js.

Follow these steps to learn how to build an Angular 2 app with TypeScript and JSPM:


Initial Setup
===
We will be using JSPM package manager to install dependencies and manage their versions. Start by installing JSPM globally:
```sh
npm install jspm -g
```

Now that we have JSPM installed we can start setting up the project. Create the folder for your project: "angular2-getting-started".
Go into the angular2-getting-started folder and initialise JSPM with the default configuration using TypeScript. You should accept most default settings and ask for the transpiler to be TypeScript.
```sh
cd angular2-getting-started
jspm init
```

Development Group > 01 Getting Started with Angular 2 > image2015-10-29 12:52:32.png

You can now open your IDE at this directory:
Development Group > 01 Getting Started with Angular 2 > image2015-10-29 13:2:52.png
This init process created a SystemJS config.js file, package.json with a single dependency on the TypeScript npm module, for transpiling TypeScript to JavaScript, and a folder called "jspm_packages" where all dependencies would reside.

From command line add the following dependencies, which are the bare minimum for creating an Angular 2 application:
jspm install reflect-metadata zone.js rxjs angular2
Look at the config.js and package.json to notice the changes JSPM made to create these dependencies. All the imported library dependencies are there as well, flattened. Notice that JSPM imported all required files into the jspm_packages folder.

Basic Application
Now we're ready to start creating some skeleton for our project. Let's create the index.html:
```html
<html>
<head>

    <meta charset="UTF-8">
    <title>Angular 2 Getting Started</title>

</head>
<body>

<h1>Angular Getting Started</h1>

<script src="jspm_packages/system.js"></script>
<script src="config.js"></script>
<script>
    System.import('app');
</script>

</body>
</html>
```

Create a folder named app and put the following main.ts TypeScript file in there. The TypeScript syntax is intentionally there to ensure it loads and uses the TypeScript transpiler properly when we test it.
```js
import 'zone.js/dist/zone.min.js';
import 'reflect-metadata';

var isDone:boolean = false; // some TypeScript syntax to confirm it is compiled properly
console.log("app script loaded successfully with typescript");
```

To successfully load and transpile TypeScript we need to update SystemJS's configuration with this option. Add the following snippet to the config.js, telling it to use ts as the default file extension and adds some TypeScript options:
```js
//...
typescriptOptions: {
  "module": "commonjs",
  "emitDecoratorMetadata": true
},
packages: {
  "app": {
    "main": "main",
    "defaultExtension": "ts"
  }
},
//...
```

Let's test our basic project. To run the project in a browser we'll be using a utility called live-server. It runs a local web server pointing at the development folder and refreshes the browser page automatically when it detects changes.
npm install -g live-server

Then, while in the root folder of our project run:
live-server
If you use IntelliJ, you can run it from the terminal pane:
Development Group > 01 Getting Started with Angular 2 > image2015-10-29 15:28:26.png

If everything went well you should see the following in your browser:
Development Group > 01 Getting Started with Angular 2 > image2015-10-29 14:55:18.png
You can copy the commands and code from the following screencast (select from the playing video - it works!):
<script type="text/javascript" src="https://asciinema.org/a/33561.js" id="asciicast-33561" async></script>

Adding Angular 2 Components
Let's add Angular 2 to the mix. Create a main component for our app in a new file: app-component.ts:
import {Component} from 'angular2/core'

@Component({
    selector: 'my-app',
    template: `<h3>{{title}}</h3>`
})
export class AppComponent {
    title:string = "Angular 2.0 is in the house.";
}

Add the component selector element to the index.html:
<h1>Angular Getting Started</h1>

<my-app>Loading...</my-app>

To bootstrap angular you should call the bootstrap method and pass it the main component. Update the main.ts file to look like this:
import 'zone.js/dist/zone.min.js';
import 'reflect-metadata';

import {bootstrap} from 'angular2/platform/browser';
import {AppComponent} from "./app-component";

bootstrap(AppComponent);

If you still have live-server running then the browser should refresh automatically:
Development Group > 01 Getting Started with Angular 2 > image2015-10-29 15:32:32.png
Building an Existing Application
There is no need to run through the above steps for every project and every machine. The only pre-requisite for running projects is having JSPM installed. Then, when you have it installed you can install all dependencies using "jspm install" in the folder of an existing project.
For example, clone https://github.com/InfomediaLtd/angular2-tutorial. Go into the angular2-getting-started and you'll see that it has no jspm packages:
Development Group > 01 Getting Started with Angular 2 > image2015-11-1 14:45:8.png
Install all the dependencies using jspm:
jspm install

Once the package installation process finishes all dependencies will show up in the jspm_packages folder and you can run "live-server" to test this project.
Development Group > 01 Getting Started with Angular 2 > image2015-11-1 14:46:55.png

The final code for this tutorial step can be found in the Angular Tutorial repository on GitHub.
Environment Settings
tsconfig.json
JSPM and SystemJS take care of the runtime facilities, but for IDE support, or if you ever want to compile the TypeScript files yourself you'll need a tsconfig.json configuration file that specifies the root files and the compiler options required to compile the project.
Create the following file in the root folder of your project:
{
  "compilerOptions": {
    "target": "ES5",
    "module": "commonjs",
    "sourceMap": true,
    "emitDecoratorMetadata": true,
    "experimentalDecorators": true,
    "removeComments": false,
    "noImplicitAny": false
  },
  "exclude": [
    "jspm_packages",
	"node_modules",
	"dist"
  ]
}
The exclusions above make sure we don't compile any of our dependencies that may reside in any of the specified folders.
We may add more options to this file, so let's also tell SystemJS to use the additional configuration in there by adding "tsconfig":true to the typescriptOptions section in config.js:
Development Group > 01 Getting Started with Angular 2 > image2015-12-28 11:24:25.png
IDE Configuration
Your IDE can also compile TypeScript for you and provide errors and warnings. IntelliJ can do that using its built-in TypeScript support. You'll need to enable it in the IDE settings:
Development Group > 01 Getting Started with Angular 2 > image2015-11-1 12:44:48.png

Library Resolution and Typings
Current version of TypeScript (1.7) does not support referencing files in custom locations (like jspm_packages in our case). Thus, it would still not identify Angular that resides in jspm_packages/npm/angular2@2.0.0-beta.0 (when using the beta version). Until this is resolved in version 1.8 (https://github.com/Microsoft/TypeScript/issues/5039), to work around this problem you will be using the npm package typings and place the libraries for auto completion under node_modules. The easiest way to do that is to add an npm dependency to your package.json:
npm install rxjs angular2 --save-dev
This will update your package.json npm file with the appropriate rxjs and angular2 versions and install the angular library under node_modules/angular2. Similarly, you can just copy these files to the required location manually (or create a symbolic link to the jspm_packages folder (but you should not do that!). It's an additional overhead required per library, but it should be resolved when the next TypeScript version is out.
Development Group > 01 Getting Started with Angular 2 > image2015-12-28 10:15:39.png

Another optional alternatives for TypeScript type resolution is to use the Typings project and provide d.ts definition files for all required libraries. You'll learn more about this option in the tutorial step 08 Dependency Typings

IDE Compilation and IntelliSense
If everything worked well you should be able to view documentation and drill down to the TypeScript implementation:
Development Group > 01 Getting Started with Angular 2 > image2015-12-28 10:7:56.png

Notice that now IntelliJ creates the JavaScript and source maps files in the same folders so you can actually view the outputted JS version of your TypeScript file:
Development Group > 01 Getting Started with Angular 2 > image2015-12-28 10:12:35.png
You should never check in these files. They are not supposed to be used for other purposes than reference for the developers in their IDE. In fact, these files are never loaded into the browser. Only the TypeScript files are loaded into the browser and getting transpiled on the fly:
Development Group > 01 Getting Started with Angular 2 > image2015-11-1 15:2:29.png
To avoid checking in these files make sure you ignore them along with jspm_packages and node_modules folders in your .gitignore:
build
dist
jspm_packages
node_modules
dev
out

*.iml
.idea/
.idea_modules/

.project
.classpath
.settings/

app/**/*.js
app/**/*.js.map

Alternatively, you can instruct the Typescript compiler to put these files somewhere else, for example a "build" folder. You can do that by adding the "outDir": "build" option to the tsconfig.json.

Debugging with Source Maps
Once our Typescript code is transpiled it's quite difficult to read and debug it in the browser. Source maps help us map the transpiled code to the original source file.
Add the following example code into the AppComponent:
constructor() { this.test1(); }
test1() {
    [1,2,3]
        .map(item =>
            `(${item})`)
        .filter(item =>
            item.length>1)
        .forEach(value =>
            console.log(value));
    const testObj = {a:1, b:2, c:3};
    const {a,b} = testObj;
    this.test2(a,b,testObj);
}
test2(a = 1, b = 2, {c = 3}) {
    console.log(a, b, c);
}
By default, the JSPM Typescript plugin will generate source maps so there is no additional step required for debugging this in the browser.
You can see that the original TypeScript file is loaded into the browser sources alongside the transpiled one:
Development Group > 01 Getting Started with Angular 2 > image2016-1-13 14:29:9.png
The transpiled code is still readable, but quite a bit different than the original code:
AppComponent.prototype.test1 = function () {
    [1, 2, 3]
        .map(function (item) {
        	return ("(" + item + ")"); })
        .filter(function (item) {
        	return item.length > 1; })
        .forEach(function (value) {
        	return console.log(value); });
    var testObj = { a: 1, b: 2, c: 3 };
    var a = testObj.a, b = testObj.b;
    this.test2(a, b, testObj);
};
AppComponent.prototype.test2 = function (a, b, _a) {
    if (a === void 0) { a = 1; }
    if (b === void 0) { b = 2; }
    var _b = _a.c, c = _b === void 0 ? 3 : _b;
    console.log(a, b, c);
};

Put a breakpoint anywhere in the original TypeScript source and try debugging the code:
Development Group > 01 Getting Started with Angular 2 > image2016-1-13 14:35:19.png






