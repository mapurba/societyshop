import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { CookieService } from 'ngx-cookie-service';
import { AppComponent } from './app.component';
import { routing } from './app.router';
import { InterceptService } from './shared/services/http.interceptor.service';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { APP_BASE_HREF } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { LandingPageComponent } from './components/landing-page/landing-page.component';
import { ServiceWorkerModule } from '@angular/service-worker';
import { environment } from '../environments/environment';
import { SharedModule } from './sharedModule/shared/shared.module';
import { AccountComponent } from './components/account/account.component';
import { NavComponent } from './components/nav/nav.component';
import { PrivacyComponent } from './components/privacy/privacy.component';
import { ProfileComponent } from './components/profile/profile.component';
import { SignupComponent } from './components/signup/signup.component';

@NgModule({
  declarations: [
    AppComponent,
    NavComponent,
    ProfileComponent,
    // BlogComponent,
    // AdminConsoleComponent,
    PrivacyComponent,
    // PostPhotosToblogComponent,
    SignupComponent,
    AccountComponent,
    LandingPageComponent,
  ],
  imports: [
    BrowserModule,
    routing,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    SharedModule,
    ServiceWorkerModule.register('ngsw-worker.js', { enabled: environment.production })

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
  exports: [],
  bootstrap: [AppComponent]
})
export class AppModule { }

