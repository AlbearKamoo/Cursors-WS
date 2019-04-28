initializeCanvas();

function initializeCanvas() {
  const canvas = document.getElementById('main-canvas');
  const ctx = canvas.getContext('2d');
  const dpi = window.devicePixelRatio || 1;

  const width = window.innerWidth;
  const height = window.innerHeight;
  const scale = 1;

  canvas.width = scale * width * dpi;
  canvas.height = scale * height * dpi;

  canvas.style.width = `${scale * width}px`;
  canvas.style.height = `${scale * height}px`;

  ctx.imageSmoothingEnabled = false;

  ctx.scale(scale * dpi, scale * dpi);
}
