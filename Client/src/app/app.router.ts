import { FeedComponent } from "./feed/feed.component";
import { RouterModule, Routes } from "@angular/router";
import { ProfileComponent } from "./profile/profile.component";
import { BlogComponent } from "./blog/blog.component";
import { AdminConsoleComponent } from "./admin/admin-console/admin-console.component";
import { PrivacyComponent } from "./privacy/privacy.component";
import { AccountComponent } from "./account/account.component";
import { SignupComponent } from "./signup/signup.component";
import { LandingPageComponent } from "./components/landing-page/landing-page.component";
import { ChartComponent } from "./components/chart/chart.component";
import { AddItemsComponent } from "./components/add-items/add-items.component";
import { PaymentComponent } from "./components/payment/payment.component";
import { AuthGuardService } from "./shared/services/auth-guard/auth-guard.service";
import { MerchantHomeComponent } from "./components/merchant-home/merchant-home.component";
import { MerchantOrdersComponent } from "./components/merchant-orders/merchant-orders.component";
import { MerchantTodayTotalComponent } from "./components/merchant-today-total/merchant-today-total.component";
import { MerchantPendingPaymentComponent } from "./components/merchant-pending-payment/merchant-pending-payment.component";

// important need to complete lazy loading of the routes

const appRoutes: Routes = [
  {
    path: "",
    pathMatch: "full",
    component: LandingPageComponent,
  },
  {
    path: "admin",
    pathMatch: "full",
    component: AdminConsoleComponent,
    canActivate: [AuthGuardService],
  },
  {
    path: "land",
    pathMatch: "full",
    component: LandingPageComponent,
    canActivate: [AuthGuardService],
  },
  {
    path: "list",
    pathMatch: "full",
    component: FeedComponent,
    canActivate: [],
  },
  {
    path: "cart",
    pathMatch: "full",
    component: ChartComponent,
    canActivate: [],
  },
  {
    path: "add-items",
    pathMatch: "full",
    component: AddItemsComponent,
    canActivate: [],
  },
  {
    path: "profile",
    pathMatch: "full",
    component: ProfileComponent,
  },
  { path: "payment", pathMatch: "full", component: PaymentComponent },
  {
    path: "merchant",
    pathMatch: "full",
    component: AddItemsComponent,
    canActivate: [AuthGuardService],
  },
  {
    path: "merchantOrder",
    pathMatch: "full",
    component: MerchantOrdersComponent,
    canActivate: [AuthGuardService],
  },
  {
    path: "merchantPendingPayment",
    pathMatch: "full",
    component: MerchantPendingPaymentComponent,
    canActivate: [AuthGuardService],
  },
  {
    path: "merchantTodayTotal",
    pathMatch: "full",
    component: MerchantTodayTotalComponent,
    canActivate: [AuthGuardService],
  },
  {
    path: "merchantHome",
    pathMatch: "full",
    component: MerchantHomeComponent,
    canActivate: [AuthGuardService],
  },
  {
    path: "blog",
    pathMatch: "full",
    children: [
      { path: ":id", component: BlogComponent },
      { path: "", component: BlogComponent },
    ],
  },
  { path: "account", pathMatch: "full", component: AccountComponent },
  { path: "signup", pathMatch: "full", component: SignupComponent },
  { path: "privacy", pathMatch: "full", component: PrivacyComponent },

  { path: "**", redirectTo: "" },
];

export const routing = RouterModule.forRoot(appRoutes);
