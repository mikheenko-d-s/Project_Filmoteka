import { refs } from './variables';
import teamMarkup from '../templates/team.hbs'
import listOfTeam from '../partials/team.json'
const { backdropTeam, bodyEl, teamClose, linkStudents, listTeam } = refs;

backdropTeam.addEventListener('click', closeCard);
linkStudents.addEventListener('click', openModal);


function openModal() {
  listTeam.innerHTML = teamMarkup(listOfTeam);
  linkStudents.removeEventListener('click', openModal); 
  backdropTeam.classList.remove('backdrop-hidden');  
}



function closeCard(ev) {
  backdropTeam.removeEventListener('click', closeCard);

  if (ev.target.classList.contains('team-name')) {
        return;
    }    
        
  if (document.querySelector('.default.expand')) {     
    document.querySelector('.default.expand').classList.remove('expand');
    backdropTeam.addEventListener('click', closeCard);
    } else {
    ev.target.classList.add('expand');
    backdropTeam.addEventListener('click', closeCard);
    backdropClick(ev);
  }
}

teamClose.addEventListener('click', closeModalTeam);
function closeModalTeam(ev) {
  bodyEl.classList.remove('scroll-hidden');
  backdropTeam.classList.add('backdrop-hidden');
  backdropTeam.removeEventListener('click', backdropClick);
  window.removeEventListener('keydown', onPressEsc);
  linkStudents.addEventListener('click', openModal);
  
   }

function onPressEsc(evt) {
  if (evt.code === 'Escape') {
    closeModalTeam();
  }
}

function backdropClick(evt) {
     if (evt.target === evt.currentTarget) {
    closeModalTeam();
  }
}
