const http = require('http');
/*// 利用WHATWG API解析一个URL字符串:
const { URL } = require('url');*/

const url = require('url');
const querystring = require('querystring');

const server = http.createServer((req,res)=>{
	/*// 利用WHATWG API解析一个URL字符串:
	const myURL = new URL('https://user:pass@sub.host.com:8080/p/a/t/h?query=string#hash');
	console.log(myURL.searchParams.get('query'));*/

	// console.log(myURL);
	console.log(querystring.parse(req.url));
	res.setHeader('Content-type','text/html;charset=UTF-8');
	res.end('ok');
	// console.log(req.url);
})
server.listen(3000,'127.0.0.1',()=>{
	console.log('server is running on 127.0.0.1:3000');
})