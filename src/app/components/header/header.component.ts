import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './header.component.html',
  styleUrl: './header.component.css'
})
export class HeaderComponent {
  
  @Input() selectPairs!: number[];
  @Output() gameStart = new EventEmitter<number>();

  startGame(pairs: number) {
    this.gameStart.emit(pairs);
  }

}
