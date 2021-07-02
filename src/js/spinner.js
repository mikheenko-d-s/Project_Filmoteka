import { refs } from './variables';

export function showSpinner() {
  refs.cardsList.innerHTML = `<div class="spinner-container js-spinner-container">
    <div class="spinner">
      <div></div>
    </div>
  </div>`;
}

showSpinner();
