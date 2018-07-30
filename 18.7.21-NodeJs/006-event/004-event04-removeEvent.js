const EventEmitter = require('events');
class MyEmitter extends EventEmitter{

}
const myEmitter = new MyEmitter();
myEmitter.setMaxListeners(12);
let fn1 = ()=>{
	console.log('test1...');
};

let fn2 = ()=>{
	console.log('test2...');
};

myEmitter.on('test',fn1);
myEmitter.on('test',fn2);

myEmitter.removeListener('test',fn1);

// 升级后的 node 10.0.0 版本可以用
// myEmitter.off('test',fn1);
console.log(myEmitter.removeListener === myEmitter.off); // node 升级为 10.0.0 后为true，现在为 false
myEmitter.emit('test');