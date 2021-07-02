import { refs } from './variables';
const { bodyEl, textFromCatModal, backdropLogIn, closeLoginWrap, userButton } = refs;
// userButton.addEventListener('click', openLogIn);
textFromCatModal.addEventListener('click', openLogIn);
import {closeToAnnoyment}  from './annoyment';

export function openLogIn() {
  // userButton.removeEventListener('click', openLogIn);
  textFromCatModal.removeEventListener('click', openLogIn);
  closeToAnnoyment();

  bodyEl.classList.add('scroll-hidden');
  backdropLogIn.classList.remove('backdrop-hidden');

  backdropLogIn.addEventListener('click', backdropClick);
  closeLoginWrap.addEventListener('click', closeModal);

  window.addEventListener('keydown', onPressEsc);
}


function closeModal() {
  // userButton.addEventListener('click', openLogIn);
textFromCatModal.addEventListener('click', openLogIn);
  bodyEl.classList.remove('scroll-hidden');
  backdropLogIn.classList.add('backdrop-hidden');
  backdropLogIn.removeEventListener('click', backdropClick);
  window.removeEventListener('keydown', onPressEsc);
}

function onPressEsc(evt) {  
  if (evt.code === 'Escape') {
    closeModal();

  }
}

function backdropClick(evt) {
   if (evt.target === evt.currentTarget) {
    closeModal();
  }
}
