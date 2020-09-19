import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormlyModule } from '@ngx-formly/core';
import { FormlyBootstrapModule } from '@ngx-formly/bootstrap';
import { ReactiveFormsModule } from '@angular/forms';

import { NgPdfExportModule } from 'projects/ng-pdf-export/src/public_api';

import { AppComponent } from './app.component';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    NgPdfExportModule,
    ReactiveFormsModule,
    FormlyBootstrapModule,
    FormlyModule.forRoot({})
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
