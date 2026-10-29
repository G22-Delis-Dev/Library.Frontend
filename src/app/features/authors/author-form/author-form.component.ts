// features/authors/author-form/author-form.component.ts
import { Component, OnInit, inject, input } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { AuthorsService } from '../../../core/authors.service';

@Component({
  selector: 'app-author-form',
  imports: [ReactiveFormsModule, RouterLink],
  template: `
    <h2>{{ id() ? 'Editar' : 'Nuevo' }} autor</h2>
    <form [formGroup]="form" (ngSubmit)="save()" class="row g-3">
      <div class="col-md-6"><label class="form-label">Nombre</label>
        <input class="form-control" formControlName="firstName"></div>
      <div class="col-md-6"><label class="form-label">Apellido</label>
        <input class="form-control" formControlName="lastName"></div>
      <div class="col-md-6"><label class="form-label">ID del libro</label>
        <input type="number" class="form-control" formControlName="idBook"></div>
      <div class="col-12 d-flex gap-2">
        <button class="btn btn-primary" [disabled]="form.invalid">Guardar</button>
        <a class="btn btn-outline-secondary" routerLink="/authors">Cancelar</a>
      </div>
    </form>`,
})
export class AuthorFormComponent implements OnInit {
  id = input<string>();
  private fb = inject(FormBuilder);
  private api = inject(AuthorsService);
  private router = inject(Router);

  form = this.fb.nonNullable.group({
    firstName: ['', Validators.required],
    lastName: ['', Validators.required],
    idBook: [1, [Validators.required, Validators.min(1)]],
  });

  ngOnInit() {
    const id = this.id();
    if (id) this.api.getById(+id).subscribe(a => this.form.patchValue(a));
  }

  save() {
    const body = this.form.getRawValue();
    const id = this.id();
    const req = id ? this.api.update(+id, { id: +id, ...body }) : this.api.create(body);
    req.subscribe(() => this.router.navigate(['/authors']));
  }
}