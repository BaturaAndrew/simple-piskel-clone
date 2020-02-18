import './_panel.scss';
import './_tools.scss';
import './_tooltips.scss';

import {
  BUCKET_CURSOR,
  COLOR_PICKER_CURSOR,
  PENCIL_CURSOR,
  ERASER_CURSOR,
  paintBucketEl,
  colorPickerEl,
  pencilEl,
  eraserEl,
  canvasSize,
  penSize,
} from '../constants';

import setAction from '../../helpers/setAction';

const COLOR_PICKER = 'colorPicker';
const ERASER = 'eraser';
const PENCIL = 'pencil';
const PAINTBUCKET = 'paintBucket';

function handlerPenSize(controlCanvas) {
  penSize.map((elem) => {
    elem.addEventListener('click', () => {
      penSize.map(el => el.classList.remove('selected'));
      elem.classList.add('selected');

      controlCanvas.penSize = +elem.dataset.size;
    });
  });
}

function handlerCanvasSize(controlCanvas, controlState) {
  canvasSize.map((elem) => {
    elem.addEventListener('click', () => {
      canvasSize.map(el => el.classList.remove('active'));
      elem.classList.add('active');

      controlCanvas.dimension = +elem.innerHTML;
      controlCanvas.drawResizedImage(controlState.state.img);
      controlState.saveDimension(controlCanvas.dimension);
    });
  });
}

function initTool(controlCanvas, currentTool) {
  document.addEventListener('DOMContentLoaded', () => {
    switch (currentTool) {
      case PENCIL:
        setAction(PENCIL, PENCIL_CURSOR, pencilEl, controlCanvas);
        break;
      case ERASER:
        setAction(ERASER, ERASER_CURSOR, eraserEl, controlCanvas);
        break;
      case PAINTBUCKET:
        setAction(PAINTBUCKET, BUCKET_CURSOR, paintBucketEl, controlCanvas);
        break;
      case COLOR_PICKER:
        setAction(COLOR_PICKER, COLOR_PICKER_CURSOR, colorPickerEl, controlCanvas);
        currentTool = COLOR_PICKER;
        break;
      default:
        break;
    }
  });
}

function handlerPaleteTools(controlCanvas, controlState) {
  paintBucketEl.addEventListener('click', () => {
    setAction(PAINTBUCKET, BUCKET_CURSOR, paintBucketEl, controlCanvas);
    controlState.saveTool(PAINTBUCKET);
  });

  colorPickerEl.addEventListener('click', () => {
    setAction(COLOR_PICKER, COLOR_PICKER_CURSOR, colorPickerEl, controlCanvas);
    controlState.state.tool = COLOR_PICKER;
    controlState.saveTool(COLOR_PICKER);
  });

  pencilEl.addEventListener('click', () => {
    setAction(PENCIL, PENCIL_CURSOR, pencilEl, controlCanvas);
    controlState.saveTool(PENCIL);
  });

  eraserEl.addEventListener('click', () => {
    setAction(ERASER, ERASER_CURSOR, eraserEl, controlCanvas);
    controlState.saveTool(ERASER);
  });
}

export {
  initTool,
  handlerPaleteTools,
  handlerPenSize,
  handlerCanvasSize,
};
