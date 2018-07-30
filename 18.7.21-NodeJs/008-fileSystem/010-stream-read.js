const fs = require('fs');

const rs = fs.createReadStream('./003-test.txt');

let body = '';
rs.on('data',(chunk)=>{
	console.log(chunk.toString());

})
rs.on('end',()=>{
	console.log(body + chunk);
})
rs.pipe(ws);
ws.end();