const assert = require('node:assert/strict');
const fs = require('node:fs');
const path = require('node:path');

const packageRoot = path.resolve(__dirname, '..');
const packageJson = require(path.join(packageRoot, 'package.json'));

// Entry point metadata
assert.equal(packageJson.main, 'dist/swf.js');
assert.equal(packageJson.style, 'dist/swf.css');
assert.ok(fs.existsSync(path.join(packageRoot, packageJson.main)));
assert.ok(fs.existsSync(path.join(packageRoot, packageJson.style)));

// All published artifacts must exist
const artifacts = ['dist/swf.js', 'dist/swf.min.js', 'dist/swf.css', 'dist/swf.min.css'];
for (const artifact of artifacts) {
    assert.ok(fs.existsSync(path.join(packageRoot, artifact)), `Missing distribution artifact: ${artifact}`);
}

// Artifacts must be fresher than the sources they were built from
const sources = ['src/js/swf.js', 'src/css/swf.css'];
for (const artifact of artifacts) {
    const artifactMtime = fs.statSync(path.join(packageRoot, artifact)).mtimeMs;
    for (const source of sources) {
        const sourceMtime = fs.statSync(path.join(packageRoot, source)).mtimeMs;
        assert.ok(
            artifactMtime >= sourceMtime,
            `Stale artifact: ${artifact} is older than ${source}. Run "npm run build" before publishing.`
        );
    }
}

// Source version comment must stay in sync with package metadata
const source = fs.readFileSync(path.join(packageRoot, 'src/js/swf.js'), 'utf8');
assert.ok(
    source.includes(`Version ${packageJson.version}`),
    `Version mismatch: src/js/swf.js header does not declare version ${packageJson.version}.`
);

// Constructor export interop
const SWF = require(packageRoot);
assert.equal(typeof SWF, 'function');
assert.equal(typeof SWF.initializeAll, 'function');

console.log('Package entry points are valid.');
console.log(`Version ${packageJson.version}: artifacts present, fresh, and in sync.`);
