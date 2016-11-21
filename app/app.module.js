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
var platform_browser_1 = require('@angular/platform-browser');
var forms_1 = require('@angular/forms');
var http_1 = require('@angular/http');
var primeng_1 = require('primeng/primeng');
/* Modules */
var routing_module_1 = require('./routing.module');
/* Components */
var app_comp_1 = require('./app.comp');
// Pages
var pages_comp_1 = require('./pages/pages.comp');
var request_comp_1 = require('./pages/request/request.comp');
var create_comp_1 = require('./pages/request/create/create.comp');
var view_comp_1 = require('./pages/request/view/view.comp');
var list_comp_1 = require('./pages/request/list/list.comp');
var detail_comp_1 = require('./pages/request/detail/detail.comp');
// Shared
var header_comp_1 = require('./shared/header/header.comp');
var auth_comp_1 = require('./shared/auth/auth.comp');
var messages_comp_1 = require('./shared/messages/messages.comp');
/* Services */
// Pages
var create_service_1 = require('./pages/request/create/create.service');
var list_service_1 = require('./pages/request/list/list.service');
// Shared
var auth_service_1 = require('./shared/auth/auth.service');
var auth_guard_service_1 = require('./shared/auth/auth-guard.service');
var AppModule = (function () {
    function AppModule() {
    }
    AppModule = __decorate([
        core_1.NgModule({
            imports: [
                platform_browser_1.BrowserModule,
                forms_1.ReactiveFormsModule,
                http_1.HttpModule,
                // routes
                routing_module_1.RoutingModule,
                // primeng
                primeng_1.ButtonModule,
                primeng_1.InputTextModule,
                primeng_1.InputTextareaModule,
                primeng_1.FileUploadModule,
                primeng_1.DialogModule,
                primeng_1.TabViewModule,
                primeng_1.CalendarModule,
                primeng_1.InputMaskModule,
                primeng_1.GrowlModule,
                primeng_1.ConfirmDialogModule,
                primeng_1.DataTableModule,
                primeng_1.SharedModule,
                primeng_1.TooltipModule
            ],
            declarations: [
                app_comp_1.AppComp,
                // Pages
                pages_comp_1.PagesComp,
                request_comp_1.RequestComp,
                create_comp_1.CreateComp,
                view_comp_1.ViewComp,
                list_comp_1.ListComp,
                detail_comp_1.DetailComp,
                // Shared
                header_comp_1.HeaderComp,
                auth_comp_1.AuthComp,
                messages_comp_1.MessagesComp
            ],
            bootstrap: [app_comp_1.AppComp],
            providers: [create_service_1.CreateService, list_service_1.ListService, auth_service_1.AuthService, auth_guard_service_1.AuthGuard, primeng_1.ConfirmationService]
        }), 
        __metadata('design:paramtypes', [])
    ], AppModule);
    return AppModule;
}());
exports.AppModule = AppModule;
//# sourceMappingURL=app.module.js.map