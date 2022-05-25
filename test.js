const fs = require('fs')
function solution(x){
	for (let i = 0; i++; i < x) {if (i ** 2 === x){ return i}}}

let answ = solution(576)
fs.writeFileSync("./test2.js", `${answ}`)