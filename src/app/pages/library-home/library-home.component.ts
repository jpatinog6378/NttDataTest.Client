import { Component, OnInit } from '@angular/core';
import { GenericPageService } from 'src/app/services/generic-page.services';

@Component({
  selector: 'app-library-home',
  templateUrl: './library-home.component.html',
  styleUrls: ['./library-home.component.scss']
})
export class LibraryHomeComponent implements OnInit{


  constructor(
    private genericService : GenericPageService
  ) {
    
  }

  ngOnInit(): void {
    
  };

  openPageAuthor(){
    this.genericService.getAuthorPage();
  };

  openPageBook(){
    this.genericService.getBookPage();
  }

}
