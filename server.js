const express = require('express');
const request = require('request');
const dotenv = require('dotenv');

const app = express();

app.use(function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Methods", "GET");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
});

// const fields = [
//     "result",
//     "timestamp",
//     "duration",
//     "estimatedDuration",
//     "fullDisplayName",
//     "url",
//     "building"
// ];
// const view = "/job/Corporate-master-Build-Chrome/lastBuild";

dotenv.config();

// /view/Build%20Monitors/view/CT5%20Solution
const jenkinsUrl = process.env.JENKINS_URL;
const view = process.env.JENKINS_VIEW;

app.get('/status.json', (req, res) => {

    request(`${jenkinsUrl}${view}/api/json?pretty=true`, (error, response, body) => {
        if(error) {
            // Print the error if one occurred
            console.log('error:', error);
        }
        res.send(body);
    });
});

app.listen(3030);
