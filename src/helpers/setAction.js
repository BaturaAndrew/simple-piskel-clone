export default function setAction(tool, cursor, toolEl, controlCanvas_) {
  clearToolState();
  controlCanvas_.currentTool = tool;
  document.body.style.cursor = cursor; // change cursor type
  toolEl.classList.add('active');
}

function clearToolState() {
  const palleteEl = document.querySelector('.pallete');
  let childs = palleteEl.children;
  childs = Array.prototype.slice.call(childs);
  childs.map((elem) => {
    elem.classList.remove('active');
  });
}
