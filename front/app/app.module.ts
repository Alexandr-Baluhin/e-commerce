import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { ReactiveFormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';

import {
  ButtonModule,
  InputTextModule, 
  InputTextareaModule, 
  FileUploadModule,
  DialogModule,
  TabViewModule,
  CalendarModule,
  InputMaskModule,
  GrowlModule,
  ConfirmDialogModule,
  ConfirmationService,
  DataTableModule,
  SharedModule,
  TooltipModule
} from 'primeng/primeng';

/* Modules */
import { RoutingModule } from './routing.module';  
/* Components */
import { AppComp } from './app.comp';
// Pages
import { PagesComp } from './pages/pages.comp';
import { RequestComp } from './pages/request/request.comp';
import { CreateComp } from './pages/request/create/create.comp';
import { ViewComp } from './pages/request/view/view.comp';
import { ListComp } from './pages/request/list/list.comp';
import { DetailComp } from './pages/request/detail/detail.comp';
// Shared
import { HeaderComp } from './shared/header/header.comp';
import { AuthComp } from './shared/auth/auth.comp';
import { MessagesComp } from './shared/messages/messages.comp';

/* Services */
// Pages
import { CreateService } from './pages/request/create/create.service';
import { ListService } from './pages/request/list/list.service';
// Shared
import { AuthService } from './shared/auth/auth.service';
import { AuthGuard } from './shared/auth/auth-guard.service';

@NgModule({
  imports: [
    BrowserModule,
    ReactiveFormsModule,
    HttpModule,
    // routes
    RoutingModule,
    // primeng
    ButtonModule,
    InputTextModule, 
    InputTextareaModule, 
    FileUploadModule,
    DialogModule,
    TabViewModule,
    CalendarModule,
    InputMaskModule,
    GrowlModule,
    ConfirmDialogModule,
    DataTableModule,
    SharedModule,
    TooltipModule
  ],
  declarations: [
    AppComp,
    // Pages
    PagesComp,
    RequestComp,
    CreateComp,
    ViewComp,
    ListComp,
    DetailComp,
    // Shared
    HeaderComp,
    AuthComp,
    MessagesComp
  ],
  bootstrap: [AppComp],
  providers: [CreateService, ListService, AuthService, AuthGuard, ConfirmationService]
})
export class AppModule { }