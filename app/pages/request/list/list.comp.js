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
var list_service_1 = require('./list.service');
var ListComp = (function () {
    function ListComp(_service) {
        this._service = _service;
    }
    ListComp.prototype.ngOnInit = function () {
        var _this = this;
        this._service.getList().subscribe(function (res) {
            _this.requests = res;
        });
    };
    ListComp.prototype.ngOnDestroy = function () { };
    ListComp = __decorate([
        core_1.Component({
            moduleId: module.id,
            selector: 'list-comp',
            styleUrls: ['./list.comp.css'],
            templateUrl: './list.comp.html'
        }), 
        __metadata('design:paramtypes', [list_service_1.ListService])
    ], ListComp);
    return ListComp;
}());
exports.ListComp = ListComp;
//# sourceMappingURL=list.comp.js.map