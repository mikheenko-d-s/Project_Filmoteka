import { refs } from "./variables";
   refs.player.addEventListener('click', closeVideo)
export function openTrailer(e) {
  const id = e.target.parentNode.dataset.action;
    videoById(id).then((r)=> {
        startVideo(r.results[0].key)}).catch(console.log);
   } 


const API_KEY = 'f4d5ed62044715aa9c5e4de0663d29b2';
function videoById(id) {
    return fetch(`https://api.themoviedb.org/3/movie/${id}/videos?api_key=${API_KEY}&language=en-US`)
    .then((r)=>r.json())
}

//! тут можна змінити ширину і висоту відео під кожен розмір екрану
function startVideo(videoID) {
    let width = '780';
    let height = '460';

    if (window.screen.width < 768) {
        height = '160';
        width = '280';
    }else if (window.screen.width < 1200) {
        height = '360';
        width = '680';
    }
    onYouTubeIframeAPIReady(videoID, height, width);
}

var player;
function onYouTubeIframeAPIReady(videoID, height, width) {
  player = new YT.Player('player', {
    height: height,
    width: width,
    videoId: videoID,
    events: {
      'onReady': onPlayerReady,
      'onStateChange': onPlayerStateChange
    }
  });
  refs.player.classList.add('open-trailer');
}

function onPlayerReady(event) {
    event.target.playVideo();
  }

  var done = false;
  function onPlayerStateChange(event) {
    if (event.data == YT.PlayerState.PLAYING && !done) {
      setTimeout(stopVideo, 6000);
      done = true;
    }
  }
  function stopVideo() {
    player.stopVideo();
  }

  function closeVideo(e) {
        //* видаляю плеєр */
  refs.player.innerHTML = '<div id="player"></div>';
  refs.player.classList.remove('open-trailer');
  }



























            // <!-- 1. The <iframe> (and video player) will replace this <div> tag. -->
            // <div id="player"></div>

            // <script>
            //   // 2. This code loads the IFrame Player API code asynchronously.
            //   var tag = document.createElement('script');
        
            //   tag.src = "https://www.youtube.com/iframe_api";
            //   var firstScriptTag = document.getElementsByTagName('script')[0];
            //   firstScriptTag.parentNode.insertBefore(tag, firstScriptTag);
        
            //   // 3. This function creates an <iframe> (and YouTube player)
            //   //    after the API code downloads.
            //   var player;
            //   function onYouTubeIframeAPIReady() {
            //     player = new YT.Player('player', {
            //       height: '460',
            //       width: '780',
            //       videoId: 'LPCqBjBkvg0',
            //       events: {
            //         'onReady': onPlayerReady,
            //         'onStateChange': onPlayerStateChange
            //       }
            //     });
            //   }
        
            //   // 4. The API will call this function when the video player is ready.
            //   function onPlayerReady(event) {
            //     event.target.playVideo();
            //   }
        
            //   // 5. The API calls this function when the player's state changes.
            //   //    The function indicates that when playing a video (state=1),
            //   //    the player should play for six seconds and then stop.
            //   var done = false;
            //   function onPlayerStateChange(event) {
            //     if (event.data == YT.PlayerState.PLAYING && !done) {
            //       setTimeout(stopVideo, 6000);
            //       done = true;
            //     }
            //   }
            //   function stopVideo() {
            //     player.stopVideo();
            //   }
            // </script>




//             localStorage.getItem('watched').split(',').map((el)=>refs.cardsList.insertAdjacentHTML('beforeend',))
//             refs.cardsList.insertAdjacentHTML('beforeend', localStorage.getItem('watched').split(',').forEach((el)=>{
//                 newFilmsApi.fetchInformationAboutFilm(el)
//                 .then((r) => {
//                     filmCards(r/*[...localStorage.getItem('watched').split(',')]*/)
//                 })
//             }))


//             //*fghjk
//             import { refs } from './variables';
// import FilmsApiService from './api-content';
// import filmCards from '../templates/home.hbs';

// //* экземпляр класса API
// const newFilmsApi = new FilmsApiService();

// // //* Добавляю слушателей
// const listEl = document.querySelector('.main-content-list__item');

// //* НИЖЕ ТЕСТ
// const { bodyEl } = refs;
// bodyEl.addEventListener('click', getId);
// bodyEl.addEventListener('click', addToWatched);
// let liId = null;
// let localArrWatched = [];
// let localStorageWatched = localStorage.getItem('watched') ? localStorage.getItem('watched') : '';

// function getId(ev){
//     if (ev.target.className !== 'card-container js-card-container') {
//        return
//     }
//     liId = ev.target.parentNode.getAttribute('data-action')
//     console.log('id:',ev.target.parentNode.getAttribute('data-action'));
// }

// //* добавляем id фильма в просмотренные (localStorageWatched)
// function addToWatched(e) {
//     if (e.target.className !== 'btn-to-watched js-watched') {
//        return
//     }
    
//     localStorageWatched += liId + ',';
//     // if (localArrWatched.includes(liId)) {
//     //     return
//     // }

//     localStorage.setItem('watched', localStorageWatched); 
//     //* Создаем массив id:
//     localArrWatched = localStorage.getItem('watched').split(',');
//     localArrWatched = localArrWatched.slice(0, localArrWatched.length - 1); //* костыль, не хочет работать выше
//     //* вызов функции изменения названия кнопки
// }

// //* !!!измени на нужный баттон
// refs.myLibraryButton.addEventListener('click', searchOfWatched);

// function searchOfWatched(e) {
//     e.preventDefault();
//     refs.cardsList.innerHTML = '';
//     refs.cardsList.innerHTML = localStorage.getItem('watched').split(',').forEach((el) => {
//         console.log(el)
//         newFilmsApi.fetchInformationAboutFilm(el)
//             .then(console.log)
//             .then((r) => {
//                 filmCards(r/*[...localStorage.getItem('watched').split(',')]*/)
//             })
//     });
// }




// /*.slice(0, localArrWatched.length - 1)*/







// function addToQueue(e) {

//     //* вызов функции изменения названия кнопки
// }

// //* удаление id из просмотренных
// function deleteWatchedFilm() {
//     localStorage.removeItem(key);
//     //* вызов функции изменения названия кнопки
// }

// //* удаление id из очереди
// function deleteQueueFilm() {
//     localStorage.removeItem(key);
//     //* вызов функции изменения названия кнопки
// }

// //* рисуем список фильмов очереди
// function renderQueueFilms() {
    
// }

//* рисуем список просмотренных
// function renderWatchedFilms() {
    
// }