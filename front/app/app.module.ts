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
  TooltipModule,
  DropdownModule,
  StepsModule
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
// Shared
import { HeaderComp } from './shared/header/header.comp';
import { AuthComp } from './shared/auth/auth.comp';
import { MessagesComp } from './shared/messages/messages.comp';
import { MapComp } from './shared/map/map.comp';

/* Services */
// Pages
import { CreateService } from './pages/request/create/create.service';
// Shared
import { BackendService } from './shared/services/backend.service';
// Guards
import { AuthGuard } from './shared/guards/auth.guard';

/** CONFIG */
import { CONFIG } from './configurations/config';

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
    TooltipModule,
    DropdownModule,
    StepsModule  
  ],
  declarations: [
    AppComp,
    // Pages
    PagesComp,
    RequestComp,
    CreateComp,
    ViewComp,
    ListComp,
    // Shared
    HeaderComp,
    AuthComp,
    MessagesComp,
    MapComp
  ],
  bootstrap: [AppComp],
  providers: [CreateService, AuthGuard, BackendService, ConfirmationService,
    {provide: 'config', useValue: CONFIG}]
})
export class AppModule { }