import React from "react";
import "./Tile.less";

const Tile = ({ name, url, color }) => {
  return (
    <a className={"build-tile " + color} target="_blank" href={url}>
      {name}
    </a>
  );
};

export default Tile;
