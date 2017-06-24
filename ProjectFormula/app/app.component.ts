import {Component, OnInit, OnChanges} from '@angular/core';
import { CountdownTimerComponent } from './countdown-timer.component'
import { CountdownLocalVarParentComponent } from './countdown-parent.component'
import { Hero } from './hero';
import {Tour, Game, Move} from './game';
import { HeroService } from './hero.service.2';
import { GameService } from './game.service';
import {NgStyle} from "@angular/common";
import {fields} from "./fieldCoordinates";

@Component({
  selector: 'my-app',
  templateUrl: 'app/app.component.html',
  //providers: [HeroService, GameService]
  providers: [HeroService, GameService, CountdownTimerComponent, CountdownLocalVarParentComponent],
  directives: [NgStyle]
})
export class AppComponent {
  title = 'NCDC  Formula 1';

  backgroundActivePlayer = ['#222222','#222222','#222222','#222222'];
  crashField = [false, false, false];

  arrowX = [0,38,76,114,152,190,228,266,304];

  disablePlay = false;

  timerComponent: CountdownTimerComponent;
  offsetX = 15;
  offsetY = 15;
  heroes: Hero[];
  disableNextMove = false;
  tours: Tour[];
  moves: Move;
  fields: fields;
  // topNumber : Array<number>;
  // topString : Array<string>;
  // leftNumber : Array<number>;
  // leftString : Array<string>;
  topNumber = [0,0,0,0];
  topString = ["","","",""];
  leftNumber = [0,0,0,0];
  leftString = ["","","",""];

  mapSrc = "../app/staticTrackWithPoles.jpg";

  movesLength: number;
  toursLength: number;
  playersLength: number;
  // tourIter: number;
  // playerIter: number;

  tourIter = 0;
  playerIter = 0;
  moveIter = 0;
  reactionIter = 0;

  reactionIterPlayer = [0,0,0,0];
  reactionIterPlayer0 = 0;
  reactionIterPlayer1 = 0;
  reactionIterPlayer2 = 0;
  reactionIterPlayer3 = 0;

  globalIter = 0;

  // constructor(private heroService: HeroService) { }
  constructor(private gameService: GameService) {
  }

  ngOnInit(): void {
    console.log("LOCATION");
    console.log(location);
    console.log(location.search.split("=")[1]);
    this.getFields();
    this.getTours();
    this.getToursLength();
    this.getPlayersLength();
    this.getMovesLength();
    // this.start();
  }


  clearTimer() { clearInterval(this.intervalId); }

  intervalId = 0;
  message = '';
  seconds = 0;


  stop() { this.clearTimer(); }

  start() {
    this.disablePlay = true;
    this.countDown(); }

  private countDown() {
    this.clearTimer();
    this.intervalId = window.setInterval(() => {
      this.seconds += 1;
        this.message = `T-${this.seconds} seconds and counting`;
        this.globalIterInc();

    }, 850);
  }

  getFields(): void {
    this.gameService.getFields().then(fields => this.fields = fields);
  }

  getTours(): void {
    this.gameService.getTours().then(tours => this.tours = tours);
  }

  getToursLength(): void {
    this.gameService.getToursLength().then(toursLength => this.toursLength = toursLength);
  }

  getPlayersLength(): void {
    this.gameService.getPlayersLength().then(playersLength => this.playersLength = playersLength);
  }

  getMovesLength(): void {
    console.log("Pobieram Move");
    this.gameService.getMovesLength(this.tourIter, this.playerIter).then(movesLength => this.movesLength = movesLength);
  }

  tourIterInc() {
    for(let i = 0; i<this.tours[this.tourIter].players.length; i++) {
      this.crashField[i] = false;
    }

    this.getPlayersLength();
    this.tourIter = this.tourIter + 1;
    this.playerIter = 0;
    this.updateActivePlayerBackgroundColor();
    this.moveIter = 0;
    this.reactionIter = 0;
    this.reactionIterPlayer[0] = 0;
    this.reactionIterPlayer[1] = 0;
    this.reactionIterPlayer[2] = 0;
    this.reactionIterPlayer[3] = 0;

    // Updating players positions from status

    for(let i=0; i<this.tours[this.tourIter].players.length;i++){
      this.topNumber[i] = this.fields[this.tours[this.tourIter].players[i].status.field].y/2;
      this.topString[i] = this.topNumber[i] - this.offsetY + 'px';
      this.leftNumber[i] = this.fields[this.tours[this.tourIter].players[i].status.field].x/2;
      this.leftString[i] = this.leftNumber[i] - this.offsetX + 'px';
    }
  }

  tourIterDec() {
    this.getPlayersLength();
    this.tourIter = this.tourIter - 1;
    this.playerIter = 0;
    this.updateActivePlayerBackgroundColor();
    this.moveIter = 0;
    this.reactionIter = 0;
    this.reactionIterPlayer[0] = 0;
    this.reactionIterPlayer[1] = 0;
    this.reactionIterPlayer[2] = 0;
    this.reactionIterPlayer[3] = 0;

    // Updating players positions from status

    for(let i=0; i<this.tours[this.tourIter].players.length-1;i++){
      this.topNumber[i] = this.fields[this.tours[this.tourIter].players[i].status.field].y/2;
      this.topString[i] = this.topNumber[i] - this.offsetY + 'px';
      this.leftNumber[i] = this.fields[this.tours[this.tourIter].players[i].status.field].x/2;
      this.leftString[i] = this.leftNumber[i] - this.offsetX + 'px';
    }
  }

  playerIterInc() {
    console.log("PlayerIterINC!");
    console.log(this.crashField);
    this.playerIter=this.playerIter+1;
    if(this.tourIter > 0 &&
      this.playerIter > 0 &&
      this.tours[this.tourIter].players[this.playerIter].moves[this.tours[this.tourIter].players[this.playerIter].numberOfMoves-1].field ==
      this.tours[this.tourIter].players[this.playerIter-1].moves[this.tours[this.tourIter].players[this.playerIter-1].numberOfMoves-1].field){
      this.crashField[this.playerIter - 1] = true;
    }
    this.updateActivePlayerBackgroundColor();
console.log("Ok1");


    console.log(this.crashField);
    this.moveIter=0;
    this.reactionIter = 0;
    this.reactionIterPlayer[0] = 0;
    this.reactionIterPlayer[1] = 0;
    this.reactionIterPlayer[2] = 0;
    this.reactionIterPlayer[3] = 0;

    if(this.playerIter == 0)
    // Updating players positions from status
    console.log("Tutaj poleci");
    console.log(this.playerIter);
    console.log(this.tours[this.tourIter].players.length-1);
    for(let i=0; i<this.playerIter;i++){
      if(this.tours[this.tourIter].players[i].numberOfMoves > 0)
      {
        console.log("ERR");
        console.log(this.tours[this.tourIter].players[this.playerIter].numberOfMoves);
        console.log(this.tours[this.tourIter].players[this.playerIter].color);
        console.log(this.tours[this.tourIter].players[i].moves[(this.tours[this.tourIter].players[i].numberOfMoves) - 1]);
        this.topNumber[i] = this.fields[this.tours[this.tourIter].players[i].moves[(this.tours[this.tourIter].players[i].numberOfMoves) - 1].field].y / 2;
        this.topString[i] = this.topNumber[i] - this.offsetY + 'px';
        this.leftNumber[i] = this.fields[this.tours[this.tourIter].players[i].moves[this.tours[this.tourIter].players[i].numberOfMoves - 1].field].x / 2;
        this.leftString[i] = this.leftNumber[i] - this.offsetX + 'px';
      }
    }
  }

  playerIterDec() {
    this.playerIter=this.playerIter-1;
    this.updateActivePlayerBackgroundColor();
    this.moveIter=0;
    this.reactionIter = 0;
    this.reactionIterPlayer[0] = 0;
    this.reactionIterPlayer[1] = 0;
    this.reactionIterPlayer[2] = 0;
    this.reactionIterPlayer[3] = 0;

    // Updating players positions from status

    for(let i=0; i<this.playerIter;i++){
      this.topNumber[i] = this.fields[ this.tours[this.tourIter].players[i].moves[ this.tours[this.tourIter].players[i].numberOfMoves-1 ].field].y/2;
      this.topString[i] = this.topNumber[i] - this.offsetY + 'px';
      this.leftNumber[i] = this.fields[ this.tours[this.tourIter].players[i].moves[ this.tours[this.tourIter].players[i].numberOfMoves-1 ].field].x/2;
      this.leftString[i] = this.leftNumber[i] - this.offsetX + 'px';
    }
    for(let i=this.playerIter; i<this.tours[this.tourIter].players.length-1;i++){
      this.topNumber[i] = this.fields[ this.tours[this.tourIter].players[i].status.field].y/2;
      this.topString[i] = this.topNumber[i] - this.offsetY + 'px';
      this.leftNumber[i] = this.fields[ this.tours[this.tourIter].players[i].status.field].x/2;
      this.leftString[i] = this.leftNumber[i] - this.offsetX + 'px';
    }
  }

  moveIterInc(){
    this.moveIter = this.moveIter + 1;
    this.reactionIter = 0;
    this.updateMoves();
  }
  moveIterDec(){
    this.moveIter = this.moveIter - 1;
    this.reactionIter = 0;
    this.updateMoves();
  }

  reactionIterInc() {
    this.reactionIter = this.reactionIter+1;
    switch(this.playerIter) {
      case 0:
        this.reactionIterPlayer[0] = this.reactionIter;
        this.reactionIterPlayer[1] = 0;
        this.reactionIterPlayer[2] = 0;
        this.reactionIterPlayer[3] = 0;
        break;
      case 1:
        this.reactionIterPlayer[1] = this.reactionIter;
        this.reactionIterPlayer[2] = 0;
        this.reactionIterPlayer[3] = 0;
        break;
      case 2:
        this.reactionIterPlayer[2] = this.reactionIter;
        this.reactionIterPlayer[3] = 0;
        break;
      case 3:
        this.reactionIterPlayer[3] = this.reactionIter;
        break;
      default:
        break;
    }
    this.updatePositions();
  }

  reactionIterDec() {
    this.reactionIter = this.reactionIter+1;
    switch(this.playerIter) {
      case 0:
        this.reactionIterPlayer[0] = this.reactionIter;
        this.reactionIterPlayer[1] = 0;
        this.reactionIterPlayer[2] = 0;
        this.reactionIterPlayer[3] = 0;
        break;
      case 1:
        this.reactionIterPlayer[1] = this.reactionIter;
        this.reactionIterPlayer[2] = 0;
        this.reactionIterPlayer[3] = 0;
        break;
      case 2:
        this.reactionIterPlayer[2] = this.reactionIter;
        this.reactionIterPlayer[3] = 0;
        break;
      case 3:
        this.reactionIterPlayer[3] = this.reactionIter;
        break;
      default:
        break;
    }
    this.updatePositions();
  }

  updatePositions(){

  }

  updateMoves(){
    if(this.moveIter>0) {
      this.topNumber[this.playerIter] = this.fields[this.tours[this.tourIter].players[this.playerIter].moves[(this.moveIter-1)].field].y / 2;
      this.topString[this.playerIter] = this.topNumber[this.playerIter] - this.offsetY + 'px';
      this.leftNumber[this.playerIter] = this.fields[this.tours[this.tourIter].players[this.playerIter].moves[(this.moveIter-1)].field].x / 2;
      this.leftString[this.playerIter] = this.leftNumber[this.playerIter] - this.offsetX + 'px';
    }
    else {
      this.topNumber[this.playerIter] = this.fields[this.tours[this.tourIter].players[this.playerIter].status.field].y / 2;
      this.topString[this.playerIter] = this.topNumber[this.playerIter] - this.offsetY + 'px';
      this.leftNumber[this.playerIter] = this.fields[this.tours[this.tourIter].players[this.playerIter].status.field].x / 2;
      this.leftString[this.playerIter] = this.leftNumber[this.playerIter] - this.offsetX + 'px';
    }

  }

  globalIterInc(){
    if (this.globalIter == 0 && this.tourIter == 0){
      this.globalIter = this.globalIter+1;
      this.tourIterInc();
    }
    // else if (this.globalIter == 0){
    //   this.globalIter = this.globalIter+1;
    //   this.tourIter = this.tourIter+1;
    // }
    else {
      console.log("else");
      // this.tours[this.tourIter].players[this.playerIter].movesLength > 0 &&
      if(this.tours[this.tourIter].players[this.playerIter].numberOfMoves == 0){
        this.globalIter = this.globalIter+1;
        if(this.playerIter < this.tours[this.tourIter].players.length-1){
          this.playerIter = this.playerIter + 1;
          this.updateActivePlayerBackgroundColor();
        }
        else if(this.tourIter < this.toursLength-1){
          console.log("Zaraz się sypnie");
          this.tourIterInc();
        }
        else if(this.tourIter == this.toursLength-1){
          console.log("Zaraz się sypnie");
          this.disableNextMove = true;
          this.stop();
        }
      }
      else if(this.moveIter > 0 && (this.reactionIter < this.tours[this.tourIter].players[this.playerIter].moves[this.moveIter-1].amountOfReaction-1)){
        console.log("ifek 1");
        console.log("reactionIter: " + this.reactionIter + " a dlugosc");
        console.log(this.tours[this.tourIter].players[this.playerIter].moves[this.moveIter-1].amountOfReaction);
        this.globalIter = this.globalIter+1;
        this.reactionIter = this.reactionIter+1;
      }
      else if(this.moveIter < this.tours[this.tourIter].players[this.playerIter].numberOfMoves){
        console.log("ifek 2");
        this.globalIter = this.globalIter+1;
        this.moveIterInc();
      }
      else if(this.playerIter < this.tours[this.tourIter].players.length-1 && this.tours[this.tourIter].players[this.playerIter].moves[this.moveIter-1].amountOfReaction > 0){
        console.log("ifek 3");
        this.globalIter = this.globalIter+1;
        this.playerIterInc();
      }
      else if(this.playerIter < this.tours[this.tourIter].players.length-1 && this.tours[this.tourIter].players[this.playerIter].moves[this.moveIter-1].amountOfReaction==0){
        console.log("ifek 4");
        this.globalIter = this.globalIter+1;
        this.playerIterInc();
      }
      else if(this.tourIter < this.toursLength-1){
        console.log("ifek 5");
        this.globalIter = this.globalIter+1;
        this.tourIterInc();
      }
      else {
        console.log("glebiej");
        this.disableNextMove = true;
      }
    }
    console.log("Po inkrementacji globala");
    console.log("Tour:" + this.tourIter + "; Player:" + this.playerIter + "; Move:" + this.moveIter + "; Reaction:" + this.reactionIter);
  }

  updateActivePlayerBackgroundColor(){
    console.log("still hanging on!");
    console.log("Tour:" + this.tourIter + "; Player:" + this.playerIter + "; Move:" + this.moveIter + "; Reaction:" + this.reactionIter);
    console.log(this.tours[this.tourIter].players.length-1);
    for(let i = 0; i<4; i++){
      console.log(i);
      this.backgroundActivePlayer[i] = '#222222';
    }
    console.log("Switchuje");console.log("Tour:" + this.tourIter + "; Player:" + this.playerIter + "; Move:" + this.moveIter + "; Reaction:" + this.reactionIter);
    console.log(this.tours[this.tourIter].players[this.playerIter].color);
    switch(this.tours[this.tourIter].players[this.playerIter].color)
    {
      case 'RED':
        console.log(this.backgroundActivePlayer[this.playerIter]);
        this.backgroundActivePlayer[this.playerIter] = 'darkred';
        break;
      case 'BLUE':
        console.log(this.backgroundActivePlayer[this.playerIter]);
        this.backgroundActivePlayer[this.playerIter] = 'darkblue';
        break;
      case 'GREEN':
        console.log(this.backgroundActivePlayer[this.playerIter]);
        this.backgroundActivePlayer[this.playerIter] = 'darkgreen';
        break;
      case 'YELLOW':
        console.log(this.backgroundActivePlayer[this.playerIter]);
        this.backgroundActivePlayer[this.playerIter] = 'darkgoldenrod';
        break;
    }
    console.log("Im out of here!");
  }
}


/*
Copyright 2016 Google Inc. All Rights Reserved.
Use of this source code is governed by an MIT-style license that
can be found in the LICENSE file at http://angular.io/license
*/
