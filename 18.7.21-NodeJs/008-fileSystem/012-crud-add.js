const fs = require('fs');

const filePath = './004-add.json';

let add = (id,name,callback)=>{
	fs.readFile(filePath,(err,data)=>{
		if (!err) {
			let obj = JSON.parse(data);
			obj.push({
				'id':id,
				'name':name
			});
			let str = JSON.stringify(obj);
			// console.log(obj);
			fs.writeFile(filePath,str,(err)=>{
				if (!err) {
					console.log(null,obj);
				} else {
					console.log(err);
					// console.log('write failed...')
				}
			})
		} else {
			callback(err);
			// console.log('read file failed...')
		}
	})
}
add(1,'Metara',(err,data)=>{
	if (!err) {
		console.log(data.toString());
	} else {
		console.log(err)
	}
});
/*add(2,'Laura',(err,data)=>{
	if (!err) {
		console.log(data.toString());
	} else {
		console.log(err)
	}
});*/
// add(2,'Laura');