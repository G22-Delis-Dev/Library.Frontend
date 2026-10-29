// app.routes.ts  (lazy loading por feature)
import { Routes } from '@angular/router';

export const routes: Routes = [
  { path: '', redirectTo: 'books', pathMatch: 'full' },
  { path: 'books', loadChildren: () => import('./features/books/books.routes').then(m => m.BOOKS_ROUTES) },
  { path: 'authors', loadChildren: () => import('./features/authors/authors.routes').then(m => m.AUTHORS_ROUTES) },
  { path: '**', redirectTo: 'books' },
];