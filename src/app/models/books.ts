import { AuthorServicesModel } from "./authors";

export class BookServiceModel {
    	
    id: number;
    title: string;
    author : AuthorServicesModel[];

    constructor() {
        this.id = 0;
        this.title = '';
        this.author = [];
    }
}

export class AddOrUpdateBookService {
    id: number;
    title: string;
    authorId : number;

    constructor() {
        this.id = 0;
        this.title = '';
        this.authorId = 0;
    }
}