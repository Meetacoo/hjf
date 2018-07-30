const fs = require('fs');

const ws = fs.createWriteStream('./002-test.txt');
const rs = fs.createReadStream('./003-test.txt');

rs.pipe(ws);
// ws.end();