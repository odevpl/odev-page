export const domElement = {
  gallery: {
    mainImg: {
      handlebars: document.querySelector('#template-gallery-main-img').innerHTML,
      insertionPlace: document.querySelector('#gallery-main-img'),
    },
    fullScreenImg: {
      handlebars: document.querySelector('#template-gallery-full-screen-img').innerHTML,
      insertionPlace: document.querySelector('#gallery-full-screen-img'),
    },
    title: {
      handlebars: document.querySelector('#template-gallery-title').innerHTML,
      insertionPlace: document.querySelector('#gallery-title'),
    },
    link: {
      handlebars: document.querySelector('#template-gallery-link').innerHTML,
      insertionPlace: document.querySelector('#gallery-link'),
    },
    description: {
      handlebars: document.querySelector('#template-gallery-description').innerHTML,
      insertionPlace: document.querySelector('#gallery-description'),
    },
    descriptionPoints: {
      handlebars: document.querySelector('#template-gallery-description-points').innerHTML,
      insertionPlace: document.querySelector('#gallery-description-points'),
    },
    miniSwiper: {
      wrapper: document.querySelector('swiper-container-mini .swiper-mini .swiper-wrapper'),
    },
    mainSwiper: {
      wrapper: document.querySelector('.swiper-container-main .swiper-main .swiper-wrapper'),
    },
  }
};