// features/books/book-detail/book-detail.component.ts
import { DatePipe } from '@angular/common';
import { Component, OnInit, inject, input, signal } from '@angular/core';
import { RouterLink } from '@angular/router';
import { forkJoin } from 'rxjs';
import { BooksService } from '../../../core/books.service';
import { Author, Book } from '../../../core/models';

@Component({
  selector: 'app-book-detail',
  imports: [RouterLink, DatePipe],
  template: `
    <a routerLink="/books" class="btn btn-link px-0">← Volver</a>
    @if (book(); as b) {
      <div class="card">
        <div class="card-body">
          <h3>{{ b.title }}</h3>
          <p>{{ b.description }}</p>
          <p class="text-muted">{{ b.pageCount }} páginas · {{ b.publishDate | date: 'longDate' }}</p>
          <p class="fst-italic">{{ b.excerpt }}</p>
          <h5 class="mt-4">Autores</h5>
          <ul>
            @for (a of authors(); track a.id) { <li>{{ a.firstName }} {{ a.lastName }}</li> }
            @empty { <li class="text-muted">Sin autores registrados</li> }
          </ul>
        </div>
      </div>
    } @else if (error()) { <div class="alert alert-danger">{{ error() }}</div> }`,
})
export class BookDetailComponent implements OnInit {
  id = input.required<string>(); // viene de la ruta (withComponentInputBinding)
  private api = inject(BooksService);
  book = signal<Book | null>(null);
  authors = signal<Author[]>([]);
  error = signal('');

  ngOnInit() {
    const id = Number(this.id());
    forkJoin({ book: this.api.getById(id), authors: this.api.getAuthors(id) }).subscribe({
      next: r => { this.book.set(r.book); this.authors.set(r.authors); },
      error: () => this.error.set('Libro no encontrado.'),
    });
  }
}