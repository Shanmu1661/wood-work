/**
 * ===================================================================
 * TimberCraft - Interior Carpenter & Woodwork Contractor Template
 * Core JavaScript (main.js)
 * ===================================================================
 */

document.addEventListener('DOMContentLoaded', () => {
  initTheme();
  initDirection();
  initMobileMenu();
  initHeaderScroll();
  initBeforeAfterSliders();
  initGalleryFilter();
  initLightbox();
  initWoodEstimator();
  initWoodSwatches();
  initAccordion();
  initFormValidation();
  initCountdown();
  initBackToTop();
});

/* --------------------------------------------------
 * 1. THEME TOGGLE (Dark / Light Mode)
 * -------------------------------------------------- */
function initTheme() {
  const themeToggleBtns = document.querySelectorAll('.theme-toggle-btn');
  const storedTheme = localStorage.getItem('timbercraft_theme');
  const systemPrefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;

  const activeTheme = storedTheme || (systemPrefersDark ? 'dark' : 'light');
  applyTheme(activeTheme);

  themeToggleBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      const isDark = document.documentElement.classList.contains('dark');
      const newTheme = isDark ? 'light' : 'dark';
      applyTheme(newTheme);
      localStorage.setItem('timbercraft_theme', newTheme);
      showToast(`Switched to ${newTheme === 'dark' ? 'Dark Walnut' : 'Warm Linen'} Mode`);
    });
  });

  // Listen to OS theme changes if user hasn't manually set preference
  window.matchMedia('(prefers-color-scheme: dark)').addEventListener('change', e => {
    if (!localStorage.getItem('timbercraft_theme')) {
      applyTheme(e.matches ? 'dark' : 'light');
    }
  });
}

function applyTheme(theme) {
  const html = document.documentElement;
  const toggleIcons = document.querySelectorAll('.theme-toggle-icon');

  if (theme === 'dark') {
    html.classList.add('dark');
    toggleIcons.forEach(icon => {
      icon.classList.remove('fa-moon');
      icon.classList.add('fa-sun');
    });
  } else {
    html.classList.remove('dark');
    toggleIcons.forEach(icon => {
      icon.classList.remove('fa-sun');
      icon.classList.add('fa-moon');
    });
  }
}

/* --------------------------------------------------
 * 2. DIRECTION TOGGLE (RTL / LTR)
 * -------------------------------------------------- */
function initDirection() {
  const dirToggleBtns = document.querySelectorAll('.dir-toggle-btn');
  const storedDir = localStorage.getItem('timbercraft_direction') || 'ltr';

  applyDirection(storedDir);

  dirToggleBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      const currentDir = document.documentElement.getAttribute('dir') || 'ltr';
      const newDir = currentDir === 'rtl' ? 'ltr' : 'rtl';
      applyDirection(newDir);
      localStorage.setItem('timbercraft_direction', newDir);
      showToast(`Layout switched to ${newDir.toUpperCase()}`);
    });
  });
}

function applyDirection(dir) {
  const html = document.documentElement;
  html.setAttribute('dir', dir);
  const dirTexts = document.querySelectorAll('.dir-text');
  dirTexts.forEach(txt => {
    txt.textContent = dir === 'rtl' ? 'LTR' : 'RTL';
  });
}

/* --------------------------------------------------
 * 3. MOBILE NAVIGATION MENU
 * -------------------------------------------------- */
function initMobileMenu() {
  const menuToggle = document.getElementById('menuToggle');
  const mobileMenu = document.getElementById('mobileMenu');
  const mobileMenuBackdrop = document.getElementById('mobileMenuBackdrop');
  const closeMenuBtn = document.getElementById('closeMobileMenu');

  if (!menuToggle || !mobileMenu) return;

  function openMenu() {
    mobileMenu.classList.remove('hidden');
    setTimeout(() => {
      mobileMenu.classList.add('open');
      if (mobileMenuBackdrop) mobileMenuBackdrop.classList.remove('opacity-0', 'pointer-events-none');
    }, 10);
    menuToggle.setAttribute('aria-expanded', 'true');
    document.body.style.overflow = 'hidden';
  }

  function closeMenu() {
    mobileMenu.classList.remove('open');
    if (mobileMenuBackdrop) mobileMenuBackdrop.classList.add('opacity-0', 'pointer-events-none');
    setTimeout(() => {
      mobileMenu.classList.add('hidden');
      document.body.style.overflow = '';
    }, 300);
    menuToggle.setAttribute('aria-expanded', 'false');
  }

  menuToggle.addEventListener('click', openMenu);
  if (closeMenuBtn) closeMenuBtn.addEventListener('click', closeMenu);
  if (mobileMenuBackdrop) mobileMenuBackdrop.addEventListener('click', closeMenu);

  // Close on Escape key
  document.addEventListener('keydown', e => {
    if (e.key === 'Escape' && mobileMenu.classList.contains('open')) {
      closeMenu();
    }
  });
}

/* --------------------------------------------------
 * 4. HEADER SCROLL EFFECT
 * -------------------------------------------------- */
function initHeaderScroll() {
  const header = document.querySelector('header');
  if (!header) return;

  window.addEventListener('scroll', () => {
    if (window.scrollY > 40) {
      header.classList.add('shadow-md', 'backdrop-blur-md');
    } else {
      header.classList.remove('shadow-md');
    }
  });
}

/* --------------------------------------------------
 * 5. BEFORE / AFTER INTERACTIVE COMPARISON SLIDER
 * -------------------------------------------------- */
function initBeforeAfterSliders() {
  const sliders = document.querySelectorAll('.before-after-container');

  sliders.forEach(slider => {
    const beforeWrap = slider.querySelector('.before-image-wrap');
    const handleLine = slider.querySelector('.slider-handle-line');
    if (!beforeWrap || !handleLine) return;

    let isSliding = false;

    function moveSlider(clientX) {
      const rect = slider.getBoundingClientRect();
      const isRtl = document.documentElement.getAttribute('dir') === 'rtl';
      let offset = clientX - rect.left;
      if (offset < 0) offset = 0;
      if (offset > rect.width) offset = rect.width;

      let percentage = (offset / rect.width) * 100;
      if (percentage < 3) percentage = 3;
      if (percentage > 97) percentage = 97;

      if (isRtl) {
        beforeWrap.style.width = `${100 - percentage}%`;
        handleLine.style.left = `${percentage}%`;
      } else {
        beforeWrap.style.width = `${percentage}%`;
        handleLine.style.left = `${percentage}%`;
      }
    }

    slider.addEventListener('mousedown', e => {
      isSliding = true;
      moveSlider(e.clientX);
    });

    window.addEventListener('mouseup', () => { isSliding = false; });
    window.addEventListener('mousemove', e => {
      if (!isSliding) return;
      moveSlider(e.clientX);
    });

    slider.addEventListener('touchstart', e => {
      isSliding = true;
      moveSlider(e.touches[0].clientX);
    }, { passive: true });

    window.addEventListener('touchend', () => { isSliding = false; });
    window.addEventListener('touchmove', e => {
      if (!isSliding) return;
      moveSlider(e.touches[0].clientX);
    }, { passive: true });
  });
}

/* --------------------------------------------------
 * 6. GALLERY CATEGORY FILTER
 * -------------------------------------------------- */
function initGalleryFilter() {
  const filterBtns = document.querySelectorAll('.gallery-filter-btn');
  const galleryItems = document.querySelectorAll('.gallery-item');
  if (!filterBtns.length || !galleryItems.length) return;

  filterBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      filterBtns.forEach(b => {
        b.classList.remove('bg-amber-700', 'text-white', 'shadow-md');
        b.classList.add('bg-stone-100', 'dark:bg-stone-800', 'text-stone-700', 'dark:text-stone-300');
      });
      btn.classList.add('bg-amber-700', 'text-white', 'shadow-md');
      btn.classList.remove('bg-stone-100', 'dark:bg-stone-800', 'text-stone-700', 'dark:text-stone-300');

      const filter = btn.getAttribute('data-filter');

      // Visual skeleton animation
      galleryItems.forEach(item => {
        item.style.opacity = '0';
        item.style.transform = 'scale(0.96)';
        setTimeout(() => {
          if (filter === 'all' || item.getAttribute('data-category') === filter) {
            item.classList.remove('hidden');
            setTimeout(() => {
              item.style.opacity = '1';
              item.style.transform = 'scale(1)';
            }, 50);
          } else {
            item.classList.add('hidden');
          }
        }, 180);
      });
    });
  });
}

/* --------------------------------------------------
 * 7. LIGHTBOX MODAL
 * -------------------------------------------------- */
let currentLightboxIndex = 0;
let lightboxItems = [];

function initLightbox() {
  const modal = document.getElementById('lightboxModal');
  const modalImg = document.getElementById('lightboxImage');
  const modalTitle = document.getElementById('lightboxTitle');
  const modalDesc = document.getElementById('lightboxDesc');
  const modalSpecies = document.getElementById('lightboxSpecies');
  const closeBtn = document.getElementById('lightboxClose');
  const prevBtn = document.getElementById('lightboxPrev');
  const nextBtn = document.getElementById('lightboxNext');

  if (!modal || !modalImg) return;

  lightboxItems = Array.from(document.querySelectorAll('[data-lightbox]'));

  lightboxItems.forEach((el, index) => {
    el.addEventListener('click', e => {
      e.preventDefault();
      openLightbox(index);
    });
  });

  function openLightbox(index) {
    currentLightboxIndex = index;
    const item = lightboxItems[index];
    const src = item.getAttribute('data-lightbox-src') || item.querySelector('img')?.src;
    const title = item.getAttribute('data-lightbox-title') || 'TimberCraft Joinery';
    const desc = item.getAttribute('data-lightbox-desc') || 'Custom Interior Carpentry';
    const species = item.getAttribute('data-lightbox-species') || 'Hardwood & Natural Veneer';

    modalImg.src = src;
    if (modalTitle) modalTitle.textContent = title;
    if (modalDesc) modalDesc.textContent = desc;
    if (modalSpecies) modalSpecies.textContent = `Wood: ${species}`;

    modal.classList.add('active');
    document.body.style.overflow = 'hidden';
  }

  function closeLightbox() {
    modal.classList.remove('active');
    document.body.style.overflow = '';
  }

  function showNext() {
    currentLightboxIndex = (currentLightboxIndex + 1) % lightboxItems.length;
    openLightbox(currentLightboxIndex);
  }

  function showPrev() {
    currentLightboxIndex = (currentLightboxIndex - 1 + lightboxItems.length) % lightboxItems.length;
    openLightbox(currentLightboxIndex);
  }

  if (closeBtn) closeBtn.addEventListener('click', closeLightbox);
  if (nextBtn) nextBtn.addEventListener('click', showNext);
  if (prevBtn) prevBtn.addEventListener('click', showPrev);

  modal.addEventListener('click', e => {
    if (e.target === modal) closeLightbox();
  });

  document.addEventListener('keydown', e => {
    if (!modal.classList.contains('active')) return;
    if (e.key === 'Escape') closeLightbox();
    if (e.key === 'ArrowRight') {
      document.documentElement.getAttribute('dir') === 'rtl' ? showPrev() : showNext();
    }
    if (e.key === 'ArrowLeft') {
      document.documentElement.getAttribute('dir') === 'rtl' ? showNext() : showPrev();
    }
  });
}

/* --------------------------------------------------
 * 8. INTERACTIVE WOOD ESTIMATOR CALCULATOR
 * -------------------------------------------------- */
function initWoodEstimator() {
  const form = document.getElementById('woodEstimatorForm');
  if (!form) return;

  const projectTypeSelect = document.getElementById('estimatorProject');
  const woodTypeSelect = document.getElementById('estimatorWood');
  const finishTypeSelect = document.getElementById('estimatorFinish');
  const areaRange = document.getElementById('estimatorArea');
  const areaDisplay = document.getElementById('estimatorAreaDisplay');

  const costLowDisplay = document.getElementById('costEstimateLow');
  const costHighDisplay = document.getElementById('costEstimateHigh');
  const durationDisplay = document.getElementById('estimateDuration');
  const boardFeetDisplay = document.getElementById('estimateBoardFeet');

  function calculateEstimate() {
    if (!projectTypeSelect || !woodTypeSelect) return;

    const baseSqftRate = parseFloat(projectTypeSelect.value) || 60;
    const woodMultiplier = parseFloat(woodTypeSelect.value) || 1.0;
    const finishMultiplier = parseFloat(finishTypeSelect ? finishTypeSelect.value : 1.0) || 1.0;
    const sqft = parseInt(areaRange ? areaRange.value : 80);

    if (areaDisplay) areaDisplay.textContent = `${sqft} sq.ft`;

    // Calculation formula
    const baseCost = sqft * baseSqftRate * woodMultiplier * finishMultiplier;
    const lowCost = Math.round(baseCost * 0.95);
    const highCost = Math.round(baseCost * 1.15);

    // Board feet approx (1.2 BF per sq ft surface)
    const boardFeet = Math.round(sqft * 1.35);

    // Weeks calculation
    let weeks = 2;
    if (sqft > 75) weeks = 3;
    if (sqft > 150) weeks = 4;
    if (sqft > 300) weeks = 6;

    if (costLowDisplay) costLowDisplay.textContent = `$${lowCost.toLocaleString()}`;
    if (costHighDisplay) costHighDisplay.textContent = `$${highCost.toLocaleString()}`;
    if (boardFeetDisplay) boardFeetDisplay.textContent = `${boardFeet} BF`;
    if (durationDisplay) durationDisplay.textContent = `${weeks} - ${weeks + 1} Weeks`;
  }

  [projectTypeSelect, woodTypeSelect, finishTypeSelect, areaRange].forEach(elem => {
    if (elem) {
      elem.addEventListener('input', calculateEstimate);
      elem.addEventListener('change', calculateEstimate);
    }
  });

  calculateEstimate();
}

/* --------------------------------------------------
 * 9. TIMBER SPECIES SWATCH SELECTOR
 * -------------------------------------------------- */
function initWoodSwatches() {
  const swatches = document.querySelectorAll('.wood-swatch-item');
  const previewImg = document.getElementById('swatchPreviewImg');
  const previewName = document.getElementById('swatchPreviewName');
  const previewGrain = document.getElementById('swatchPreviewGrain');
  const previewHardness = document.getElementById('swatchPreviewHardness');
  const previewUsage = document.getElementById('swatchPreviewUsage');

  if (!swatches.length) return;

  swatches.forEach(swatch => {
    swatch.addEventListener('click', () => {
      swatches.forEach(s => s.classList.remove('active', 'ring-2', 'ring-amber-600'));
      swatch.classList.add('active', 'ring-2', 'ring-amber-600');

      const name = swatch.getAttribute('data-name');
      const grain = swatch.getAttribute('data-grain');
      const hardness = swatch.getAttribute('data-hardness');
      const usage = swatch.getAttribute('data-usage');
      const img = swatch.getAttribute('data-img');

      if (previewName) previewName.textContent = name;
      if (previewGrain) previewGrain.textContent = grain;
      if (previewHardness) previewHardness.textContent = hardness;
      if (previewUsage) previewUsage.textContent = usage;
      if (previewImg && img) previewImg.src = img;
    });
  });
}

/* --------------------------------------------------
 * 10. ACCORDION (FAQ)
 * -------------------------------------------------- */
function initAccordion() {
  const triggers = document.querySelectorAll('.accordion-trigger');
  triggers.forEach(btn => {
    btn.addEventListener('click', () => {
      const content = btn.nextElementSibling;
      const isOpen = btn.getAttribute('aria-expanded') === 'true';
      const icon = btn.querySelector('.accordion-icon');

      // Close all other accordions in same group if desired
      triggers.forEach(otherBtn => {
        if (otherBtn !== btn) {
          otherBtn.setAttribute('aria-expanded', 'false');
          if (otherBtn.nextElementSibling) {
            otherBtn.nextElementSibling.style.maxHeight = null;
          }
          const otherIcon = otherBtn.querySelector('.accordion-icon');
          if (otherIcon) otherIcon.style.transform = 'rotate(0deg)';
        }
      });

      if (isOpen) {
        btn.setAttribute('aria-expanded', 'false');
        content.style.maxHeight = null;
        if (icon) icon.style.transform = 'rotate(0deg)';
      } else {
        btn.setAttribute('aria-expanded', 'true');
        content.style.maxHeight = content.scrollHeight + 'px';
        if (icon) icon.style.transform = 'rotate(180deg)';
      }
    });
  });
}

/* --------------------------------------------------
 * 11. FORM VALIDATION & TOAST NOTIFICATION
 * -------------------------------------------------- */
function initFormValidation() {
  const forms = document.querySelectorAll('form[data-validate="true"]');

  forms.forEach(form => {
    form.addEventListener('submit', e => {
      e.preventDefault();
      let isValid = true;
      const inputs = form.querySelectorAll('input[required], select[required], textarea[required]');

      inputs.forEach(input => {
        const val = input.value.trim();
        const errorMsg = input.parentElement.querySelector('.form-error-msg');

        if (input.type === 'email') {
          const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
          if (!emailRegex.test(val)) {
            markInvalid(input, 'Please enter a valid email address');
            isValid = false;
          } else {
            markValid(input);
          }
        } else if (input.type === 'tel') {
          const phoneRegex = /^[+]?[(]?[0-9]{3}[)]?[-\s.]?[0-9]{3}[-\s.]?[0-9]{4,6}$/;
          if (val.length < 7 || !phoneRegex.test(val)) {
            markInvalid(input, 'Please enter a valid phone number');
            isValid = false;
          } else {
            markValid(input);
          }
        } else if (val === '') {
          markInvalid(input, 'This field is required');
          isValid = false;
        } else {
          markValid(input);
        }
      });

      if (isValid) {
        const submitBtn = form.querySelector('button[type="submit"]');
        const origBtnText = submitBtn ? submitBtn.innerHTML : '';
        if (submitBtn) {
          submitBtn.disabled = true;
          submitBtn.innerHTML = '<i class="fa fa-circle-notch fa-spin"></i> Submitting...';
        }

        setTimeout(() => {
          form.reset();
          inputs.forEach(input => {
            input.classList.remove('is-valid', 'is-invalid');
          });
          if (submitBtn) {
            submitBtn.disabled = false;
            submitBtn.innerHTML = origBtnText;
          }
          showToast('Request received! Our Master Carpenter will contact you within 24 hours.');
        }, 900);
      }
    });

    // Real-time cleanup on input
    form.querySelectorAll('input, select, textarea').forEach(input => {
      input.addEventListener('input', () => {
        if (input.classList.contains('is-invalid')) {
          input.classList.remove('is-invalid');
          const errorMsg = input.parentElement.querySelector('.form-error-msg');
          if (errorMsg) errorMsg.classList.add('hidden');
        }
      });
    });
  });

  function markInvalid(input, message) {
    input.classList.add('is-invalid');
    input.classList.remove('is-valid');
    let errorMsg = input.parentElement.querySelector('.form-error-msg');
    if (!errorMsg) {
      errorMsg = document.createElement('span');
      errorMsg.className = 'form-error-msg text-xs text-red-500 mt-1 block';
      input.parentElement.appendChild(errorMsg);
    }
    errorMsg.textContent = message;
    errorMsg.classList.remove('hidden');
  }

  function markValid(input) {
    input.classList.remove('is-invalid');
    input.classList.add('is-valid');
    const errorMsg = input.parentElement.querySelector('.form-error-msg');
    if (errorMsg) errorMsg.classList.add('hidden');
  }
}

/* --------------------------------------------------
 * 12. TOAST NOTIFICATION
 * -------------------------------------------------- */
function showToast(message) {
  let toast = document.getElementById('woodToast');
  if (!toast) {
    toast = document.createElement('div');
    toast.id = 'woodToast';
    toast.className = 'wood-toast';
    toast.innerHTML = `
      <i class="fa-solid fa-circle-check text-amber-600 text-xl"></i>
      <div id="woodToastMsg" class="text-sm font-semibold text-stone-800 dark:text-stone-100"></div>
    `;
    document.body.appendChild(toast);
  }

  const toastMsg = document.getElementById('woodToastMsg');
  if (toastMsg) toastMsg.textContent = message;

  toast.classList.add('show');
  setTimeout(() => {
    toast.classList.remove('show');
  }, 4200);
}

/* --------------------------------------------------
 * 13. COMING SOON COUNTDOWN TIMER
 * -------------------------------------------------- */
function initCountdown() {
  const countdownElem = document.getElementById('countdownTimer');
  if (!countdownElem) return;

  // Set target launch 45 days from current date
  const targetDate = new Date();
  targetDate.setDate(targetDate.getDate() + 45);

  function update() {
    const now = new Date().getTime();
    const distance = targetDate.getTime() - now;

    if (distance < 0) {
      countdownElem.innerHTML = '<span class="text-2xl font-bold">We are Live!</span>';
      return;
    }

    const days = Math.floor(distance / (1000 * 60 * 60 * 24));
    const hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
    const seconds = Math.floor((distance % (1000 * 60)) / 1000);

    const dEl = document.getElementById('timerDays');
    const hEl = document.getElementById('timerHours');
    const mEl = document.getElementById('timerMins');
    const sEl = document.getElementById('timerSecs');

    if (dEl) dEl.textContent = String(days).padStart(2, '0');
    if (hEl) hEl.textContent = String(hours).padStart(2, '0');
    if (mEl) mEl.textContent = String(minutes).padStart(2, '0');
    if (sEl) sEl.textContent = String(seconds).padStart(2, '0');
  }

  update();
  setInterval(update, 1000);
}

/* --------------------------------------------------
 * 14. BACK TO TOP BUTTON
 * -------------------------------------------------- */
function initBackToTop() {
  const btn = document.getElementById('backToTopBtn');
  if (!btn) return;

  window.addEventListener('scroll', () => {
    if (window.scrollY > 400) {
      btn.classList.remove('opacity-0', 'pointer-events-none');
      btn.classList.add('opacity-100');
    } else {
      btn.classList.add('opacity-0', 'pointer-events-none');
      btn.classList.remove('opacity-100');
    }
  });

  btn.addEventListener('click', () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  });
}
