import {
  rngFps,
  dspFps,
} from '../components/constants';

export default function getFps() {
  dspFps.innerHTML = `${rngFps.value} FPS`;
  return +rngFps.value;
}
