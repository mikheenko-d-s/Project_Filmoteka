import { refs } from './variables';
import { renderMyQueue } from './fb'
import { renderMyWatched } from './fb'
import {showSpinner} from './spinner';
const {  wBtn, qBtn } = refs;
import {emptyWatched, emptyQueue} from './header-observer';
let currentButtonSwitch = null;

wBtn.addEventListener('click', renderWatched);
qBtn.addEventListener('click', renderQueue);


// * Функция callback при нажатии на кнопку Watched
function renderWatched(e) {
    refs.cardsList.setAttribute('data-list', 'watched');
    emptyWatched()
    e.preventDefault();
    showSpinner();
    removeCurrentOnButton(e);
    addCurrentOnButton(e);

    renderMyWatched();

}

//* Функция рендера списка Queue
function renderQueue(e) {
    refs.cardsList.setAttribute('data-list', 'queue');
    emptyQueue()
    e.preventDefault();
    showSpinner();
    removeCurrentOnButton(e)
    addCurrentOnButton(e)

    renderMyQueue();
}

function addCurrentOnButton(e) {
    e.target.classList.add('current-header-btn');
    currentButtonSwitch = e.target;
}
export function removeCurrentOnButton(e) {
    if(currentButtonSwitch === null)return;
    currentButtonSwitch.classList.remove('current-header-btn');
}