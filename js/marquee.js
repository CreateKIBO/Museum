/* marquee.js — 东巴文无限滚动控制 */

(function() {
  'use strict';

  const section = document.getElementById('dongbaMarquee');
  if (!section) return;

  const tracks = section.querySelectorAll('.marquee-track');
  if (!tracks.length) return;

  // Ensure seamless loop: each track's content is already duplicated in HTML
  // CSS handles the animation; JS only controls hover behavior
  // Hover slowdown is handled by CSS (.marquee-row:hover .marquee-track)

  // Optional: Pause on click
  tracks.forEach((track) => {
    track.addEventListener('click', () => {
      const running = getComputedStyle(track).animationPlayState;
      track.style.animationPlayState = running === 'paused' ? 'running' : 'paused';
    });
  });
})();
