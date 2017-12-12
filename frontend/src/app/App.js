import React, { Component } from "react";
import "./App.less";
import Tile from "../tile/Tile";
import Success from "../success/Success";

class App extends Component {
  constructor(props) {
    super(props);
    this.state = { name: "", url: "", jobs: [] };
  }

  render() {
    const { jobs, name, url } = this.state;
    return (
      <div className={"app-wrapper " + (jobs.length ? "has-jobs" : "no-jobs")}>
        <header>
          <a href={url} target="_blank">
            {name || "Loading..."}
          </a>
        </header>
        <section>
          {jobs.length === 0 && name && <Success />}
          {jobs.map((job, index) => <Tile key={index} {...job} />)}
        </section>
      </div>
    );
  }
}

export default App;
