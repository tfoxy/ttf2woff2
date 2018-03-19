'use strict';
/* eslint-disable global-require */
try {
  module.exports = require('bindings')('addon.node').convert;
} catch(err) {
  module.exports = require('../jssrc/index.js');
}
