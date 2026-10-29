// core/books.service.ts
import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { Observable } from 'rxjs';
import { Author, Book } from './models';

const API = '/api';

@Injectable({ providedIn: 'root' })
export class BooksService {
  private http = inject(HttpClient);
  getAll(): Observable<Book[]> { return this.http.get<Book[]>(`${API}/books`); }
  getById(id: number): Observable<Book> { return this.http.get<Book>(`${API}/books/${id}`); }
  getAuthors(id: number): Observable<Author[]> { return this.http.get<Author[]>(`${API}/books/${id}/authors`); }
  create(b: Partial<Book>): Observable<Book> { return this.http.post<Book>(`${API}/books`, b); }
  update(id: number, b: Partial<Book>): Observable<Book> { return this.http.put<Book>(`${API}/books/${id}`, b); }
  delete(id: number): Observable<void> { return this.http.delete<void>(`${API}/books/${id}`); }
}