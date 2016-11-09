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
var MessagesComp = (function () {
    function MessagesComp() {
        this.hideNotificationEvent = new core_1.EventEmitter();
    }
    MessagesComp.prototype.ngOnInit = function () { };
    MessagesComp.prototype.ngOnDestroy = function () { };
    // Hide message lock
    MessagesComp.prototype.hideNotification = function () {
        this.hideNotificationEvent.emit([]);
    };
    __decorate([
        core_1.Input(), 
        __metadata('design:type', Array)
    ], MessagesComp.prototype, "msgs", void 0);
    __decorate([
        core_1.Output(), 
        __metadata('design:type', Object)
    ], MessagesComp.prototype, "hideNotificationEvent", void 0);
    MessagesComp = __decorate([
        core_1.Component({
            moduleId: module.id,
            selector: 'msg-comp',
            styleUrls: ['./messages.comp.css'],
            templateUrl: './messages.comp.html'
        }), 
        __metadata('design:paramtypes', [])
    ], MessagesComp);
    return MessagesComp;
}());
exports.MessagesComp = MessagesComp;
//# sourceMappingURL=messages.comp.js.map