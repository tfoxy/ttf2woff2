'use strict';

/* eslint-disable no-console */

var fs = require('fs');
var path = require('path');
// var spawn = require('cross-spawn');
var spawn = require('child_process').spawn;

function build() {
  var args = [require.resolve(path.join('node-gyp', 'bin', 'node-gyp.js')), 'rebuild', '--verbose'];
  var proc;

  console.log('Building:', [process.execPath].concat(args).join(' '));

  proc = spawn(process.execPath, args, {
    stdio: [0, 1, 2],
  });

  proc.on('exit', function spawnCallback(errorCode) {
    if (!errorCode) {
      console.log('Installed successfully!');
      return;
    }

    if (127 === errorCode) {
      console.error('node-gyp not found!');
    } else {
      console.error('Build failed with error code:', errorCode);
    }

    process.exit(1);
  });
}

function testBinary() {
  var binaryPath = path.join(__dirname, 'build', 'Release', 'addon.node');

  if (!fs.existsSync(binaryPath)) {
    build();
  }
}

testBinary();
