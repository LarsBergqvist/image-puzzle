import React from 'react';
import './Game.css';

function TileView(props) {
    /*
    let bgPos = 'left ' + props.left + 'px top ' + props.top + 'px';
    const imPath = `${window.location.href}/images/img${props.imageNumber}.jpg`;
    let style = {
        backgroundPosition: bgPos,
        backgroundImage: "url(" + imPath + ")"
    }
    */
    const i = props.id;
    const top = -(Math.floor(i / props.size)) * props.tileWidth;
    const left = i < props.size ? -i * props.tileWidth : -(i % props.size) * props.tileWidth;

    const imPath = `${window.location.href}/images/img${props.imageNumber}.jpg`;
    let style = {
        backgroundPosition: `left ${left}px top ${top}px`,
        backgroundImage: `url('${imPath}')`,
    }


    if (props.correctPos) {
        // Use a special style as a hint on that the tile is on
        // the correct position
        style = {
            ...style,
            outline: '1px solid white',
            outlineOffset: '-10px',
        }
    }

    let className = props.selected ? 'tile selected' : 'tile';
    return (
        <div className={className}
            style={style}
            onClick={() => props.onClick(props.id)}
        >
        </div>
    );
}

export default TileView;
