'use strict';
require('node-jsx').install();
var path = require('path'),
    fs = require('fs'),
    components = {};

var componentsPath = path.join(__dirname, 'components');

try {
  fs.readdirSync(componentsPath).forEach(function(file) {
    console.log(file);
    components[file] = require(componentsPath + '/' + file);
  });
} catch (e) {
  console.log('Error', e);
}

module.exports = components;
