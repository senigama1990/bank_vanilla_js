'use strict';

const modalWindow = document.querySelector('.modal-window');
const overlay = document.querySelector('.overlay');
const btnCloseModalWindow = document.querySelector('.btn--close-modal-window');
const btnsOpenModalWindow = document.querySelectorAll(
  '.btn--show-modal-window'
);
const btnScrollTo = document.querySelector(".btn--scroll-to")
const section1 = document.querySelector("#section--1")
const tabs = document.querySelectorAll('.operations__tab')
const tabsContainer = document.querySelector('.operations__tab-container')
const tabContents = document.querySelectorAll('.operations__content')
const nav = document.querySelector('.nav')
const header = document.querySelector('.header')
const allSections = document.querySelectorAll('.section')
const lazyimages = document.querySelectorAll('img[data-src]')
const dotContainer = document.querySelector('.dots')



///////////////////////////////////////
// Modal window
const openModalWindow = function (e) {
  e.preventDefault()
  modalWindow.classList.remove('hidden');
  overlay.classList.remove('hidden');
};

const closeModalWindow = function () {
  modalWindow.classList.add('hidden');
  overlay.classList.add('hidden');
};

btnsOpenModalWindow.forEach(button => button.addEventListener('click', openModalWindow))

btnCloseModalWindow.addEventListener('click', closeModalWindow);
overlay.addEventListener('click', closeModalWindow);

document.addEventListener('keydown', function (e) {
  if (e.key === 'Escape' && !modalWindow.classList.contains('hidden')) {
    closeModalWindow();
  }
});


// smooth scroll to section-1 from header


btnScrollTo.addEventListener('click', function (e) {
  section1.scrollIntoView({ behavior: "smooth" })
})


document.querySelector(".nav__links").addEventListener("click", function (e) {
  e.preventDefault()
  if (e.target.classList.contains('nav__link')) {
    const href = e.target.getAttribute('href')
    document.querySelector(href).scrollIntoView({ behavior: "smooth" })
  }
})

// operations__tab on section 3

tabsContainer.addEventListener('click', function (e) {
  const clickedButton = e.target.closest('.operations__tab')
  // guard clause
  if (!clickedButton) return
  // active tab
  tabs.forEach(tab => tab.classList.remove('operations__tab--active'))
  clickedButton.classList.add('operations__tab--active')
  // avtive content
  tabContents.forEach(content => content.classList.remove('operations__content--active'))

  document.querySelector(`.operations__content--${clickedButton.dataset.tab}`).classList.add('operations__content--active')
})

// nav link blur on hover

function navLinksHoverAnimations(e) {
  if (e.target.classList.contains('nav__link')) {
    const linkOver = e.target
    const siblingLinks = linkOver.closest('.nav__links').querySelectorAll(".nav__link")
    const logo = linkOver.closest('.nav').querySelector('img')
    const logoText = linkOver.closest('.nav').querySelector('.nav__text')

    siblingLinks.forEach(el => {
      if (el !== linkOver) el.style.opacity = this
    })
    logo.style.opacity = this
    logoText.style.opacity = this
  }
}

nav.addEventListener('mouseover', navLinksHoverAnimations.bind(0.4))

nav.addEventListener('mouseout', navLinksHoverAnimations.bind(1))


// sticky navigation

function getStickyNav(entries) {
  const entry = entries[0]
  // console.log(entry);
  if (!entry.isIntersecting) {
    nav.classList.add('sticky')
  } else {
    nav.classList.remove('sticky')
  }

}

const navHeight = nav.getBoundingClientRect().height

const headerObserver = new IntersectionObserver(getStickyNav, {
  root: null,
  threshold: 0,
  rootMargin: `-${navHeight}px`
})

headerObserver.observe(header)

//show elements text on scroll

function appearenceObserver(entries, observer) {
  const entry = entries[0]
  if (!entry.isIntersecting) return
  entry.target.classList.remove('section--hidden')
  observer.unobserve(entry.target)
}

const sectionObserver = new IntersectionObserver(appearenceObserver, {
  root: null,
  threshold: 0.20
})

allSections.forEach(section => {
  sectionObserver.observe(section)
  section.classList.add('section--hidden')
})

//lazy loading images


function loadImages(entries, observer) {
  const entry = entries[0]
  if (!entry.isIntersecting) return
  entry.target.src = entry.target.dataset.src

  entry.target.addEventListener('load', function () {
    entry.target.classList.remove('lazy-img')
  })
  observer.unobserve(entry.target)
}

const lazyImagesObserver = new IntersectionObserver(loadImages, {
  root: null,
  threshold: 0.7
})

lazyimages.forEach(image => lazyImagesObserver.observe(image))

//slider

const slides = document.querySelectorAll('.slide')
const slider = document.querySelector('.slider')
const btnLeft = document.querySelector('.slider__btn--left')
const btnRight = document.querySelector('.slider__btn--right')

let currentSlide = 0
const slidesNumber = slides.length

const createDots = function () {
  slides.forEach(function (_, index) {
    dotContainer.insertAdjacentHTML('beforeend',
      `
        <button class = "dots__dot" data-slide = '${index}'></button>
      `)
  })
}
createDots()

const activateCurrentDot = function (slide) {
  document.querySelectorAll('.dots__dot').forEach(dot => (
    dot.classList.remove('dots__dot--active')
  ))
  document.querySelector(`.dots__dot[data-slide='${slide}']`).classList.add('dots__dot--active')
}
activateCurrentDot(0)
function moveTiSlide(slide) {
  slides.forEach((s, index) => s.style.transform = `translateX(${(index - slide) * 100}%)`)
}

moveTiSlide(0)

function nextSlide() {
  if (currentSlide === slidesNumber - 1) {
    currentSlide = 0
  } else {
    currentSlide++
  }
  moveTiSlide(currentSlide)
  activateCurrentDot(currentSlide)
}

function prevSlide() {
  if (currentSlide === 0) {
    currentSlide = slidesNumber - 1
  } else {
    currentSlide--
  }
  moveTiSlide(currentSlide)
  activateCurrentDot(currentSlide)
}

btnRight.addEventListener('click', nextSlide)

btnLeft.addEventListener('click', prevSlide)

//slide with arrows
document.addEventListener('keydown', function (e) {
  if (e.key === 'ArrowLeft') {
    prevSlide()
  } else if (e.key === 'ArrowRight') {
    nextSlide()
  }
})

dotContainer.addEventListener('click', function (e) {
  if (e.target.classList.contains('dots__dot')) {
    const slide = e.target.dataset.slide
    moveTiSlide(slide)
    activateCurrentDot(slide)
  }
})

setInterval(nextSlide, 5000)