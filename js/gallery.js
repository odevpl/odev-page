import { projects } from './config.js';
import { domElement } from './settings.js';
import { addTextToTemp, addListElemToTemp } from './handlebars.js';


export const swiper = new Swiper('.swiper', {
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

// TODO - adding slide dinamicaly from config
document.querySelector('.add-slide').addEventListener('click', function() {
  swiper.appendSlide(`<div class="swiper-slide"><img src="${projects[0].miniGallery[0].src}"/></div>`);
});

// TODO - clearing slides before update
document.querySelector('.remove-slide').addEventListener('click', function() {
  document.querySelector('.swiper-wrapper').innerHTML = "";
});


class Gallery {
  constructor(element, content) {
    const thisGallery = this;

    thisGallery.content = content;
    thisGallery.getElements(element);
    thisGallery.init();
  }

  getElements(element) {
    const thisGallery = this;

    thisGallery.dom = {};

    thisGallery.dom.titleHandlebars = element.title.handlebars;
    thisGallery.dom.titleInsertionPlace = element.title.insertionPlace;

    thisGallery.dom.descriptionHandlebars = element.description.handlebars;
    thisGallery.dom.descriptionInsertionPlace = element.description.insertionPlace;

    thisGallery.dom.descriptionPointsHandlebars = element.descriptionPoints.handlebars;
    thisGallery.dom.descriptionPointsInsertionPlace = element.descriptionPoints.insertionPlace;

    // thisGallery.dom.carouselMiniHandlebars = element.miniGallery.handlebars;
    // thisGallery.dom.carouselMiniInsertionPlace = element.miniGallery.insertionPlace;
  }

  render({ title, description, descriptionPoints, miniGallery }) {
    const thisGallery = this;
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
    const descriptionPointsData = {
      elements: [
        ...descriptionPoints
      ]
    };
    const targetDescritpionPoints = thisGallery.dom.descriptionPointsInsertionPlace;
    // carousel mini
    const tempCarouselMini = thisGallery.dom.carouselMiniHandlebars;
    const carouselMiniData = {
      elements: [
        ...miniGallery
      ]
    };
    const targetCarouselMini = thisGallery.dom.carouselMiniInsertionPlace;

    addTextToTemp(tempTitleDomElem, titleText, targetTitleDomElem);
    addTextToTemp(tempDescriptionDomElem, descriptionText, targetDescriptionDomElem);
  
    addListElemToTemp(tempDescritpionPoints, descriptionPointsData, targetDescritpionPoints);
    addListElemToTemp(tempCarouselMini, carouselMiniData, targetCarouselMini);
  }

  update(content) {
    // TODO
  }

  init() {
    const thisGallery = this;

    thisGallery.render(thisGallery.content);
  }

}

const projectsGallery = new Gallery(domElement.gallery, projects[0]);
console.log('dupa');
// to test changing data -> TODO -> changing data by click on specific image
// setTimeout(() => projectsGallery.render(projects[1]), 3000); // beside of render it should be update -> it should clear html inside list and after that put in new data


