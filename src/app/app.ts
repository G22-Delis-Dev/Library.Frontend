// app.ts (o app.component.ts según tu versión)
import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { NavbarComponent } from './shared/navbar/navbar.component';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, NavbarComponent],
  template: `<app-navbar /><main class="container py-4"><router-outlet /></main>`,
})
export class App {}