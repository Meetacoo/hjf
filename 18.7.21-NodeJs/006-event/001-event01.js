const EventEmitter = require('events');
// console.log(EventEmitter);
class MyEmitter extends EventEmitter{

}
const myEmitter = new MyEmitter();
// 如果有多个同名监听事件，则会报警告
// 解决方法,设置最大同名监听数:
myEmitter.setMaxListeners(12);

myEmitter.on('test',()=>{
	console.log('test1...');
})
myEmitter.on('test',()=>{
	console.log('test2...');
})
myEmitter.on('test',()=>{
	console.log('test3...');
})
myEmitter.on('test',()=>{
	console.log('test4...');
})
myEmitter.on('test',()=>{
	console.log('test5...');
})
myEmitter.on('test',()=>{
	console.log('test6...');
})
myEmitter.on('test',()=>{
	console.log('test7...');
})
myEmitter.on('test',()=>{
	console.log('test8...');
})
myEmitter.on('test',()=>{
	console.log('test9...');
})
myEmitter.on('test',()=>{
	console.log('test10...');
})
myEmitter.on('test',()=>{
	console.log('test11...');
})
myEmitter.on('test',()=>{
	console.log('test12...');
})
myEmitter.emit('test');