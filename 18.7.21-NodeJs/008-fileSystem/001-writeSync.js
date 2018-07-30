const fs = require('fs');

// Sync 同步
// 打开文件
// w 为覆盖
// let fd = fs.openSync('./001-test.txt','w');
// a 为追加
let fd = fs.openSync('./001-test.txt','a');

// 写入内容
fs.writeSync(fd,'写入内容2');

// 保存并关闭
fs.closeSync(fd);

// console.log(fs);