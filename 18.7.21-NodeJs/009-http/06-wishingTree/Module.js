const fs = require('fs');
const uuidv1 = require('uuid/v1');

const filePath = './data.json';

function getRandom(min,max){
	return Math.round(min + (max - min) * Math.random());
}
/*function getcolor(){
	var str='01a2345789';
	var colorz='';
	while(colorz.length<2){
		colorz+=str[getRandom(0,9)];
	}
	colorz='f'+colorz;
	colorz='#'+colorz;
	return colorz;
}*/

// let colorArr = ['rgb(' + getRandom(0,(255)) + ',' + getRandom(0,(255)) + ',' + getRandom(0,(255)) + ')','rgb(' + getRandom(0,(255)) + ',' + getRandom(0,(255)) + ',' + getRandom(0,(255)) + ')'];

let add = (options,callback)=>{
	fs.readFile(filePath,(err,data)=>{
		if (!err) {
			let obj = JSON.parse(data);
			// options.color = colorArr[getRandom(0,colorArr.length-1)];
			options.color = 'rgb(' + getRandom(0,(255)) + ',' + getRandom(0,(255)) + ',' + getRandom(0,(255)) + ')';
			options.id = uuidv1();
			obj.push(options);
			let str = JSON.stringify(obj);
			fs.writeFile(filePath,str,(err)=>{
				if (!err) {
					callback(null,options);
				} else {
					callback(err);
				}
			})
		} else {
			callback(err);
		}
	})
}

let get = (callback) => {
	fs.readFile(filePath,(err,data)=>{
		if (!err) {
			let obj = JSON.parse(data);
			callback(null,obj);
		} else {
			callback(err);
		}
	});
}

let remove = (id,callback) => {
	fs.readFile(filePath,(err,data)=>{
		if (!err) {
			let obj = JSON.parse(data);
			let result = null;
			let newObj = obj.filter((val)=>{
				return val['id'] != id;
			})
			let str = JSON.stringify(newObj);
			fs.writeFile(filePath,str,(err)=>{
				if (!err) {
					callback(null,newObj);
				} else {
					callback(err);
				}
			})
		} else {
			callback(err);
		}
	});
}
module.exports = {
    get:get,
    add:add,
    remove:remove
}