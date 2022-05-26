const fs = require('fs')
function solution(x){
	return x * 3
}
let answ = solution(0)
fs.writeFileSync("./test2.js", `${answ}`)