import { Component, OnInit } from '@angular/core';
import { AddOrUpdateBookService, BookServiceModel } from 'src/app/models/books';
import { GenericPageService } from 'src/app/services/generic-page.services';
import { LibraryService } from 'src/app/services/library.services';

@Component({
  selector: 'app-book-page',
  templateUrl: './book-page.component.html',
  styleUrls: ['./book-page.component.scss']
})
export class BookPageComponent implements OnInit{

  isEditing = false;
  newBookTitle :any;
  selectBook : any;
  listAuthors : any;
  selectedAuthor: any;
  idBook : any;
  selectedAuthorId: any;
  dataSource : BookServiceModel [] = []; 

  constructor(
    private libraryService : LibraryService,
    private genericService : GenericPageService,
  ) {
    
  }

  ngOnInit(): void {
    this.getAllBoks();
    this.getAuthors();
  };

  getAllBoks(){
    this.libraryService.getBooksAll().subscribe(response => {
        this.dataSource = response;
    })
  };

  getAuthors(){
    this.libraryService.getAuthorsAll().subscribe(response =>{
      this.listAuthors = response;
      console.log(this.listAuthors)
    })
  }

  updateBook(){
    let model : AddOrUpdateBookService = {
      id : this.selectBook.id,
      title : this.selectBook.title,
      authorId : this.selectedAuthorId
    };
    this.libraryService.addOrUpdateBook(model).subscribe(response => 
      {
        if (response) {
          this.genericService.showMessage("Great!, The name of book it is updated. Thank you.", "success");
          this.selectBook.title = '';
        }
        else{
          this.genericService.showAutoCloseMessage("Upsss!", "We have a problem, Sorry.", 2000);
        }
      }
    )
    this.isEditing = false;
    this.selectBook = null;
  };

  addBook(){
    let model : AddOrUpdateBookService = {
      id : 0,
      title : this.newBookTitle,
      authorId : this.selectedAuthorId
    }
    this.libraryService.addOrUpdateBook(model).subscribe(async response => {
      if (response) {
        await this.getAllBoks();
        this.genericService.showMessage("Great!, We have added the book for you. Thank you.", "success");
      }else {
        this.genericService.showAutoCloseMessage("Upsss!", "We have a problem, Sorry.", 2000);
      }
    })
  };

  CancelUpdate(){
    this.isEditing = false;
  };

  editBook(book : any){
    this.isEditing = true; 
    this.selectBook = book;
  };

  getDeleteBook(book : any){
    this.idBook = book.id;
  };

  deleteBook(){
    this.libraryService.deleteBook(this.idBook).subscribe(async response => {
      if (response) {
        await this.getAllBoks();
        this.genericService.showMessage("Great!, We have removed the book for you.", "success");
      }
      else{
        this.genericService.showAutoCloseMessage("Upsss!", "We have a problem, Sorry.", 2000);
      }
    })
  }

  onAuthorSelectChange() {
    this.selectedAuthorId = this.selectedAuthor.id;
  }
}
