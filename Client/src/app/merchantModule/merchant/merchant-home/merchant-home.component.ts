import { HttpClient } from "@angular/common/http";
import { Component, OnInit } from "@angular/core";
import { FormControl, FormGroup, Validators } from "@angular/forms";
import { mainModule } from "process";
import { State, StateNames } from "src/app/schemas/componentStateSchema";
import { ItemSchema } from "src/app/schemas/ItemSchema";
import { ComponentStateService } from "src/app/services/component-state.service";
import { UserService } from "src/app/shared/services/user.service";

@Component({
  selector: "app-merchant-home",
  templateUrl: "./merchant-home.component.html",
  styleUrls: ["./merchant-home.component.css"],
})
export class MerchantHomeComponent implements OnInit {
  _list: any;

  newInventoryItem: ItemSchema;

  inventoryForm: FormGroup;

  hideOverLay: boolean = false;

  isSubmited: boolean = false;

  selectedIndex: number = 0;

  constructor(private http: HttpClient,
    private userService: UserService,
    private componentService: ComponentStateService

  ) {

  }

  ngOnInit() { }

  populateItemList(data) {
    this._list = data.data;
    // console.log(this._list);
    // need to merge the item
    let userDetail = this.componentService.getStateByStateName(StateNames.userDetail) as State;
    const inventory = userDetail.value.user.inventory;
    // console.log(inventory);
    this._list.forEach(element => {
      if (inventory[element.itemCode]) {
        let item: any = JSON.parse(inventory[element.itemCode]);
        element.quantity = item.quantity;
      }
    });

  }

  hideOverlay(event) {
    // event.p
    this.hideOverLay = false;
    // console.log(event);
  }
  openConfirmation(item: ItemSchema, id) {
    this.selectedIndex = id;
    this.hideOverLay = true;
    this.newInventoryItem = item;
    // console.log(item)
    this.inventoryForm = new FormGroup({
      quantity: new FormControl("1", Validators.required),
      pricePerQuantity: new FormControl(item.price.new, Validators.required)
    });
    this.isSubmited = false;

    this.inventoryForm.valueChanges.subscribe((res) => {
      this.isSubmited = false;
    })
  }

  addToInvontory() {
    this.isSubmited = true;
    if (this.inventoryForm.get("quantity").value) {
      this.newInventoryItem.quantity = parseInt(this.inventoryForm.get("quantity").value);
      this.newInventoryItem.price.new = this.inventoryForm.get("pricePerQuantity").value;
      let payLoad: ItemSchema = this.newInventoryItem;


      // payLoad = this.newInventoryItem;

      this.http.post("/api/user/merchant/addToInventory", payLoad).subscribe((res) => {
        this._list[this.selectedIndex].quantity = this.newInventoryItem.quantity;
      });
    }
  }

  prevent(event) {
    event.stopPropagation();
  }


  numSequence(n: number, inc) {
    let nn = [];
    for (let i = 5; i >= 1; --i) {
      nn.push(n + (i * inc));
    }
    return nn;
  }
}
