const fs = require('fs')
function solution(x){
	return x * 2;
}
let answ = solution(0)
fs.writeFileSync("./test2.js", `${answ}`)