const express = require('express');
const router = express.Router();
const passport = require('passport');
const axios = require('axios');
const fs = require('fs')
const { execFile } = require('node:child_process')
const util = require('node:util')
const { func } = require('../../test')

router.post("/",(req, res) => {
    fs.writeFileSync("./test.js", req.body.code);
    console.log("wrote file")

    const testCaseResults = '';

    const result = func(req.body.input);
    console.log(result);

    res.json(result)

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