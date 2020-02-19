import './views';

import {
  loadColors,
} from './components/color/color';

import State from './models/State';
import Canvas from './models/Canvas';

import initEventListeners from './controllers/controller';

import loadCanvasSize from './helpers/loadState';

import {
  canvasEl,
} from './components/constants';

import './helpers/authentification';

const controlState = new State(canvasEl);
loadColors(controlState);
loadCanvasSize(controlState.state.dimension);

const controlCanvas = new Canvas(canvasEl, controlState.state.currСolor);
controlCanvas.dimension = controlState.state.dimension;
controlCanvas.setScale();
controlCanvas.addListeners();

initEventListeners(controlCanvas, controlState);
