import { HttpClient } from "@angular/common/http";
import { ArrayType } from "@angular/compiler";
import { Component, OnInit } from "@angular/core";
import { Router } from "@angular/router";
import { State, StateNames } from "src/app/schemas/componentStateSchema";
import { ItemSchema } from "src/app/schemas/ItemSchema";
import { ComponentStateService } from "src/app/services/component-state.service";

class PAYMENT_TYPE_RESPONCE {
  CARD = {
    appId: "46214749ea974b6ff04be5d9741264",
    card_cvv: "123",
    card_expiryMonth: "04",
    card_expiryYear: "2023",
    card_holder: "a",
    card_number: "4444333322221111",
    customerEmail: "a@a.com",
    customerName: "a",
    customerPhone: "1234512345",
    notifyUrl: "",
    orderAmount: "2",
    orderCurrency: "INR",
    orderId: "5147",
    paymentOption: "card",
    paymentToken: "q/LW7lc8MMKqyQNMih9P9Q7gB3t3TLwfudKO5rkMgjI=",
    source: "sdk-transparent",
  };

  upi = {};

  netBanking = {};
  walet = {};
}

@Component({
  selector: "app-chart",
  templateUrl: "./chart.component.html",
  styleUrls: ["./chart.component.css"],
})
export class ChartComponent implements OnInit {
  dummylist: ItemSchema[];
  state: any;
  addToCartState: string = "addToCart";

  constructor(
    private component̥StateService: ComponentStateService,
    private http: HttpClient,
    private route: Router
  ) {}

  ngAfterViewInit() {
    // this.dummylist = this.retriveItemFromLocalStore();
  }

  ngOnInit() {}
  ngDoCheck() {
    // this.dummylist = this.retriveItemFromLocalStore();
    this.state = this.component̥StateService.getStateByStateName(
      this.addToCartState
    ) as State;
    try {
      this.dummylist = this.state
        ? this.state.value
        : this.retriveItemFromLocalStore("cartValue");
    } catch (e) {
      console.error("JSon parse failed");
      this.dummylist = [];
    }
  }

  retriveItemFromLocalStore(id): any[] {
    let lastValue = localStorage.getItem(id);
    if (lastValue && lastValue.length > 0) {
      try {
        return JSON.parse(localStorage.getItem(id));
      } catch (e) {
        console.error("JSon parse failed");
        return this.dummylist;
      }
    }
    return this.dummylist;
  }

  mergeCartValue(oldCart, newCart, coppyAll?: true): any[] {
    let oldCartMap = new Map<number, any>();
    let newCartMap = new Map<number, any>();
    let mergeCart = [];
    // if (oldCart.length > newCart.length) {

    // }
    // else {

    // }

    if (coppyAll) {
      oldCart.forEach((item: ItemSchema) => {
        newCartMap.set(item.itemCode, item);
      });
      newCart.forEach((item: ItemSchema) => {
        if (!oldCartMap.get(item.itemCode)) oldCartMap.set(item.itemCode, item);
      });
      console.log(typeof oldCartMap.entries());
      return Array.from(oldCartMap.values());
    }
  }

  clearCurrentCart() {
    let newCart = new State(StateNames.addToCart, []);
    this.component̥StateService.setState(newCart);
  }

  initiatePayment(orderDetails) {}
}
