//创建一个模块
var http = require('http');
//创建一个读取文件的模块
var fs = require('fs');
var url = require('url');
var server = http.createServer(function(req,res){
	//html 可以解析 html的默认标签样式
	res.setHeader('Content-Type','text/html;charset = UTF-8');
	var filepath = './'+req.url;
	var urlStr = req.url;
	//直接返回
	if (urlStr == '/favicon.ico') {
		res.statusCode=404;//赋值
		res.end();
	}
	//
	if (urlStr.search(/\?/) != -1) {
		var prams = url.parse(urlStr,true).query;
		var pramsStr = JSON.stringify(prams);
		res.statusCode=200;
		res.end(pramsStr);
	}

	fs.readFile(filepath,function(err,date){
		// console.log(req.url);
		if (err) {
			console.log('err::' + err);
			res.statusCode=404;//赋值
			res.end('cannot found this file');
		}else{
			res.statusCode=200;
			res.end(date);
		}
	})
})
server.listen(3000,'127.0.0.1',function(){
	//一旦服务在浏览器上启用，就打印出这句话
	console.log('server is running at http://127.0.0.1:3000');
})