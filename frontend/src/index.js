import React from "react";
import ReactDOM from "react-dom";
import "./index.less";
import App from "./app/App";
import registerServiceWorker from "./registerServiceWorker";
import { createRequest } from "./xhr";

const ENABLE_GREEN = true;
const VIEW = "/view/Solutions/view/Corporate/view/Corporate%20Master";
const jenkinsDomain = "jenkins.caplin.com";
const jenkinsUrl = `http://${jenkinsDomain}`;
const jenkinsSocket = `ws://${jenkinsDomain}:8081`;

const app = ReactDOM.render(<App />, document.getElementById("root"));

const refreshData = () => {
  const { hash } = window.location;
  let url = `http://${window.location.hostname}:3030/status.json?jenkinsUrl=${jenkinsUrl}`;

  if (hash.length > 2) {
    url += `&view=${hash.substring(1)}`;
  } else {
    url += `&view=${VIEW}`;
  }
  const request = createRequest("GET", url, response => {
    try {
      response = JSON.parse(response);
      if (response.jobs) {
        let { name, url, jobs } = response;
        if (!ENABLE_GREEN) {
          jobs = jobs.filter(job => job.color !== "blue");
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

// TODO: this still gives 404, although plugin IS installed...
const ws = new WebSocket(jenkinsSocket);
ws.onmessage = function(msg) {
  console.log("Message received! Yayyy! :)", msg);
    // const obj = JSON.parse(msg.data);
    // const { project, result } = obj;
};

registerServiceWorker();
