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
        // Form for usual persons
        this.requestForm = fb.group({
            'organizer': fb.group({
                'name': ['', forms_1.Validators.compose([forms_1.Validators.required, forms_1.Validators.maxLength(50)])],
                'surname': ['', forms_1.Validators.compose([forms_1.Validators.required, forms_1.Validators.maxLength(50)])],
                'person_code': ['', forms_1.Validators.compose([forms_1.Validators.required, forms_1.Validators.pattern('[0-9]{6}\-[0-9]{5}')])],
                'address': ['', forms_1.Validators.compose([forms_1.Validators.required, forms_1.Validators.maxLength(100)])],
                'phone': ['', forms_1.Validators.compose([forms_1.Validators.minLength(8), forms_1.Validators.pattern('^\d+$')])]
            }),
            'guard': fb.group({
                'name': ['', forms_1.Validators.compose([forms_1.Validators.required, forms_1.Validators.maxLength(50)])],
                'surname': ['', forms_1.Validators.compose([forms_1.Validators.required, forms_1.Validators.maxLength(50)])],
                'person_code': ['', forms_1.Validators.compose([forms_1.Validators.required, forms_1.Validators.pattern('[0-9]{6}\-[0-9]{5}')])],
                'address': ['', forms_1.Validators.compose([forms_1.Validators.required, forms_1.Validators.maxLength(100)])],
                'phone': ['', forms_1.Validators.compose([forms_1.Validators.minLength(8), forms_1.Validators.pattern('^\d+$')])]
            }),
            'social_guard': fb.group({
                'name': ['', forms_1.Validators.compose([forms_1.Validators.required, forms_1.Validators.maxLength(50)])],
                'surname': ['', forms_1.Validators.compose([forms_1.Validators.required, forms_1.Validators.maxLength(50)])],
                'person_code': ['', forms_1.Validators.compose([forms_1.Validators.required, forms_1.Validators.pattern('[0-9]{6}\-[0-9]{5}')])],
                'address': ['', forms_1.Validators.compose([forms_1.Validators.required, forms_1.Validators.maxLength(100)])],
                'phone': ['', forms_1.Validators.compose([forms_1.Validators.minLength(8), forms_1.Validators.pattern('^\d+$')])]
            }),
            'support': fb.group({
                'name': ['', forms_1.Validators.compose([forms_1.Validators.required, forms_1.Validators.maxLength(50)])],
                'surname': ['', forms_1.Validators.compose([forms_1.Validators.required, forms_1.Validators.maxLength(50)])],
                'person_code': ['', forms_1.Validators.compose([forms_1.Validators.required, forms_1.Validators.pattern('[0-9]{6}\-[0-9]{5}')])],
                'address': ['', forms_1.Validators.compose([forms_1.Validators.required, forms_1.Validators.maxLength(100)])],
                'phone': ['', forms_1.Validators.compose([forms_1.Validators.minLength(8), forms_1.Validators.pattern('^\d+$')])]
            }),
            'description': ['', forms_1.Validators.compose([forms_1.Validators.required, forms_1.Validators.maxLength(250)])],
            'address': ['', forms_1.Validators.compose([forms_1.Validators.required, forms_1.Validators.maxLength(100)])],
            'start_date': ['', forms_1.Validators.required],
            'end_date': ['', forms_1.Validators.required],
            'start_time': ['', forms_1.Validators.required],
            'end_time': ['', forms_1.Validators.required],
            'visitors': ['', forms_1.Validators.compose([forms_1.Validators.required, forms_1.Validators.maxLength(6), forms_1.Validators.pattern('^[0-9]+$')])],
            'participiants': ['', forms_1.Validators.compose([forms_1.Validators.required, forms_1.Validators.maxLength(6), forms_1.Validators.pattern('^[0-9]+$')])],
            'dangerous': ['', forms_1.Validators.maxLength(250)],
            'gov_callback': ['', forms_1.Validators.maxLength(250)]
        });
        // Form for law persons
        this.requestLawForm = fb.group({
            'organizer': fb.group({
                'law_name': ['', forms_1.Validators.compose([forms_1.Validators.required, forms_1.Validators.maxLength(50)])],
                'register_code': ['', forms_1.Validators.compose([forms_1.Validators.required, forms_1.Validators.pattern('[0-9]{6}\-[0-9]{5}')])],
                'law_address': ['', forms_1.Validators.compose([forms_1.Validators.required, forms_1.Validators.maxLength(100)])],
                'phone': ['', forms_1.Validators.compose([forms_1.Validators.minLength(8), forms_1.Validators.pattern('^\d+$')])]
            }),
            'guard': fb.group({
                'name': ['', forms_1.Validators.compose([forms_1.Validators.required, forms_1.Validators.maxLength(50)])],
                'surname': ['', forms_1.Validators.compose([forms_1.Validators.required, forms_1.Validators.maxLength(50)])],
                'person_code': ['', forms_1.Validators.compose([forms_1.Validators.required, forms_1.Validators.pattern('[0-9]{6}\-[0-9]{5}')])],
                'address': ['', forms_1.Validators.compose([forms_1.Validators.required, forms_1.Validators.maxLength(100)])],
                'phone': ['', forms_1.Validators.compose([forms_1.Validators.minLength(8), forms_1.Validators.pattern('^\d+$')])]
            }),
            'social_guard': fb.group({
                'name': ['', forms_1.Validators.compose([forms_1.Validators.required, forms_1.Validators.maxLength(50)])],
                'surname': ['', forms_1.Validators.compose([forms_1.Validators.required, forms_1.Validators.maxLength(50)])],
                'person_code': ['', forms_1.Validators.compose([forms_1.Validators.required, forms_1.Validators.pattern('[0-9]{6}\-[0-9]{5}')])],
                'address': ['', forms_1.Validators.compose([forms_1.Validators.required, forms_1.Validators.maxLength(100)])],
                'phone': ['', forms_1.Validators.compose([forms_1.Validators.minLength(8), forms_1.Validators.pattern('^\d+$')])]
            }),
            'support': fb.group({
                'name': ['', forms_1.Validators.compose([forms_1.Validators.required, forms_1.Validators.maxLength(50)])],
                'surname': ['', forms_1.Validators.compose([forms_1.Validators.required, forms_1.Validators.maxLength(50)])],
                'person_code': ['', forms_1.Validators.compose([forms_1.Validators.required, forms_1.Validators.pattern('[0-9]{6}\-[0-9]{5}')])],
                'address': ['', forms_1.Validators.compose([forms_1.Validators.required, forms_1.Validators.maxLength(100)])],
                'phone': ['', forms_1.Validators.compose([forms_1.Validators.minLength(8), forms_1.Validators.pattern('^\d+$')])]
            }),
            'description': ['', forms_1.Validators.compose([forms_1.Validators.required, forms_1.Validators.maxLength(250)])],
            'address': ['', forms_1.Validators.compose([forms_1.Validators.required, forms_1.Validators.maxLength(100)])],
            'start_date': ['', forms_1.Validators.required],
            'end_date': ['', forms_1.Validators.required],
            'start_time': ['', forms_1.Validators.required],
            'end_time': ['', forms_1.Validators.required],
            'visitors': ['', forms_1.Validators.compose([forms_1.Validators.required, forms_1.Validators.maxLength(6), forms_1.Validators.pattern('^[0-9]+$')])],
            'participiants': ['', forms_1.Validators.compose([forms_1.Validators.required, forms_1.Validators.maxLength(6), forms_1.Validators.pattern('^[0-9]+$')])],
            'dangerous': ['', forms_1.Validators.maxLength(250)],
            'gov_callback': ['', forms_1.Validators.maxLength(250)]
        });
    }
    CreateComp.prototype.ngOnInit = function () { };
    CreateComp.prototype.ngOnDestroy = function () { };
    CreateComp.prototype.getBinaries = function (event) {
        console.log(event);
    };
    CreateComp.prototype.formSubmit = function (values) {
        this._service.sendData(values)
            .subscribe(function (res) { return alert(res); });
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