"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
// Promise Version
var core_1 = require('@angular/core');
var http_1 = require('@angular/http');
require('rxjs/Rx');
var GameService = (function () {
    function GameService(http) {
        this.http = http;
        // URL to web api
        // private gameUrl = 'app/mockGameReport.json';
        this.gameNumber = location.search.split("=")[1];
        this.gameUrl = 'app/JSONReport.json';
        // private gameUrl = 'http://koko.ncdc:28080/formula-web/rest/games/' + this.gameNumber + '/
        // console.log("http://koko.ncdc:28080/formula-web/rest/games/" + location.search.split("=")[1] + "/visio");
        this.fieldsUrl = 'app/staticTrackCoordinates.json';
    }
    GameService.prototype.getFields = function () {
        return this.http.get(this.fieldsUrl)
            .toPromise()
            .then(this.extractFields)
            .catch(this.handleError);
    };
    GameService.prototype.extractFields = function (res) {
        var body = res.json();
        console.log("Obczaj tutaj w nocy:");
        console.log(body);
        return body || {};
    };
    GameService.prototype.getTours = function () {
        return this.http.get(this.gameUrl)
            .toPromise()
            .then(this.extractTours)
            .catch(this.handleError);
    };
    GameService.prototype.extractTours = function (res) {
        var body = res.json();
        console.log("EXTRACT TOURS");
        console.log(body.tours);
        return body.tours || {};
    };
    GameService.prototype.getToursLength = function () {
        return this.http.get(this.gameUrl)
            .toPromise()
            .then(this.extractToursLength)
            .catch(this.handleError);
    };
    GameService.prototype.extractToursLength = function (res) {
        var body = res.json();
        return body.tours.length;
    };
    GameService.prototype.getPlayersLength = function () {
        return this.http.get(this.gameUrl)
            .toPromise()
            .then(this.extractPlayersLength)
            .catch(this.handleError);
    };
    GameService.prototype.extractPlayersLength = function (res) {
        var body = res.json();
        return body.tours[0].players.length;
    };
    GameService.prototype.getMovesLength = function (aTourIter, aPlayerIter) {
        this.tourIter = aTourIter;
        this.playerIter = aPlayerIter;
        return this.http.get(this.gameUrl)
            .toPromise()
            .then(this.extractPlayersLength)
            .catch(this.handleError);
    };
    GameService.prototype.extractMovesLength = function (res) {
        var body = res.json();
        return body.tours[this.tourIter].players[this.playerIter].moves.length;
    };
    GameService.prototype.handleError = function (error) {
        // In a real world app, we might use a remote logging infrastructure
        // We'd also dig deeper into the error to get a better message
        console.log("handleError");
        var errMsg = (error.message) ? error.message :
            error.status ? error.status + " - " + error.statusText : 'Server error';
        console.error(errMsg); // log to console instead
        return Promise.reject(errMsg);
    };
    GameService = __decorate([
        core_1.Injectable(), 
        __metadata('design:paramtypes', [http_1.Http])
    ], GameService);
    return GameService;
}());
exports.GameService = GameService;
/*
 Copyright 2016 Google Inc. All Rights Reserved.
 Use of this source code is governed by an MIT-style license that
 can be found in the LICENSE file at http://angular.io/license
 */
//# sourceMappingURL=game.service.js.map