import React from "react";
import "./Tile.less";

const Tile = ({ name, url, color }) => {
  return (
    <a className={"build-tile " + color} target="_blank" href={url}>
      {color === "blue" ? (
        <span className="job-icon" role="img" aria-label="Happy">
          &#x1F334;
        </span>
      ) : (
        <span className="job-icon" role="img" aria-label="Angry">
          &#x1F4A5;
        </span>
      )}
      {name}
    </a>
  );
};

export default Tile;
