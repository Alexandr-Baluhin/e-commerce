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
var router_1 = require('@angular/router');
var auth_service_1 = require('./auth.service');
var AuthComp = (function () {
    function AuthComp(fb, router, _service) {
        this.fb = fb;
        this.router = router;
        this._service = _service;
        this.updateDisplay = new core_1.EventEmitter();
        this.authUserForm = fb.group({
            'type': ['user'],
            'login': ['', forms_1.Validators.required],
            'password': ['', forms_1.Validators.required]
        });
        this.authWorkerForm = fb.group({
            'type': ['worker'],
            'login': ['', forms_1.Validators.required],
            'password': ['', forms_1.Validators.required]
        });
    }
    AuthComp.prototype.ngOnInit = function () { };
    AuthComp.prototype.ngOnDestroy = function () { };
    AuthComp.prototype.closeModal = function () {
        this.updateDisplay.emit(false);
    };
    AuthComp.prototype.formSubmit = function (values) {
        var _this = this;
        if (values.type == 'user') {
            this._service.login(values).subscribe(function (res) {
                if (res.hasOwnProperty('error')) {
                    alert(res['error']);
                }
                else {
                    _this.closeModal();
                    _this.router.navigate(['/request/list', res['id']]);
                }
            });
        }
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
        __metadata('design:paramtypes', [forms_1.FormBuilder, router_1.Router, auth_service_1.AuthService])
    ], AuthComp);
    return AuthComp;
}());
exports.AuthComp = AuthComp;
//# sourceMappingURL=auth.comp.js.map