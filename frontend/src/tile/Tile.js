import React from "react";
import "./Tile.less";

const Tile = ({ name, url, color }) => {
    return (
        <div className={"build-tile " + color}>
            <a className="job-title" target="_blank" href={url}>
                {name}
            </a>
        </div>
    );
};

export default Tile;