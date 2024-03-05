import { CommonModule } from '@angular/common';
import { Component, OnInit, inject } from '@angular/core';
import { PlayerComponent } from '../player/player.component';
import { Game } from '../models/game';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatDialog } from '@angular/material/dialog';
import { DialogAddPlayerComponent } from '../dialog-add-player/dialog-add-player.component';
import { MatDialogModule } from '@angular/material/dialog';
import { RuleCardComponent } from '../rule-card/rule-card.component';
import { Observable } from 'rxjs';
import { ActivatedRoute } from '@angular/router';
import { Firestore, collection, doc, onSnapshot, addDoc, updateDoc, deleteDoc, query, limit, where, QuerySnapshot } from '@angular/fire/firestore';



@Component({
  selector: 'app-game',
  standalone: true,
  imports: [CommonModule, PlayerComponent, MatButtonModule, MatIconModule, MatDialogModule, RuleCardComponent],
  templateUrl: './game.component.html',
  styleUrl: './game.component.scss'
})
export class GameComponent implements OnInit {
  firestore: Firestore = inject(Firestore);
  game!: Game;
  gameId: string = '';

  unsubGames: (() => void) | undefined;



  constructor(private route: ActivatedRoute, public dialog: MatDialog) {
    // this.unsubGames = this.subGamesList();
  }

  // subGamesList() {

  //   this.route.params.subscribe((params) => {

  //     this.gameId = params['id'];
  //     console.log(this.gameId);
  //     const docRef = this.getSingleGame(this.gameId);
  //     return onSnapshot(docRef, (list) => {
  //       if (list.exists()) {
  //         console.log(list.data());
  //         this.game.currentPlayer = list.data()['currentPlayer'];
  //         this.game.playedCards = list.data()['playedCards'];
  //         this.game.players = list.data()['players'];
  //         this.game.stack = list.data()['stack'];
  //       }
  //     });
  //   })
  // }

  getSingleGame(paramsId: string) {
    return doc(collection(this.firestore, 'games'), paramsId);
  }


  async saveGame() {
    const docRef = this.getSingleGame(this.gameId);
    await updateDoc(docRef, this.game.toJson());
  }


  getGameRef() {
    return collection(this.firestore, 'games');
  }


  ngOnInit(): void {
    this.newGame();
    this.route.params.subscribe((params) => {
      if (this.unsubGames) {
        this.unsubGames();
      }
      this.gameId = params['id'];
      const docRef = this.getSingleGame(this.gameId);
      this.unsubGames = onSnapshot(docRef, (docSnapshot) => {
        if (docSnapshot.exists()) {
          console.log(docSnapshot.data());
          this.game.currentPlayer = docSnapshot.data()['currentPlayer'];
          this.game.playedCards = docSnapshot.data()['playedCards'];
          this.game.players = docSnapshot.data()['players'];
          this.game.stack = docSnapshot.data()['stack'];
        }
      });
    });
  }

  ngOnDestroy() {
    if (this.unsubGames) {
      this.unsubGames();
    }
  }

  async newGame() {
    this.game = new Game();
  }

  openDialog(): void {
    const dialogRef = this.dialog.open(DialogAddPlayerComponent);

    dialogRef.afterClosed().subscribe((name: string) => {
      if (name && name.length > 0) {
        this.game.players.push(name);
        console.log('The dialog was closed', name);
        this.saveGame();
      }
    });
  }


  takeCard() {
    if (!this.game.pickCardAnimation) {
      let card = this.game.stack.pop();
      if (card != undefined) {
        this.game.currentCard = card;
      }
      this.game.pickCardAnimation = true;
      this.game.currentPlayer++;
      this.game.currentPlayer = this.game.currentPlayer % this.game.players.length;
      this.saveGame();
      setTimeout(() => {
        this.game.playedCards.push(this.game.currentCard);
        this.game.pickCardAnimation = false;
        console.log(this.game);
        this.saveGame();
      }, 1300);
    }
  }
}
