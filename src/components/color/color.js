import './_colors.scss';

import {
  currColorEl,
  prevColorEl,
  canvasEl,
} from '../constants';

import Canvas from '../../models/Canvas';
import getColorFromCanvas from '../../helpers/getColor';

export default function handlerColor(controlCanvas, controlState) {
  currColorEl.addEventListener('input', (e) => {
    controlState.state.currСolor = e.target.value;
    controlCanvas.currСolor = controlState.state.currСolor;
    refreshColor(e.target.value);
  }, false);

  prevColorEl.addEventListener('input', (e) => {
    controlState.state.currСolor = e.target.value;
    controlCanvas.currСolor = controlState.state.currСolor;
    refreshColor(e.target.value);
  }, false);

  canvasEl.addEventListener('mousedown', (e) => {
    if (controlState.state.tool === 'colorPicker') {
      const coord = Canvas.getCoord(e, controlCanvas.canvas, controlCanvas.scale);
      refreshColor(getColorFromCanvas(controlCanvas.canvas,
        coord, controlCanvas.dimension));
    }
  });

  function refreshColor(crColor) {
    const prColor = currColorEl.value;
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
