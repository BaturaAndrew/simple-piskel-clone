// icons for cursors
const BUCKET_CURSOR = 'url(assets/images/fill-drip-solid.png) 20 20, auto';
const COLOR_PICKER_CURSOR = 'url(assets/images/eye-dropper-solid.png) -20 23, auto';
const PENCIL_CURSOR = 'url(assets/images/pencil-alt-solid.png) -20 23, auto';
const ERASER_CURSOR = 'url(assets/images/eraser-solid.png) -20 23, auto';
// tools
let penSize = document.querySelectorAll('.pen-size__option');
penSize = Array.prototype.slice.call(penSize);
const paintBucketEl = document.querySelector('.paintBucket');
const colorPickerEl = document.querySelector('.colorPicker');
const pencilEl = document.querySelector('.pencil');
const eraserEl = document.querySelector('.eraser');
// colors
const currColorEl = document.querySelector('.curr-color__item');
const prevColorEl = document.querySelector('.prev-color__item');
const swapColorsEl = document.querySelector('.swap-colors-button');
// frames
let framesEl = document.querySelectorAll('frames__block');
framesEl = Array.prototype.slice.call(framesEl);
const firstFrames = document.querySelector('.frames__canvas');
const addFrameButtonEl = document.querySelector('.add-frame');
// canvas
const canvasEl = document.getElementById('canvas');
// preview section
const previewEl = document.querySelector('.preview__canvas');
const saveImgToGif = document.querySelector('.export-gif');
const saveImgToApng = document.querySelector('.export-apng');

const rngFps = document.querySelector('.fps-range');
const dspFps = document.querySelector('.fps-display');

let canvasSize = document.querySelectorAll('.canvas-size__value');
canvasSize = Array.prototype.slice.call(canvasSize);

module.exports = {
  BUCKET_CURSOR,
  COLOR_PICKER_CURSOR,
  PENCIL_CURSOR,
  ERASER_CURSOR,
  canvasEl,
  paintBucketEl,
  colorPickerEl,
  pencilEl,
  currColorEl,
  prevColorEl,
  swapColorsEl,
  addFrameButtonEl,
  framesEl,
  eraserEl,
  firstFrames,
  previewEl,
  saveImgToGif,
  saveImgToApng,
  rngFps,
  dspFps,
  canvasSize,
  penSize,
};
