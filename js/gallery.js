import { projects } from './config.js';
import { domElement } from './settings.js';
import { addTextToTemp, addListElemToTemp } from './handlebars.js';


export const swiperMini = new Swiper('.swiper.swiper-mini', {
  // Optional parameters
  // direction: 'vertical',
  slidesPerView: 3,
  spaceBetween: 30,
  loop: true,

  // If we need pagination
  pagination: {
      el: '.swiper-pagination',
      clickable: true,
  },

  // Navigation arrows
  navigation: {
      nextEl: '.swiper-button-next',
      prevEl: '.swiper-button-prev',
  },

  // And if we need scrollbar
  scrollbar: {
      el: '.swiper-scrollbar',
  },
});

export const swiperMain = new Swiper('.swiper.swiper-main', {
  // Optional parameters
  // direction: 'vertical',
  loop: true,

  // If we need pagination
  pagination: {
      el: '.swiper-pagination',
  },

  // Navigation arrows
  navigation: {
      nextEl: '.swiper-button-next',
      prevEl: '.swiper-button-prev',
  },

  // And if we need scrollbar
  scrollbar: {
      el: '.swiper-scrollbar',
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

  render({ title, description, descriptionPoints, miniGallery }) {
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
      console.log(elem);
      thisGallery.swiperMini.appendSlide(`<div class="swiper-slide"><img data-id="${elem.id}" class="miniSliderImg img-${elem.id}" src="${elem.src}"/></div>`);
    });
    // swiper mini addEventListener
    const miniSliderImages = document.querySelectorAll(".swiper-mini .swiper-slide .miniSliderImg");
    miniSliderImages.forEach((img) => {
      img.addEventListener('click', () => {
        const id = img.getAttribute('data-id');
        console.log(id);
        thisGallery.mainImgUpdate(id);
      });
    });
    // swiper main
    thisGallery.projects.forEach((proj) => {
      thisGallery.swiperMain.appendSlide(`<div class="swiper-slide"><img id="mainImg-${proj.id}" src="${proj.mainImg.src}"/></div>`);
    })

    addTextToTemp(tempMainImgDomElem, mainImgSrc, targetMainImgDomElem);
    addTextToTemp(tempTitleDomElem, titleText, targetTitleDomElem);
    addTextToTemp(tempDescriptionDomElem, descriptionText, targetDescriptionDomElem);
  
    addListElemToTemp(tempDescritpionPoints, descriptionPointsData, targetDescritpionPoints);

    thisGallery.checkData();
  }

  checkData() {
    const thisGallery = this;

    console.log(thisGallery);
  }
  mainImgUpdate(id) {
    const thisGallery = this;
    // main IMG
    const tempMainImgDomElem = thisGallery.dom.mainImgHandlebars;
    const mainImgSrc = {content: thisGallery.content.miniGallery[id-1].src};
    const targetMainImgDomElem = thisGallery.dom.mainImgInsertionPlace;

    targetMainImgDomElem.innerHTML = "";

    addTextToTemp(tempMainImgDomElem, mainImgSrc, targetMainImgDomElem);
  }

  update(newContent) {
    // TODO
    const thisGallery = this;

    thisGallery.dom.miniSwiperWrapper.innerHTML = "";
    thisGallery.render(newContent);
  }

  init() {
    const thisGallery = this;

    thisGallery.render(thisGallery.content, thisGallery.swiperMini);
  }

}

const projectsGallery = new Gallery(domElement.gallery, projects, projects[0], swiperMini, swiperMain);

// to test changing data -> TODO -> changing data by click on specific image
// setTimeout(() => projectsGallery.update(projects[1]), 3000); // beside of render it should be update -> it should clear html inside list and after that put in new data


