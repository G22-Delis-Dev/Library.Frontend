// features/books/book-list/book-list.component.ts
import { Component, OnInit, inject, signal } from '@angular/core';
import { RouterLink } from '@angular/router';
import { BooksService } from '../../../core/books.service';
import { Book } from '../../../core/models';

@Component({
  selector: 'app-book-list',
  imports: [RouterLink],
  template: `
    <div class="d-flex justify-content-between align-items-center mb-3">
      <h2 class="m-0">Libros</h2>
      <a class="btn btn-primary" routerLink="new">+ Nuevo libro</a>
    </div>
    @if (loading()) { <div class="spinner-border"></div> }
    @if (error()) { <div class="alert alert-danger">{{ error() }}</div> }
    <div class="list-group">
      @for (b of books(); track b.id) {
        <div class="list-group-item d-flex justify-content-between align-items-start gap-3">
          <div>
            <h5 class="mb-1">{{ b.title }}</h5>
            <p class="mb-0 text-muted small">{{ b.description }}</p>
          </div>
          <div class="btn-group btn-group-sm flex-shrink-0">
            <a class="btn btn-outline-secondary" [routerLink]="[b.id]">Detalles</a>
            <a class="btn btn-outline-primary" [routerLink]="[b.id, 'edit']">Editar</a>
            <button class="btn btn-outline-danger" (click)="remove(b)">Eliminar</button>
          </div>
        </div>
      }
    </div>`,
})
export class BookListComponent implements OnInit {
  private api = inject(BooksService);
  books = signal<Book[]>([]);
  loading = signal(true);
  error = signal('');

  ngOnInit() {
    this.api.getAll().subscribe({
      next: b => { this.books.set(b); this.loading.set(false); },
      error: () => { this.error.set('No se pudo cargar la lista.'); this.loading.set(false); },
    });
  }

  remove(b: Book) {
    if (!confirm(`¿Eliminar "${b.title}"?`)) return;
    // La API de prueba no persiste: actualizamos la lista localmente
    this.api.delete(b.id).subscribe(() => this.books.update(l => l.filter(x => x.id !== b.id)));
  }
}