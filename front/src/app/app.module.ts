import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { HeaderComponent } from './header/header.component';
import { PageTitleComponent } from './page-title/page-title.component';
import { CarsListComponent } from './cars-list/cars-list.component';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    PageTitleComponent,
    CarsListComponent
  ],
  imports: [
    BrowserModule,
    NgbModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
