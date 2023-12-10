const newman = require('newman');

newman.run({
    collection: require('../../tools/postman/postman.json'),
    reporters: 'cli',
    iterationCount: 1, // repeat runs
    insecure: true // ignore because problem with self signed certs
}, (err) => {
    if (err) { throw err; }
    console.log('Collection run complete!');
});