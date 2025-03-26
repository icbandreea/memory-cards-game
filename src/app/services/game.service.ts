import { Injectable } from '@angular/core';
import { Card } from '../models/card.model';

@Injectable({
  providedIn: 'root'
})
export class GameService {

  public availableCards: Card[] = [
    { value: 'A', image: '/assets/beige.jpg', isFlipped: false, isMatched: false },
    { value: 'B', image: '/assets/blue.jpg', isFlipped: false, isMatched: false },
    { value: 'C', image: '/assets/dark-blue.jpg', isFlipped: false, isMatched: false },
    { value: 'D', image: '/assets/green.jpg', isFlipped: false, isMatched: false },
    { value: 'E', image: '/assets/greenish.jpg', isFlipped: false, isMatched: false },
    { value: 'F', image: '/assets/hibiscus.jpg', isFlipped: false, isMatched: false },
    { value: 'G', image: '/assets/multi-color.jpg', isFlipped: false, isMatched: false },
    { value: 'H', image: '/assets/orange.jpg', isFlipped: false, isMatched: false },
    { value: 'I', image: '/assets/pink.jpg', isFlipped: false, isMatched: false },
    { value: 'J', image: '/assets/pinkpink.jpg', isFlipped: false, isMatched: false },
    { value: 'K', image: '/assets/purple.jpg', isFlipped: false, isMatched: false },
    { value: 'L', image: '/assets/sunflower.jpg', isFlipped: false, isMatched: false },
    { value: 'M', image: '/assets/dark-pink.jpg', isFlipped: false, isMatched: false }
  ];

  constructor() { }

  getShuffledCards(pairCount: number): Card[] {
    const selectedCards = this.availableCards.slice(0, pairCount);
    const duplicatedCards: Card[] = selectedCards.flatMap(card => [
      { ...card, isFlipped: false, isMatched: false }, // First instance
      { ...card, isFlipped: false, isMatched: false }  // Second instance
    ]);

    return duplicatedCards.sort(() => Math.random() - 0.5);
  }

}
