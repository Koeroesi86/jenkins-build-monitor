import React, { Component } from "react";
import "./Snow.less";

export function randomBetween(min, max, round) {
  let num = Math.random() * (max - min + 1) + min;

  if (round) {
    return Math.floor(num);
  } else {
    return num;
  }
}

export class Flake {
  static maxWeight = 2.3;
  static maxSpeed = 1;

  constructor(x, y) {
    this.x = x;
    this.y = y;
    this.r = randomBetween(0, 1);
    this.a = randomBetween(0, Math.PI);
    this.aStep = 0.01;

    this.weight = randomBetween(2, Flake.maxWeight);
    this.alpha = this.weight / Flake.maxWeight;
    this.speed = this.weight / Flake.maxWeight * Flake.maxSpeed;
  }

  update() {
    this.x += Math.cos(this.a) * this.r;
    this.a += this.aStep;

    this.y += this.speed;
  }
}

export default class Snow extends Component {
  constructor(props) {
    super(props);

    this.scaleCanvas = this.scaleCanvas.bind(this);
    this.loop = this.loop.bind(this)
    this.flakes = [];
  }

  scaleCanvas() {
    const { innerWidth, innerHeight } = window;
    this.canvas.width = innerWidth;
    this.canvas.height = innerHeight;
  }

  loop() {
    let i = this.flakes.length,
      ctx = this.canvas.getContext("2d"),
      windowW = window.innerWidth,
      windowH = window.innerHeight;

    // clear canvas
    ctx.save();
    ctx.setTransform(1, 0, 0, 1, 0, 0);
    ctx.clearRect(0, 0, windowW, windowH);
    ctx.restore();

    // loop of hell
    while (i--) {
      let flake = this.flakes[i];
      flake.update();
      ctx.beginPath();
      // TODO: load svg...
      ctx.arc(flake.x, flake.y, flake.weight, 0, 2 * Math.PI, false);
      ctx.fillStyle = `rgba(255, 255, 255, ${flake.alpha})`;
      ctx.fill();

      if (flake.y >= windowH) {
        flake.y = -flake.weight;
      }
    }

    requestAnimationFrame(this.loop);
  }

  componentDidMount() {
    let windowW = window.innerWidth,
      windowH = window.innerHeight,
      numFlakes = 200;

    let i = numFlakes,
      flake,
      x,
      y;

    while (i--) {
      x = randomBetween(0, windowW, true);
      y = randomBetween(0, windowH, true);

      flake = new Flake(x, y);
      this.flakes.push(flake);
    }

    this.scaleCanvas();
    this.loop();

    // TODO: this does not work
    window.addEventListener("resize", this.scaleCanvas);
  }

  componentWillUnmount() {
    window.removeEventListener("resize", this.scaleCanvas);
  }

  render() {
    return <canvas className="snow" ref={canvas => (this.canvas = canvas)} />;
  }
}
