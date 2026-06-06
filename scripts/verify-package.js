const assert = require('node:assert/strict');
const fs = require('node:fs');
const path = require('node:path');

const packageRoot = path.resolve(__dirname, '..');
const packageJson = require(path.join(packageRoot, 'package.json'));

assert.equal(packageJson.main, 'dist/swf.js');
assert.equal(packageJson.style, 'dist/swf.css');
assert.ok(fs.existsSync(path.join(packageRoot, packageJson.main)));
assert.ok(fs.existsSync(path.join(packageRoot, packageJson.style)));

const SWF = require(packageRoot);
assert.equal(typeof SWF, 'function');

console.log('Package entry points are valid.');
