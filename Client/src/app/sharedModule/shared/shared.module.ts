import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SanitizemePipe } from 'src/app/pipes/sanitizeme.pipe';
import { ItemsInListComponent } from './items-in-list/items-in-list.component';
import { ItemListComponent } from './item-list/item-list.component';
import { PaymentComponent } from './payment/payment.component';
import { ProductSearchComponent } from './product-search/product-search.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { LazyLoadImageModule } from 'ng-lazyload-image';
import { CategoryComponent } from './category/category.component';



@NgModule({
  declarations: [
    SanitizemePipe,
    ItemsInListComponent,
    ItemListComponent,
    ProductSearchComponent,
    PaymentComponent,
    CategoryComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    LazyLoadImageModule,

  ],
  exports: [
    ItemsInListComponent,
    ItemListComponent,
    ProductSearchComponent,
    PaymentComponent,
    CategoryComponent
  ]
})
export class SharedModule { }
