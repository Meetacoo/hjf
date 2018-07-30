const http = require('http');
const server = http.createServer((req,res)=>{
	// req:可读流
	// res:可写流
	// res.setHeader('Content-type','text/html');
	// 文本
	// res.setHeader('Content-type','text/plain;charset=UTF-8');
	res.setHeader('Content-type','text/html;charset=UTF-8');
	// res.write('<h1>hello,world 你好</h1>');
	// res.write('<h1>hello,world 你好</h1>');
	res.end('<h1>hello,world 你好</h1>');
});
server.listen(3000,'127.0.0.1',()=>{
	console.log('running in 127.0.0.1:3000');
})
// console.log(server);
// console.log(http);