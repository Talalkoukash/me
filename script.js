// nav scroll state
const nav = document.getElementById('nav');
window.addEventListener('scroll', () => {
  nav.classList.toggle('scrolled', window.scrollY > 40);
}, { passive:true });

// mobile nav toggle
const navToggle = document.getElementById('navToggle');
navToggle.addEventListener('click', () => nav.classList.toggle('nav-open'));
document.querySelectorAll('.nav-links a').forEach(a=>{
  a.addEventListener('click', ()=> nav.classList.remove('nav-open'));
});

// hero cursor-reactive glow
const heroCursor = document.getElementById('heroCursor');
const heroEl = document.querySelector('.hero');
if (window.matchMedia('(prefers-reduced-motion: no-preference)').matches) {
  heroEl.addEventListener('pointermove', (e) => {
    const r = heroEl.getBoundingClientRect();
    const mx = ((e.clientX - r.left) / r.width) * 100;
    const my = ((e.clientY - r.top) / r.height) * 100;
    heroCursor.style.setProperty('--mx', mx + '%');
    heroCursor.style.setProperty('--my', my + '%');
  });
}

// scroll reveals
const io = new IntersectionObserver((entries)=>{
  entries.forEach(entry=>{
    if(entry.isIntersecting){
      entry.target.classList.add('in-view');
      io.unobserve(entry.target);
    }
  });
}, { threshold:.15, rootMargin:'0px 0px -60px 0px' });

document.querySelectorAll('.reveal').forEach(el=> io.observe(el));

// eyebrow swash stroke length (set once, robust to any path shape)
document.querySelectorAll('.swash path').forEach(p=>{
  const len = p.getTotalLength();
  p.style.setProperty('--len', len);
});