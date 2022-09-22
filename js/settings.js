export const domElement = {
  gallery: {
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
  }
};