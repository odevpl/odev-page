import { projects } from './config.js';
import { domElement } from './settings.js';
import { addTextToTemp, addListElemToTemp } from './handlebars.js';


export const swiperMini = new Swiper(' .swiper-container-mini .swiper.swiper-mini', {
  // Optional parameters
  slidesPerView: 2,
  // slidesPerGroup: 3,
  spaceBetween: 20,
  loop: true,
  breakpoints: {  
    576: {
      slidesPerView: 3,
    },
    768: {
      slidesPerView: 3,
    },
    992: {
      slidesPerView: 3,
    },
    1200: {
      slidesPerView: 3,
    },
  },
  // loopFillGroupWithBlank: false,
  // Navigation arrows
  navigation: {
      nextEl: '.swiper-container-mini .swiper-button-next',
      prevEl: '.swiper-container-mini .swiper-button-prev',
  },
});

export const swiperMain = new Swiper('.swiper-container-main .swiper.swiper-main', {
  // Optional parameters
  slidesPerView: 1,
  // slidesPerGroup: 3,
  spaceBetween: 30,
  loop: true,
  breakpoints: {  
    576: {
      slidesPerView: 2,
    },
    768: {
      slidesPerView: 2,
    },
    992: {
      slidesPerView: 3,
    },
    1200: {
      slidesPerView: 4,
    },
  },
  // Navigation arrows
  navigation: {
      nextEl: '.swiper-container-main .swiper-button-next',
      prevEl: '.swiper-container-main .swiper-button-prev',
  },
});


class Gallery {
  constructor(element, projects, content, swiperMini, swiperMain) {
    const thisGallery = this;

    thisGallery.projects = projects;
    thisGallery.content = content;
    thisGallery.swiperMini = swiperMini;
    thisGallery.swiperMain = swiperMain;

    thisGallery.getElements(element);
    thisGallery.init();
  }

  getElements(element) {
    const thisGallery = this;

    thisGallery.dom = {};

    thisGallery.dom.mainImgHandlebars = element.mainImg.handlebars;
    thisGallery.dom.mainImgInsertionPlace = element.mainImg.insertionPlace;

    thisGallery.dom.fullScreenImgHandlebars = element.fullScreenImg.handlebars;
    thisGallery.dom.fullScreenImgInsertionPlace = element.fullScreenImg.insertionPlace;

    thisGallery.dom.titleHandlebars = element.title.handlebars;
    thisGallery.dom.titleInsertionPlace = element.title.insertionPlace;

    thisGallery.dom.linkHandlebars = element.link.handlebars;
    thisGallery.dom.linkInsertionPlace = element.link.insertionPlace;

    thisGallery.dom.descriptionHandlebars = element.description.handlebars;
    thisGallery.dom.descriptionInsertionPlace = element.description.insertionPlace;

    thisGallery.dom.descriptionPointsHandlebars = element.descriptionPoints.handlebars;
    thisGallery.dom.descriptionPointsInsertionPlace = element.descriptionPoints.insertionPlace;

    thisGallery.dom.miniSwiperWrapper = element.miniSwiper.wrapper;
    
    thisGallery.dom.mainSwiperWrapper = element.mainSwiper.wrapper;
  }

  render({ id, title, link, description, descriptionPoints, miniGallery }) {
    const thisGallery = this;
    // main IMG
    const tempMainImgDomElem = thisGallery.dom.mainImgHandlebars;
    const mainImgSrc = {content: miniGallery[0].src};
    const targetMainImgDomElem = thisGallery.dom.mainImgInsertionPlace;
    // title
    const tempTitleDomElem = thisGallery.dom.titleHandlebars;
    const titleText = {content: title};
    const targetTitleDomElem = thisGallery.dom.titleInsertionPlace;
    // link
    const tempLinkDomElem = thisGallery.dom.linkHandlebars;
    const linkHref = {content: link};
    const targetLinkDomElem = thisGallery.dom.linkInsertionPlace;
    // description
    const tempDescriptionDomElem = thisGallery.dom.descriptionHandlebars;
    const descriptionText = {content: description};
    const targetDescriptionDomElem = thisGallery.dom.descriptionInsertionPlace;
    // description points
    const tempDescritpionPoints = thisGallery.dom.descriptionPointsHandlebars;
    const descriptionPointsData = {elements: [...descriptionPoints]};
    const targetDescritpionPoints = thisGallery.dom.descriptionPointsInsertionPlace;
    // swiper mini
    miniGallery.forEach((elem) => {
      thisGallery.swiperMini.appendSlide(`<div class="swiper-slide swiper-slide-mini"><img data-id="${elem.id}" class="mini-slider-img img-${elem.id}" src="${elem.src}"/></div>`);
    });
    // swiper mini addEventListener
    const miniSliderImages = document.querySelectorAll(".swiper-mini .swiper-slide .mini-slider-img");
    miniSliderImages.forEach((img) => {
      img.addEventListener('click', (event) => {
        event.preventDefault();
        const imgId = img.getAttribute('data-id');
        thisGallery.mainImgUpdate(id, imgId);
      });
    });
    // swiper main
    thisGallery.projects.forEach((proj) => {
      thisGallery.swiperMain.appendSlide(`<div class="swiper-slide swiper-slide-main"><img data-id="${proj.id}" class="main-slider-img img-${proj.id}" src="${proj.mainImg.src}"/></div>`);
    });
    // swiper main addEventListener
    const mainSliderImages = document.querySelectorAll(".swiper-main .swiper-slide .main-slider-img");
    mainSliderImages.forEach((img) => {
      img.addEventListener('click', (event) => {
        event.preventDefault();
        const projectId = img.getAttribute('data-id');
        thisGallery.update(projectId);
      });
    });

    addTextToTemp(tempMainImgDomElem, mainImgSrc, targetMainImgDomElem);
    addTextToTemp(tempTitleDomElem, titleText, targetTitleDomElem);
    addTextToTemp(tempLinkDomElem, linkHref, targetLinkDomElem);
    addTextToTemp(tempDescriptionDomElem, descriptionText, targetDescriptionDomElem);
  
    addListElemToTemp(tempDescritpionPoints, descriptionPointsData, targetDescritpionPoints);

    thisGallery.fullScreenButtonListener();
  }

  mainImgUpdate(projId, imgId) {
    const thisGallery = this;

    const tempMainImgDomElem = thisGallery.dom.mainImgHandlebars;
    const mainImgSrc = {content: thisGallery.projects[projId-1].miniGallery[imgId-1].src};
    const targetMainImgDomElem = thisGallery.dom.mainImgInsertionPlace;

    targetMainImgDomElem.innerHTML = "";

    addTextToTemp(tempMainImgDomElem, mainImgSrc, targetMainImgDomElem);

    thisGallery.fullScreenButtonListener();
  }

  fullScreenButtonListener() {
    const thisGallery = this;

    const temFullScreenImgDomElem = thisGallery.dom.fullScreenImgHandlebars;
    let fullScreenImgSrc = {};
    const targetFullScreenImgDomElem = thisGallery.dom.fullScreenImgInsertionPlace;

    const fullScreenButton = document.querySelector('.full-screen-button');
    const fullScreenWrapper = document.querySelector('.full-screen-img-container');

    fullScreenButton.addEventListener('click', (event) => {
      fullScreenImgSrc = {content: event.target.getAttribute('src')};
      addTextToTemp(temFullScreenImgDomElem, fullScreenImgSrc, targetFullScreenImgDomElem);
      fullScreenWrapper.classList.add('show');
    });

    const fullScreenButtonX = document.querySelector('.full-screen-button-x');
    fullScreenButtonX.addEventListener('click', () => {
      fullScreenWrapper.classList.remove('show');
    });
  }

  update(projectId) {
    const thisGallery = this;

    thisGallery.dom.descriptionPointsInsertionPlace.innerHTML = "";
    thisGallery.dom.miniSwiperWrapper.innerHTML = "";
    thisGallery.render(thisGallery.projects[projectId-1]);
  }

  init() {
    const thisGallery = this;

    thisGallery.render(thisGallery.content, thisGallery.swiperMini);
  }

}

const projectsGallery = new Gallery(domElement.gallery, projects, projects[0], swiperMini, swiperMain);
