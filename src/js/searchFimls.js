// import debounce from 'lodash/debounce';
import FilmsApiService from './api-content.js';
import { refs } from './variables.js';
import { showSpinner } from './spinner';
import {makeFilmsWithGenres} from './home-button';
var pagination = require('./maryska');
const newFilmsApi = new FilmsApiService();
const inputRef = document.querySelector('.header-form');

inputRef.addEventListener('submit', onSearch);

// Тестовая функция - по сабмиту формы вызывает функции фетча
function onSearch(evt) {
  evt.preventDefault();
  showSpinner();
  const query = evt.currentTarget.elements[0].value;


  // записывает значение инпута в api
  newFilmsApi.searchQuery = query;
  newFilmsApi.fetchQueryFilms().then(renderCard).catch(err);
  // возвращает массив трендовых видосов
  // newFilmsApi.fetchTrendsFilms();
}

function renderCard(data) {

  if (!data.results[0]) {
    throw new Error('not Exist');
  } else {
    refs.nothSearch.classList.add('nothing-search__hidden');


    makeFilmsWithGenres(data)
    makePagin(data);
    pag2.onPageChanged(nextSearchPage);

  }
}

function err() {
  refs.nothSearch.classList.remove('nothing-search__hidden');
  refs.cardsList.innerHTML = '';
}


//* pagination
var pag2;

function makePagin(respons) {

     pag2 = new pagination(document.getElementsByClassName('pagination')[0],
  {
      currentPage: 1,		// number
      totalItems: respons.total_results,       // number
      itemsPerPage: 20,    // number
      stepNum: 2,			// number
    //   onInit: onPopularRenderNext	        // function
  });
  return respons;
}

async function nextSearchPage(page) {
  
  try {
    const response = await newFilmsApi.fetchQueryFilms(page)
    await makeFilmsWithGenres(response)
  } catch (error) {
    console.log(error);
  }
}

