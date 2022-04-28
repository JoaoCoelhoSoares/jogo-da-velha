import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-jogo-da-velha',
  templateUrl: './jogo-da-velha.component.html',
  styleUrls: ['./jogo-da-velha.component.scss']
})
export class JogoDaVelhaComponent implements OnInit {

  public currentPlayer: string = 'Viking';
  public cont: number = 0;
  public insideGame: string[][] = [['', '', ''],
  ['', '', ''],
  ['', '', '']
  ];
  public gameOver: boolean = false;
  public gameWon: boolean = false;

  public winner: string = '';

  constructor() { }

  ngOnInit(): void {
  }

  playerAction(row: number, column: number) {
    this.insideGame[row][column];
    if (this.insideGame[row][column] === '') {
      this.insideGame[row][column] = this.currentPlayer;
      this.cont++;
    }
    this.gameWon = this.checkWinner(row, column);

    if (this.currentPlayer === 'Viking') {
      this.currentPlayer = 'Orc';
    } else if (this.currentPlayer === 'Orc') {
      this.currentPlayer = 'Viking';
    }

    if (this.cont >= 9) {
      this.gameOver = true;
    }
  }

  resetGame() {
    this.insideGame = [['', '', ''], ['', '', ''], ['', '', '']];
    this.winner = '';
    this.cont = 0;
    this.currentPlayer = 'Viking';
    this.gameOver = false;
    this.gameWon = false;
  }

  checkWinner = (row: number, col: number): boolean => {
    if (
      // Horizontal win
      (this.insideGame[row][0] === this.currentPlayer &&
        this.insideGame[row][1] === this.currentPlayer &&
        this.insideGame[row][2] === this.currentPlayer) ||
      // Vertical win
      (this.insideGame[0][col] === this.currentPlayer &&
        this.insideGame[1][col] === this.currentPlayer &&
        this.insideGame[2][col] === this.currentPlayer) ||
      // Diagonal win
      ((this.insideGame[0][0] === this.currentPlayer &&
        this.insideGame[1][1] === this.currentPlayer &&
        this.insideGame[2][2] === this.currentPlayer) ||
        (this.insideGame[2][0] === this.currentPlayer &&
          this.insideGame[1][1] === this.currentPlayer &&
          this.insideGame[0][2] === this.currentPlayer))
    ) {
      this.winner = this.currentPlayer;
      this.currentPlayer = '';
      return true
    } else {
      return false
    }
  }


}
