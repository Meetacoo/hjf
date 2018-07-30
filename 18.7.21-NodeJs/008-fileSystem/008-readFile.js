const fs = require('fs');

fs.readFile('./001-test.txt',(err,data)=>{
	if (!err) {
		console.log('read file success...');
		console.log(data.toString());
	} else {
		console.log('read file failed...');
	}
});
