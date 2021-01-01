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
    const cartValue = retriveItemFromLocalStore("cartValue");
    if (cartValue.length > 0) {
      let map = new Map(cartValue);
      let tit: any = map.get(this.item.itemCode.toString());
      if (tit) {
        this.item.quantity = tit.quantity;
        console.log('merged with cart items.');
     }
    }
  }

  //state create update
  addToCart(item: ItemSchema, inc?: number) {
    const cartValue = retriveItemFromLocalStore("cartValue");



    if (cartValue.length <= 0) {
      let newCart = new Map<string, any>();
      item.quantity++;
      newCart.set(item.itemCode.toString(), item);
      this.item.quantity = item.quantity;
      localStorage.setItem("cartValue", JSON.stringify(Array.from(newCart.entries())));
      let cartState = new State(StateNames.addToCart, JSON.stringify(Array.from(newCart.entries())));
      this.componentStateService.setState(cartState);
      return;
    }
    else {
      let map = new Map(cartValue);
      let tit: any = map.get(item.itemCode.toString());
      if (tit) {
        tit.quantity += inc;
        this.item.quantity = tit.quantity;
        if (tit.quantity == 0) {
          map.delete(tit.itemCode.toString()); 
        } else {
          map.set(item.itemCode.toString(), tit);
        }
        
      } else {
        item.quantity++;
        map.set(item.itemCode.toString(), item);
      }


      localStorage.setItem("cartValue", JSON.stringify(Array.from(map.entries())));

      let cartState = new State(StateNames.addToCart, JSON.stringify(Array.from(map.entries())));
      this.componentStateService.setState(cartState);
      return;
    }


  }


}