import { Component, OnInit } from '@angular/core';
import { GameService } from '../../services/game.service';
import { CommonModule } from '@angular/common';
import { Card } from '../../models/card.model';
import { HeaderComponent } from "../header/header.component";
import { GameOverComponent } from '../game-over/game-over.component';
import { delay, Subject } from 'rxjs';

@Component({
  selector: 'app-game',
  standalone: true,
  imports: [CommonModule, HeaderComponent, GameOverComponent],
  templateUrl: './game.component.html',
  styleUrl: './game.component.css'
})
export class GameComponent implements OnInit {

  cards: Card[] = [];
  moves: number = 0;
  isGameOver: boolean = false;
  flippedCards: Card[] = [];
  isCheckingMatch: boolean = false;
  gameStarted: boolean = false;
  counter: number = 0;
  isGameLost: boolean = false;
  private IntervalId: any;
  MAX_MOVES: number = 20;
  selectPairs: number[] = [4, 6, 8, 10, 12];
  flippedCardsSubject = new Subject<void>();



  constructor(public gameService: GameService) {}

  ngOnInit(): void {
    this.startGame(6);
    this.gameStarted = false;
    this.flippedCardsSubject.pipe(delay(800)).subscribe(() => this.checkForMatch());
  }

  onGameStart(selectPairs: number) {
    this.startGame(selectPairs);
    this.IntervalId = setInterval(() => {
      this.counter++}, 1000);
  }

  startGame(selectPairs: number) {
    this.cards = this.gameService.getShuffledCards(selectPairs);
    this.counter = 0;
    this.moves = 0;
    this.isGameOver = false;
    this.isGameLost = false;
    this.flippedCards = [];
    this.isCheckingMatch = false;
    this.gameStarted = true;

  }

  restartGame() {
    this.gameStarted = false;
    this.isGameOver = false;
    this.isGameLost = false;
    this.counter = 0;
    this.moves = 0;
    clearInterval(this.IntervalId);
  }

  flipCard(clickedCard: Card): void {
    if (this.isCheckingMatch || clickedCard.isFlipped || clickedCard.isMatched) return;

    clickedCard.isFlipped = true;
    this.flippedCards.push(clickedCard);

    if (this.flippedCards.length === 2) {
      this.isCheckingMatch = true;
      this.flippedCardsSubject.next();
    }
  }

  checkForMatch(): void {
    if (this.flippedCards.length !== 2) return;

    const [first, second] = this.flippedCards;

    if (first.value === second.value) {
      first.isMatched = true;
      second.isMatched = true;
      this.moves++;
    } else {
      first.isFlipped = false;
      second.isFlipped = false;
      this.moves++;
    }

    if(this.moves >= this.MAX_MOVES) {
      this.isGameLost = true;
      this.isGameOver = true;
      clearInterval(this.IntervalId);
      this.counter = 0;
    }

    this.flippedCards = [];
    this.isCheckingMatch = false;

    if (this.cards.every(card => card.isMatched)) {
      this.isGameOver = true;
      clearInterval(this.IntervalId);
      this.counter = 0;
    }


  }

  get formattedTime(): string {
    const minutes = Math.floor(this.counter / 60);
    const seconds = this.counter % 60;
    return `${this.padZero(minutes)}:${this.padZero(seconds)}`;
  }

  private padZero(value: number): string {
    return value < 10 ? `0${value}` : `${value}`;
  }


 
}
