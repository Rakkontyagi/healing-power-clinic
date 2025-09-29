// Healing Power Clinic — Vanilla JS (progressive enhancement)
(function(){
  const nav = document.querySelector('.nav');
  const hamb = document.querySelector('.hamb');
  if(hamb && nav){
    hamb.addEventListener('click',()=>{
      const open = nav.classList.toggle('open');
      hamb.setAttribute('aria-expanded', open?'true':'false');
    });
  }
  // Reveal on scroll
  const io = ('IntersectionObserver' in window)? new IntersectionObserver((entries)=>{
    entries.forEach(e=>{ if(e.isIntersecting){ e.target.classList.add('in-view'); io.unobserve(e.target); } });
  },{threshold:.12}) : null;
  document.querySelectorAll('.reveal').forEach(el=>{ if(io) io.observe(el); else el.classList.add('in-view'); });
})();

