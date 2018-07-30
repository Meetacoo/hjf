const EventEmitter = require('events');
class MyEmitter extends EventEmitter{

}
const myEmitter = new MyEmitter();
myEmitter.setMaxListeners(12);

// 添加事件
myEmitter.on('test',()=>{
	console.log('test1...');
})

// 添加事件，与 on 方法一样
myEmitter.addListener('test',()=>{
	console.log('test2...');
})
console.log(myEmitter.on === myEmitter.addListener); // true
// 添加完事件就移除，只触发一次
myEmitter.once('test',()=>{
	console.log('test3...');
})

myEmitter.emit('test');
myEmitter.emit('test');