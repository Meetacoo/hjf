const fs = require('fs');

fs.writeFileSync('./001-test.txt','\nkfasdjg',{flag:'a'},(err)=>{
	if (!err) {
		console.log('write file success...');
	} else {
		console.log('write file failed...');
	}
});