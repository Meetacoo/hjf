const {Readable} = require('stream');
class myReadStream extends Readable{
	constructor(){
		super();
		this.index = 0;
	}

	_read(chunk,callback){
		++this.index;
		if(this.index > 5){
			this.push(null);
		} else {
			let str = '' + this.index;
			let buf = Buffer.from(str);
			this.push(buf);
		}
		console.log(this.index);
	}
}

const rs = new myReadStream();
rs.read('data',()=>{
	console.log('read...')
});