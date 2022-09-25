import { projects } from './config.js';
import { domElement } from './settings.js';
import { addTextToTemp, addListElemToTemp } from './handlebars.js';


export const swiperMini = new Swiper('.swiper.swiper-mini', {
  // Optional parameters
  slidesPerView: 3,
  spaceBetween: 30,
  loop: true,
  // Navigation arrows
  navigation: {
      nextEl: '.swiper-button-next',
      prevEl: '.swiper-button-prev',
  },
});

export const swiperMain = new Swiper('.swiper.swiper-main', {
  // Optional parameters
  slidesPerView: 3,
  spaceBetween: 30,
  loop: true,
  // Navigation arrows
  navigation: {
      nextEl: '.swiper-button-next',
      prevEl: '.swiper-button-prev',
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

    thisGallery.dom.titleHandlebars = element.title.handlebars;
    thisGallery.dom.titleInsertionPlace = element.title.insertionPlace;

    thisGallery.dom.descriptionHandlebars = element.description.handlebars;
    thisGallery.dom.descriptionInsertionPlace = element.description.insertionPlace;

    thisGallery.dom.descriptionPointsHandlebars = element.descriptionPoints.handlebars;
    thisGallery.dom.descriptionPointsInsertionPlace = element.descriptionPoints.insertionPlace;

    thisGallery.dom.miniSwiperWrapper = element.miniSwiper.wrapper;
    
    thisGallery.dom.mainSwiperWrapper = element.mainSwiper.wrapper;
  }

  render({ id, title, description, descriptionPoints, miniGallery }) {
    const thisGallery = this;
    // main IMG
    const tempMainImgDomElem = thisGallery.dom.mainImgHandlebars;
    const mainImgSrc = {content: miniGallery[0].src};
    const targetMainImgDomElem = thisGallery.dom.mainImgInsertionPlace;
    // title
    const tempTitleDomElem = thisGallery.dom.titleHandlebars;
    const titleText = {content: title};
    const targetTitleDomElem = thisGallery.dom.titleInsertionPlace;
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
      thisGallery.swiperMini.appendSlide(`<div class="swiper-slide"><img data-id="${elem.id}" class="miniSliderImg img-${elem.id}" src="${elem.src}"/></div>`);
    });
    // swiper mini addEventListener
    const miniSliderImages = document.querySelectorAll(".swiper-mini .swiper-slide .miniSliderImg");
    miniSliderImages.forEach((img) => {
      img.addEventListener('click', () => {
        const imgId = img.getAttribute('data-id');
        thisGallery.mainImgUpdate(id, imgId);
      });
    });
    // swiper main
    thisGallery.projects.forEach((proj) => {
      thisGallery.swiperMain.appendSlide(`<div class="swiper-slide"><img data-id="${proj.id}" class="mainSliderImg img-${proj.id}" src="${proj.mainImg.src}"/></div>`);
    });
    // swiper main addEventListener
    const mainSliderImages = document.querySelectorAll(".swiper-main .swiper-slide .mainSliderImg");
    mainSliderImages.forEach((img) => {
      img.addEventListener('click', () => {
        const projectId = img.getAttribute('data-id');
        thisGallery.update(projectId);
      });
    });

    addTextToTemp(tempMainImgDomElem, mainImgSrc, targetMainImgDomElem);
    addTextToTemp(tempTitleDomElem, titleText, targetTitleDomElem);
    addTextToTemp(tempDescriptionDomElem, descriptionText, targetDescriptionDomElem);
  
    addListElemToTemp(tempDescritpionPoints, descriptionPointsData, targetDescritpionPoints);
  }

  mainImgUpdate(projId, imgId) {
    const thisGallery = this;

    const tempMainImgDomElem = thisGallery.dom.mainImgHandlebars;
    const mainImgSrc = {content: thisGallery.projects[projId-1].miniGallery[imgId-1].src};
    const targetMainImgDomElem = thisGallery.dom.mainImgInsertionPlace;

    targetMainImgDomElem.innerHTML = "";

    addTextToTemp(tempMainImgDomElem, mainImgSrc, targetMainImgDomElem);
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
