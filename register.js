const tsNode = require('ts-node');
const testTSConfig = require('./src/tests/tsconfig.json');

tsNode.register({
    files: true,
    transpileOnly: true,
    project: './src/tests/tsconfig.json'
});
