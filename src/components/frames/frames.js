/* eslint-disable no-restricted-globals */
/* eslint-disable func-names */
import './_frames.scss';
import {
  addFrameButtonEl,
} from '../constants';

function renderFrame(controlCanvas, controlState) {
  const frameBlock = document.createElement('div');
  frameBlock.className = 'frames__block';

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


function copyFrame(oldFrame, controlCanvas, controlState) {
  addFrame(controlCanvas, controlState);
  printImageToNewFrame(oldFrame);
  setTimeout(() => printImageOnCanvas(controlCanvas, controlState), 0);
}

function deleteFrame() {
  const frameBlock = document.querySelector('.frames__block.hover');
  frameBlock.remove();
}

function addFrame(controlCanvas, controlState) {
  const frame = renderFrame(controlCanvas, controlState);
  addFrameButtonEl.before(frame);
  let framesEl = document.querySelectorAll('.frames__canvas');
  framesEl = Array.prototype.slice.call(framesEl);
  framesEl.map((elem) => {
    elem.classList.remove('active');
  });

  // REPLACE FRAMES
  // frame.addEventListener('mousedown', (e) => {
  //   document.body.style.cursor = 'move';

  //   moveFigure(frame, e);
  // });


  frame.childNodes[0].classList.add('active');

  frame.childNodes[0].addEventListener('click', () => {
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

function printImageToNewFrame(oldFrame) {
  const img = new Image();
  img.src = oldFrame.toDataURL();
  const frame = document.querySelector('.frames__canvas.active');
  const context = frame.getContext('2d');
  frame.width = oldFrame.width;
  frame.height = oldFrame.height;
  img.onload = () => {
    context.drawImage(img, 0, 0,
      oldFrame.width,
      oldFrame.height);
  };
}

// function moveFigure(figure, event) {
//   const fames = document.querySelector('.frames');
//   const coords = getCoords(figure);
//   const famesCoords = getCoords(fames);
//   // const shiftX = event.pageX - coords.left;
//   const shiftY = event.pageY - coords.top;
//   const framesShiftY = event.pageY - famesCoords.top;

//   figure.style.position = 'absolute';
//   figure.style.zIndex = 1000;
//   // figure.style.left = '117px';
//   // figure.style.top = '150px';

//   // document.body.appendChild(figure);
//   fames.appendChild(figure);

//   moveAt(event);

//   /* eslint-disable no-shadow */
//   document.onmousemove = function (event) {
//     moveAt(event);
//   };

//   figure.onmouseup = function () {
//     // figure.style.position = 'relative';
//     // figure.style.top = framesShiftY + shiftY;

//     document.onmousemove = null;
//     figure.onmouseup = null;
//   };

//   // browser has its own Drag’n’Drop - switch it off
//   figure.ondragstart = function () {
//     return false;
//   };

//   function moveAt(e) {
//     figure.style.top = `${e.pageY - framesShiftY - shiftY}px`;
//   }

//   function getCoords(elem) {
//     const box = elem.getBoundingClientRect();
//     return {
//       top: box.top + pageYOffset,
//       left: box.left + pageXOffset,
//     };
//   }
// }

export {
  printImageOnFrame,
  addFrame,
};
