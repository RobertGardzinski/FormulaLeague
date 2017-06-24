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
var CountdownTimerComponent = (function () {
    function CountdownTimerComponent() {
        this.intervalId = 0;
        this.message = '';
        this.seconds = 11;
    }
    CountdownTimerComponent.prototype.clearTimer = function () { clearInterval(this.intervalId); };
    CountdownTimerComponent.prototype.ngOnInit = function () { this.start(); };
    CountdownTimerComponent.prototype.ngOnDestroy = function () { this.clearTimer(); };
    CountdownTimerComponent.prototype.start = function () { this.countDown(); };
    CountdownTimerComponent.prototype.stop = function () {
        this.clearTimer();
        this.message = "Holding at T-" + this.seconds + " seconds";
    };
    CountdownTimerComponent.prototype.countDown = function () {
        var _this = this;
        this.clearTimer();
        this.intervalId = window.setInterval(function () {
            _this.seconds -= 1;
            if (_this.seconds === 0) {
                _this.message = 'Blast off!';
            }
            else {
                if (_this.seconds < 0) {
                    _this.seconds = 10;
                } // reset
                _this.message = "T-" + _this.seconds + " seconds and counting";
            }
        }, 1000);
    };
    CountdownTimerComponent = __decorate([
        core_1.Component({
            selector: 'countdown-timer',
            template: '<p>{{message}}</p>'
        }), 
        __metadata('design:paramtypes', [])
    ], CountdownTimerComponent);
    return CountdownTimerComponent;
}());
exports.CountdownTimerComponent = CountdownTimerComponent;
/*
Copyright 2016 Google Inc. All Rights Reserved.
Use of this source code is governed by an MIT-style license that
can be found in the LICENSE file at http://angular.io/license
*/ 
//# sourceMappingURL=countdown-timer.component.js.map