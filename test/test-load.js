/*global describe, beforeEach, it*/
'use strict';
var assert = require('assert');

describe('hapi generator', function () {
  it('can be imported without blowing up', function () {
    var app = require('../generators/app');
    assert(app !== undefined);
  });
});

describe('hapi module subgenerator', function () {
  it('can be imported without blowing up', function () {
    var app = require('../generators/module');
    assert(app !== undefined);
  });
});
