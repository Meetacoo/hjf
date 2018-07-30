const http = require('http');

const url = require('url');
const querystring = require('querystring');

const server = http.createServer((req,res)=>{
	// console.log(myURL);
	// console.log(req.method);
	if (req.method === 'POST') {
		let body = '';
		req.on('data',(chunk)=>{
			body += chunk;
		})；
		req.on('end',()=>{
			let obj = querystring.parse(body);
			console.log(obj);
			res.setHeader('Content-type','text/html;charset=UTF-8');
			res.end('ahfad');
		})
	}
	
	// console.log(req.url);
})
server.listen(3000,'127.0.0.1',()=>{
	console.log('server is running on 127.0.0.1:3000');
})