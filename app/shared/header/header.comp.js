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
var forms_1 = require('@angular/forms');
var HeaderComp = (function () {
    function HeaderComp(fb) {
        this.fb = fb;
        this.authForm = fb.group({
            'login': ['', forms_1.Validators.required],
            'password': ['', forms_1.Validators.required]
        });
    }
    HeaderComp.prototype.ngOnInit = function () {
        this.displayAuth = false;
    };
    HeaderComp.prototype.ngOnDestroy = function () { };
    HeaderComp.prototype.showDialog = function () {
        this.displayAuth = true;
    };
    HeaderComp.prototype.formSubmit = function (values) {
        console.log(values);
    };
    HeaderComp = __decorate([
        core_1.Component({
            moduleId: module.id,
            selector: 'header-comp',
            styleUrls: ['./header.comp.css'],
            templateUrl: './header.comp.html'
        }), 
        __metadata('design:paramtypes', [forms_1.FormBuilder])
    ], HeaderComp);
    return HeaderComp;
}());
exports.HeaderComp = HeaderComp;
//# sourceMappingURL=header.comp.js.map