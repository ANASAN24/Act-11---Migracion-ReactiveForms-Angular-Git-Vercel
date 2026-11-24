import { Component } from '@angular/core';
import { CrudComponent } from './crud/crud.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CrudComponent],
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class App {
}
