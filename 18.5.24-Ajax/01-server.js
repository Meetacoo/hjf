/*
//只要这些也可以，但是不完整
var http = require('http');
var server = http.createServer(function(req,res){
	res.end('hello nodejs');
}
server.listen(3000,'127.0.0.1',function(){
	console.log('server is running at http://127.0.0.1:3000');
})
*/

//创建一个模块
var http = require('http');
//创建一个读取文件的模块
var fs = require('fs');
//var 一个变量用来接收调用http上的createServer方法时返回的结果
//createServer接收的参数为一个函数，这个函数有两个参数
//参数一为接收的数据(req),参数二为返回的函数(res)
//res 上有一个end方法，end接收的参数为显示到浏览器(前端)的内容
var server = http.createServer(function(req,res){
	//html 可以解析 html的默认标签样式
	res.setHeader('Content-Type','text/html;charset = UTF-8');
	// res.setHeader('Content-Type','text/plain;charset = UTF-8');
	//plain为文本
	//为后端指明文件的地址，相对/绝对路径
	var filepath = './'+req.url;
	// console.log(req.url);

	//fs上有一个readFile方法，接收两个参数
	//第一个是文件地址，第二个是回调函数
	//回调函数中又接收两个参数，第一个参数为发生错误时怎么办，第二个参数是找到的文件
	//函数内判断是否为err，
	fs.readFile(filepath,function(err,date){
		console.log(req.url);
		if (err) {
			console.log('err::' + err);//err无具体意义i，发生什么错误，出现什么错误
			res.statusCode=404;//赋值
			//res 上有一个end方法，end接收的参数为显示到浏览器(前端)的内容
			//默认返回结果为HTML类型
			//res.end(<h1>hello nodejs</h1>);
			res.end('cannot found this file');
		}else{
			res.statusCode=200;
			res.end(date);
		}
	})
})
//监听server，启动服务，接受三个参数
//第一个为端口号,告诉浏览器要占用服务器的哪个端口
//第二个为地址，一般为127.0.0.1/localhost
//第三个为一个回调函数
server.listen(3000,'127.0.0.1',function(){//此回调函数可要可不要，主要作用为在终端中调用时显示的提示信息
	//一旦服务在浏览器上启用，就打印出这句话
	console.log('server is running at http://127.0.0.1:3000');
})