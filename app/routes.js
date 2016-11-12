"use strict";
var router_1 = require('@angular/router');
var pages_comp_1 = require('./pages/pages.comp');
var request_comp_1 = require('./pages/request/request.comp');
var create_comp_1 = require('./pages/request/create/create.comp');
var view_comp_1 = require('./pages/request/view/view.comp');
var list_comp_1 = require('./pages/request/list/list.comp');
var detail_comp_1 = require('./pages/request/detail/detail.comp');
var auth_guard_service_1 = require('./shared/auth/auth-guard.service');
exports.routes = [
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
exports.routing = router_1.RouterModule.forRoot(exports.routes);
//# sourceMappingURL=routes.js.map