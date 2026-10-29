// features/authors/author-list/author-list.component.ts
import { Component, OnInit, inject, signal } from '@angular/core';
import { RouterLink } from '@angular/router';
import { AuthorsService } from '../../../core/authors.service';
import { Author } from '../../../core/models';

@Component({
  selector: 'app-author-list',
  imports: [RouterLink],
  template: `
    <div class="d-flex justify-content-between align-items-center mb-3">
      <h2 class="m-0">Autores</h2>
      <a class="btn btn-primary" routerLink="new">+ Nuevo autor</a>
    </div>
    @if (loading()) { <div class="spinner-border"></div> }
    <table class="table table-hover align-middle">
      <thead><tr><th>Nombre</th><th>Libros publicados</th><th class="text-end">Acciones</th></tr></thead>
      <tbody>
        @for (a of authors(); track a.id) {
          <tr>
            <td>{{ a.firstName }} {{ a.lastName }}</td>
            <td>{{ a.booksCount }}</td>
            <td class="text-end">
              <div class="btn-group btn-group-sm">
                <a class="btn btn-outline-primary" [routerLink]="[a.id, 'edit']">Editar</a>
                <button class="btn btn-outline-danger" (click)="remove(a)">Eliminar</button>
              </div>
            </td>
          </tr>
        }
      </tbody>
    </table>`,
})
export class AuthorListComponent implements OnInit {
  private api = inject(AuthorsService);
  authors = signal<Author[]>([]);
  loading = signal(true);

  ngOnInit() {
    this.api.getAll().subscribe({
      next: a => { this.authors.set(a); this.loading.set(false); },
      error: () => this.loading.set(false),
    });
  }

  remove(a: Author) {
    if (!confirm(`¿Eliminar a ${a.firstName} ${a.lastName}?`)) return;
    this.api.delete(a.id).subscribe(() => this.authors.update(l => l.filter(x => x.id !== a.id)));
  }
}