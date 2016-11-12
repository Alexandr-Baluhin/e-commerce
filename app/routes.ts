import { Routes, RouterModule } from '@angular/router';

import { PagesComp } from './pages/pages.comp';
import { RequestComp } from './pages/request/request.comp';
import { CreateComp } from './pages/request/create/create.comp';
import { ViewComp } from './pages/request/view/view.comp';
import { ListComp } from './pages/request/list/list.comp';
import { DetailComp } from './pages/request/detail/detail.comp';

import { AuthGuard } from './shared/auth/auth-guard.service';

export const routes: Routes = [
  { path: '', component: PagesComp, children: [
      { path: 'request', component: RequestComp, children: [
          { path: 'create', component: CreateComp },
          { path: 'view', component: ViewComp },
          { path: 'list/:id', component: ListComp, canActivate: [AuthGuard] },
          { path: ':id', component: DetailComp }
        ]
      }
    ]
  },
  { path: '**', redirectTo: 'request/create', pathMatch: 'full' }
];

export const routing = RouterModule.forRoot(routes);