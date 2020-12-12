import { ArrayType } from "@angular/compiler";
import { Component, OnInit } from "@angular/core";
import { State } from "src/app/schemas/componentStateSchema";
import { ItemSchema } from "src/app/schemas/ItemSchema";
import { ComponentStateService } from "src/app/services/component-state.service";

@Component({
  selector: "app-chart",
  templateUrl: "./chart.component.html",
  styleUrls: ["./chart.component.css"],
})
export class ChartComponent implements OnInit {
  dummylist: ItemSchema[];

  addToCartState: string = "addToCart";

  constructor(private component̥StateService: ComponentStateService) {
   
  }

  ngAfterViewInit() {
    // this.dummylist = this.retriveItemFromLocalStore();
  }

  ngOnInit() {
  }
  ngDoCheck() {
    // this.dummylist = this.retriveItemFromLocalStore();
    const state = this.component̥StateService.getStateByStateName(
      this.addToCartState
    ) as State;
    this.dummylist = state
      ? state.value
      : this.retriveItemFromLocalStore("cartValue");
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
}
