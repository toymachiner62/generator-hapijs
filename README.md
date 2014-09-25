# generator-hapi [![Build Status](https://secure.travis-ci.org/toymachiner62/generator-hapijs.png?branch=master)](https://travis-ci.org/toymachiner62/generator-hapijs) [![Code Climate](https://codeclimate.com/github/toymachiner62/generator-hapijs/badges/gpa.svg)](https://codeclimate.com/github/toymachiner62/generator-hapijs) 

> [Yeoman](http://yeoman.io) generator for scaffolding [Hapijs](http://hapijs.com) modules 


## Getting Started

### Installation

To install generator-hapi from npm, run:

```bash
$ npm install -g generator-hapijs
```

### Generated Directory Structure

This hapijs generator assumes that you want your project structure to look like this:

```bash
-project
--module
---module-ctrl.js
---module-dao.js
---module-routes.js
---module-test.js
```

### Usage

#### Main
>Scaffolds out a hapijs project.

```bash
$ yo hapijs  
```

#### Module
>Scaffolds out a module to an existing hapijs project
```bash
$ yo hapijs:module foo  
```

#### Route
>Scaffolds out a new route/ctrl/dao for an existing module
```bash
$ yo hapijs:route foo  
```

## Contributing

To run tests:

```js
npm test
```

To install your local version of this package rather than the NPM published version:
```js
npm link
```
