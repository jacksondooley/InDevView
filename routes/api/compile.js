const express = require('express');
const router = express.Router();
const passport = require('passport');
const axios = require('axios');
const fs = require('fs')
const { execFile } = require('node:child_process')
const util = require('node:util');
const { execFileSync } = require('child_process');

// router.post("/",(req, res) => {
//     fs.writeFileSync("./test.js", req.body.code);
//     console.log("wrote file")
    
//     let { func } = require('./test')
//     const testCaseResults = [];

//     let inputs = req.body.inputs;

//     console.log(counter)
//     counter += 1

//     inputs.forEach(input => {
//         let result = func(input);
//         console.log(result)
//         testCaseResults.push(result)
//     })
//     console.log(testCaseResults)
//     res.json(testCaseResults)

router.post("/",(req, res) => {
    let inputs = req.body.inputs;
    let testCaseResults = [];

    inputs.forEach(input => {
        console.log(input)
        let code = req.body.code;
        fs.writeFileSync("./test.js", "const fs = require('fs')\n" + code + '\nlet answ = solution(' + input + ')\nfs.writeFileSync("./test2.js", `${answ}`)');
        console.log("wrote file")
    
        execFileSync('node', ['test.js'])

        let output = fs.readFileSync('./test2.js', 'utf8')
        testCaseResults.push(output);
        console.log(testCaseResults)

    })
    console.log(testCaseResults);
    res.json(testCaseResults);
    // fs.writeFileSync("./test.js", req.body.code);

    // const execFile = util.promisify(require('node:child_process').execFile);

    // async function getTestCase() {
    //     const { stdout } = await execFile("./test.js")
    //     console.log(stdout)
    // }

    // getTestCase();

    // var child = require('child_process').execFile('test.js');
    // // console.log(child.stdout)
    // child.stdout.pipe(process.stdout);
    // child.on('exit', function(){
    //     process.exit()
    // })

    // child.stdout.on('data', function(data){
    //     console.log(data.toString());
    // })

    // const promise = new Promise((resolve, reject) => {
    //     execFile("test", (error, stdout) => {
    //         if(error){
    //             console.log(error)
    //             throw error;
    //         }
    //         testCaseResults = stdout;
    //         console.log(stdout)
    //         resolve(true)
    //     })
    // })

    // promise.then(() => res.json({ testCaseResults}))

    // const child = execFile('test', (error, stdout, stderr) => {
    //     if(error){
    //         console.error('stderr', stderr);
    //         throw error;
    //     }
    //     console.log('stdout', stdout);
    // })

    // console.log(req)
    // let data = JSON.stringify({
    //     "code": req.body.code,
    //     "language": req.body.language,
    //     "input": req.body.input
    // })
    // let config = {
    //     method: "POST",
    //     url: 'https://codexweb.netlify.app/.netlify/functions/enforceCode',
    //     headers: {
    //         'Content-Type': 'application/json'
    //     },
    //     data: data
    // }
    // axios(config).then(response => {
    //     console.log("-----")
    //     console.log(response.data)
    //     res.send(response.data)
    // }).catch((error) => {
    //     console.log(error)
    // })
})

module.exports = router;