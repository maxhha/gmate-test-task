import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';

import { AppComponent } from './app.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { HeaderComponent } from './header/header.component';
import { PageTitleComponent } from './page-title/page-title.component';
import { CarsListComponent } from './cars-list/cars-list.component';
import { CarCardComponent } from './car-card/car-card.component';
import { ModelSelectComponent } from './model-select/model-select.component';
import { CarFormComponent } from './car-form/car-form.component';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    PageTitleComponent,
    CarsListComponent,
    CarCardComponent,
    ModelSelectComponent,
    CarFormComponent,
  ],
  imports: [BrowserModule, NgbModule, HttpClientModule],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
