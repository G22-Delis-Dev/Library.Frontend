// features/books/book-form/book-form.component.ts
import { Component, OnInit, inject, input } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { BooksService } from '../../../core/books.service';

@Component({
  selector: 'app-book-form',
  imports: [ReactiveFormsModule, RouterLink],
  template: `
    <h2>{{ id() ? 'Editar' : 'Nuevo' }} libro</h2>
    <form [formGroup]="form" (ngSubmit)="save()" class="row g-3">
      <div class="col-12"><label class="form-label">Título</label>
        <input class="form-control" formControlName="title" [class.is-invalid]="form.controls.title.invalid && form.controls.title.touched"></div>
      <div class="col-12"><label class="form-label">Descripción</label>
        <textarea class="form-control" rows="3" formControlName="description"></textarea></div>
      <div class="col-md-6"><label class="form-label">Páginas</label>
        <input type="number" class="form-control" formControlName="pageCount"></div>
      <div class="col-md-6"><label class="form-label">Fecha de publicación</label>
        <input type="date" class="form-control" formControlName="publishDate"></div>
      <div class="col-12"><label class="form-label">Extracto</label>
        <textarea class="form-control" rows="2" formControlName="excerpt"></textarea></div>
      <div class="col-12 d-flex gap-2">
        <button class="btn btn-primary" [disabled]="form.invalid">Guardar</button>
        <a class="btn btn-outline-secondary" routerLink="/books">Cancelar</a>
      </div>
    </form>`,
})
export class BookFormComponent implements OnInit {
  id = input<string>();
  private fb = inject(FormBuilder);
  private api = inject(BooksService);
  private router = inject(Router);

  form = this.fb.nonNullable.group({
    title: ['', Validators.required],
    description: [''],
    pageCount: [0, [Validators.required, Validators.min(1)]],
    publishDate: [new Date().toISOString().slice(0, 10), Validators.required],
    excerpt: [''],
  });

  ngOnInit() {
    const id = this.id();
    if (id) this.api.getById(+id).subscribe(b =>
      this.form.patchValue({ ...b, publishDate: b.publishDate.slice(0, 10) }));
  }

  save() {
    const v = this.form.getRawValue();
    const body = { ...v, publishDate: new Date(v.publishDate).toISOString() };
    const id = this.id();
    const req = id ? this.api.update(+id, { id: +id, ...body }) : this.api.create(body);
    req.subscribe(() => this.router.navigate(['/books']));
  }
}