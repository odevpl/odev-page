export const domElement = {
  gallery: {
    mainImg: {
      handlebars: document.querySelector('#template-gallery-main-img').innerHTML,
      insertionPlace: document.querySelector('#gallery-main-img'),
    },
    title: {
      handlebars: document.querySelector('#template-gallery-title').innerHTML,
      insertionPlace: document.querySelector('#gallery-title'),
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
      wrapper: document.querySelector('.swiper-mini .swiper-wrapper'),
    },
    mainSwiper: {
      wrapper: document.querySelector('.swiper-main .swiper-wrapper'),
    },
  }
};