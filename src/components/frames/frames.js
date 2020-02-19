/* eslint-disable no-restricted-globals */
/* eslint-disable func-names */
import './_frames.scss';
import {
  addFrameButtonEl,
} from '../constants';
// eslint-disable-next-line no-unused-vars
// eslint-disable-next-line no-var
let dragSrcEl = null;

// let canvas = null;
function renderFrame(controlCanvas, controlState) {
  const frameBlock = document.createElement('div');
  frameBlock.className = 'frames__block';
  frameBlock.setAttribute('draggable', true);

  const frameCanvas = document.createElement('canvas');
  frameCanvas.className = 'frames__canvas';

  const deleteBtn = document.createElement('button');
  deleteBtn.className = 'tile-overlay delete-frame icon-frame-recyclebin';
  deleteBtn.addEventListener('click', () => deleteFrame());

  const copyBtn = document.createElement('button');
  copyBtn.className = 'tile-overlay duplicate-frame icon-frame-duplicate';
  copyBtn.addEventListener('click', () => copyFrame(frameCanvas, controlCanvas, controlState));


  frameBlock.addEventListener('mouseover', () => {
    frameBlock.classList.add('hover');
    copyBtn.classList.add('visible');
    deleteBtn.classList.add('visible');
  });
  frameBlock.addEventListener('mouseout', () => {
    frameBlock.classList.remove('hover');
    copyBtn.classList.remove('visible');
    deleteBtn.classList.remove('visible');
  });

  frameBlock.appendChild(frameCanvas);
  frameBlock.appendChild(deleteBtn);
  frameBlock.appendChild(copyBtn);

  return frameBlock;
}


function copyFrame(oldCanvas, controlCanvas, controlState) {
  addFrame(controlCanvas, controlState);
  printImageToNewCanvas(oldCanvas);
  setTimeout(() => printImageOnCanvas(controlCanvas, controlState), 0);
}

function deleteFrame() {
  const frameBlock = document.querySelector('.frames__block.hover');
  frameBlock.remove();
}

function addFrame(controlCanvas, controlState) {
  const frame = renderFrame(controlCanvas, controlState);
  // const frames = document.querySelector('.frames');
  // frames.appendChild(frame);
  addFrameButtonEl.before(frame);
  let framesEl = document.querySelectorAll('.frames__canvas');
  framesEl = Array.prototype.slice.call(framesEl);
  framesEl.map((elem) => {
    elem.classList.remove('active');
  });

  // REPLACE FRAMES
  frame.addEventListener('dragstart', handleDragStart, false);
  frame.addEventListener('dragenter', handleDragEnter, false);
  frame.addEventListener('dragover', handleDragOver, false);
  frame.addEventListener('dragleave', handleDragLeave, false);
  frame.addEventListener('drop', handleDrop, false);
  frame.addEventListener('dragend', handleDragEnd, false);


  function handleDragStart(e) {
    // document.body.style.cursor = 'move';
    // this.style.opacity = 0.4;

    dragSrcEl = this;
    // canvas=
    e.dataTransfer.effectAllowed = 'move';
    e.dataTransfer.setData('text/html', this.innerHTML);
  }

  function handleDragOver(e) {
    if (e.preventDefault) {
      e.preventDefault();
    }
    e.dataTransfer.dropEffect = 'move';
    return false;
  }
  function handleDragEnter() {
    this.classList.add('over');
  }

  function handleDrop(e) {
    // const frameCanvas = document.createElement('canvas');
    // frameCanvas.className = 'frames__canvas';


    // this/e.target is current target element.

    if (e.stopPropagation) {
      e.stopPropagation(); // Stops some browsers from redirecting.
    }

    // Don't do anything if dropping the same column we're dragging.
    if (dragSrcEl !== this) {
      const firstCanvas = dragSrcEl.firstElementChild;
      const secondCanvas = this.firstElementChild;
      const firstImgSrc = firstCanvas.toDataURL();
      const secondImgSrc = secondCanvas.toDataURL();
      printImageToFirstCanvas(firstCanvas, secondCanvas, secondImgSrc);
      printImageToSecondCanvas(firstCanvas, secondCanvas, firstImgSrc);
    }

    return false;
  }

  function handleDragLeave() {
    this.classList.remove('over');
  }
  function handleDragEnd() {
    let framesBlockEl = document.querySelectorAll('.frames__block');
    framesBlockEl = Array.prototype.slice.call(framesBlockEl);

    framesBlockEl.map(el => el.classList.remove('over'));
  }


  frame.childNodes[0].classList.add('active');

  frame.childNodes[0].addEventListener('mousedown', () => {
    framesEl = document.querySelectorAll('.frames__canvas');
    framesEl = Array.prototype.slice.call(framesEl);
    framesEl.map((elem) => {
      elem.classList.remove('active');
    });
    frame.childNodes[0].classList.toggle('active');
    printImageOnCanvas(controlCanvas, controlState);
  });
  const context = controlCanvas.canvas.getContext('2d');
  context.clearRect(0, 0, controlCanvas.canvas.width, controlCanvas.canvas.height);
}

function printImageOnCanvas(controlCanvas, controlState) {
  const frame = document.querySelector('.frames__canvas.active');
  const img = new Image();
  img.src = frame.toDataURL();
  const context = controlCanvas.canvas.getContext('2d');
  context.clearRect(0, 0, controlCanvas.canvas.width, controlCanvas.canvas.height);

  img.onload = () => {
    context.drawImage(img, 0, 0,
      controlState.state.dimension,
      controlState.state.dimension);
  };
}

function printImageOnFrame(controlCanvas) {
  const img = new Image();
  img.src = controlCanvas.canvas.toDataURL();
  const frame = document.querySelector('.frames__canvas.active');
  const context = frame.getContext('2d');
  frame.width = controlCanvas.dimension;
  frame.height = controlCanvas.dimension;
  img.onload = () => {
    context.drawImage(img, 0, 0,
      controlCanvas.dimension,
      controlCanvas.dimension);
  };
}

function printImageToNewCanvas(oldCanvas) {
  const img = new Image();
  img.src = oldCanvas.toDataURL();
  const canvas = document.querySelector('.frames__canvas.active');
  const context = canvas.getContext('2d');
  canvas.width = oldCanvas.width;
  canvas.height = oldCanvas.height;
  img.onload = () => {
    context.drawImage(img, 0, 0,
      oldCanvas.width,
      oldCanvas.height);
  };
}

function printImageToFirstCanvas(firstCanvas, secondCanvas, imgSrc) {
  const img = new Image();
  img.src = imgSrc;
  // const canvas = document.querySelector('.frames__canvas.active');
  const canvas = firstCanvas;
  canvas.classList.remove('active');
  const context = canvas.getContext('2d');
  canvas.width = secondCanvas.width;
  canvas.height = secondCanvas.height;
  img.onload = () => {
    context.drawImage(img, 0, 0,
      secondCanvas.width,
      secondCanvas.height);
  };
}

function printImageToSecondCanvas(firstCanvas, secondCanvas, imgSrc) {
  const img = new Image();
  img.src = imgSrc;
  // const canvas = document.querySelector('.frames__block.over .frames__canvas');
  const canvas = secondCanvas;
  canvas.classList.add('active');
  const context = canvas.getContext('2d');
  canvas.width = firstCanvas.width;
  canvas.height = firstCanvas.height;
  img.onload = () => {
    context.drawImage(img, 0, 0,
      firstCanvas.width,
      firstCanvas.height);
  };
}

export {
  printImageOnFrame,
  addFrame,
};
