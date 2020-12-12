import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { CookieService } from 'ngx-cookie-service';
import { AppComponent } from './app.component';
import { FeedComponent } from './feed/feed.component';
import { NavComponent } from './nav/nav.component';
import { ProfileComponent } from './profile/profile.component';
import { routing } from './app.router';
import { InterceptService } from './shared/services/http.interceptor.service';
import { HTTP_INTERCEPTORS, HttpClient, HttpClientModule } from '@angular/common/http';
import { APP_BASE_HREF } from '@angular/common';
import { BlogComponent } from './blog/blog.component';
import { AdminConsoleComponent } from './admin/admin-console/admin-console.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { PrivacyComponent } from './privacy/privacy.component';
import { PostPhotosToblogComponent } from './post-photos-toblog/post-photos-toblog.component';
import { SignupComponent } from './signup/signup.component';
import { AccountComponent } from './account/account.component';
import { ItemListComponent } from './components/item-list/item-list.component';
import { ItemsInListComponent } from './components/items-in-list/items-in-list.component';
import { ProductSearchComponent } from './components/product-search/product-search.component';
import { LandingPageComponent } from './components/landing-page/landing-page.component';
import { ChartComponent } from './components/chart/chart.component';
import { AddItemsComponent } from './components/add-items/add-items.component';
import { SanitizemePipe } from './pipes/sanitizeme.pipe';

@NgModule({
  declarations: [
    AppComponent,
    FeedComponent,
    NavComponent,
    ProfileComponent,
    BlogComponent,
    AdminConsoleComponent,
    PrivacyComponent,
    PostPhotosToblogComponent,
    SignupComponent,
    AccountComponent,
    ItemListComponent,
    ItemsInListComponent,
    ProductSearchComponent,
    LandingPageComponent,
    ChartComponent,
    AddItemsComponent,
    SanitizemePipe,
  ],
  imports: [
    BrowserModule,
    routing,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule

  ],
  providers: [
    InterceptService,
    { provide: APP_BASE_HREF, useValue : '/' },
    {
      provide: HTTP_INTERCEPTORS,
      useClass: InterceptService,
      multi: true
    },
    CookieService,
    HttpClientModule

  ],
  bootstrap: [AppComponent]
})
export class AppModule { }

