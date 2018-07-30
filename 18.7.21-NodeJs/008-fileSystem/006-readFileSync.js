const fs = require('fs');

let fd = fs.readFileSync('./001-test.txt');
console.log(fd.toString());