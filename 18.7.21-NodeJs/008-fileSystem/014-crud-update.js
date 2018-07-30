const fs = require('fs');
const uuidv1 = require('uuid/v1');

const filePath = './004-add.json';

let add = (name,callback)=>{
	fs.readFile(filePath,(err,data)=>{
		if (!err) {
			let obj = JSON.parse(data);
			obj.push({
				'id':uuidv1(),
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

let get = (id,callback) => {
	fs.readFile(filePath,(err,data)=>{
		if (!err) {
			let obj = JSON.parse(data);
			// console.log('obj:::',obj);
			let result = null;
			for (key in obj) {
				if (obj[key]['id'] == id) {
					result = obj[key];
					break;
				}
				// return result;
				console.log('in:::',obj[key]);
			}
			// console.log(result);
			callback(null,result);
		} else {
			callback(err);
		}
	})
}

let update = (id,name,callback) => {
	fs.readFile(filePath,(err,data) => {
		if (!err) {
			let obj = JSON.parse(data);
			obj.some((val) => {
				if (val['id'] == id) {
					val['name'] = name;
					console.log('innn:::',val);
					return true;
				}
				console.log(val);
			})
			let str = JSON.stringify(obj);
			fs.writeFile(filePath,str,(err)=>{
				if (!err) {
					// console.log(null,obj);
					callback(null,obj);
				} else {
					// console.log(err);
					callback(err);
				}
			})
		} else {
			callback(err);
		}
	})
}
/*let update = (id,name,callback)=>{
	fs.readFile(filePath,(err,data)=>{
		if(!err){
			let obj = JSON.parse(data);
			obj.some((val)=>{
				if(val['id'] == id){
					val['name'] = name;
					console.log(val);
					return true;
				}
				console.log(val);
			})
			let str = JSON.stringify(obj);
			fs.writeFile(filePath,str,(err)=>{
				if(!err){
					callback(null,obj);
				}else{
					callback(err);
				}
			})
		}else{
			callback(err);
		}
	})
}*/

/*add('Leo',(err,data)=>{
	if (!err) {
		console.log(data.toString());
	} else {
		console.log(err)
	}
});*/

/*get('1522efe0-8f10-11e8-b8b8-b57b6e0c2384',(err,data)=>{
	if (!err) {
		console.log(data.toString());
	} else {
		console.log(err)
	}
});*/

update('e08483f0-8f1b-11e8-8de4-2984e89fc1fc','Laura',(err,data)=>{
	if (!err) {
		console.log(data);
	} else {
		console.log(err)
	}
});