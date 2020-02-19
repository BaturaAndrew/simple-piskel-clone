import './_colors.scss';

import {
  currColorEl,
  prevColorEl,
  swapColorsEl,
  canvasEl,
} from '../constants';

import Canvas from '../../models/Canvas';
import getColorFromCanvas from '../../helpers/getColor';

export default function handlerColor(controlCanvas, controlState) {
  currColorEl.addEventListener('input', (e) => {
    const currColor = e.target.value;
    refreshColor(currColor);
  }, false);

  prevColorEl.addEventListener('input', (e) => {
    const currColor = e.target.value;
    refreshColor(currColor);
  }, false);

  swapColorsEl.addEventListener('click', () => {
    refreshColor(controlState.state.prevСolor);
  }, false);

  canvasEl.addEventListener('mousedown', (e) => {
    if (controlState.state.tool === 'colorPicker') {
      const coord = Canvas.getCoord(e, controlCanvas.canvas, controlCanvas.scale);
      refreshColor(getColorFromCanvas(controlCanvas.canvas,
        coord, controlCanvas.dimension));
    }
  });

  function refreshColor(crColor) {
    const prColor = controlState.state.currСolor;
    // change color if it is not same with current color
    if (crColor !== controlState.state.currСolor) {
      controlState.state.prevСolor = prColor;
      controlState.state.currСolor = crColor;
      currColorEl.value = controlState.state.currСolor;
      prevColorEl.value = controlState.state.prevСolor;
      controlCanvas.currСolor = crColor;
    }
  }
}

function loadColors(controlState) {
  currColorEl.value = controlState.state.currСolor;
  prevColorEl.value = controlState.state.prevСolor;
}

export {
  handlerColor,
  loadColors,
};
