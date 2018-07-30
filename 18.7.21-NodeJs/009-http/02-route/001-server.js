const http = require('http');
const fs = require('fs');
const server = http.createServer((req,res)=>{
	let filePath = req.url;
	// console.log(filePath);
	if (filePath === '/index.html') {
		fs.readFile('./index.html',(err,data) => {
			if (!err) {
				res.setHeader('Content-type','text/html;charset=UTF-8');
				res.end(data);
			} else {
				res.setHeader('Content-type','text/html;charset=UTF-8');
				res.statusCode = 404;
				res.end('页面走丢了');
			}
		})
	} else if (filePath === '/list.html') {
		fs.readFile('./list.html',(err,data) => {
			if (!err) {
				res.setHeader('Content-type','text/html;charset=UTF-8');
				res.end(data);
			} else {
				res.setHeader('Content-type','text/html;charset=UTF-8');
				res.statusCode = 404;
				res.end('页面走丢了');
			}
		})
	} else if (filePath === '/index.css') {
		fs.readFile('./index.css',(err,data) => {
			if (!err) {
				res.setHeader('Content-type','text/css;charset=UTF-8');
				res.end(data);
			} else {
				res.setHeader('Content-type','text/html;charset=UTF-8');
				res.statusCode = 404;
				res.end('页面走丢了');
			}
		})
	} else if (filePath === '/index.js') {
		fs.readFile('./index.js',(err,data) => {
			if (!err) {
				res.setHeader('Content-type','application/x-javascript;charset=UTF-8');
				res.end(data);
			} else {
				res.setHeader('Content-type','text/html;charset=UTF-8');
				res.statusCode = 404;
				res.end('页面走丢了');
			}
		})
	} else if (filePath === '/l-1.jpg') {
		fs.readFile('./l-1.jpg',(err,data) => {
			if (!err) {
				res.setHeader('Content-type','image/jpeg;charset=UTF-8');
				res.end(data);
			} else {
				res.setHeader('Content-type','text/html;charset=UTF-8');
				res.statusCode = 404;
				res.end('页面走丢了');
			}
		})
	}
	else {
		res.setHeader('Content-type','text/html;charset=UTF-8');
		res.statusCode = 404;
		res.end('页面不存在');
	}

	/*res.setHeader('Content-type','text/html;charset=UTF-8');
	res.write('<h1>hello,world 你好</h1>');
	res.end();*/
});
server.listen(3000,'127.0.0.1',()=>{
	console.log('running in 127.0.0.1:3000');
})