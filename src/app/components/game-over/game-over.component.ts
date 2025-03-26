import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'app-game-over',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './game-over.component.html',
  styleUrl: './game-over.component.css'
})
export class GameOverComponent {

  @Input() isGameOver: boolean = false;
  @Input() isGameLost: boolean = false;
  @Input() moves: number = 0;
  @Input() MAX_MOVES!: number;
  @Output() restartGame = new EventEmitter<void>();

  tryAgain() {
    this.restartGame.emit();
  }

}
