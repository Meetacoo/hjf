const fs = require('fs');

// 打开文件
// w 为覆盖
// a 为追加
let fd = fs.open('./001-test.txt','r',(err,fd)=>{
	if (!err) { // 打开成功
		console.log('open file success...');
		let buf = Buffer.alloc(100);
		fs.read(fd,buf,0,100,0,(err)=>{
			if (!err) { // 读取成功
				console.log('read file success...');
				console.log(buf.toString());
				fs.close(fd,(err)=>{
					if (!err) { // 关闭成功
						console.log('close file success...');
					}else{
						console.log('close file failed...');
					}
				})
			} else {
				console.log('read file failed...');
			}
		})
	} else {
		console.log('open file failed...');
	}
});