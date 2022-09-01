import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { WowListComponent } from './component/wow-list/wow-list/wow-list.component';
import { WowComponent } from './component/wow/wow.component';
import { WowHttpService } from './service/wow.http.service';
import { RandomWowSearchComponent } from './component/random-wow-search/random-wow-search.component';
import { FormsModule } from '@angular/forms';
import { OrderedWowSearchComponent } from './component/ordered-wow-search/ordered-wow-search.component';

@NgModule({
  declarations: [
    AppComponent,
    WowComponent,
    WowListComponent,
    RandomWowSearchComponent,
    OrderedWowSearchComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule
  ],
  providers: [
    WowHttpService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
