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
var create_service_1 = require('./create.service');
var CreateComp = (function () {
    function CreateComp(_service, fb) {
        this._service = _service;
        this.fb = fb;
        this.organizerForm = fb.group({
            'name': ['', forms_1.Validators.required],
            'surname': ['', forms_1.Validators.required],
            'person_code': ['', forms_1.Validators.required],
            'address': ['', forms_1.Validators.required],
            'phone': ['']
        });
    }
    CreateComp.prototype.ngOnInit = function () { };
    CreateComp.prototype.ngOnDestroy = function () { };
    CreateComp.prototype.formSubmit = function (values) {
        console.log(values);
        // this._service.sendData();
    };
    CreateComp = __decorate([
        core_1.Component({
            moduleId: module.id,
            selector: 'create-comp',
            styleUrls: ['./create.comp.css'],
            templateUrl: './create.comp.html'
        }), 
        __metadata('design:paramtypes', [create_service_1.CreateService, forms_1.FormBuilder])
    ], CreateComp);
    return CreateComp;
}());
exports.CreateComp = CreateComp;
//# sourceMappingURL=create.comp.js.map