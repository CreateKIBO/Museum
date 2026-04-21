/* animations.js — IntersectionObserver 滚动动画系统 */

(function() {
  'use strict';

  const animElements = document.querySelectorAll(
    '.anim-fade, .anim-fade-up, .anim-slide-left, .anim-slide-right, .anim-pop'
  );

  if (!animElements.length) return;

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          const el = entry.target;
          const delay = parseInt(el.dataset.delay || '0', 10);
          setTimeout(() => {
            el.classList.add('visible');
          }, delay);
          observer.unobserve(el);
        }
      });
    },
    { threshold: 0.15, rootMargin: '0px 0px -40px 0px' }
  );

  animElements.forEach((el) => observer.observe(el));
})();

/* 打字机效果 */
(function() {
  'use strict';

  const typingElement = document.getElementById('heroTyping');
  if (!typingElement) return;

  const texts = ['活着的象形文字', '人类文明的活化石', '千年文化的传承'];
  let textIndex = 0;
  let charIndex = 0;
  let isDeleting = false;
  let typingSpeed = 120;

  function type() {
    const currentText = texts[textIndex];

    if (isDeleting) {
      typingElement.textContent = currentText.substring(0, charIndex - 1);
      charIndex--;
      typingSpeed = 60;
    } else {
      typingElement.textContent = currentText.substring(0, charIndex + 1);
      charIndex++;
      typingSpeed = 120;
    }

    // 添加光标
    if (!typingElement.querySelector('.typewriter-cursor')) {
      const cursor = document.createElement('span');
      cursor.className = 'typewriter-cursor';
      typingElement.appendChild(cursor);
    }

    if (!isDeleting && charIndex === currentText.length) {
      typingSpeed = 2000; // 暂停时间
      isDeleting = true;
    } else if (isDeleting && charIndex === 0) {
      isDeleting = false;
      textIndex = (textIndex + 1) % texts.length;
      typingSpeed = 500;
    }

    setTimeout(type, typingSpeed);
  }

  // 延迟启动打字效果
  setTimeout(type, 1500);
})();

/* 文字聚焦效果 */
(function() {
  'use strict';

  const focusContainers = document.querySelectorAll('.focus-text-container');

  focusContainers.forEach(container => {
    const words = container.querySelectorAll('.focus-word');
    let currentIndex = 0;

    function updateFocus() {
      words.forEach((word, index) => {
        if (index === currentIndex) {
          word.classList.remove('blur');
          word.classList.add('active');
        } else {
          word.classList.add('blur');
          word.classList.remove('active');
        }
      });
      currentIndex = (currentIndex + 1) % words.length;
    }

    if (words.length > 0) {
      updateFocus();
      setInterval(updateFocus, 2000);
    }
  });
})();

/* 滚动揭示文字动画 */
(function() {
  'use strict';

  const revealElements = document.querySelectorAll('.scroll-reveal-text');

  revealElements.forEach(el => {
    const text = el.textContent;
    el.innerHTML = '';

    text.split(/(\s+)/).forEach((word, index) => {
      if (word.match(/^\s+$/)) {
        el.appendChild(document.createTextNode(word));
      } else {
        const span = document.createElement('span');
        span.className = 'scroll-reveal-word';
        span.textContent = word;
        span.style.transitionDelay = `${index * 0.05}s`;
        el.appendChild(span);
      }
    });

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            entry.target.querySelectorAll('.scroll-reveal-word').forEach(word => {
              word.classList.add('visible');
            });
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.2 }
    );

    observer.observe(el);
  });
})();
