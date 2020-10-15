import { FeedComponent } from "./feed/feed.component";
import { Routes, RouterModule } from '@angular/router'
import { ProfileComponent } from "./profile/profile.component";
import { BlogComponent } from "./blog/blog.component";
import { AdminConsoleComponent } from "./admin/admin-console/admin-console.component";
import { PrivacyComponent } from "./privacy/privacy.component";
import { AccountComponent } from "./account/account.component";
import { SignupComponent } from "./signup/signup.component";

const appRoutes: Routes = [
    { path: '', component: FeedComponent },
    { path: 'feed', component: FeedComponent },
    { path: 'profile', component: ProfileComponent },
    { path: 'blog', children:[
        {path:':id',component:BlogComponent},
        {path:'',component:BlogComponent}
    ] },
    { path: 'account', component: AccountComponent },
    { path: 'signup', component: SignupComponent },
    // { path: 'blog', component: BlogComponent },
    { path: 'privacy', component: PrivacyComponent },
    {
        path: 'admin',
        children: [
            { path: '', component: AdminConsoleComponent }
        ]
    },

    { path: '**', redirectTo: '' }
];

export const routing = RouterModule.forRoot(appRoutes);