(() => {
  // ── LOADER ──
  const bar = document.getElementById('loaderBar');
  const pct = document.getElementById('loaderPct');
  const loader = document.getElementById('loader');

  if (bar && pct && loader) {
    let p = 0;
    const iv = setInterval(() => {
      p += Math.random() * 18;
      if (p >= 100) {
        p = 100;
        clearInterval(iv);
      }
      bar.style.width = p + '%';
      pct.textContent = Math.floor(p) + '%';

      if (p === 100) {
        setTimeout(() => {
          loader.classList.add('hide');
          setTimeout(() => loader.remove(), 700);
        }, 300);
      }
    }, 80);
  }

  // ── CUSTOM CURSOR ──
  const outer = document.getElementById('cursor-outer');
  const inner = document.getElementById('cursor-inner');

  if (outer && inner) {
    let mx = 0,
      my = 0,
      ox = 0,
      oy = 0;

    document.addEventListener('mousemove', (e) => {
      mx = e.clientX;
      my = e.clientY;
      inner.style.left = mx + 'px';
      inner.style.top = my + 'px';
    });

    const animOuter = () => {
      ox += (mx - ox) * 0.12;
      oy += (my - oy) * 0.12;
      outer.style.left = ox + 'px';
      outer.style.top = oy + 'px';
      requestAnimationFrame(animOuter);
    };

    animOuter();
  }

  // ── STARFIELD ──
  const canvas = document.getElementById('stars');
  if (canvas) {
    const ctx = canvas.getContext('2d');
    let stars = [];

    const resize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };

    const init = () => {
      stars = [];
      for (let i = 0; i < 180; i++) {
        stars.push({
          x: Math.random() * canvas.width,
          y: Math.random() * canvas.height,
          r: Math.random() * 1.2 + 0.2,
          a: Math.random(),
          s: Math.random() * 0.003 + 0.001,
        });
      }
    };

    const draw = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      stars.forEach((s) => {
        s.a += s.s;
        const al = ((Math.sin(s.a) + 1) / 2) * 0.7 + 0.1;
        ctx.beginPath();
        ctx.arc(s.x, s.y, s.r, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(200,200,255,${al})`;
        ctx.fill();
      });
      requestAnimationFrame(draw);
    };

    resize();
    init();
    draw();

    window.addEventListener('resize', () => {
      resize();
      init();
    });
  }

  // ── PROJECT TOGGLE (NO inline onclick) ──
  document.addEventListener('click', (e) => {
    const header = e.target.closest('.project-header');
    if (!header) return;

    const body = header.nextElementSibling;
    if (!body) return;
    body.classList.toggle('open');
  });

  // ── TYPING EFFECT ──
  const typed = document.getElementById('typed');
  if (typed) {
    const roles = ['Full-Stack Developer', 'Game Developer', 'Cybersecurity Enthusiast'];
    let ri = 0;
    let ci = 0;
    let deleting = false;

    const type = () => {
      const word = roles[ri];

      if (!deleting) {
        typed.textContent = word.slice(0, ++ci);
        if (ci === word.length) {
          setTimeout(() => {
            deleting = true;
          }, 1800);
          setTimeout(type, 120);
          return;
        }
      } else {
        typed.textContent = word.slice(0, --ci);
        if (ci === 0) {
          deleting = false;
          ri = (ri + 1) % roles.length;
        }
      }

      setTimeout(type, deleting ? 60 : 120);
    };

    type();
  }

  // ── BACK TO TOP (NO inline onclick) ──
  const btn = document.getElementById('btt');
  if (btn) {
    btn.addEventListener('click', () => {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    });

    window.addEventListener('scroll', () => {
      btn.classList.toggle('show', window.scrollY > 400);
    });
  }
})();

