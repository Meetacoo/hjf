const fs = require('fs');

const ws = fs.createWriteStream('./002-test.txt');

ws.on('open',()=>{
	console.log('open...');
})
ws.on('finish',()=>{
	console.log('finished...');
})
ws.on('close',()=>{
	console.log('closed...')
})

ws.write('aaa');
ws.write('\nbbb');
ws.end();