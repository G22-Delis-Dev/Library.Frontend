// core/authors.service.ts
import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { Observable } from 'rxjs';
import { Author } from './models';

const API = '/api';

@Injectable({ providedIn: 'root' })
export class AuthorsService {
  private http = inject(HttpClient);
  getAll(): Observable<Author[]> { return this.http.get<Author[]>(`${API}/authors`); }
  getById(id: number): Observable<Author> { return this.http.get<Author>(`${API}/authors/${id}`); }
  create(a: Partial<Author>): Observable<Author> { return this.http.post<Author>(`${API}/authors`, a); }
  update(id: number, a: Partial<Author>): Observable<Author> { return this.http.put<Author>(`${API}/authors/${id}`, a); }
  delete(id: number): Observable<void> { return this.http.delete<void>(`${API}/authors/${id}`); }
}