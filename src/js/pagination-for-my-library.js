import filmCards from '../templates/mylibrary.hbs';
import {refs} from './variables';
var pagination = require('./maryska');
import { ApiService } from '../index';

//* ІМПОРТУЄМО 
//todo       import {paginationMyLibrary}from '../index';
//* в свій фаіл
//* для рендеру  викликаємо 
//todo      paginationMyLibrary.startPagination(arrIds);
//* де arrIds це масив з id фільма


export default class PaginationMyLibrary  {
    itemsPerPage = 20;
    bindRender = this.renderLibrary.bind(this);
    bindAddLibrary = this.addLibrary.bind(this);
    constructor(){
        this.library= [];
    }

    startPagination(arrayIds) {
        this.library =[];
        const promises = arrayIds.map(el => {
            return  ApiService.fetchInformationAboutFilm(el).then(this.bindAddLibrary);
        });
        Promise.all(promises).then(()=>this.makePagin.call(this));
    }

    async addLibrary(film) {
        await this.library.push(film);
        return await film;
    }

    makePagin() {
        this.pag3 = new pagination(document.getElementsByClassName('pagination')[0],
        {
            currentPage: 1,		// number
            totalItems: this.library.length,       // number
            itemsPerPage: this.itemsPerPage,    // number
            stepNum: 2,			// number
            onInit: this.bindRender	        // function
        });
        this.pag3.onPageChanged(this.bindRender);
    }

    renderLibrary(page) {
        const bind = this.renderNextLibrary.bind(this);
        refs.cardsList.innerHTML = bind(page);
    }

    renderNextLibrary(currentPage) { 
        let template = "";
        for (let i = (currentPage - 1) * this.itemsPerPage; i < (currentPage * this.itemsPerPage) && i < this.library.length; i++) {
            template += filmCards(this.library[i]);
        }
        return template;
    }
}

