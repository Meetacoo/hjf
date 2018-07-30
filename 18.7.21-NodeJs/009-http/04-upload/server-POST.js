const http = require('http');

const url = require('url');
const querystring = require('querystring');
const formidable = require('formidable');
const util = require('util');
const path = require('path');
const fs = require('fs');

const server = http.createServer((req,res)=>{
	// console.log(myURL);
	// console.log(req.method);
	if (req.method.toUpperCase() === 'POST') {
		const form = new formidable.IncomingForm();
		form.uploadDir = './img/';
		form.keepExtensions = true;

		form.parse(req, (err, fields, files) => {
			// 改名
			let oldPath = './' + files.img.path;
			let extname = path.extname(oldPath);
			let newPath = './img/' + (new Date().getTime() + Math.random) + extname;
			
			fs.rename(oldPath,newPath,(err)=>{
				if (!err) {
					console.log('..')
					res.writeHead(200, {'content-type': 'text/plain'});
					res.write('received upload:\n\n');
					res.end(util.inspect({fields: fields, files: files}));
				}
			});
		});
	}
	
	// console.log(req.url);
});
server.listen(3000,'127.0.0.1',()=>{
	console.log('server is running on 127.0.0.1:3000');
})