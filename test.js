const fs = require('fs')

function doubler(x) {
    return x * 10
}

let answ = doubler(5)

fs.writeFileSync("./test2.js", `${answ}`);
