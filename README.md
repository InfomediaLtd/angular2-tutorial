## Angular 2 Tutorial

Step by step tutorial for getting started with Angular 2 and JSPM.

[![asciicast](https://asciinema.org/a/33561.png)](https://asciinema.org/a/33561)

The folders below should be loaded as separate projects and include all the required files to run a specific step in the tutorial. Each folder represents a separate learning block in the road to fully understand how to create an Angular 2 application.

### Requirements

You need to have [Node.js] installed for using NPM.

[JSPM] for managing the packages

```sh
npm install jspm
```

[live-server] for testing out in a browser

```sh
npm install live-server
```


### How to try out the tutorial steps

1. Clone the repository.
2. Go into any of the tutorial step folders
3. Install dependencies with JSPM
4. Run live-server
5. Open your browser and browse to [http://127.0.0.1:8080]

```sh
git clone https://github.com/InfomediaLtd/angular2-tutorial
cd angular2-tutorial/1-getting-started
jspm install
live-server
```

[//]: # (reference links)
[Node.js]: <https://nodejs.org/en/download/>
[JSPM]: <http://jspm.io/>
[live-server]: <https://www.npmjs.com/package/live-server>
[http://127.0.0.1:8080]: <http://127.0.0.1:8080>