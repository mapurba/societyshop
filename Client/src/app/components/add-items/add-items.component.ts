import { Component, Input, OnInit } from "@angular/core";
import { FormControl, FormGroup, Validators } from "@angular/forms";
import { DummyItem, ItemSchema } from "src/app/schemas/ItemSchema";
import { ItemsService } from "src/app/services/items.service";

@Component({
  selector: "app-add-items",
  templateUrl: "./add-items.component.html",
  styleUrls: ["./add-items.component.css"],
})
export class AddItemsComponent implements OnInit {
  _list: any[];
  createItemForm: FormGroup;
  showCreate: boolean = false;
  @Input("list") setlist(val) {
    this._list = val;
  }

  get list() {
    return this._list;
  }
  set list(val) {
    this._list = val;
  }
  constructor(private itemService: ItemsService) {
    this.createItemForm = new FormGroup({
      name: new FormControl("", [Validators.required]),
      discp: new FormControl("", [Validators.required]),
      price: new FormControl("", [Validators.required]),
      brand: new FormControl("", [Validators.required]),
      varient: new FormControl("", [Validators.required]),
      image: new FormControl("", [Validators.required]),
    });
  }

  ngOnInit() {
    this.getAllItem();
  }

  getAllItem() {
    this.itemService.getAllItems({}).subscribe((res) => {
      this._list = res;
    });
  }
  addNewItem(item: ItemSchema) {
    this.itemService.addNewItem(item).subscribe((res) => {
      let addedItem = res;
      console.log({ "items aded ": addedItem });
      this.getAllItem();
    });
  }

  ngOnDestory() {
    // this.itemService.addNewIt
  }
  toggeladd() {
    // this.addNewItem(DummyItem);
    this.showCreate = !this.showCreate;
  }
  createItem() {
    console.log(this.createItemForm.controls);
  }
  prevent(event) {
    event.stopPropagation();
  }
}
