/* ===================================================
   HiGroo Landing Page — main.js
   Interactive behaviors: navbar, slider, counters,
   service tabs, testimonial carousel, scroll anims
   =================================================== */

/* ---- NAVBAR: scroll effect + hamburger ---- */
const navbar = document.getElementById('navbar');
const hamburger = document.getElementById('hamburger');
const navLinks = document.getElementById('nav-links');
const allNavLinks = document.querySelectorAll('.nav-link');

window.addEventListener('scroll', () => {
  navbar.classList.toggle('scrolled', window.scrollY > 20);
  updateActiveLink();
});

hamburger.addEventListener('click', () => {
  navLinks.classList.toggle('open');
  hamburger.classList.toggle('open');
});

allNavLinks.forEach(link => {
  link.addEventListener('click', () => {
    navLinks.classList.remove('open');
  });
});

function updateActiveLink() {
  const sections = ['hero','journey','service','how-it-works','testimonial'];
  let current = '';
  sections.forEach(id => {
    const el = document.getElementById(id);
    if (el && window.scrollY >= el.offsetTop - 120) current = id;
  });
  allNavLinks.forEach(link => {
    link.classList.remove('active');
    if (link.getAttribute('href') === `#${current}`) link.classList.add('active');
  });
}

/* ---- HERO THUMBNAIL SLIDER ---- */
const thumbs = document.querySelectorAll('.thumb');
const slideIndex = document.querySelector('.slide-index strong');
const sliderProgress = document.querySelector('.slider-progress');
let currentThumb = 0;

function activateThumb(index) {
  thumbs.forEach(t => t.classList.remove('thumb-active'));
  thumbs[index].classList.add('thumb-active');
  currentThumb = index;
  const num = String(index + 1).padStart(2, '0');
  slideIndex.textContent = num;
  sliderProgress.style.width = `${((index + 1) / thumbs.length) * 100}%`;
}

thumbs.forEach((thumb, i) => {
  thumb.addEventListener('click', () => activateThumb(i));
});

document.getElementById('slider-prev').addEventListener('click', () => {
  const prev = (currentThumb - 1 + thumbs.length) % thumbs.length;
  activateThumb(prev);
});
document.getElementById('slider-next').addEventListener('click', () => {
  const next = (currentThumb + 1) % thumbs.length;
  activateThumb(next);
});

// Auto-advance every 3s
let thumbTimer = setInterval(() => {
  const next = (currentThumb + 1) % thumbs.length;
  activateThumb(next);
}, 3000);

thumbs.forEach(t => {
  t.addEventListener('mouseenter', () => clearInterval(thumbTimer));
  t.addEventListener('mouseleave', () => {
    thumbTimer = setInterval(() => {
      activateThumb((currentThumb + 1) % thumbs.length);
    }, 3000);
  });
});

/* ---- SERVICE TABS ---- */
const serviceItems = document.querySelectorAll('.service-item');
const serviceImg = document.getElementById('service-img');
const svcDetailTitle = document.getElementById('svc-detail-title');
const svcDetailDesc = document.getElementById('svc-detail-desc');

const serviceData = [
  {
    img: 'assets/hero-product.png',
    title: 'Rak Hidroponik Vertikal',
    desc: 'Desain rak 4–5 tingkat yang efisien dan estetik. Cocok untuk apartemen, dapur, balkon, restoran, dan kafe. Hemat tempat, hasil maksimal.'
  },
  {
    img: 'asset page our sevice/Image Container.png',
    title: 'Sensor IoT Pintar',
    desc: 'Sensor canggih memantau kadar nutrisi EC, pH air, suhu, dan intensitas cahaya secara real-time. Data tersedia langsung di aplikasi HiGroo.'
  },
  {
    img: 'asset page journey/Frame 12.png',
    title: 'Otomatisasi Nutrisi',
    desc: 'Sistem pompakan nutrisi otomatis berdasarkan data sensor. Tanaman selalu mendapat asupan tepat tanpa perlu intervensi manual setiap saat.'
  },
  {
    img: 'asset page journey/Desain tanpa judul (22) 1.png',
    title: 'Aplikasi Monitoring Real-time',
    desc: 'Pantau kondisi tanaman dari smartphone Anda. Notifikasi otomatis bila ada kondisi abnormal. Dashboard lengkap dan mudah dipahami.'
  }
];

serviceItems.forEach((item, i) => {
  item.addEventListener('click', () => {
    serviceItems.forEach(s => s.classList.remove('active'));
    item.classList.add('active');

    serviceImg.style.opacity = '0';
    serviceImg.style.transform = 'scale(0.97)';
    setTimeout(() => {
      serviceImg.src = serviceData[i].img;
      svcDetailTitle.textContent = serviceData[i].title;
      svcDetailDesc.textContent = serviceData[i].desc;
      serviceImg.style.opacity = '1';
      serviceImg.style.transform = 'scale(1)';
    }, 220);
  });
});

// Add transition to service image
if (serviceImg) {
  serviceImg.style.transition = 'opacity 0.22s ease, transform 0.22s ease';
}

/* ---- TESTIMONIAL CAROUSEL DATA ---- */
const testimonials = [
  {
    centerImg: 'asset page testimonial/Container.png',
    leftImg: 'asset page testimonial/Farmer holding produce.png',
    rightImg: 'asset page testimonial/Older farmer in field.png',
    name: 'Rina Dewi',
    role: 'Ibu Rumah Tangga & Pengguna HiGroo',
    quote: '"HiGroo membuat bertanam hidroponik jadi menyenangkan dan mudah! Saya bisa memantau tanaman langsung dari HP. Bayam dan selada tumbuh subur di dapur kecil saya."'
  },
  {
    centerImg: 'asset page testimonial/Farmer holding produce.png',
    leftImg: 'asset page testimonial/Older farmer in field.png',
    rightImg: 'asset page testimonial/Container.png',
    name: 'Budi Santoso',
    role: 'Pemilik Kafe & Pengguna HiGroo',
    quote: '"Kafe saya kini punya sayuran hidroponik sendiri! Pelanggan suka konsep farm-to-table kami. HiGroo sangat membantu operasional sehari-hari dengan monitoring otomatis."'
  },
  {
    centerImg: 'asset page testimonial/Older farmer in field.png',
    leftImg: 'asset page testimonial/Container.png',
    rightImg: 'asset page testimonial/Farmer holding produce.png',
    name: 'Pak Ahmad',
    role: 'Petani Urban & Pengguna HiGroo',
    quote: '"Produk HiGroo sangat membantu saya beralih ke hidroponik. Sensor IoT-nya akurat, dan notifikasi dari aplikasi memastikan saya tidak ketinggalan kondisi penting."'
  }
];
let currentTesti = 0;

const testiCenterImg = document.querySelector('.testi-main-img');
const testiLeftImg = document.querySelector('.testi-slide.side:first-child img');
const testiRightImg = document.querySelector('.testi-slide.side:last-child img');
const testiName = document.getElementById('testi-name');
const testiRole = document.getElementById('testi-role');
const testiQuote = document.getElementById('testi-quote');
const testiPrev = document.getElementById('testi-prev');
const testiNext = document.getElementById('testi-next');

function updateTesti(index) {
  const t = testimonials[index];
  const card = document.querySelector('.testi-card');

  [testiCenterImg, testiLeftImg, testiRightImg, card].forEach(el => {
    if (el) { el.style.opacity = '0'; el.style.transform = 'translateY(8px)'; }
  });

  setTimeout(() => {
    if (testiCenterImg) testiCenterImg.src = t.centerImg;
    if (testiLeftImg) testiLeftImg.src = t.leftImg;
    if (testiRightImg) testiRightImg.src = t.rightImg;
    if (testiName) testiName.textContent = t.name;
    if (testiRole) testiRole.textContent = t.role;
    if (testiQuote) testiQuote.textContent = t.quote;

    [testiCenterImg, testiLeftImg, testiRightImg, card].forEach(el => {
      if (el) { el.style.opacity = '1'; el.style.transform = 'translateY(0)'; }
    });
  }, 250);
}

// Apply transition on card
const testiCard = document.querySelector('.testi-card');
const allTestiEls = [testiCenterImg, testiLeftImg, testiRightImg, testiCard];
allTestiEls.forEach(el => {
  if (el) el.style.transition = 'opacity 0.25s ease, transform 0.25s ease';
});

testiPrev.addEventListener('click', () => {
  currentTesti = (currentTesti - 1 + testimonials.length) % testimonials.length;
  updateTesti(currentTesti);
});
testiNext.addEventListener('click', () => {
  currentTesti = (currentTesti + 1) % testimonials.length;
  updateTesti(currentTesti);
});

// Auto-advance testimonials every 5s
let testiTimer = setInterval(() => {
  currentTesti = (currentTesti + 1) % testimonials.length;
  updateTesti(currentTesti);
}, 5000);

document.querySelector('.testi-track-wrap').addEventListener('mouseenter', () => clearInterval(testiTimer));
document.querySelector('.testi-track-wrap').addEventListener('mouseleave', () => {
  testiTimer = setInterval(() => {
    currentTesti = (currentTesti + 1) % testimonials.length;
    updateTesti(currentTesti);
  }, 5000);
});

/* ---- COUNTER ANIMATION ---- */
function animateCounter(el, target) {
  let start = 0;
  const duration = 1800;
  const step = target / (duration / 16);
  const timer = setInterval(() => {
    start += step;
    if (start >= target) {
      start = target;
      clearInterval(timer);
    }
    el.textContent = Math.floor(start).toLocaleString('id-ID');
  }, 16);
}

/* ---- INTERSECTION OBSERVER ---- */
const observer = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('animated');

      // Counter animation
      const numEls = entry.target.querySelectorAll
        ? entry.target.querySelectorAll('.stat-num')
        : [];
      numEls.forEach(el => {
        const target = parseInt(el.getAttribute('data-target'));
        if (target) animateCounter(el, target);
      });
      observer.unobserve(entry.target);
    }
  });
}, { threshold: 0.15 });

document.querySelectorAll('.fade-in-up, .fade-in-left, .fade-in-right').forEach(el => {
  observer.observe(el);
});

// Observe journey stats container for counters
const statsSection = document.querySelector('.journey-stats');
if (statsSection) {
  const statsObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.querySelectorAll('.stat-num').forEach(el => {
          const target = parseInt(el.getAttribute('data-target'));
          if (target) animateCounter(el, target);
        });
        statsObserver.unobserve(entry.target);
      }
    });
  }, { threshold: 0.3 });
  statsObserver.observe(statsSection);
}

/* ---- HOW CARDS: stagger fade-in ---- */
const howCards = document.querySelectorAll('.how-card');
const howObserver = new IntersectionObserver((entries) => {
  entries.forEach((entry, i) => {
    if (entry.isIntersecting) {
      setTimeout(() => {
        entry.target.style.opacity = '1';
        entry.target.style.transform = 'translateY(0)';
      }, i * 100);
      howObserver.unobserve(entry.target);
    }
  });
}, { threshold: 0.1 });

howCards.forEach(card => {
  card.style.opacity = '0';
  card.style.transform = 'translateY(24px)';
  card.style.transition = 'opacity 0.6s ease, transform 0.6s ease, border-color 0.28s ease, box-shadow 0.28s ease';
  howObserver.observe(card);
});

/* ---- FORM SUBMISSION ---- */
const orderForm = document.getElementById('order-form');
if (orderForm) {
  orderForm.addEventListener('submit', (e) => {
    e.preventDefault();
    const btn = document.getElementById('form-submit');
    btn.textContent = '✅ Permintaan Terkirim!';
    btn.disabled = true;
    btn.style.background = '#15803d';
    setTimeout(() => {
      btn.textContent = 'Kirim Permintaan →';
      btn.disabled = false;
      orderForm.reset();
    }, 3500);
  });
}

/* ---- SMOOTH PARALLAX HERO GLOW ---- */
window.addEventListener('mousemove', (e) => {
  const glow = document.querySelector('.hero-glow');
  if (!glow) return;
  const { clientX, clientY } = e;
  const cx = window.innerWidth / 2;
  const cy = window.innerHeight / 2;
  const dx = (clientX - cx) / cx;
  const dy = (clientY - cy) / cy;
  glow.style.transform = `translate(calc(-50% + ${dx * 18}px), calc(-50% + ${dy * 18}px))`;
});

/* ---- INIT ---- */
activateThumb(0);
updateActiveLink();
