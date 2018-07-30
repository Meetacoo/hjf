const http = require('http');
const url = require('url');
const util = require('util');
const path = require('path');
const fs = require('fs');
const querystring = require('querystring');
const mime = require('./mime.json');
const wishModule = require('./Module.js');

const server = http.createServer((req,res)=>{
	console.log("req.url:::",req.url);
    let reqUrl = url.parse(req.url,true);
 
    let pathname = reqUrl.pathname;
 
    let fileName = req.url;
     
    if(pathname === '/index.html' || pathname === '/'){//显示首页
        wishModule.get((err,data)=>{
            if(!err){
				let html = `<!DOCTYPE html>
							<html lang="en">
							<head>
								<meta charset="UTF-8">
								<title>许愿墙</title>
								<link rel="stylesheet" href="css/index.css">
							</head>
							<div class="container">
								<div class="wall fl">`
                     
					data.forEach((val)=>{
						    html += `<div class="wish" style="background: ${val.color}">
										<a href="#" class="close fr" data-id="${val.id}">X</a>
										${val.content}
									</div>`
					});
 
					html += `</div>
								<div class="form fr">
									<div class="wishbox">
										<textarea name="content" id="content" cols="30" rows="15" class="area"></textarea>
										<button class="btn">许愿</button>
									</div>
								</div>
							</div>
						</body>
						<script src="js/jquery-1.12.4.js"></script>
						<script src="js/jquery.pep.js"></script>
						<script src="js/index.js"></script>
						</html>`;
				res.setHeader('Content-Type','text/html;charset=UTF-8');
				res.end(html);  
			}else{
				console.log(err);
			}
		});             
    }else if(pathname === '/add' && req.method.toUpperCase() === 'POST'){
    	let body = '';
    	req.on('data',(chunk)=>{
    		body+=chunk;
    	});
    	req.on('end',()=>{
    		let obj = querystring.parse(body);
    		wishModule.add(obj,(err,data)=>{
    			let result = {};
    			if (!err) {
    				result = {
    					status:0,// 成功
    					data:data
    				}
				} else {
					result = {
						status:10,// 失败
						message:'添加失败'
					}
				}
				let resultJson = JSON.stringify(result);
				res.end(resultJson);
			})
		})
	}else if(pathname == '/del'){
		/*let body = '';
    	req.on('data',(chunk)=>{
    		body+=chunk;
    	});
    	req.on('end',()=>{*/
    		console.log(reqUrl.query.id);
    		wishModule.remove(reqUrl.query.id,(err,data)=>{
    			let result = {};
				if (!err) {
					result = {
						status:0// 成功
					}
					let resultJson = JSON.stringify(result);
					res.end(resultJson);
				}
			})
    	// })
	}
    else{
        //静态资源处理
        //如果用户的请求是文件夹的话,就返回文件夹下面的index.html
        if(fileName.lastIndexOf('.') == -1){//文件夹
            fileName = fileName + '/index.html';
        }
 
        let filePath = path.normalize(__dirname + '/static/'+fileName);
        let fileExtName = path.extname(filePath);

	    fs.readFile(filePath,(err,data)=>{
	        if(!err){
				let mimeType = mime[fileExtName] || 'text/plain';
				res.setHeader('Content-Type', mimeType+';charset=UTF-8');
				res.end(data);
			}else{
				res.setHeader('Content-Type', 'text/html;charset=UTF-8');
				res.statusCode = 404;
				res.end('<h1>页面走丢了。。。</h1>');
	        }
	    });     
	}
});
server.listen(3000,'127.0.0.1',()=>{
	console.log('server is running on 127.0.0.1:3000');
})