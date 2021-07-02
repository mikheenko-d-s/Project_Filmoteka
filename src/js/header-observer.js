// import { refs } from './variables';
// import { identif } from './autentification';
// const { header, searchForm, headerButtons, navigationHeader, buttonBlockHeader,
//    userButton, backgroundEmpty, cardsList, mainContainer, paginationBlock} = refs;

// const callback = entries => {
//   entries.forEach(entry => {
//     if (entry.intersectionRatio === 0) {
//       addClassByobserver();
//     }

//     if (entry.intersectionRatio === 1) {
//       removeClassByobserver();
//     }
//   });
// };

// var options = {
//   root: null,
//   rootMargin: '0px',
//   threshold: 0,
// };

// let observer = new IntersectionObserver(callback, options);
// observer.observe(document.querySelector('.js-element-observer'));

// function addClassByobserver() {
//   header.classList.add('mini-header');
//   searchForm.classList.add('hidden');
//   headerButtons.classList.add('hidden');
//   userButton.classList.add('hidden');
//   navigationHeader.classList.add('mini-header');
 
// }

// function removeClassByobserver() {
//   header.classList.remove('mini-header');
//   searchForm.classList.remove('hidden');
//   headerButtons.classList.remove('hidden');
//   userButton.classList.remove('hidden');
//   navigationHeader.classList.remove('mini-header');
  
   
// }


// export function checkIfEmptyLibrary () {
//   if(identif){
//     console.log('tut library')
//     return;
//   }
//     if (localStorage.getItem('watched') === null && localStorage.getItem('queue')=== null ||
//     localStorage.getItem('watched')&&localStorage.getItem('queue') &&localStorage.getItem('watched').length<3 && localStorage.getItem('queue').length<3 ||
//     localStorage.getItem('watched')&&localStorage.getItem('watched').length<3&&localStorage.getItem('queue')=== null ||
//     localStorage.getItem('queue')&&localStorage.getItem('queue').length<3&&localStorage.getItem('watched')=== null ) {
//         buttonBlockHeader.classList.add('hidden');
//         navigationHeader.classList.add('mini-header');
//         header.classList.add('empty-library');
//         userButton.classList.add('header-hidden');
//         backgroundEmpty.classList.remove('hidden');
//         cardsList.classList.add('empty-main');
//         mainContainer.classList.add('empty-main');
//         paginationBlock.classList.add('hidden');


       
// } else {

//     if (buttonBlockHeader.classList.contains('header-hidden')) {
//       buttonBlockHeader.classList.remove('hidden');
//       navigationHeader.classList.remove('mini-header');
//       header.classList.remove('empty-library');
//       userButton.classList.remove('header-hidden');
//       backgroundEmpty.classList.add('hidden');
//       cardsList.classList.remove('empty-main');
//       mainContainer.classList.remove('empty-main');
//       paginationBlock.classList.remove('hidden');
//     }
//   }
// }

// //empty-watch

// export function emptyWatched() {
//   if(identif){
//     console.log('tut watched')
//     return;
//   }

//    backgroundEmpty.classList.add('hidden');
//   if (localStorage.getItem('watched') === null || localStorage.getItem('watched')&&localStorage.getItem('watched').length<3) {
//     backgroundEmpty.classList.add('empty-choice');
//     backgroundEmpty.classList.remove('hidden');
//     cardsList.classList.add('empty-choice');
//     mainContainer.classList.add('empty-choice');
//     paginationBlock.classList.add('hidden');
//   }
//   else {
//     backgroundEmpty.classList.remove('empty-choice');
//     backgroundEmpty.classList.add('hidden');
//     cardsList.classList.remove('empty-choice');
//     mainContainer.classList.remove('empty-choice');
//     paginationBlock.classList.remove('hidden');
//   }
// }

// export function emptyQueue() {
//   if(identif){
//     console.log('tut queue')
//     return;
//   }

//   backgroundEmpty.classList.add('hidden');
//  if (localStorage.getItem('queue') === null || localStorage.getItem('queue')&&localStorage.getItem('queue').length<3) {
//    backgroundEmpty.classList.add('empty-choice');
//    backgroundEmpty.classList.remove('hidden');
//    cardsList.classList.add('empty-choice');
//    mainContainer.classList.add('empty-choice');
//    paginationBlock.classList.add('hidden');
//  }
//  else {
//    backgroundEmpty.classList.remove('empty-choice');
//    backgroundEmpty.classList.add('hidden');
//    cardsList.classList.remove('empty-choice');
//    mainContainer.classList.remove('empty-choice');
//    paginationBlock.classList.remove('hidden');
//  }
// }

// ---------------КОД ЮЛЯ
import { refs } from './variables';
import { identif } from './autentification';
import { readToLibraryDB, readToWatchedDB, readToQueueDB } from './fb'
const { header, searchForm, headerButtons, navigationHeader, buttonBlockHeader,
   userButton, backgroundEmpty, cardsList, mainContainer, paginationBlock} = refs;

const callback = entries => {
  entries.forEach(entry => {
    if (entry.intersectionRatio === 0) {
      addClassByobserver();
    }

    if (entry.intersectionRatio === 1) {
      removeClassByobserver();
    }
  });
};

var options = {
  root: null,
  rootMargin: '0px',
  threshold: 0,
};

let observer = new IntersectionObserver(callback, options);
observer.observe(document.querySelector('.js-element-observer'));

function addClassByobserver() {
  header.classList.add('mini-header');
  searchForm.classList.add('hidden');
  headerButtons.classList.add('hidden');
  userButton.classList.add('hidden');
  navigationHeader.classList.add('mini-header');
 
}

function removeClassByobserver() {
  header.classList.remove('mini-header');
  searchForm.classList.remove('hidden');
  headerButtons.classList.remove('hidden');
  userButton.classList.remove('hidden');
  navigationHeader.classList.remove('mini-header');
  
   
}

// ---------
function emptyLibrary() {
  buttonBlockHeader.classList.add('hidden');
  navigationHeader.classList.add('mini-header');
  header.classList.add('empty-library');
  userButton.classList.add('header-hidden');
  backgroundEmpty.classList.remove('hidden');
  cardsList.classList.add('empty-main');
  mainContainer.classList.add('empty-main');
  paginationBlock.classList.add('hidden');
};

function noEmptyLibrary() {
if (buttonBlockHeader.classList.contains('header-hidden')) {
  buttonBlockHeader.classList.remove('hidden');
  navigationHeader.classList.remove('mini-header');
  header.classList.remove('empty-library');
  userButton.classList.remove('header-hidden');
  backgroundEmpty.classList.add('hidden');
  cardsList.classList.remove('empty-main');
  mainContainer.classList.remove('empty-main');
  paginationBlock.classList.remove('hidden');
    }
};

export function checkIfEmptyLibrary() {
  backgroundEmpty.classList.add('hidden');
  
  if (identif) {
    readToLibraryDB().then(res => {
      console.log('readToWatchedDB', res);
      if (!res) {
        emptyLibrary();
      } else {
        noEmptyLibrary();
      }
    })
  } else {
    if (localStorage.getItem('watched') === null && localStorage.getItem('queue') === null ||
      localStorage.getItem('watched') && localStorage.getItem('queue') && localStorage.getItem('watched').length < 3 && localStorage.getItem('queue').length < 3 ||
      localStorage.getItem('watched') && localStorage.getItem('watched').length < 3 && localStorage.getItem('queue') === null ||
      localStorage.getItem('queue') && localStorage.getItem('queue').length < 3 && localStorage.getItem('watched') === null) {
    
      emptyLibrary();
    } else {
      noEmptyLibrary();
    }
  }
};

//empty-watch
function emptyWQ() {
    backgroundEmpty.classList.add('empty-choice');
    backgroundEmpty.classList.remove('hidden');
    cardsList.classList.add('empty-choice');
    mainContainer.classList.add('empty-choice');
    paginationBlock.classList.add('hidden');
};

function noEmptyWQ() {
    backgroundEmpty.classList.remove('empty-choice');
    backgroundEmpty.classList.add('hidden');
    cardsList.classList.remove('empty-choice');
    mainContainer.classList.remove('empty-choice');
    paginationBlock.classList.remove('hidden');
}

export function emptyWatched() {
  backgroundEmpty.classList.add('hidden');

  // console.log('identif', identif);
  if (identif) {
    readToWatchedDB().then(res => {
      console.log('readToWatchedDB', res);
      if (!res) {
        emptyWQ();
      } else {
        noEmptyWQ();
      }
    })
  } else {
    if (localStorage.getItem('watched') === null || localStorage.getItem('watched')&&localStorage.getItem('watched').length<3) {
    emptyWQ();
  }
  else {
    noEmptyWQ();
  }
  }
}

export function emptyQueue() {
  backgroundEmpty.classList.add('hidden');

  if (identif) {
    readToQueueDB().then(res => {
      console.log('readToWatchedDB', res);
      if (!res) {
        emptyWQ();
      } else {
        noEmptyWQ();
      }
    })
  } else { 
 if (localStorage.getItem('queue') === null || localStorage.getItem('queue')&&localStorage.getItem('queue').length<3) {
   emptyWQ();
 }
 else {
   noEmptyWQ();
 }
}
}

