import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-jogo-da-velha',
  templateUrl: './jogo-da-velha.component.html',
  styleUrls: ['./jogo-da-velha.component.scss']
})
export class JogoDaVelhaComponent implements OnInit {

  public currentPlayer: string = 'Viking';
  public cont: number = 0;
  public seconds: number = 60;
  public insideGame: string[][] = [['', '', ''],
  ['', '', ''],
  ['', '', '']
  ];
  public gameOver: boolean = false;
  public gameWon: boolean = false;
  public timer: any;
  public winner: string = '';

  constructor() { }

  ngOnInit(): void {
    this.gameTimer();
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
      clearInterval(this.timer);
      this.gameOver = true;
    }
  }

  reset() {
    this.insideGame = [['', '', ''], ['', '', ''], ['', '', '']];
    this.winner = '';
    this.cont = 0;
    this.currentPlayer = 'Viking';
    this.gameOver = false;
    this.gameWon = false;
    this.seconds = 60;
    this.gameTimer();
  }

  checkWinner = (row: number, col: number): boolean => {
    if (
      (this.insideGame[row][0] === this.currentPlayer &&
        this.insideGame[row][1] === this.currentPlayer &&
        this.insideGame[row][2] === this.currentPlayer) ||
      (this.insideGame[0][col] === this.currentPlayer &&
        this.insideGame[1][col] === this.currentPlayer &&
        this.insideGame[2][col] === this.currentPlayer) ||
      ((this.insideGame[0][0] === this.currentPlayer &&
        this.insideGame[1][1] === this.currentPlayer &&
        this.insideGame[2][2] === this.currentPlayer) ||
        (this.insideGame[2][0] === this.currentPlayer &&
          this.insideGame[1][1] === this.currentPlayer &&
          this.insideGame[0][2] === this.currentPlayer))
    ) {
      this.winner = this.currentPlayer;
      this.currentPlayer = '';
      clearInterval(this.timer);
      return true
    } else {
      return false
    }
  }

  gameTimer() {
    this.timer = setInterval(() => {
      if (this.seconds > 0) {
        this.seconds--;
      } else {
        clearInterval(this.timer);
      }
    }, 1000)
  }

}
