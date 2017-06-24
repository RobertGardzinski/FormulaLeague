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
var core_1 = require('@angular/core');
var countdown_timer_component_1 = require('./countdown-timer.component');
var countdown_parent_component_1 = require('./countdown-parent.component');
var hero_service_2_1 = require('./hero.service.2');
var game_service_1 = require('./game.service');
var common_1 = require("@angular/common");
var AppComponent = (function () {
    // constructor(private heroService: HeroService) { }
    function AppComponent(gameService) {
        this.gameService = gameService;
        this.title = 'NCDC  Formula 1';
        this.backgroundActivePlayer = ['#222222', '#222222', '#222222', '#222222'];
        this.crashField = [false, false, false];
        this.arrowX = [0, 38, 76, 114, 152, 190, 228, 266, 304];
        this.disablePlay = false;
        this.offsetX = 15;
        this.offsetY = 15;
        this.disableNextMove = false;
        // topNumber : Array<number>;
        // topString : Array<string>;
        // leftNumber : Array<number>;
        // leftString : Array<string>;
        this.topNumber = [0, 0, 0, 0];
        this.topString = ["", "", "", ""];
        this.leftNumber = [0, 0, 0, 0];
        this.leftString = ["", "", "", ""];
        this.mapSrc = "../app/staticTrackWithPoles.jpg";
        // tourIter: number;
        // playerIter: number;
        this.tourIter = 0;
        this.playerIter = 0;
        this.moveIter = 0;
        this.reactionIter = 0;
        this.reactionIterPlayer = [0, 0, 0, 0];
        this.reactionIterPlayer0 = 0;
        this.reactionIterPlayer1 = 0;
        this.reactionIterPlayer2 = 0;
        this.reactionIterPlayer3 = 0;
        this.globalIter = 0;
        this.intervalId = 0;
        this.message = '';
        this.seconds = 0;
    }
    AppComponent.prototype.ngOnInit = function () {
        console.log("LOCATION");
        console.log(location);
        console.log(location.search.split("=")[1]);
        this.getFields();
        this.getTours();
        this.getToursLength();
        this.getPlayersLength();
        this.getMovesLength();
        // this.start();
    };
    AppComponent.prototype.clearTimer = function () { clearInterval(this.intervalId); };
    AppComponent.prototype.stop = function () { this.clearTimer(); };
    AppComponent.prototype.start = function () {
        this.disablePlay = true;
        this.countDown();
    };
    AppComponent.prototype.countDown = function () {
        var _this = this;
        this.clearTimer();
        this.intervalId = window.setInterval(function () {
            _this.seconds += 1;
            _this.message = "T-" + _this.seconds + " seconds and counting";
            _this.globalIterInc();
        }, 850);
    };
    AppComponent.prototype.getFields = function () {
        var _this = this;
        this.gameService.getFields().then(function (fields) { return _this.fields = fields; });
    };
    AppComponent.prototype.getTours = function () {
        var _this = this;
        this.gameService.getTours().then(function (tours) { return _this.tours = tours; });
    };
    AppComponent.prototype.getToursLength = function () {
        var _this = this;
        this.gameService.getToursLength().then(function (toursLength) { return _this.toursLength = toursLength; });
    };
    AppComponent.prototype.getPlayersLength = function () {
        var _this = this;
        this.gameService.getPlayersLength().then(function (playersLength) { return _this.playersLength = playersLength; });
    };
    AppComponent.prototype.getMovesLength = function () {
        var _this = this;
        console.log("Pobieram Move");
        this.gameService.getMovesLength(this.tourIter, this.playerIter).then(function (movesLength) { return _this.movesLength = movesLength; });
    };
    AppComponent.prototype.tourIterInc = function () {
        for (var i = 0; i < this.tours[this.tourIter].players.length; i++) {
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
        for (var i = 0; i < this.tours[this.tourIter].players.length; i++) {
            this.topNumber[i] = this.fields[this.tours[this.tourIter].players[i].status.field].y / 2;
            this.topString[i] = this.topNumber[i] - this.offsetY + 'px';
            this.leftNumber[i] = this.fields[this.tours[this.tourIter].players[i].status.field].x / 2;
            this.leftString[i] = this.leftNumber[i] - this.offsetX + 'px';
        }
    };
    AppComponent.prototype.tourIterDec = function () {
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
        for (var i = 0; i < this.tours[this.tourIter].players.length - 1; i++) {
            this.topNumber[i] = this.fields[this.tours[this.tourIter].players[i].status.field].y / 2;
            this.topString[i] = this.topNumber[i] - this.offsetY + 'px';
            this.leftNumber[i] = this.fields[this.tours[this.tourIter].players[i].status.field].x / 2;
            this.leftString[i] = this.leftNumber[i] - this.offsetX + 'px';
        }
    };
    AppComponent.prototype.playerIterInc = function () {
        console.log("PlayerIterINC!");
        console.log(this.crashField);
        this.playerIter = this.playerIter + 1;
        if (this.tourIter > 0 &&
            this.playerIter > 0 &&
            this.tours[this.tourIter].players[this.playerIter].moves[this.tours[this.tourIter].players[this.playerIter].numberOfMoves - 1].field ==
                this.tours[this.tourIter].players[this.playerIter - 1].moves[this.tours[this.tourIter].players[this.playerIter - 1].numberOfMoves - 1].field) {
            this.crashField[this.playerIter - 1] = true;
        }
        this.updateActivePlayerBackgroundColor();
        console.log("Ok1");
        console.log(this.crashField);
        this.moveIter = 0;
        this.reactionIter = 0;
        this.reactionIterPlayer[0] = 0;
        this.reactionIterPlayer[1] = 0;
        this.reactionIterPlayer[2] = 0;
        this.reactionIterPlayer[3] = 0;
        if (this.playerIter == 0)
            // Updating players positions from status
            console.log("Tutaj poleci");
        console.log(this.playerIter);
        console.log(this.tours[this.tourIter].players.length - 1);
        for (var i = 0; i < this.playerIter; i++) {
            if (this.tours[this.tourIter].players[i].numberOfMoves > 0) {
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
    };
    AppComponent.prototype.playerIterDec = function () {
        this.playerIter = this.playerIter - 1;
        this.updateActivePlayerBackgroundColor();
        this.moveIter = 0;
        this.reactionIter = 0;
        this.reactionIterPlayer[0] = 0;
        this.reactionIterPlayer[1] = 0;
        this.reactionIterPlayer[2] = 0;
        this.reactionIterPlayer[3] = 0;
        // Updating players positions from status
        for (var i = 0; i < this.playerIter; i++) {
            this.topNumber[i] = this.fields[this.tours[this.tourIter].players[i].moves[this.tours[this.tourIter].players[i].numberOfMoves - 1].field].y / 2;
            this.topString[i] = this.topNumber[i] - this.offsetY + 'px';
            this.leftNumber[i] = this.fields[this.tours[this.tourIter].players[i].moves[this.tours[this.tourIter].players[i].numberOfMoves - 1].field].x / 2;
            this.leftString[i] = this.leftNumber[i] - this.offsetX + 'px';
        }
        for (var i = this.playerIter; i < this.tours[this.tourIter].players.length - 1; i++) {
            this.topNumber[i] = this.fields[this.tours[this.tourIter].players[i].status.field].y / 2;
            this.topString[i] = this.topNumber[i] - this.offsetY + 'px';
            this.leftNumber[i] = this.fields[this.tours[this.tourIter].players[i].status.field].x / 2;
            this.leftString[i] = this.leftNumber[i] - this.offsetX + 'px';
        }
    };
    AppComponent.prototype.moveIterInc = function () {
        this.moveIter = this.moveIter + 1;
        this.reactionIter = 0;
        this.updateMoves();
    };
    AppComponent.prototype.moveIterDec = function () {
        this.moveIter = this.moveIter - 1;
        this.reactionIter = 0;
        this.updateMoves();
    };
    AppComponent.prototype.reactionIterInc = function () {
        this.reactionIter = this.reactionIter + 1;
        switch (this.playerIter) {
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
    };
    AppComponent.prototype.reactionIterDec = function () {
        this.reactionIter = this.reactionIter + 1;
        switch (this.playerIter) {
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
    };
    AppComponent.prototype.updatePositions = function () {
    };
    AppComponent.prototype.updateMoves = function () {
        if (this.moveIter > 0) {
            this.topNumber[this.playerIter] = this.fields[this.tours[this.tourIter].players[this.playerIter].moves[(this.moveIter - 1)].field].y / 2;
            this.topString[this.playerIter] = this.topNumber[this.playerIter] - this.offsetY + 'px';
            this.leftNumber[this.playerIter] = this.fields[this.tours[this.tourIter].players[this.playerIter].moves[(this.moveIter - 1)].field].x / 2;
            this.leftString[this.playerIter] = this.leftNumber[this.playerIter] - this.offsetX + 'px';
        }
        else {
            this.topNumber[this.playerIter] = this.fields[this.tours[this.tourIter].players[this.playerIter].status.field].y / 2;
            this.topString[this.playerIter] = this.topNumber[this.playerIter] - this.offsetY + 'px';
            this.leftNumber[this.playerIter] = this.fields[this.tours[this.tourIter].players[this.playerIter].status.field].x / 2;
            this.leftString[this.playerIter] = this.leftNumber[this.playerIter] - this.offsetX + 'px';
        }
    };
    AppComponent.prototype.globalIterInc = function () {
        if (this.globalIter == 0 && this.tourIter == 0) {
            this.globalIter = this.globalIter + 1;
            this.tourIterInc();
        }
        else {
            console.log("else");
            // this.tours[this.tourIter].players[this.playerIter].movesLength > 0 &&
            if (this.tours[this.tourIter].players[this.playerIter].numberOfMoves == 0) {
                this.globalIter = this.globalIter + 1;
                if (this.playerIter < this.tours[this.tourIter].players.length - 1) {
                    this.playerIter = this.playerIter + 1;
                    this.updateActivePlayerBackgroundColor();
                }
                else if (this.tourIter < this.toursLength - 1) {
                    console.log("Zaraz się sypnie");
                    this.tourIterInc();
                }
                else if (this.tourIter == this.toursLength - 1) {
                    console.log("Zaraz się sypnie");
                    this.disableNextMove = true;
                    this.stop();
                }
            }
            else if (this.moveIter > 0 && (this.reactionIter < this.tours[this.tourIter].players[this.playerIter].moves[this.moveIter - 1].amountOfReaction - 1)) {
                console.log("ifek 1");
                console.log("reactionIter: " + this.reactionIter + " a dlugosc");
                console.log(this.tours[this.tourIter].players[this.playerIter].moves[this.moveIter - 1].amountOfReaction);
                this.globalIter = this.globalIter + 1;
                this.reactionIter = this.reactionIter + 1;
            }
            else if (this.moveIter < this.tours[this.tourIter].players[this.playerIter].numberOfMoves) {
                console.log("ifek 2");
                this.globalIter = this.globalIter + 1;
                this.moveIterInc();
            }
            else if (this.playerIter < this.tours[this.tourIter].players.length - 1 && this.tours[this.tourIter].players[this.playerIter].moves[this.moveIter - 1].amountOfReaction > 0) {
                console.log("ifek 3");
                this.globalIter = this.globalIter + 1;
                this.playerIterInc();
            }
            else if (this.playerIter < this.tours[this.tourIter].players.length - 1 && this.tours[this.tourIter].players[this.playerIter].moves[this.moveIter - 1].amountOfReaction == 0) {
                console.log("ifek 4");
                this.globalIter = this.globalIter + 1;
                this.playerIterInc();
            }
            else if (this.tourIter < this.toursLength - 1) {
                console.log("ifek 5");
                this.globalIter = this.globalIter + 1;
                this.tourIterInc();
            }
            else {
                console.log("glebiej");
                this.disableNextMove = true;
            }
        }
        console.log("Po inkrementacji globala");
        console.log("Tour:" + this.tourIter + "; Player:" + this.playerIter + "; Move:" + this.moveIter + "; Reaction:" + this.reactionIter);
    };
    AppComponent.prototype.updateActivePlayerBackgroundColor = function () {
        console.log("still hanging on!");
        console.log("Tour:" + this.tourIter + "; Player:" + this.playerIter + "; Move:" + this.moveIter + "; Reaction:" + this.reactionIter);
        console.log(this.tours[this.tourIter].players.length - 1);
        for (var i = 0; i < 4; i++) {
            console.log(i);
            this.backgroundActivePlayer[i] = '#222222';
        }
        console.log("Switchuje");
        console.log("Tour:" + this.tourIter + "; Player:" + this.playerIter + "; Move:" + this.moveIter + "; Reaction:" + this.reactionIter);
        console.log(this.tours[this.tourIter].players[this.playerIter].color);
        switch (this.tours[this.tourIter].players[this.playerIter].color) {
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
    };
    AppComponent = __decorate([
        core_1.Component({
            selector: 'my-app',
            templateUrl: 'app/app.component.html',
            //providers: [HeroService, GameService]
            providers: [hero_service_2_1.HeroService, game_service_1.GameService, countdown_timer_component_1.CountdownTimerComponent, countdown_parent_component_1.CountdownLocalVarParentComponent],
            directives: [common_1.NgStyle]
        }), 
        __metadata('design:paramtypes', [game_service_1.GameService])
    ], AppComponent);
    return AppComponent;
}());
exports.AppComponent = AppComponent;
/*
Copyright 2016 Google Inc. All Rights Reserved.
Use of this source code is governed by an MIT-style license that
can be found in the LICENSE file at http://angular.io/license
*/
//# sourceMappingURL=app.component.js.map