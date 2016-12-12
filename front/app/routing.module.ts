import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { PagesComp } from './pages/pages.comp';
import { RequestComp } from './pages/request/request.comp';
import { CreateComp } from './pages/request/create/create.comp';
import { ViewComp } from './pages/request/view/view.comp';
import { ListComp } from './pages/request/list/list.comp';

import { AuthGuard } from './shared/guards/auth.guard';

const routes: Routes = [
  { path: '', redirectTo: 'request/create', pathMatch: 'full' },
  { path: '', component: PagesComp, children: [
      { path: 'request', component: RequestComp, children: [
          { path: 'create', component: CreateComp },
          { path: 'list', component: ListComp, canActivate: [AuthGuard] },
          { path: ':id', component: ViewComp, canActivate: [AuthGuard] }
        ]
      }
    ]
  }
];

@NgModule({
  imports: [ RouterModule.forRoot(routes) ],
  exports: [ RouterModule ]
})

export class RoutingModule {}