import { refs } from './variables';
import { paginationMyLibrary} from '../index';
import { addUserLibraryDB, removeUserLibraryDB, testIncludeFilm } from './fb';
import {emptyWatched, emptyQueue} from './header-observer';
//* экземпляр класса API
import { identif } from './autentification';

const { bodyEl, cardsList } = refs;
 //* поиск id фильма
bodyEl.addEventListener('click', testWhatButtonIsIt);

export let library = [];
let arrOfIds = [];
const currentButtonClass = 'current-header-btn';

function testWhatButtonIsIt(e) {
    const element = e.target
    if (element.dataset.modal === 'watched') { 
        return addOrRemoveTestOnButtonModal(element, 'watched', 'queue');
    }else if (element.dataset.modal === 'queue') {
        return addOrRemoveTestOnButtonModal(element, 'queue', 'watched');
    }else{return;}
}

function addArrOfIds(nameIds) {
  return  arrOfIds = localStorage.getItem(`${nameIds}`) ? JSON.parse(localStorage.getItem(`${nameIds}`)) : [];

}


function getId(element) {
    return element.getAttribute('data-action');
}

//* добавляем id фильма в WATCHED (localStorageWatched)
function addToLocalStorageWatchedOrQueue(element, action) {
    const liId = getId(element)
    addArrOfIds(action)
    if (arrOfIds.includes(liId)) {
        return;
    }

    arrOfIds.push(liId);
    addToLocaleStorage(arrOfIds, action);
    if (cardsList.dataset.list === "library" || cardsList.dataset.list === "home") {
        return;
    };

    if (action !== cardsList.dataset.list) {
        return;
    }


      paginationMyLibrary.startPagination(arrOfIds);
      
      if (cardsList.dataset.list === 'watched') {
        emptyWatched()
      }
      if (cardsList.dataset.list === 'queue') {
        emptyQueue()
      }
}

//* Функция рендера списка Watched
export function renderWatched() {
    const nameIds = 'watched';

    refs.cardsList.setAttribute('data-list', `${nameIds}`);
    const localArr = addArrOfIds(nameIds);

    paginationMyLibrary.startPagination(localArr);
}

//* Функция рендера списка Queue
export function renderQueue() {
    const nameIds = 'queue';
    refs.cardsList.setAttribute('data-list', `${nameIds}`);
    const localArr = addArrOfIds(nameIds);
    paginationMyLibrary.startPagination(localArr);
}

export function renderMyLibrary() {
    const allIds = [...addArrOfIds('queue'), ...addArrOfIds('watched')];
    paginationMyLibrary.startPagination(allIds);
}

// -------------------------------------------------------------
let testOnLocal = true;
function test(res) {
    return testOnLocal = res;
    
}
export function addOrRemoveOnOpenModal(action) {
    const element = document.querySelector(`[data-modal="${action}"]`);
    
    if(identif){
        // //* юля встав функцію
        testIncludeFilm(element.dataset.action, action).then(res => {
            // test(res);
            if (res) {
                // testOnLocal = true;
                element.classList.add(currentButtonClass)
                element.textContent = `remove to ${action}`;
            } else {
                element.textContent = `add to ${action}`; // testOnLocal = false;
                element.classList.remove(currentButtonClass)
            }
        })

        return;
        // -----------------------------------------------------------
    }else{

        testOnLocal = testOLocal(element, action);
    }
    element.textContent = testOnLocal ? `remove to ${action}` : `add to ${action}`;
    if(testOnLocal){
        element.classList.add(currentButtonClass)
       }else{
           element.classList.remove(currentButtonClass) 
       };
}

function testOLocal(element, action) {
    const test = JSON.parse(localStorage.getItem(`${action}`))
    if(test === null){
        return false;
    }
    return test.includes(element.getAttribute('data-action'));
}


function addOrRemoveTestOnButtonModal(element, action, actionRemove) {

        if(!element.classList.contains(currentButtonClass)){
            element.classList.add(currentButtonClass)
            element.textContent = `remove to ${action}`;
// --------------------------------
            if (identif) {
                // ремув перевірка!!!!
                const removeElement = document.querySelector(`[data-modal="${action === 'watched' ? 'queue' : 'watched'}"]`)
                if (!removeElement.classList.contains(currentButtonClass)) {
                    addUserLibraryDB(element.dataset.action, action);  // выбранный элемент добавить в очередь
                    return;
                }
            };
// ---------------------------------------------------------

            const removeElement = document.querySelector(`[data-modal="${action === 'watched' ? 'queue' : 'watched'}"]`)
            removeElement.classList.remove(currentButtonClass);
            removeElement.textContent = `add to ${actionRemove}`
            //* тут перепірку
            if (identif) {
                // ремув перевірка!!!!
                addUserLibraryDB(element.dataset.action, action);  // выбранный элемент добавить в очередь
                removeUserLibraryDB(removeElement.dataset.action, actionRemove);  // выбранный элемент удалить из очереди
                //* ремув юля  - добавить фильм в очередь
                // return;
            } else {
                addToLocalStorageWatchedOrQueue(element, action)
                removeFromLocalStorage(removeElement, actionRemove);
            }
        } else {
            element.classList.remove(currentButtonClass);
            element.textContent = `add to ${action}`;
            if(identif){
                ////* ремув юля  - удалить  фильм из очереди
                removeUserLibraryDB(element.dataset.action, action);
                return;
            };
                removeFromLocalStorage(element, action);
        };
}

function removeFromLocalStorage(element, action) {

    const storageElement = addArrOfIds(action);
    const elementId = element.dataset.action;
    const searchId = storageElement.indexOf(elementId);
    if (searchId === -1) {
        return;
    }
    storageElement.splice(searchId, 1);
    addToLocaleStorage(storageElement, action);

    if (cardsList.dataset.list === "library" || cardsList.dataset.list === "home") {
        return;
    };
    if (cardsList.dataset.list === 'watched') {
        emptyWatched()
    }
    if (cardsList.dataset.list === 'queue') {
        emptyQueue()
    }
    if (action !== cardsList.dataset.list) {
        return;
    }
    paginationMyLibrary.startPagination(storageElement);

}

function addToLocaleStorage(array, action) {
    localStorage.setItem(action, JSON.stringify(array));

}

