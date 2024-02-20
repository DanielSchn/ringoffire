import { CommonModule } from '@angular/common';
import { Component, OnInit, inject } from '@angular/core';
// import { Game } from './../models/game';
import { GameService } from '../game.service';

@Component({
  selector: 'app-game',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './game.component.html',
  styleUrl: './game.component.scss'
})
export class GameComponent implements OnInit{
  pickCardAnimation = false;
  // game!: Game;
  game = inject(GameService);

  constructor() { }

  ngOnInit(): void {
    this.newGame();
  }

  newGame() {
    this.game = new GameService();
    console.log(this.game);
  }

  takeCard() {
    this.pickCardAnimation = true;
  }
}
