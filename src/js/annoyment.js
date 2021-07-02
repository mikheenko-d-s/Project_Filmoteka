import { refs } from "./variables";

const { annoymentModal, closeAnnoyment, overlay } = refs;

let promDelay = 5000;
    let timeOpenedModal = 20000;
const MAX_PROMT_MODAL = 3;
let userSubscribed = false;
export let timerCloseModal = null;
export let timerOpenModal = null;
let counterOpenedModal = 0;

export function checkingTheOpeningCondition() {
    if (counterOpenedModal >= MAX_PROMT_MODAL || userSubscribed === true) {
        return;
    }
    
openModalOnTimer(); 
}

function openModalOnTimer() {
  timerOpenModal = setTimeout(() => {    
      openModal()
  }, promDelay)
}


function openModal() {
    counterOpenedModal += 1;
    annoymentModal.classList.remove('cat-hidden');
    timerCloseModal = setTimeout(() => { closeModal() }, timeOpenedModal);
};
 

function closeModal() {
    annoymentModal.classList.add('cat-hidden');
    checkingTheOpeningCondition()
};

closeAnnoyment.addEventListener('click', closeToAnnoyment);
export function closeToAnnoyment() {
    clearTimeout(timerOpenModal);
    counterOpenedModal = 3;
    closeModal();
    }

