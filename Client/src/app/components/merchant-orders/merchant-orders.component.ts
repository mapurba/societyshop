import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { ItemSchema } from 'src/app/schemas/ItemSchema';

@Component({
  selector: 'app-merchant-orders',
  templateUrl: './merchant-orders.component.html',
  styleUrls: ['./merchant-orders.component.css']
})
export class MerchantOrdersComponent implements OnInit {

  orders: any[] = [];

  orderItems: ItemSchema[] = [];

  showOverlay = false;
  constructor(private http: HttpClient) { }

  ngOnInit() {
    this.getMyOrders();
  }


  openConfirmation(item: ItemSchema[]) {
    this.showOverlay = true;
    this.orderItems = item;
    console.log(this.orderItems);
  }

  prevent(event) {
    event.stopPropagation();
  }
  hideOverlay(event) {
    this.showOverlay = !this.showOverlay;
  }

  getMyOrders() {
    this.http.get("/api/orders/list").subscribe((orders: any) => {
      this.orders = orders.data;
    });
  }

}
