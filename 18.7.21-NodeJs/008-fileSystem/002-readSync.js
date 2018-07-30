const fs = require('fs');

// Sync 同步
// 打开文件
// r 为read
let fd = fs.openSync('./001-test.txt','r');

let buf = Buffer.alloc(100);

// 读内容
fs.readSync(fd,buf,0,100,0);

console.log(buf.toString());

fs.closeSync(fd);