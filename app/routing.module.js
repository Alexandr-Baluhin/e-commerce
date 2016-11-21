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
var router_1 = require('@angular/router');
var pages_comp_1 = require('./pages/pages.comp');
var request_comp_1 = require('./pages/request/request.comp');
var create_comp_1 = require('./pages/request/create/create.comp');
var view_comp_1 = require('./pages/request/view/view.comp');
var list_comp_1 = require('./pages/request/list/list.comp');
var detail_comp_1 = require('./pages/request/detail/detail.comp');
var auth_guard_service_1 = require('./shared/auth/auth-guard.service');
var routes = [
    { path: '', component: pages_comp_1.PagesComp, children: [
            { path: 'request', component: request_comp_1.RequestComp, children: [
                    { path: 'create', component: create_comp_1.CreateComp },
                    { path: 'view', component: view_comp_1.ViewComp },
                    { path: 'list/:id', component: list_comp_1.ListComp, canActivate: [auth_guard_service_1.AuthGuard] },
                    { path: ':id', component: detail_comp_1.DetailComp }
                ]
            }
        ]
    },
    { path: '**', redirectTo: 'request/create', pathMatch: 'full' }
];
var RoutingModule = (function () {
    function RoutingModule() {
    }
    RoutingModule = __decorate([
        core_1.NgModule({
            imports: [router_1.RouterModule.forRoot(routes)],
            exports: [router_1.RouterModule]
        }), 
        __metadata('design:paramtypes', [])
    ], RoutingModule);
    return RoutingModule;
}());
exports.RoutingModule = RoutingModule;
//# sourceMappingURL=routing.module.js.map