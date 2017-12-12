import React from "react";
import ReactDOM from "react-dom";
import "./index.less";
import App from "./app/App";
import registerServiceWorker from "./registerServiceWorker";
import { createRequest } from "./xhr";

const ENABLE_GREEN = false;

const app = ReactDOM.render(<App />, document.getElementById("root"));

const refreshData = () => {
  const request = createRequest("GET", `http://${window.location.hostname}:3030/status.json`, response => {
    try {
        response = JSON.parse(response);
        if (response.jobs) {
            let { name, url, jobs } = response;
            if(!ENABLE_GREEN) {
                jobs = jobs.filter(job => job.color !== 'blue');
            }
            app.setState({ name, url, jobs });
        }
    } catch (e) {
        console.log("XHR error: ", e);
    }
  });

  request.send();
};

refreshData();

setInterval(() => {
  refreshData();
}, 10 * 1000);

const ws = new WebSocket('ws://jenkins.caplin.com:8081');
ws.onmessage = function(msg) {
    console.log("msg", msg);
    alert('Message received! Yayyy! :)');
};

registerServiceWorker();
