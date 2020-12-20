import { Component, Input, OnInit } from "@angular/core";
import { ItemSchema } from "src/app/schemas/ItemSchema";
import { ItemsService } from "src/app/services/items.service";

@Component({
  selector: "item-list",
  templateUrl: "./item-list.component.html",
  styleUrls: ["./item-list.component.css"],
})
export class ItemListComponent implements OnInit {
  dummylist: ItemSchema[];
  _list: any[];

  @Input("list") setlist(val) {
    setTimeout(() => {
      this._list = val;
    }, 700);
  }

  get list() {
    return this._list;
  }
  set list(val) {
    this._list = val;
  }
  constructor(private itemService: ItemsService) {
    this._list = [];
    this._list.push(
      new ItemSchema({
        name: "",
        price: "" /*  { new: 9000, old: 12000 } */,
        discp: "",
        varients: "" /* ["RO", "Ro + UV "] */,
        rating: "" /*  { value: "4.2", totalCount: "200" }, */,
        image:
          "" /* "https://www.bigbasket.com/media/uploads/p/m/40018854_4-himalaya-purifying-neem-face-wash.jpg", */,
        brand: "",
      })
    );
  }

  getAllItem() {
    this.itemService.getAllItems({}).subscribe((res) => {
      this._list = res;
    });
  }

  ngOnInit() {
    this.getAllItem();
  }
}
