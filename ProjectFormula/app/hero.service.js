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
var mock_heroes_1 = require('./mock-heroes');
var HeroService = (function () {
    function HeroService() {
    }
    HeroService.prototype.getHeroes = function () {
        return Promise.resolve(mock_heroes_1.HEROES);
    };
    // See the "Take it slow" appendix
    HeroService.prototype.getHeroesSlowly = function () {
        var _this = this;
        return new Promise(function (resolve) {
            return setTimeout(resolve, 2000);
        }) // delay 2 seconds
            .then(function () { return _this.getHeroes(); });
    };
    HeroService = __decorate([
        core_1.Injectable(), 
        __metadata('design:paramtypes', [])
    ], HeroService);
    return HeroService;
}());
exports.HeroService = HeroService;
/*
Copyright 2016 Google Inc. All Rights Reserved.
Use of this source code is governed by an MIT-style license that
can be found in the LICENSE file at http://angular.io/license
*/ 
//# sourceMappingURL=hero.service.js.map