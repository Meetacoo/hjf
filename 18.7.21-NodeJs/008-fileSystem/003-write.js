// 请求核心模块，系统自带
const fs = require('fs');

// 打开文件
// w 为覆盖
// a 为追加
// 这个路径用来和请求系统的路径进行区分
//定义接收函数返回值    路径       模式 callback回调函数
let fd = fs.open('./001-test.txt','w',(err,fd)=>{
	// 进行判断 打开文件是否成功
	if (!err) { // 打开成功
		fs.write(fd,'写入内容2',(err)=>{
			if (!err) { // 写内容成功	
				console.log('write content success...');			
				fs.close(fd,(err)=>{
					if (!err) { // 关闭文件成功
						console.log('close file success...');
					} else {
						console.log('close file failed...');
					}
				})
			} else {
				console.log('write content fail');
			}
		});
	} else { // 打开文件失败
		console.log('open file failed...');
	}
});