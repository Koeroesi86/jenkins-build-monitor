import React from "react";
import "./Tile.less";

const Tile = ({ name, url, color }) => {
  return (
    <a className={"build-tile " + color} target="_blank" href={url}>
      {color === "blue" ? (
        <span className="job-icon" role="img" aria-label="Happy">
          &#x1F60A;
        </span>
      ) : (
        <span className="job-icon" role="img" aria-label="Angry">
          &#x1F621;
        </span>
      )}
      {name}
    </a>
  );
};

export default Tile;
