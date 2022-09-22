import { projects } from './config.js';
import { domElement } from './settings.js';
import { addTextToTemp, addListElemToTemp } from './handlebars.js';


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
    thisGallery.dom.titleInsertionPlace = element.title.insertionPlace
    thisGallery.dom.descriptionHandlebars = element.description.handlebars;
    thisGallery.dom.descriptionInsertionPlace = element.description.insertionPlace;
    thisGallery.dom.descriptionPointsHandlebars = element.descriptionPoints.handlebars;
    thisGallery.dom.descriptionPointsInsertionPlace = element.descriptionPoints.insertionPlace;
  }

  render({ title, description, descriptionPoints }) {
    const thisGallery = this;

    const tempTitleDomElem = thisGallery.dom.titleHandlebars;
    const titleText = {content: title};
    const targetTitleDomElem = thisGallery.dom.titleInsertionPlace;

    const tempDescriptionDomElem = thisGallery.dom.descriptionHandlebars;
    const descriptionText = {content: description};
    const targetDescriptionDomElem = thisGallery.dom.descriptionInsertionPlace;

    const tempDescritpionPoints = thisGallery.dom.descriptionPointsHandlebars;
    const descriptionPointsData = {
      elements: [
        ...descriptionPoints
      ]
    };
    const targetDescritpionPoints = thisGallery.dom.descriptionPointsInsertionPlace;

    addTextToTemp(tempTitleDomElem, titleText, targetTitleDomElem);
    addTextToTemp(tempDescriptionDomElem, descriptionText, targetDescriptionDomElem);
  
    addListElemToTemp(tempDescritpionPoints, descriptionPointsData, targetDescritpionPoints);
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

// to test changing data -> TODO -> changing data by click on specific image
setTimeout(() => projectsGallery.render(projects[1]), 3000); // beside of render it should be update -> it should clear html inside list and after that put in new data