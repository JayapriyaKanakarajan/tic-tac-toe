import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-board',
  templateUrl: './board.component.html',
  styleUrls: ['./board.component.scss']
})
export class BoardComponent implements OnInit {
  squares: ('X' | 'O' | null)[] = [];
  xIsNext: boolean = false;
  winner: 'X' | 'O' | '' = '';
  isDraw: boolean = false;  // New property to track if the game is a draw

  constructor() {}

  ngOnInit() {
    this.newGame();
  }

  newGame() {
    this.squares = Array(9).fill(null);  // Initialize all squares to null
    this.winner = '';
    this.isDraw = false;  // Reset the draw state
    this.xIsNext = true;
  }

  get player(): 'X' | 'O' {
    return this.xIsNext ? 'X' : 'O';
  }

  makeMove(idx: number) {
    if (!this.squares[idx] && !this.winner && !this.isDraw) {  // Only allow moves if there's no winner or draw
      this.squares.splice(idx, 1, this.player);  // Update square with the current player ('X' or 'O')
      this.xIsNext = !this.xIsNext;  // Toggle the player

      this.winner = this.calculateWinner();
      
      // Check for a draw if no winner is found
      if (!this.winner && this.isBoardFull()) {
        this.isDraw = true;
      }
    }
  }

  calculateWinner(): 'X' | 'O' | '' {
    const lines = [
      [0, 1, 2],
      [3, 4, 5],
      [6, 7, 8],
      [0, 3, 6],
      [1, 4, 7],
      [2, 5, 8],
      [0, 4, 8],
      [2, 4, 6]
    ];

    for (let i = 0; i < lines.length; i++) {
      const [a, b, c] = lines[i];
      if (
        this.squares[a] &&
        this.squares[a] === this.squares[b] &&
        this.squares[a] === this.squares[c]
      ) {
        return this.squares[a] as 'X' | 'O';  // Return the winner ('X' or 'O'), ensuring it's not null
      }
    }

    return '';  // No winner yet
  }

  // Check if the board is full (no null squares)
  isBoardFull() {
    return this.squares.every(square => square !== null);
  }
}
