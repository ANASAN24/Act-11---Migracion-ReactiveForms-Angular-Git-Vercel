import { Component, OnInit, inject } from '@angular/core';
import { FormsModule, NgForm } from '@angular/forms';
import { Game } from '../models/game';
import { GameService } from '../services/game.service';

@Component({
  selector: 'app-crud',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './crud.component.html',
  styleUrl: './crud.component.css'
})
export class CrudComponent implements OnInit {
  private gameService = inject(GameService);

  games: Game[] = [];

  game: Game = {
    title: '',
    genre: '',
    platform: '',
    price: 0,
    stock: 0
  };

  ngOnInit(): void {
    this.loadGames();
  }

  loadGames(): void {
    this.gameService.getGames().subscribe(data => {
      this.games = data;
    });
  }

  editGame(game: Game): void {
    this.game = { ...game };
  }

  saveGame(form: NgForm): void {
    if (form.invalid) return;

    if (this.game.id) {
      this.gameService.updateGame(this.game).subscribe(() => {
        this.loadGames();
        this.resetForm(form);
      });
    } else {
      this.gameService.createGame(this.game).subscribe(() => {
        this.loadGames();
        this.resetForm(form);
      });
    }
  }

  cancelEdit(form: NgForm): void {
    this.resetForm(form);
  }

  resetForm(form: NgForm): void {
    this.game = {
      title: '',
      genre: '',
      platform: '',
      price: 0,
      stock: 0
    };

    form.resetForm(this.game);
  }
}
