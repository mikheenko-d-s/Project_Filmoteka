import firebase from 'firebase/app'
import 'firebase/auth'
import 'firebase/database'
import 'firebase/storage'
import 'firebase/messaging'

import { refs } from "./variables"
import { database, readUserLibrary } from './fb'

import { openLogIn } from './log-in';
import { checkingTheOpeningCondition, closeToAnnoyment } from './annoyment';
import { inform, errorInfo} from './pnotify'

let identif = false;
const { formSignup, formSigning, backdropLogIn, userButton, userNameLogin, signOut } = refs;

// const resetPass = document.querySelector('.js-forgot-pass');

formSigning.addEventListener('submit', onLogin);
formSignup.addEventListener('submit', onRegister);

// ------------------------------------
// функция callback при нажатии на кнопку login
function onLogin(evt) {
  evt.preventDefault();

  const email = evt.currentTarget.elements.email.value;
  const pass = evt.currentTarget.elements.pass.value;

  login(email, pass);
  closeToAnnoyment();
};

// функция callback при нажатии на кнопку register
function onRegister(evt) {
  evt.preventDefault();

  if (evt.currentTarget.elements.password.value !== evt.currentTarget.elements.repeatpass.value) {
    inform('passwords do not match, please enter the same passwords');
  } else {
    registration(evt.currentTarget.elements.email.value, evt.currentTarget.elements.password.value, evt.currentTarget.elements.username.value);
    closeToAnnoyment();
  };
};

// функция регистрации нового пользователя в firebase
async function registration(email, password, userName) {
  try {
    const data = await firebase.auth().createUserWithEmailAndPassword(email, password);
    inform('Thanks a lot for your registration!');
    
    const currentUser = {
      name: userName,
      watched: [''],
      queue: [''],
    }
    newUser(data.user.uid, currentUser);            /*вызов функции записи нового пользователя в базу данных firebase*/
    // signInUser();
  } catch (error) {
    errorInfo(`${error.message}`);
    throw error
  };
};

// функция аутентификации зарегистрированного пользователя в firebase
async function login(email, password) {
  try {
    const data = await firebase.auth().signInWithEmailAndPassword(email, password);
    const queryDataLibrary = await readUserLibrary();
    const userName = queryDataLibrary.val().name;
    
    inform(`Welcome, ${userName}`);
  } catch (error) {
    errorInfo(`${error.message}`);
    throw error
  }
}

// функция записи нового пользователя в базу данных при регистрации
async function newUser(userId, newUser) {
  try {
    const addUser = await database.ref('users/' + userId).set(newUser)
  } catch (error) {
    errorInfo(`${error.message}`);
    throw error
  }
}

export function signInUser() {
  firebase.auth().onAuthStateChanged(async function(user) {
    if (user) {
      identif = true;
      const queryDataLibrary = await readUserLibrary();
      const userName = queryDataLibrary.val().name;

      backdropLogIn.classList.add('backdrop-hidden');
      userButton.classList.add('js-reserved-name');
      userNameLogin.textContent = userName;

      signOut.classList.remove('hidden');
      signOut.addEventListener('click', signOutUser);
      userButton.removeEventListener('click', openLogIn);
      return;
    } else {
      identif = false;
      signOut.removeEventListener('click', signOutUser);
      userButton.addEventListener('click', openLogIn);
      checkingTheOpeningCondition()
      return;
    }
  })
};

// // функция выхода из системы 
function signOutUser() {
  firebase.auth().signOut()
  .then(() => {
    userButton.classList.remove('js-reserved-name');
    userNameLogin.textContent = 'Guest User';
    signOut.classList.add('hidden');
  })
  .catch(e => {
    errorInfo(`'Sign Out Error, ${e}`);
  // console.error('Sign Out Error', e);
});
};

// --------------------------------------------------
export { identif };