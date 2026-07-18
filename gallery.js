(function(){
"use strict";

const overlay = document.getElementById('galOverlay');
if (!overlay) return;

const imageEl = document.getElementById('galImage');
const tagEl = document.getElementById('galTag');
const titleEl = document.getElementById('galTitle');
const counterEl = document.getElementById('galCounter');
const closeBtn = document.getElementById('galClose');
const prevBtn = document.getElementById('galPrev');
const nextBtn = document.getElementById('galNext');

/* Monta a lista de slides a partir dos próprios cards da timeline —
   qualquer imagem/legenda editada no HTML reflete aqui automaticamente. */
const triggers = Array.from(document.querySelectorAll('[data-gallery-trigger]'));
const slides = triggers.map(btn => {
  const card = btn.closest('.timeline-card');
  const img = btn.querySelector('img');
  return {
    src: img ? img.getAttribute('src') : '',
    alt: img ? img.getAttribute('alt') : '',
    tag: card ? (card.querySelector('.timeline-tag')?.textContent || '') : '',
    title: card ? (card.querySelector('h3')?.textContent || '') : '',
  };
});

let current = 0;

function render(){
  const s = slides[current];
  if(!s) return;
  imageEl.src = s.src;
  imageEl.alt = s.alt;
  tagEl.textContent = s.tag;
  titleEl.textContent = s.title;
  counterEl.textContent = `${current + 1} / ${slides.length}`;
}

function open(index){
  current = index;
  render();
  overlay.hidden = false;
  requestAnimationFrame(()=> overlay.classList.add('is-open'));
  document.body.style.overflow = 'hidden';
  closeBtn.focus();
}

function close(){
  overlay.classList.remove('is-open');
  document.body.style.overflow = '';
  setTimeout(()=>{ overlay.hidden = true; }, 260);
}

function next(){ current = (current + 1) % slides.length; render(); }
function prev(){ current = (current - 1 + slides.length) % slides.length; render(); }

triggers.forEach((btn, i) => {
  btn.addEventListener('click', () => open(i));
});

closeBtn.addEventListener('click', close);
nextBtn.addEventListener('click', next);
prevBtn.addEventListener('click', prev);

overlay.addEventListener('click', e => {
  if (e.target === overlay) close();
});

document.addEventListener('keydown', e => {
  if (overlay.hidden) return;
  if (e.key === 'Escape') close();
  if (e.key === 'ArrowRight') next();
  if (e.key === 'ArrowLeft') prev();
});

/* swipe simples no mobile */
let touchStartX = null;
overlay.addEventListener('touchstart', e => { touchStartX = e.changedTouches[0].clientX; }, {passive:true});
overlay.addEventListener('touchend', e => {
  if (touchStartX === null) return;
  const dx = e.changedTouches[0].clientX - touchStartX;
  if (Math.abs(dx) > 40) { dx > 0 ? prev() : next(); }
  touchStartX = null;
}, {passive:true});

})();
