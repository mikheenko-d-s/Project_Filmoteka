import './sass/main.scss';
import FilmsApiService from './js/api-content';
import './js/treyler';
import './js/searchFimls'
import './js/filmModal';
//* імпортую пвгінацію
import './js/home-button';
import './js/annoyment';
import './js/header-observer';
import { onPopularRender } from './js/home-button';
import '/js/local-storage-API';
import './js/spinner';
import './js/log-in';
import './js/team';
import PaginationMyLibrary from './js/pagination-for-my-library';
export const ApiService = new FilmsApiService();
export const paginationMyLibrary = new PaginationMyLibrary();
import './js/fb';
import './js/autentification'
import './js/btn-listeren-q-w'
import { signInUser } from './js/autentification'
onPopularRender();
window.addEventListener("load", signInUser);

