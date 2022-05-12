const express = require('express');
const router = express.Router();
const passport = require('passport');
const axios = require('axios');
const fs = require('fs')
const { execFile } = require('node:child_process')

router.post("/",(req, res) => {
    fs.writeFileSync("test.js", req.body.code);

    const testCaseResults = '';

    const promise = new Promise((resolve, reject) => {
        execFile("test", (error, stdout, stderr) => {
            if(error){
                throw error;
            }
            testCaseResults = stdout;
            resolve(true)
        })
    })

    promise.then(() => res.json({ testCaseResults}))
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