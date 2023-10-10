import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LibraryHomeComponent } from './pages/library-home/library-home.component';
import { AuthorPageComponent } from './pages/author-page/author-page.component';
import { BookPageComponent } from './pages/book-page/book-page.component';

const routes: Routes = [
  {
    path: 'library-home',
    component: LibraryHomeComponent
  },
  {
    path : 'author-page',
    component : AuthorPageComponent
  },
  {
    path : 'book-page',
    component : BookPageComponent
  },
  {
    path: '',
    redirectTo: 'library-home',
    pathMatch: 'full'
  }

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
