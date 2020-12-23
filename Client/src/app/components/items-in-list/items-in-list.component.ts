import { Component, Inject, Input, OnInit } from "@angular/core";
import { State, StateNames } from "src/app/schemas/componentStateSchema";
import {
  ItemSchema,
  Price,
  retriveItemFromLocalStore,
} from "src/app/schemas/ItemSchema";
import { ComponentStateService } from "src/app/services/component-state.service";

@Component({
  selector: "items-in-list",
  templateUrl: "./items-in-list.component.html",
  styleUrls: ["./items-in-list.component.css"],
})
export class ItemsInListComponent implements OnInit {
  @Input("item") item: ItemSchema;
  @Input("addMore") addMoreQuatity;
  @Input("id") id: string;
  @Input("disabled") disableAdd?: boolean = false; //only enable it in the end user mode
  stateName: string = "addToCart";

  @Input("viewOnly") viewOnly: boolean = false;
  constructor(
    private componentStateService: ComponentStateService,
  ) { }

  ngOnInit() {
    // console.log(this.item);
  }

  //state create update
  addToCart(item: ItemSchema) {
    // item.quantity = 1;
    item.quantity = item.quantity == 0 ? 1 : ++item.quantity;
    this.item = item;
    if (this.componentStateService.getStateByStateName(StateNames.addToCart)) {
      let cart = this.componentStateService.getStateByStateName(
        StateNames.addToCart
      ) as State;
      /////
      // item.quantity++;

      const newitem = Object.assign({}, item);
      cart.value.push(newitem);
      console.log("###$$%", newitem);

      // ...this..
      let newState = new State(StateNames.addToCart, cart.value);
      this.componentStateService.setState(newState);
    } else {
      //creating empty state is not exist in the datastore
      //right time to add the items of local storage to the datastore

      let newState = new State(StateNames.addToCart, [
        ...retriveItemFromLocalStore("cartValue"),
        item,
      ]);
      this.componentStateService.setState(newState);
    }
  }

  removeOneItem(item: ItemSchema) {
    this.item.quantity--;
    // updatestate()
  }

}