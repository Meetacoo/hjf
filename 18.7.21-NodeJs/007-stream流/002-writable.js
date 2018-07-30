/*const stream = require('stream');
console.log(stream);*/

const {Writable} = require('stream');
// const Writable = require('stream').Writable;

class Write extends Writable{
	constructor(){
		super();
	}

	_write(chunk,encoding,callback){
		console.log(chunk.toString());
		callback();
	}
}

let writer = new Write();
writer.on('finish',()=>{
	console.log('finish...')
})
writer.write('test','utf8',()=>{
	console.log('hhh...');
})
writer.write('test2','utf8',()=>{
	console.log('hhh2...');
})
writer.end();
// console.log(Writable);
process.stdin.pipe(writer);