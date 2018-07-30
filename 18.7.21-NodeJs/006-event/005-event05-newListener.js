const EventEmitter = require('events');

class MyEmitter extends EventEmitter{

}

const myEmitter = new MyEmitter();

let fn1 = ()=>{
	console.log('test1...');
};
let fn2 = ()=>{
	console.log('test2...');
};

// 只要监听任一事件就会触发 newListener 事件
myEmitter.on('newListener',(eventName,callback)=>{
	console.log('newListener',eventName,callback);
	// 可通过回调函数触发事件
	callback();
});

myEmitter.on('test1',fn1);
myEmitter.on('test2',fn2);

// myEmitter.emit('test');