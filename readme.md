# Waste Export Controls Tool
This tool helps you to identify the appropriate classification for waste which is intended for export and the regulatory controls which apply to exports of those wastes to certain countries.

# Environment variables
(Be sure to describe any environment variables here by maintaining a list like this)

| name     | description      | required | default |            valid            | notes |
|----------|------------------|:--------:|---------|:---------------------------:|-------|
| NODE_ENV | Node environment |    no    |         | development,test,production |       |
| PORT     | Port number      |    no    | 3000    |                             |       |

# Prerequisites

Node v8+

# Running the application

First build the application using:

`$ npm install`

Currently this will install the required packages and build the `govuk-frontend` sass.

Now the application is ready to run:

`$ npm start` or `$ node index.js`

## Getting started

Clone this repo and run through the checklist above.

Check the server is running by pointing your browser to `http://localhost:3000`

## Project structure

Here's the default structure of the project files.

* **bin** (build tasks)
* **client** (client js/sass code)
* **server**
  * **plugins**
  * **public**  (This folder is publicly served)
    * **static** (Put all static assets in here)
    * **build** (This contains the build output files (js/css etc.) and is not checked-in)
  * **routes**
  * **views**
  * config.js
  * index.js (Exports a function that creates a server)
* **test**
* README.md
* index.js (startup server)

## Config

The configuration file for the server is found at `server/config.js`.
This is where to put any config and all config should be read from the environment.
The final config object should be validated using joi and the application should not start otherwise.

A table of environment variables should be maintained in this README.

## Plugins

hapi has a powerful plugin system and all server code should be loaded in a plugin.

Plugins live in the `server/plugins` directory.

## Logging

The [good](https://github.com/hapijs/good) and [good-console](https://github.com/hapijs/good-console) plugins are included and configured in `server/plugins/logging`

The logging plugin is only registered in when `NODE_ENV=development`.

Error logging for production should use errbit.

## Views

The [vison](https://github.com/hapijs/vision) plugin is used for template rendering support.

The template engine used in nunjucks inline with the GDS Design System with support for view caching, layouts, partials and helpers.

## Static files

The [Inert](https://github.com/hapijs/inert) plugin is used for static file and directory handling in hapi.js.
Put all static assets in `server/public/static`.

Any build output should write to `server/public/build`. This path is in the `.gitignore` and is therefore not checked into source control.

## Routes

Incoming requests are handled by the server via routes. 
Each route describes an HTTP endpoint with a path, method, and other properties.

Routes are found in the `server/routes` directory and loaded using the `server/plugins/router.js` plugin.

Hapi supports registering routes individually or in a batch.
Each route file can therefore export a single route object or an array of route objects.

A single route looks like this:

```js
{
  method: 'GET',
  path: '/hello-world',
  options: {
    handler: (request, h) => {
      return 'hello world'
    }
  }
}
```

There are lots of [route options](http://hapijs.com/api#route-options), here's the documentation on [hapi routes](http://hapijs.com/tutorials/routing)

## Tasks

Build tasks are created using simple shell scripts or node.js programs.
The default ones are found in the `bin` directory.

The task runner is simply `npm` using `npm-scripts`.

The predefined tasks are:

- `npm run build` (Runs all build sub-tasks)
- `npm run build:css` (Builds the client-side sass)
- `npm run lint` (Runs the lint task using standard.js)
- `npm run unit-test` (Runs the `lab` tests in the `/test` folder)
- `npm test` (Runs the `lint` task then the `unit-tests`)

## Testing

[lab](https://github.com/hapijs/lab) and [code](https://github.com/hapijs/code) are used for unit testing.

See the `/test` folder for more information.

## Linting

[standard.js](http://standardjs.com/) is used to lint both the server-side and client-side javascript code.

It's defined as a build task and can be run using `npm run lint`.
