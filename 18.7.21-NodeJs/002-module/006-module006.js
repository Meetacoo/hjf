let obj = {name:'baby',age:21};
let str = 'hey`~';
let fn = () => {
	console.log('fn...');
}
/*console.log(module);
console.log(module.exports);
console.log(exports);
console.log(module.exports === exports); // true*/
/*
module.exports.obj = obj;
module.exports.str = str;
module.exports.fn = fn;
console.log('module.exports.obj:::',module.exports.obj);
console.log('module.exports:::',module.exports);*/

exports.obj = obj;
exports.str = str;
exports.fn = fn;
console.log('exports.obj:::',exports.obj);
console.log('exports:::',exports);
// console.log(fn())
fn();