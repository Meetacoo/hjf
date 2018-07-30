const EventEmitter = require('events');

class LikeReadable extends EventEmitter{
	constructor(data,offsetLength){
		super();
		this.data = data;
		this.offsetLength = offsetLength;
		this.on('newListener',(eventName)=>{
			if (eventName == 'data') {
				setImmediate(()=>{
					this._dispath();
				})
			}
		})
	}
	_dispath(){
		// console.log(this.data,this.offsetLength);
		let totalLength = this.data.length;
		let restLength = totalLength;
		while (restLength > 0){
			let start = totalLength - restLength;
			let end = start + this.offsetLength;
			let tmp = this.data.slice(start,end);
			let buf = Buffer.from(tmp);
			// 
			this.emit('data',buf);
			restLength -= this.offsetLength;
		}
		this.emit('end');
	}
}
let data = 'aaaaaaaaaabbbbbbbbbb';
const likers = new LikeReadable(data,5);

likers.on('data',(chunk)=>{
	console.log(chunk.toString());
})
likers.on('end',()=>{
	console.log('no data...');
})