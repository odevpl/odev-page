export const addTextToTemp = (tempDomElem, content, targetDomElem) => {
  const tempContentSetter = Handlebars.compile(tempDomElem);
  const generatedHTML = tempContentSetter(content);
  targetDomElem.innerHTML = generatedHTML;
};

export const addListElemToTemp = (tempDomElem, content, targetDomElem) => {
  const tempContentSetter = Handlebars.compile(tempDomElem);
  const generatedHTML = tempContentSetter(content);
  targetDomElem.insertAdjacentHTML('beforeend', generatedHTML);
};
