/* eslint-disable max-len */
import getColorFromCanvas from '../helpers/getColor';

const canvasWidth = 512;
export default class Canvas {
  canvas;

  currentTool;

  currСolor;

  dimension = 512;

  penSize = 1;

  _scale = 1;

  _context;

  constructor(canvas, currСolor) {
    this.canvas = canvas;
    this._context = this.canvas.getContext('2d');
    this.currСolor = currСolor;
  }

  get scale() {
    return this._scale;
  }

  setScale() {
    this._scale = Canvas.canvasWidth / this.dimension;
  }

  get context() {
    return this._context;
  }


  addListeners() {
    this.canvas.addEventListener('mousedown', (e) => {
      if (this.currentTool === 'paintBucket') {
        this.fillClosedArea(e);
      }


      if (this.currentTool === 'pencil') {
        this.drawWithPencil(e, false);
      }

      if (this.currentTool === 'eraser') {
        this.drawWithPencil(e, true);
      }
    });
  }


  drawWithPencil(event, eraser) {
    let draw = true;
    let prevCoord;
    // when mousedown -> draw one pixel OR erser
    if (eraser) {
      prevCoord = this.clearOnePixel(event, this.canvas);
    } else {
      prevCoord = this.drawPixel(event, this.canvas);
    }
    this.canvas.addEventListener('mousemove', (e) => {
      if (draw === true) {
        const currCoord = Canvas.getCoord(e, this.canvas, this.scale);
        // when mousemove -> draw a lot of pixels
        // during  mousemove occurs spaces, so  drawLineByBresenham and reassign prevCoord
        this.drawLineByBresenham(prevCoord.x, prevCoord.y,
          currCoord.x, currCoord.y, this.currСolor, eraser);
        prevCoord = currCoord;
      }
    });

    this.canvas.addEventListener('mouseup', () => {
      draw = false;
    });
  }

  drawPixel(e) {
    const currCoord = Canvas.getCoord(e, this.canvas, this.scale);
    this._context.fillStyle = this.currСolor;
    this._context.fillRect(currCoord.x, currCoord.y, this.penSize, this.penSize);

    return currCoord;
  }

  clearOnePixel(e) {
    const currCoord = Canvas.getCoord(e, this.canvas, this.scale);
    this._context.clearRect(currCoord.x, currCoord.y, this.penSize, this.penSize);
    return currCoord;
  }


  fillClosedArea(event) {
    const currCoord = Canvas.getCoord(event, this.canvas, this.scale);
    const firstColor = getColorFromCanvas(this.canvas, currCoord, this.dimension);

    this._context.fillStyle = this.currСolor;

    const pixelsToCheck = [currCoord.x, currCoord.y];

    while (pixelsToCheck.length > 0) {
      const y = pixelsToCheck.pop();
      const x = pixelsToCheck.pop();

      const coord = {
        x,
        y,
      };

      const pixelColor = getColorFromCanvas(this.canvas, coord, this.dimension);

      if (x >= 0 && x < this.dimension && y >= 0 && y < this.dimension && (pixelColor === firstColor)) {
        this._context.fillRect(x, y, this.penSize, this.penSize);
        pixelsToCheck.push(x + this.penSize, y);
        pixelsToCheck.push(x - this.penSize, y);
        pixelsToCheck.push(x, y + this.penSize);
        pixelsToCheck.push(x, y - this.penSize);
      }
    }
  }

  drawResizedImage(src) {
    this.canvas.width = this.dimension;
    this.canvas.height = this.dimension;
    this.setScale();

    const img = new Image();

    img.src = src;
    img.onload = () => {
      this._context.drawImage(img, 0, 0, this.dimension, this.dimension);
    };
  }


  static getCoord(event, canvas, scale) {
    const coord1 = {
      x: 0,
      y: 0,
    };
    coord1.x = (event.pageX - canvas.offsetLeft);
    coord1.y = (event.pageY - canvas.offsetTop);
    coord1.x = Math.floor(coord1.x / scale);
    coord1.y = Math.floor(coord1.y / scale);

    return coord1;
  }

  drawLineByBresenham(x0, y0, currX, currY, Сolor, eraser) {
    const dx = Math.abs(currX - x0);
    const dy = Math.abs(currY - y0);
    const sx = (x0 < currX) ? 1 : -1;
    const sy = (y0 < currY) ? 1 : -1;
    let err = dx - dy;

    let prevX = x0; // reassign in loop
    let prevY = y0;


    while ((prevX !== currX) || (prevY !== currY)) {
      if (!eraser) {
        this.context.fillStyle = Сolor;
        this.context.fillRect(prevX, prevY, this.penSize, this.penSize);
      } else {
        this._context.clearRect(prevX, prevY, this.penSize, this.penSize);
      }
      const e2 = 2 * err;

      if (e2 > -dy) {
        err -= dy;
        prevX += sx;
      }

      if (e2 < dx) {
        err += dx;
        prevY += sy;
      }
    }
  }

  // CONSTANTS
  static get canvasWidth() {
    return canvasWidth;
  }
}
