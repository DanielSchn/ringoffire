import { CommonModule } from '@angular/common';
import { Component, OnInit, inject } from '@angular/core';
import { GameService } from '../game.service';

@Component({
  selector: 'app-game',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './game.component.html',
  styleUrl: './game.component.scss'
})
export class GameComponent implements OnInit {
  pickCardAnimation = false;
  game = inject(GameService);
  currentCard: string = '';

  constructor() { }

  ngOnInit(): void {
    this.newGame();
  }

  newGame() {
    this.game = new GameService();
    console.log(this.game);
  }


  takeCard() {
    if (!this.pickCardAnimation) {
      let card = this.game.stack.pop();
      if (card != undefined) {
        this.currentCard = card;
      }
      this.pickCardAnimation = true;
      setTimeout(() => {
        this.game.playedCards.push(this.currentCard);
        this.pickCardAnimation = false;
        console.log(this.game);
      }, 1300);
    }
  }
}
