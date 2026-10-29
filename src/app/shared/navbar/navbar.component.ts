// shared/navbar/navbar.component.ts
import { Component } from '@angular/core';
import { RouterLink, RouterLinkActive } from '@angular/router';

@Component({
  selector: 'app-navbar',
  imports: [RouterLink, RouterLinkActive],
  template: `
    <nav class="navbar navbar-expand navbar-dark bg-dark">
      <div class="container">
        <a class="navbar-brand" routerLink="/">Library</a>
        <div class="navbar-nav">
          <a class="nav-link" routerLink="/books" routerLinkActive="active">Libros</a>
          <a class="nav-link" routerLink="/authors" routerLinkActive="active">Autores</a>
        </div>
      </div>
    </nav>`,
})
export class NavbarComponent {}