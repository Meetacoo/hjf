//创建一个模块
var http = require('http');
//创建一个读取文件的模块
var fs = require('fs');
//创建一个读取地址的模块
var url = require('url');
var querystring = require('querystring');
// console.log('querystring::',querystring);
var server = http.createServer(function(req,res){
	//html 可以解析 html的默认标签样式
	res.setHeader('Content-Type','text/html;charset = UTF-8');
	//跨域
	// res.setHeader('Access-Control-Allow-Origin','http://127.0.0.1:3000');
	res.setHeader('Access-Control-Allow-Headers','text');
	var urlStr = req.url;
	//直接返回
	if (urlStr == '/favicon.ico') {
		res.statusCode=404;//赋值
		res.end();
	}
	console.log(req.method);
	//
	if (req.method == 'post') {
		var body = '';
		req.on('data',function(chunk){
			body += chunk;
		});
		req.on('end',function(){
			console.log(body);
			var bodyObj = querystring.parse(body);
			var strBody = JSON.stringify(bodyObj);
			res.statusCode = 200;
			res.end(strBody);
		});
	}else{
		if (urlStr.search(/\?/) != -1) {
			var prams = url.parse(urlStr,true).query;
			var pramsStr = JSON.stringify(prams);
			res.statusCode=200;
			res.end(pramsStr);
		}
		var filepath = './'+urlStr;
		fs.readFile(filepath,function(err,date){
			// console.log(req.url);
			if (err) {
				console.log('err::' + err);
				res.statusCode=404;//赋值
				res.end('cannot found this file');
			}else{
				res.statusCode=200;
				
				res.end(date);
				/*
				//模拟失败
				steTimeout(function(){
					res.end(date);
				},2000)
				*/
			}
		})
	}
})

server.listen(3000,'127.0.0.1',function(){
	//一旦服务在浏览器上启用，就打印出这句话
	console.log('server is running at http://127.0.0.1:3000');
})