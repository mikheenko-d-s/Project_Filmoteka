import modalFilmTpl from '../templates/modalFilm.hbs';
import { refs } from './variables';
import { ApiService } from '../index';
import { onClikBtnFilmModal } from './fb'
//* імпортую функцію для старта відео
import {openTrailer} from './treyler';
import {addOrRemoveOnOpenModal} from './local-storage-API';

refs.cardsList.addEventListener('click', openModalFilm);

// ОТКРЫВАЕМ МОДАЛКУ
function openModalFilm(evt) {
  evt.preventDefault();

  // Определяем, что кликнули на карточку
  const isFilmCardElem = evt.target.classList.contains('card-container');

  if (!isFilmCardElem) {
    return;
  }

  const movieId = evt.target.parentNode.dataset.action;

  ApiService.fetchInformationAboutFilm(movieId).then(response => {
    refs.modalFilmInfo.innerHTML = modalFilmTpl(response);
    //* ref на оверлей для запуске трейлера
    refs.startTrailer = document.querySelector('[data-play="trailer"]');
    refs.startTrailer.addEventListener('click', openTrailer)

    // if(localStorage.getItem('firebase:host:filmoteka-84a5d-default-rtdb.firebaseio.com'))return;
// *Кнопки "Watched" та "Queue"
    addOrRemoveOnOpenModal('watched');
    addOrRemoveOnOpenModal('queue')
  });

  refs.bodyEl.classList.add('scroll-hidden');
  refs.backdrop.classList.remove('backdrop-hidden');

  refs.backdrop.addEventListener('click', backdropClick);
  refs.closeFilmModal.addEventListener('click', closeModal);

  window.addEventListener('keydown', onPressEsc);
  
  // refs.modalFilmCont.addEventListener('click', onClikBtnFilmModal);      /*вешает слушатель на модальное окно фильма*/
}

// ЗАКРЫВАЕМ МОДАЛКУ
export function closeModal(evt) {
   refs.modalFilmInfo.innerHTML = '';

  refs.bodyEl.classList.remove('scroll-hidden');
  refs.backdrop.classList.add('backdrop-hidden');
  refs.backdrop.removeEventListener('click', backdropClick);
  window.removeEventListener('keydown', onPressEsc);
  refs.modalFilmCont.removeEventListener('click', onClikBtnFilmModal);       /*вешает слушатель на модальное окно фильма*/

  //* видаляю плеєр */
  refs.player.innerHTML = '<div id="player"></div>';
  refs.player.classList.remove('open-trailer');
}

// ЗАКРЫТИЕ МОДАЛКИ ПО НАЖАТИЮ ESCAPE
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
