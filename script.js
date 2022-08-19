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
  // const section1Coords = section1.getBoundingClientRect();
  // window.scrollTo({
  //   left: section1Coords.left + window.pageXOffset,
  //   top: section1Coords.top + window.pageYOffset,
  //   behavior: "smooth"
  // })

  section1.scrollIntoView({ behavior: "smooth" })
})

// document.querySelectorAll(".nav__link").forEach(HTMLElement => {
//   HTMLElement.addEventListener("click", function (e) {
//     e.preventDefault()
//     const href = this.getAttribute('href')
//     document.querySelector(href).scrollIntoView({behavior: "smooth"})
//   })
// })

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

// const sectionCoords = section1.getBoundingClientRect()

// window.addEventListener('scroll', function () {
//   if (this.window.scrollY > sectionCoords.top) {
//     nav.classList.add('sticky')
//   } else {
//     nav.classList.remove('sticky')
//   }
// })

// sticky navigation intersection observer API
// const observerCallback = function (entries, observer) {
//   entries.forEach(entry => {
//     console.log(entry);
//   })
// }
// const observerOptions = {
//   root: null,
//   threshold: [0, 0.2]
// }
// const observer = new IntersectionObserver(observerCallback, observerOptions)
// observer.observe(section1)

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
const observer = new IntersectionObserver(getStickyNav, {
  root: null,
  threshold: 0,
  rootMargin: `-${navHeight}px`
})
observer.observe(header)