import { Component, OnInit } from "@angular/core";
import { FormControl, FormGroup, Validators } from "@angular/forms";
import { mainModule } from "process";

@Component({
  selector: "app-merchant-home",
  templateUrl: "./merchant-home.component.html",
  styleUrls: ["./merchant-home.component.css"],
})
export class MerchantHomeComponent implements OnInit {
  _list: any;

  newInventoryItem: any;

  inventoryForm: FormGroup;

  hideOverLay: boolean = false;

  isSubmited: boolean = false;

  constructor() {

  }

  ngOnInit() { }

  populateItemList(data) {
    this._list = data;
    console.log(this._list);
  }

  hideOverlay(event) {
    // event.p
    this.hideOverLay = false;
    console.log(event);
  }
  openConfirmation(item) {
    this.hideOverLay = true;
    this.newInventoryItem = item;
    console.log(item)
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
    console.log(this.inventoryForm);
    // this.inventoryForm.disabled = true;
    this.isSubmited = true;
    if (this.inventoryForm.get("quantity").value) {
      this.newInventoryItem.quantity = this.inventoryForm.get("quantity").value;
      this.newInventoryItem.price.new = this.inventoryForm.get("pricePerQuantity").value;
      console.log(this.newInventoryItem);
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
