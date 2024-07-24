import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';

import { ListComponent } from './Page/List/list.customer';
import { PageNotFoundComponent } from './Page/Page-not-found/page.not.found.component';
import { HeaderComponent } from './Shared/header/header.component';
import { CustomerApiService } from './Service/service';
import { AppRouting } from './Routing/routing';
import { EditComponent } from './Page/Edit/edit.customer';
import { ReactiveFormsModule } from '@angular/forms';
import { AddComponent } from './Page/Add/add.customer';
import { SearchComponent } from './Page/Search/search.component';
import { GlobalHttpInterceptorService } from './Service/global-http-Interceptor.service';
import { NgxPaginationModule } from 'ngx-pagination';



@NgModule({
  declarations: [
    AppComponent,
    ListComponent,
    PageNotFoundComponent,
    HeaderComponent,
    EditComponent,
    AddComponent,
    SearchComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    AppRouting,
    HttpClientModule,
    ReactiveFormsModule,
    NgxPaginationModule
  ],
  providers: [CustomerApiService,
    { provide: HTTP_INTERCEPTORS, useClass: GlobalHttpInterceptorService, multi: true }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
