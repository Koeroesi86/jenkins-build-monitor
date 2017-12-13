import React from "react";
import "./Tile.less";

const Tile = ({ name, url, color }) => {
  return (
    <a className={"build-tile " + color} target="_blank" href={url}>
        <span className="job-texts">
          {color === "blue" && (
            <span className="job-icon" role="img" aria-label="Happy">
              &#x1F334;
            </span>
          )}
          {color === "red" && (
            <span className="job-icon" role="img" aria-label="Angry">
              &#x1F4A5;
            </span>
          )}
          {color === "red_anime" && (
            <span className="job-icon" role="img" aria-label="Angry">
              &#x23F3;
            </span>
          )}
          {color === "blue_anime" && (
            <span className="job-icon" role="img" aria-label="Angry">
              &#x23F3;
            </span>
          )}
          {color === "disabled" && (
            <span className="job-icon" role="img" aria-label="Angry">
              &#x1F6A7;
            </span>
          )}
          {color === "aborted" && (
            <span className="job-icon" role="img" aria-label="Angry">
              &#x1F6A7;
            </span>
          )}
          <span className="job-name">{name}</span>
        </span>
    </a>
  );
};

export default Tile;
