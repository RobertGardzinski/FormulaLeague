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
var LoggerService = (function () {
    function LoggerService() {
        this.logs = [];
        this.prevMsg = '';
        this.prevMsgCount = 1;
    }
    LoggerService.prototype.log = function (msg) {
        if (msg === this.prevMsg) {
            // Repeat message; update last log entry with count.
            this.logs[this.logs.length - 1] = msg + (" (" + (this.prevMsgCount += 1) + "x)");
        }
        else {
            // New message; log it.
            this.prevMsg = msg;
            this.prevMsgCount = 1;
            this.logs.push(msg);
        }
    };
    LoggerService.prototype.clear = function () { this.logs.length = 0; };
    // schedules a view refresh to ensure display catches up
    LoggerService.prototype.tick = function () { this.tick_then(function () { }); };
    LoggerService.prototype.tick_then = function (fn) { setTimeout(fn, 0); };
    LoggerService = __decorate([
        core_1.Injectable(), 
        __metadata('design:paramtypes', [])
    ], LoggerService);
    return LoggerService;
}());
exports.LoggerService = LoggerService;
/**
 * Created by Robert on 2016-08-30.
 */
//# sourceMappingURL=logger.service.js.map