/*
  Simple API wrapper for TheGamesDB

  Original code from https://www.npmjs.com/package/thegamesdb-api,
  adapted to work with newer libraries

  http://wiki.thegamesdb.net/index.php?title=API_Introduction
*/

'use strict';

var parseString = require('xml2js').parseString;
var request = require('request');

var baseUrl = 'http://thegamesdb.net/api/';

var methods = [
  {name:'GetGame',            param:'id',       validator: parseInt},
  {name:'GetGamesList',       param:'name'},
  {name:'GetPlatform',        param:'id',       validator: parseInt},
  {name:'GetArt',             param:'id',       validator: parseInt},
  {name:'GetPlatformGames',   param:'platform', validator: parseInt},
  {name:'PlatformGames',      param:'platform', validator: parseInt},
  {name:'Updates',            param:'time',     validator: parseInt},
  {name:'GetPlatformsList'}
];

var requestWrapper = function (method, param, args, cb) {
  var requestString = baseUrl + method;

  if (param !== undefined && args[param] !== undefined) {
    requestString = requestString + '?' + param + '=' + args[param];
  }

  request(requestString, function(err, response, body) {
    if (!err) {
      if (response.statusCode == 200) {
        parseString(body, {explicitArray: false}, function(err, res) {
          if (err || !res) {
            cb(err, {});
          } else {
            cb(err, res.Data);
          }
        });
      } else {
        cb(new Error('Non 200 Response:' + response.statusCode));
      }
    } else {
      cb(err);
    }
  });
};

var createExport = function(name, param, validator) {
  module.exports[name] =  function(args, done) {
    if (param !== undefined) {
      if (args[param] === undefined) {
        done(new Error(name + '(): Parameter missing:' + param));
        return;
      }
      if (validator !== undefined && typeof(validator) === 'function') {
        if (!validator(args[param])) {
          done(new Error(name + '():' + param  + ' parameter validation failed. Invalid value: ' + args[param]));
          return;
        }
      }
    }

    requestWrapper(name + '.php', param, args, function(err, res) {
      if (err) {
        done(err);
      }
      else {
        done(undefined, res);
      }
    });
  }
};

// loop through all available methods
for (var i = 0; i < methods.length; i++) {
  var method = methods[i];

  createExport(method.name, method.param, method.validator);
}
