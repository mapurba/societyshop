import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { SharedModule } from 'src/app/sharedModule/shared/shared.module';
import { ChartComponent } from './chart/chart.component';
import { FeedComponent } from './feed/feed.component';
import { PaymentComponent } from 'src/app/sharedModule/shared/payment/payment.component';
import { SubscribeMerchantComponent } from './subscribe-merchant/subscribe-merchant.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { LazyLoadImageModule } from 'ng-lazyload-image';
import { CategoryComponent } from 'src/app/sharedModule/shared/category/category.component';


const routes: Routes = [
  {
    path: "",
    pathMatch: "full",
    component: FeedComponent,

  },
  {
    path: "categ",
    pathMatch: "full",
    component: CategoryComponent,

  },

  {
    path: "cart",
    pathMatch: "full",
    component: ChartComponent,

  },
  {
    path: "payment",
    pathMatch: "full",
    component: PaymentComponent,

  }

];
const clientRoutes = RouterModule.forChild(routes);


@NgModule({
  declarations: [
    FeedComponent,
    ChartComponent,
    SubscribeMerchantComponent,
  ],
  imports: [
    CommonModule,
    clientRoutes,
    SharedModule,
    FormsModule,
    LazyLoadImageModule,
    ReactiveFormsModule,

  ]
})

export class ClientModule { }
