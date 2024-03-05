let isDragging = false;
let startX, startY, endX, endY;

const container = document.getElementById('container');
const selectableArea = document.getElementById('selectableArea');

container.addEventListener('mousedown', startSelection);
container.addEventListener('mousemove', updateSelection);
container.addEventListener('mouseup', endSelection);

function startSelection(event) {
  isDragging = true;
  startX = event.clientX - container.offsetLeft;
  startY = event.clientY - container.offsetTop;
  if (!selectableArea.classList.contains('dragging')) {
    selectableArea.classList.add('dragging');
  }
}

function updateSelection(event) {
  if (!isDragging) return;
  endX = event.clientX - container.offsetLeft;
  endY = event.clientY - container.offsetTop;

  selectableArea.style.left = Math.min(startX, endX) + 'px';
  selectableArea.style.top = Math.min(startY, endY) + 'px';
  selectableArea.style.width = Math.abs(endX - startX) + 'px';
  selectableArea.style.height = Math.abs(endY - startY) + 'px';
}

function endSelection(event) {
  isDragging = false;
  if (selectableArea.classList.contains('dragging')) {
    selectableArea.classList.remove('dragging');
  }

  // save
  saveSelection();
}

function saveSelection() {
  const selectableAreaBoundingRect = selectableArea.getBoundingClientRect();
  const width = selectableAreaBoundingRect.width;
  const height = selectableAreaBoundingRect.height;

  const canvas = document.getElementById('canvas');
  canvas.width = width;
  canvas.height = height;
  const ctx = canvas.getContext('2d');

  html2canvas(container, { scale: 1 }).then(function(tempCanvas) {
    ctx.drawImage(
      tempCanvas,
      selectableAreaBoundingRect.left - container.offsetLeft,
      selectableAreaBoundingRect.top - container.offsetTop,
      width,
      height,
      0,
      0,
      width,
      height
    );
  });

}
