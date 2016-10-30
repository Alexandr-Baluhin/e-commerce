import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { ReactiveFormsModule } from '@angular/forms';

import { InputTextModule, InputTextareaModule, FileUploadModule } from 'primeng/primeng';

import { AppComponent } from './app.comp';
import { AppService } from './app.service';

@NgModule({
  imports: [BrowserModule, ReactiveFormsModule, InputTextModule, InputTextareaModule, FileUploadModule],
  declarations: [AppComponent],
  bootstrap: [AppComponent],
  providers: [AppService]
})
export class AppModule { }