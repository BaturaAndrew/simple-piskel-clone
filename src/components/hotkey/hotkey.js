import setAction from '../../helpers/setAction';
import {
  BUCKET_CURSOR,
  COLOR_PICKER_CURSOR,
  PENCIL_CURSOR,
  ERASER_CURSOR,
  paintBucketEl,
  colorPickerEl,
  pencilEl,
  eraserEl,
} from '../constants';

const KEY_CODE_S = 83;
const KEY_CODE_B = 66;
const KEY_CODE_C = 67;
const KEY_CODE_P = 80;
const KEY_CODE_E = 69;
const KEY_CODE_ESC = 27;


export default function handlerHotKey(e, controlCanvas, controlState) {
  if (e.keyCode === KEY_CODE_S && e.altKey) {
    controlState.saveStateApp();
  }
  if (e.keyCode === KEY_CODE_B) {
    setAction('paintBucket', BUCKET_CURSOR, paintBucketEl, controlCanvas);
  }
  if (e.keyCode === KEY_CODE_C) {
    setAction('colorPicker', COLOR_PICKER_CURSOR, colorPickerEl, controlCanvas);
  }
  if (e.keyCode === KEY_CODE_P) {
    setAction('pencil', PENCIL_CURSOR, pencilEl, controlCanvas);
  }
  if (e.keyCode === KEY_CODE_E) {
    setAction('eraser', ERASER_CURSOR, eraserEl, controlCanvas);
  }
  if (e.keyCode === KEY_CODE_ESC) {
    document.body.style.cursor = '';
  }
}
