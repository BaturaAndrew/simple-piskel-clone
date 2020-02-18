import {
  printImageOnFrame,
  addFrame,
} from '../components/frames/frames';

import '../components/preview/_preview.scss';
import animation from '../components/preview/preview';

import {
  initTool,
  handlerPaleteTools,
  handlerPenSize,
  handlerCanvasSize,
} from '../components/tool/tools';

import {
  handlerColor,
} from '../components/color/color';

import handlerHotKey from '../components/hotkey/hotkey';

import {
  downloadGif,
  downloadAPNG,
} from '../components/saveImg/saveImg';

import getFps from '../helpers/getFps';

import {
  canvasEl,
  addFrameButtonEl,
  saveImgToGif,
  saveImgToApng,
  rngFps,
} from '../components/constants';


export default function initEventListeners(controlCanvas, controlState) {
  // FRAMES
  addFrame(controlCanvas, controlState); // first frame
  addFrameButtonEl.addEventListener('click', () => addFrame(controlCanvas, controlState));

  // PFS
  rngFps.addEventListener('click', () => animation(getFps(), controlState.state.dimension));

  // CANVAS
  canvasEl.addEventListener('mouseup', () => {
    printImageOnFrame(controlCanvas);
    controlState.saveStateApp([controlState.state.currСolor, controlState.state.prevСolor]);
  });

  // HOTKEY
  document.addEventListener('keydown', e => handlerHotKey(e, controlCanvas, controlState));

  // SAVE
  saveImgToGif.addEventListener('click', () => downloadGif(1000 / getFps()));
  saveImgToApng.addEventListener('click', () => downloadAPNG(1000 / getFps(), saveImgToApng, controlState.state.dimension));

  // TOOLS
  handlerCanvasSize(controlCanvas, controlState);
  handlerPenSize(controlCanvas);
  initTool(controlCanvas, controlState.state.tool);
  handlerPaleteTools(controlCanvas, controlState);

  // COLORS
  handlerColor(controlCanvas, controlState);
}
