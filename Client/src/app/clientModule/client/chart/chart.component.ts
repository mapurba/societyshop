import { HttpClient } from "@angular/common/http";
import { ArrayType } from "@angular/compiler";
import { Component, OnInit } from "@angular/core";
import { Router } from "@angular/router";
import { State, StateNames } from "src/app/schemas/componentStateSchema";
import { ItemSchema, retriveItemFromLocalStore } from "src/app/schemas/ItemSchema";
import { ComponentStateService } from "src/app/services/component-state.service";



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
  ) {
    this.dummylist = [];
  }

  ngAfterViewInit() {
    // this.dummylist = this.retriveItemFromLocalStore();
  }

  ngOnInit() {
    this.dummylist = [];

    this.component̥StateService
      .onStateChange(StateNames.OpenSearchBoxState)
      .subscribe((res) => {

        if (res.id === StateNames.addToCart) {
          let userCart = res.value.get(StateNames.addToCart);
          // this.loggedInUserDetails = userDetail.value.user;
          // this.dummylist = userCart.value || retriveItemFromLocalStore("cartValue");
          // console.log('cart changed.');
          let cartItems = new Map(retriveItemFromLocalStore("cartValue"));
          this.dummylist = [];
          cartItems.forEach((value: any, key) => {
            this.dummylist.push(value);
          });
        }


      });

    // this.dummylist = || [];
    let cartItems = new Map(retriveItemFromLocalStore("cartValue"));
    cartItems.forEach((value: any, key) => {
      this.dummylist.push(value);
    });



  }
  ngDoCheck() {
    // this.dummylist = this.retriveItemFromLocalStore();
    // this.state = this.component̥StateService.getStateByStateName(
    //   this.addToCartState
    // ) as State;
    // try {
    //   this.dummylist = this.state
    //     ? this.state.value
    //     : this.retriveItemFromLocalStore("cartValue");
    // } catch (e) {
    //   console.error("JSon parse failed");
    //   this.dummylist = [];
    // }
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
      // console.log(typeof oldCartMap.entries());
      return Array.from(oldCartMap.values());
    }
  }

  clearCurrentCart() {
    let newCart = new State(StateNames.addToCart, []);
    this.component̥StateService.setState(newCart);
    this.dummylist = [];
  }

  initiatePayment(orderDetails) { }


  ngDestroy() {
    this.component̥StateService
      .onStateChange().unsubscribe();
  }
}

