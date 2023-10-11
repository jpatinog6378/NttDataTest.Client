import { Component, OnInit } from '@angular/core';
import { AuthorServicesModel } from 'src/app/models/authors';
import { GenericPageService } from 'src/app/services/generic-page.services';
import { LibraryService } from 'src/app/services/library.services';
import { ViewChild } from '@angular/core';

@Component({
  selector: 'app-author-page',
  templateUrl: './author-page.component.html',
  styleUrls: ['./author-page.component.scss']
})
export class AuthorPageComponent implements OnInit{
  @ViewChild('modalDelete') modalDelete: any;

  isEditing = false;

  selectedAuthor: any;
  newAuthorName: string = '';
  idAuthor : any;
  itemsPerPage = 5; 
  currentPage = 1; 

  dataSource : AuthorServicesModel [] = [];


  constructor(
    private libraryService : LibraryService,
    private genericService : GenericPageService,
  ) {
  }

  ngOnInit(): void {
    this.getAllAuthors();
  }

  async addAuthor(){
    let model : AuthorServicesModel = {
      id : 0,
      name : this.newAuthorName
    };
    this.libraryService.addOrUpdateAuthor(model).subscribe(async response => {
      if (response) {
        await this.getAllAuthors();
        this.genericService.showMessage("Great!, We have added the author for you. Thank you.", "success");
        
      }
      else{
        this.genericService.showAutoCloseMessage("Upsss!", "We have a problem, Sorry.", 2000);
      }
    })
  };

  getDeleteAuthor(author: any) {
    this.idAuthor = author.id; 
  };

  deleteAuthor(){
    this.libraryService.deleteAuthor(this.idAuthor).subscribe(async response => {
      if (response) {
        await this.getAllAuthors();
        this.genericService.showMessage("Great!, We have removed the author for you.", "success");
      }
      else{
        this.genericService.showAutoCloseMessage("Upsss!", "We have a problem, Sorry.", 2000);
      }
    })
  }

  editAuthor(author: any) {
    this.isEditing = true; 
    this.selectedAuthor = author; 
  };

  CancelUpdate(){
    this.isEditing = false;
  }

  updateAuthor() {
    let model : AuthorServicesModel = {
      id : this.selectedAuthor.id,
      name : this.selectedAuthor.name
    };
    this.libraryService.addOrUpdateAuthor(model).subscribe(response => 
      {
        if (response) {
          this.genericService.showMessage("Great!, The name of author it is updated. Thank you.", "success");
          this.selectedAuthor.name = '';
        }
        else{
          this.genericService.showAutoCloseMessage("Upsss!", "We have a problem, Sorry.", 2000);
        }
      }
      )
    this.isEditing = false;
    this.selectedAuthor = null;
  };

  getItems(): AuthorServicesModel[] {
    const startIndex = (this.currentPage - 1) * this.itemsPerPage;
    const endIndex = startIndex + this.itemsPerPage;
    return this.dataSource.slice(startIndex, endIndex);
  };

  pageChanged(event: any): void {
    this.currentPage = event.page;
  };

  getAllAuthors(){
    this.libraryService.getAuthorsAll().subscribe(
      response => {
        this.dataSource = response;
      }
    )
  }
}
