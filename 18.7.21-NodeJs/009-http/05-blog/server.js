const http = require('http');
const url = require('url');
const util = require('util');
const path = require('path');
const fs = require('fs');
const mime = require('./mime.json');

const server = http.createServer((req,res)=>{
	let fileName = req.url;
	if (fileName.lastIndexOf('.') == -1) {
		fileName = fileName + '/index.html';
	}
	let filePath = path.normalize(__dirname + '/blog' + fileName);
	let fileExName = path.extname(filePath);

	// console.log(req.url);
	fs.readFile(filePath,(err,data)=>{
		let mimeName = mime[fileExName] || 'text/html';
		if (!err) {
			res.setHeader('content-type',mimeName+';charset=UTF-8');
			res.end(data);
		} else {
			res.setHeader('content-type','text/html;charset=UTF-8');
			console.log('err::',err);
			res.end('走丢了');
		}
	})
})
server.listen(3000,'127.0.0.1',()=>{
	console.log('server is running on 127.0.0.1:3000');
})