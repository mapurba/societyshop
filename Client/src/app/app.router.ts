import { RouterModule, Routes } from "@angular/router";
import { LandingPageComponent } from "./components/landing-page/landing-page.component";
// import { AddItemsComponent } from "./components/add-items/add-items.component";
import { AuthGuardService } from "./shared/services/auth-guard/auth-guard.service";
import { AccountComponent } from "./components/account/account.component";
// import { BlogComponent } from "./components/blog/blog.component";
import { PrivacyComponent } from "./components/privacy/privacy.component";
import { ProfileComponent } from "./components/profile/profile.component";
import { SignupComponent } from "./components/signup/signup.component";

// important need to complete lazy loading of the routes

const appRoutes: Routes = [
  {
    path: "",
    pathMatch: "full",
    component: LandingPageComponent,
  },
  // {
  //   path: "sellerList",
  //   pathMatch: "full",
  //   component: SubscribeMerchantComponent,
  // },
  // {
  //   path: "admin",
  //   pathMatch: "full",
  //   component: AdminConsoleComponent,
  //   canActivate: [AuthGuardService],
  // },
  // {
  //   path: "add-items",
  //   pathMatch: "full",
  //   component: AddItemsComponent,
  //   canActivate: [],
  // },
  {
    path: "profile",
    pathMatch: "full",
    component: ProfileComponent,
  },
  {
    path: "my",
    loadChildren: './clientModule/client/client.module#ClientModule',
    canActivate: [AuthGuardService],
  },
  {
    path: "merchant",
    loadChildren: './merchantModule/merchant/merchant.module#MerchantModule',
    canActivate: [AuthGuardService],
  },
  // {
  //   path: "blog",
  //   pathMatch: "full",
  //   children: [
  //     { path: ":id", component: BlogComponent },
  //     { path: "", component: BlogComponent },
  //   ],
  // },
  { path: "account", pathMatch: "full", component: AccountComponent },
  { path: "signup", pathMatch: "full", component: SignupComponent },
  { path: "privacy", pathMatch: "full", component: PrivacyComponent },

  { path: "**", redirectTo: "" },
];

export const routing = RouterModule.forRoot(appRoutes);
