import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { HttpModule } from '@angular/http';

import {
  ButtonModule,
  InputTextModule, 
  InputTextareaModule, 
  FileUploadModule,
  DialogModule,
  TabViewModule,
  CalendarModule,
  InputMaskModule
} from 'primeng/primeng';

// Components
import { AppComp } from './app.comp';
import { routing } from './routes';
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

import { CreateService } from './pages/request/create/create.service';

@NgModule({
  imports: [
    BrowserModule,
    ReactiveFormsModule,
    RouterModule,
    HttpModule,
    // routes
    routing,    
    // primeng
    ButtonModule,
    InputTextModule, 
    InputTextareaModule, 
    FileUploadModule,
    DialogModule,
    TabViewModule,
    CalendarModule,
    InputMaskModule
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
    AuthComp
  ],
  bootstrap: [AppComp],
  providers: [CreateService]
})
export class AppModule { }