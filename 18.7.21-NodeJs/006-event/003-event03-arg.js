const EventEmitter = require('events');
class MyEmitter extends EventEmitter{

}
const myEmitter = new MyEmitter();
myEmitter.setMaxListeners(12);

myEmitter.on('test',(arg1,arg2)=>{
	console.log(this);
	console.log('test1...',arg1,arg2);
})
myEmitter.on('test',function(arg1,arg2){
	console.log(this);
	console.log('test1...',arg1,arg2);
})
console.log(myEmitter.listeners('test'));
myEmitter.emit('test','a','b');