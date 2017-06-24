// Promise Version
import {Injectable}     from '@angular/core';
import {Http, Response} from '@angular/http';
import {Headers, RequestOptions} from '@angular/http';
import {Tour, Game, Move}           from './game';
import 'rxjs/Rx';
import {fields} from "./fieldCoordinates";


@Injectable()
export class GameService {
  // URL to web api
  // private gameUrl = 'app/mockGameReport.json';

  private gameNumber = location.search.split("=")[1];
  private gameUrl = 'app/JSONReport.json';
  // private gameUrl = 'http://koko.ncdc:28080/formula-web/rest/games/' + this.gameNumber + '/

  // console.log("http://koko.ncdc:28080/formula-web/rest/games/" + location.search.split("=")[1] + "/visio");
  private fieldsUrl = 'app/staticTrackCoordinates.json';
  private tourIter: number;
  private playerIter: number;

  constructor(private http: Http) {
  }

  getFields(): Promise<fields> {
    return this.http.get(this.fieldsUrl)
      .toPromise()
      .then(this.extractFields)
      .catch(this.handleError);
  }

  private extractFields(res: Response) {
    let body = res.json();
    console.log("Obczaj tutaj w nocy:");
    console.log(body);
    return body || {};
  }


  getTours(): Promise<Tour[]> {
    return this.http.get(this.gameUrl)
      .toPromise()
      .then(this.extractTours)
      .catch(this.handleError);
  }

  private extractTours(res: Response) {
    let body = res.json();
    console.log("EXTRACT TOURS");
    console.log(body.tours);
    return body.tours || {};
  }

  getToursLength(): Promise<number> {
    return this.http.get(this.gameUrl)
      .toPromise()
      .then(this.extractToursLength)
      .catch(this.handleError);
  }

  private extractToursLength(res: Response) {
    let body = res.json();
    return body.tours.length;
  }

  getPlayersLength(): Promise<number> {
    return this.http.get(this.gameUrl)
      .toPromise()
      .then(this.extractPlayersLength)
      .catch(this.handleError);
  }

  private extractPlayersLength(res: Response) {
    let body = res.json();
    return body.tours[0].players.length;
  }

  getMovesLength(aTourIter: number, aPlayerIter: number): Promise<number> {
    this.tourIter = aTourIter;
    this.playerIter = aPlayerIter;
    return this.http.get(this.gameUrl)
      .toPromise()
      .then(this.extractPlayersLength)
      .catch(this.handleError);
  }

  private extractMovesLength(res: Response) {
    let body = res.json();
    return body.tours[this.tourIter].players[this.playerIter].moves.length;
  }

  private handleError(error: any) {
    // In a real world app, we might use a remote logging infrastructure
    // We'd also dig deeper into the error to get a better message
    console.log("handleError");
    let errMsg = (error.message) ? error.message :
      error.status ? `${error.status} - ${error.statusText}` : 'Server error';
    console.error(errMsg); // log to console instead
    return Promise.reject(errMsg);
  }

}


/*
 Copyright 2016 Google Inc. All Rights Reserved.
 Use of this source code is governed by an MIT-style license that
 can be found in the LICENSE file at http://angular.io/license
 */
