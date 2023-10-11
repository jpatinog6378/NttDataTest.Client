import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';

@Injectable({
  providedIn: 'root',
})
export class GenericPageService {
  constructor(private router: Router) {}

  getAuthorPage(){
    this.router.navigate(['author-page']);
  }

  getBookPage(){
    this.router.navigate(['book-page']);
  };

  showMessage(text: string, icon: any) {
    Swal
      .fire({
        text: text,
   
        icon: icon,
      })
      .then((result) => { });
  };

  showAutoCloseMessage(title: string, text: string, timer: number,) {
    Swal.fire({
      title: title,
      text: text,
      timer: timer,
      showConfirmButton: false
    });
  }


}