/* canvas-draw.js — 东巴文互动书写画布 */

(function() {
  'use strict';

  const canvas = document.getElementById('dongbaCanvas');
  if (!canvas) return;

  const ctx = canvas.getContext('2d');
  let isDrawing = false;
  let lastX = 0;
  let lastY = 0;
  let brushSize = 3;
  let inkColor = '#1A1A18';

  // High-DPI support
  let drawingData = null;
  function resizeCanvas() {
    const rect = canvas.getBoundingClientRect();
    const dpr = window.devicePixelRatio || 1;
    // Save current drawing
    if (canvas.width > 0 && canvas.height > 0) {
      try { drawingData = canvas.toDataURL(); } catch(e) {}
    }
    canvas.width = rect.width * dpr;
    canvas.height = rect.height * dpr;
    ctx.scale(dpr, dpr);
    canvas.style.width = rect.width + 'px';
    canvas.style.height = rect.height + 'px';
    ctx.fillStyle = '#fff';
    ctx.fillRect(0, 0, canvas.width, canvas.height);
    // Restore drawing
    if (drawingData) {
      const img = new Image();
      img.onload = function() { ctx.drawImage(img, 0, 0, rect.width, rect.height); };
      img.src = drawingData;
    }
  }

  resizeCanvas();
  let resizeTimer;
  window.addEventListener('resize', function() {
    clearTimeout(resizeTimer);
    resizeTimer = setTimeout(resizeCanvas, 200);
  });

  function getPos(e) {
    const rect = canvas.getBoundingClientRect();
    const touch = e.touches ? e.touches[0] : e;
    return {
      x: touch.clientX - rect.left,
      y: touch.clientY - rect.top
    };
  }

  function startDraw(e) {
    e.preventDefault();
    isDrawing = true;
    const pos = getPos(e);
    lastX = pos.x;
    lastY = pos.y;
  }

  function draw(e) {
    if (!isDrawing) return;
    e.preventDefault();
    const pos = getPos(e);

    ctx.beginPath();
    ctx.moveTo(lastX, lastY);
    ctx.lineTo(pos.x, pos.y);
    ctx.strokeStyle = inkColor;
    ctx.lineWidth = brushSize;
    ctx.lineCap = 'round';
    ctx.lineJoin = 'round';
    ctx.stroke();

    // Ink spread effect — subtle shadow
    if (brushSize > 4) {
      ctx.beginPath();
      ctx.moveTo(lastX, lastY);
      ctx.lineTo(pos.x, pos.y);
      ctx.strokeStyle = inkColor.replace(')', ',0.1)').replace('rgb', 'rgba').replace('#', '');
      ctx.lineWidth = brushSize * 2;
      ctx.globalAlpha = 0.05;
      ctx.stroke();
      ctx.globalAlpha = 1;
    }

    lastX = pos.x;
    lastY = pos.y;
  }

  function stopDraw() {
    isDrawing = false;
  }

  // Mouse events
  canvas.addEventListener('mousedown', startDraw);
  canvas.addEventListener('mousemove', draw);
  canvas.addEventListener('mouseup', stopDraw);
  canvas.addEventListener('mouseleave', stopDraw);

  // Touch events
  canvas.addEventListener('touchstart', startDraw, { passive: false });
  canvas.addEventListener('touchmove', draw, { passive: false });
  canvas.addEventListener('touchend', stopDraw);

  // Clear button
  const clearBtn = document.getElementById('canvasClear');
  if (clearBtn) {
    clearBtn.addEventListener('click', () => {
      ctx.fillStyle = '#fff';
      ctx.fillRect(0, 0, canvas.width, canvas.height);
    });
  }

  // Brush size
  const brushBtns = document.querySelectorAll('.brush-btn');
  brushBtns.forEach((btn) => {
    btn.addEventListener('click', () => {
      brushBtns.forEach((b) => b.classList.remove('active'));
      btn.classList.add('active');
      brushSize = parseInt(btn.dataset.size, 10);
    });
  });

  // Ink color
  const inkBtns = document.querySelectorAll('.ink-btn');
  inkBtns.forEach((btn) => {
    btn.addEventListener('click', () => {
      inkBtns.forEach((b) => b.classList.remove('active'));
      btn.classList.add('active');
      inkColor = btn.dataset.color;
    });
  });
})();
