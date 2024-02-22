import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { PlayerComponent } from '../player/player.component';
import { Game } from '../models/game';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatDialog } from '@angular/material/dialog';
import { DialogAddPlayerComponent } from '../dialog-add-player/dialog-add-player.component';
import {MatDialogModule} from '@angular/material/dialog';


@Component({
  selector: 'app-game',
  standalone: true,
  imports: [CommonModule, PlayerComponent, MatButtonModule, MatIconModule, MatDialogModule],
  templateUrl: './game.component.html',
  styleUrl: './game.component.scss'
})
export class GameComponent implements OnInit {
  pickCardAnimation = false;
  game!: Game;
  currentCard: string = '';

  constructor(public dialog: MatDialog) { }

  ngOnInit(): void {
    this.newGame();
  }

  newGame() {
    this.game = new Game();
    console.log(this.game);
  }


  openDialog(): void {
    const dialogRef = this.dialog.open(DialogAddPlayerComponent);

    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');
    });
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
