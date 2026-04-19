(function() {
  'use strict';

  var lightbox = document.getElementById('lightbox');
  var lightboxImage = document.getElementById('lightboxImage');
  var lightboxTitle = document.getElementById('lightboxTitle');
  var lightboxDesc = document.getElementById('lightboxDesc');
  var lightboxClose = document.getElementById('lightboxClose');
  var lightboxPrev = document.getElementById('lightboxPrev');
  var lightboxNext = document.getElementById('lightboxNext');
  var grid = document.getElementById('galleryGrid');

  if (!lightbox || !grid) return;

  var currentIndex = 0;

  function getVisibleItems() {
    return Array.from(grid.querySelectorAll('.gallery-item')).filter(function(el) {
      return el.style.display !== 'none';
    });
  }

  function openLightbox(items, index) {
    var item = items[index];
    if (!item) return;
    currentIndex = index;

    var placeholder = item.querySelector('.placeholder');
    var title = item.getAttribute('data-title') || '';
    var desc = item.getAttribute('data-desc') || '';

    if (placeholder) {
      var bg = window.getComputedStyle(placeholder);
      lightboxImage.style.backgroundImage = bg.backgroundImage;
      lightboxImage.style.backgroundSize = 'cover';
      lightboxImage.style.backgroundPosition = 'center';
      lightboxImage.style.backgroundColor = bg.backgroundColor;
      lightboxImage.innerHTML = '';
    }

    lightboxTitle.textContent = title;
    lightboxDesc.textContent = desc;
    lightbox.classList.add('active');
    document.body.style.overflow = 'hidden';
  }

  function closeLightbox() {
    lightbox.classList.remove('active');
    document.body.style.overflow = '';
  }

  function showPrev() {
    var items = getVisibleItems();
    if (items.length === 0) return;
    currentIndex = (currentIndex - 1 + items.length) % items.length;
    openLightbox(items, currentIndex);
  }

  function showNext() {
    var items = getVisibleItems();
    if (items.length === 0) return;
    currentIndex = (currentIndex + 1) % items.length;
    openLightbox(items, currentIndex);
  }

  grid.addEventListener('click', function(e) {
    var item = e.target.closest('.gallery-item');
    if (!item) return;
    var items = getVisibleItems();
    var index = items.indexOf(item);
    if (index >= 0) openLightbox(items, index);
  });

  if (lightboxClose) lightboxClose.addEventListener('click', closeLightbox);
  if (lightboxPrev) lightboxPrev.addEventListener('click', showPrev);
  if (lightboxNext) lightboxNext.addEventListener('click', showNext);

  lightbox.addEventListener('click', function(e) {
    if (e.target === lightbox) closeLightbox();
  });

  document.addEventListener('keydown', function(e) {
    if (!lightbox.classList.contains('active')) return;
    if (e.key === 'Escape') closeLightbox();
    if (e.key === 'ArrowLeft') showPrev();
    if (e.key === 'ArrowRight') showNext();
  });

  // === Gallery Filter Tabs ===
  var filterBtns = document.querySelectorAll('.filter-btn');
  if (filterBtns.length) {
    filterBtns.forEach(function(btn) {
      btn.addEventListener('click', function() {
        filterBtns.forEach(function(b) { b.classList.remove('active'); });
        btn.classList.add('active');
        var filter = btn.getAttribute('data-filter');
        var allItems = grid.querySelectorAll('.gallery-item');
        allItems.forEach(function(item) {
          if (filter === 'all' || item.getAttribute('data-category') === filter) {
            item.style.display = '';
          } else {
            item.style.display = 'none';
          }
        });
      });
    });
  }
})();
