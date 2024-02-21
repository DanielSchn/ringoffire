import { Component, Input } from '@angular/core';
import { GameComponent } from '../game/game.component';
import { CommonModule } from '@angular/common';


@Component({
  selector: 'app-player',
  standalone: true,
  imports: [CommonModule, GameComponent],
  templateUrl: './player.component.html',
  styleUrl: './player.component.scss'
})
export class PlayerComponent {
  @Input() name!: string;


}
