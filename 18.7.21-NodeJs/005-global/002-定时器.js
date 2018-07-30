/*console.log(1);
setTimeout(() => {
	console.log(2);
},1000);
console.log(3);*/ // 1 3 2

/*console.log(1);
let t = setTimeout(() => {
	console.log(2);
},1000);
clearTimeout(t);
console.log(3);*/ // 1 3 

/*console.log(1);
setInterval(() => {
	console.log(2);
},1000);
console.log(3);*/ // 1 3 2 2 2 ...

/*console.log(1);
let t = setInterval(() => {
	console.log(2);
},1000);
clearInterval(t);
console.log(3);*/ // 1 3

/*console.log(1);
setInterval(() => {
	console.log(2);
},0);
console.log(3);*/ // 1 3 2222222222...

/*console.log(1);
setImmediate(() => {
	console.log(2);
});
console.log(3);*/ // 1 3 2

console.log(global);
console.log(1);
let t =setImmediate(() => {
	console.log(2);
});
clearImmediate(t);
console.log(3); // 1 3