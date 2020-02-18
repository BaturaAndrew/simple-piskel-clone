import {
  canvasSize,
} from '../components/constants';

export default function loadStateCanvasSize(dimension) {
  if (dimension === 32) {
    canvasSize.map(el => el.classList.remove('active'));
    canvasSize[0].classList.add('active');
  }

  if (dimension === 64) {
    canvasSize.map(el => el.classList.remove('active'));
    canvasSize[1].classList.add('active');
  }

  if (dimension === 128) {
    canvasSize.map(el => el.classList.remove('active'));
    canvasSize[2].classList.add('active');
  }
}
