import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuardService } from 'src/app/shared/services/auth-guard/auth-guard.service';
import { SharedModule } from 'src/app/sharedModule/shared/shared.module';
import { MerchantHomeComponent } from './merchant-home/merchant-home.component';
import { MerchantOrdersComponent } from './merchant-orders/merchant-orders.component';
import { MerchantPendingPaymentComponent } from './merchant-pending-payment/merchant-pending-payment.component';
import { MerchantTodayTotalComponent } from './merchant-today-total/merchant-today-total.component';
import { CalculatorComponent } from 'src/app/components/calculator/calculator.component';
import { LazyLoadImageModule } from 'ng-lazyload-image';

const routes: Routes = [

  {
    path: "",
    pathMatch: "full",
    component: MerchantHomeComponent,
    canActivate: [AuthGuardService],
  },
  {
    path: "orders",
    pathMatch: "full",
    component: MerchantOrdersComponent,
    // canActivate: [AuthGuardService],
  },
  {
    path: "payment",
    pathMatch: "full",
    component: MerchantPendingPaymentComponent,
    // canActivate: [AuthGuardService],
  },
  {
    path: "today",
    pathMatch: "full",
    component: MerchantTodayTotalComponent,
    // canActivate: [AuthGuardService],
  },
  {
    path: "calc",
    pathMatch: "full",
    component: CalculatorComponent
  }
];

@NgModule({
  declarations: [
    MerchantHomeComponent,
    MerchantOrdersComponent,
    MerchantPendingPaymentComponent,
    MerchantTodayTotalComponent,
    CalculatorComponent
  ],
  imports: [
    CommonModule,

    // ItemListComponent,
    // ItemsInListComponent,
    // ProductSearchComponent,
    SharedModule,
    LazyLoadImageModule,
    RouterModule.forChild(routes)
  ]
})
export class MerchantModule { }
