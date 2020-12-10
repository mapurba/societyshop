import {FeedComponent} from "./feed/feed.component";
import {RouterModule, Routes} from '@angular/router'
import {ProfileComponent} from "./profile/profile.component";
import {BlogComponent} from "./blog/blog.component";
import {AdminConsoleComponent} from "./admin/admin-console/admin-console.component";
import {PrivacyComponent} from "./privacy/privacy.component";
import {AccountComponent} from "./account/account.component";
import {SignupComponent} from "./signup/signup.component";
import { LandingPageComponent } from "./components/landing-page/landing-page.component";

const appRoutes: Routes = [
  {path: '', pathMatch: 'full', component: FeedComponent},
  {path: 'admin', pathMatch: 'full', component: AdminConsoleComponent},
  {path: 'land', pathMatch: 'full', component: LandingPageComponent},
  {path: 'feed', pathMatch: 'full', component: FeedComponent},
  {path: 'profile', pathMatch: 'full', component: ProfileComponent},
  {
    path: 'blog', pathMatch: 'full', children: [
      {path: ':id', component: BlogComponent},
      {path: '', component: BlogComponent}
    ]
  },
  {path: 'account', pathMatch: 'full', component: AccountComponent},
  {path: 'signup', pathMatch: 'full', component: SignupComponent},
  {path: 'privacy', pathMatch: 'full', component: PrivacyComponent},

  {path: '**', redirectTo: ''}
];

export const routing = RouterModule.forRoot(appRoutes);
