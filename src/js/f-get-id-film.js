import { refs } from "./variables"

const { bodyEl } = refs
let filmiId = null;

bodyEl.addEventListener('click', getIdFilm);

function getIdFilm(evt) {
  // console.log(evt.target);
  if (evt.target.className !== 'card-container js-card-container') {
    return;
  }
  filmiId = evt.target.parentNode.getAttribute('data-action');
};

export { filmiId };