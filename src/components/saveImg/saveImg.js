/* eslint-disable no-undef */
import './_save-btn.scss';

const canvasApng = document.querySelector('.apng-canvas');

function downloadGif(delay) {
  const encoder = new GIFEncoder();
  encoder.setRepeat(0);

  encoder.setDelay(delay);
  encoder.start();

  let frames = document.querySelectorAll('.frames__canvas');
  frames = Array.prototype.slice.call(frames);
  frames.forEach(frame => encoder.addFrame(frame.getContext('2d')));
  encoder.finish();
  encoder.download('download.gif');
}

function downloadAPNG(delay, iLink, dimension) {
  window.encoder = new APNGencoder(canvasApng);
  encoder.setRepeat(0);
  encoder.setDelay(delay);
  encoder.setDispose(0);
  encoder.setBlend(1);

  encoder.start();
  addFrames(dimension);
  encoder.finish();

  const out = encoder.stream();
  const href = URL.createObjectURL(new Blob([new Uint8Array(out.bin)], {
    type: 'image/png',
  }));
  iLink.href = href;
  iLink.download = 'animation.png';
  return 0;
}

function addFrames(dimension) {
  const ctx = canvasApng.getContext('2d');
  let frames = document.querySelectorAll('.frames__canvas');
  frames = Array.prototype.slice.call(frames);
  frames.forEach((frame) => {
    canvasApng.width = dimension;
    canvasApng.height = dimension;
    const img = new Image();
    img.src = frame.toDataURL();
    ctx.drawImage(img, 0, 0, dimension, dimension);

    encoder.addFrame(ctx);
  });

  encoder.addFrame(ctx);

  return 0;
}

export {
  downloadGif,
  downloadAPNG,
};
