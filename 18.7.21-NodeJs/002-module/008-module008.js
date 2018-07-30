// 核心模块，系统自定义，不用加路径，直接写文件名
/*const fs = require('fs');
console.log(fs);*/

// 自定义文件模块，引用时要加上 ‘./’ 表示是自己定义的模块
/*const m6 = require('./006-module006.js');
console.log(m6);*/

// const m9 = require('./009-module009.js');
// const m9 = require('D:\\LiyuWeb\\18.7.21-NodeJs\\002-module\\009-module009.js');
const m9 = require('./009-module009.node');
console.log(m9);