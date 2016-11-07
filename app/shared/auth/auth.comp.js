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
var AuthComp = (function () {
    function AuthComp(fb) {
        this.fb = fb;
        this.updateDisplay = new core_1.EventEmitter();
        this.authForm = fb.group({
            'login': ['', forms_1.Validators.required],
            'password': ['', forms_1.Validators.required]
        });
    }
    AuthComp.prototype.ngOnInit = function () { };
    AuthComp.prototype.ngOnDestroy = function () { };
    AuthComp.prototype.closeModal = function () {
        this.updateDisplay.emit(this.displayAuth);
    };
    AuthComp.prototype.formSubmit = function (values) {
        console.log(values);
    };
    __decorate([
        core_1.Input(), 
        __metadata('design:type', Boolean)
    ], AuthComp.prototype, "displayAuth", void 0);
    __decorate([
        core_1.Output(), 
        __metadata('design:type', Object)
    ], AuthComp.prototype, "updateDisplay", void 0);
    AuthComp = __decorate([
        core_1.Component({
            moduleId: module.id,
            selector: 'auth-comp',
            styleUrls: ['./auth.comp.css'],
            templateUrl: './auth.comp.html'
        }), 
        __metadata('design:paramtypes', [forms_1.FormBuilder])
    ], AuthComp);
    return AuthComp;
}());
exports.AuthComp = AuthComp;
//# sourceMappingURL=auth.comp.js.map