import './_preview.scss';
import {
  previewEl,
} from '../constants';

let then;
let fpsInterval;
let dimention;

function getDimension(canvasDimension) {
  return canvasDimension;
}

export default function animation(fps, canvasDimension) {
  fpsInterval = 1000 / fps;
  then = Date.now();
  // get canvas dimension from app module
  dimention = getDimension(canvasDimension);

  draw();
}

function draw() {
  // request another frame
  requestAnimationFrame(draw);

  // calc elapsed time since last loop
  const now = Date.now();
  const elapsed = now - then;

  // if enough time has elapsed, draw the next frame
  if (elapsed > fpsInterval) {
    // Get ready for next frame by setting then=now, but...
    // Also, adjust for fpsInterval not being multiple of 16.67
    then = now - (elapsed % fpsInterval);
    drawFrame();
  }
}

let frameNumber = 0;
let lastFrameFlag = true;
const imgFromFrame = new Image();

function drawFrame() {
  const ctx = previewEl.getContext('2d');
  let count = 1;

  count = getImgFromFrame(frameNumber);
  ctx.clearRect(0, 0, dimention, dimention);

  previewEl.width = dimention;
  previewEl.height = dimention;

  ctx.drawImage(imgFromFrame, 0, 0, dimention, dimention);

  if (frameNumber >= count) lastFrameFlag = false;
  if (frameNumber <= 0) lastFrameFlag = true;

  if (lastFrameFlag) frameNumber += 1;
  else frameNumber = 0;
}

function getImgFromFrame(i) {
  let frame = document.querySelectorAll('.frames__canvas');
  frame = Array.prototype.slice.call(frame);
  imgFromFrame.src = frame[i].toDataURL();
  return frame.length - 1;
}
