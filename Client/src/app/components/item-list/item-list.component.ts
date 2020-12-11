import { Component, OnInit } from "@angular/core";
import { ItemSchema } from "src/app/schemas/ItemSchema";

@Component({
  selector: "item-list",
  templateUrl: "./item-list.component.html",
  styleUrls: ["./item-list.component.css"],
})
export class ItemListComponent implements OnInit {
  dummylist: ItemSchema[];

  constructor() {
    this.dummylist = [];
    this.dummylist.push(
      new ItemSchema({
        name: "kent Ro Purifier Mineral RO water Purifier",
        price: { newPrice: 9000, oldPrice: 12000 },
        discp: "Minaral RO water Purifier",
        varients: ["RO", "Ro + UV "],
        rating: { value: "4.2", totalCount: "200" },
        image:
          "https://www.bigbasket.com/media/uploads/p/m/40018854_4-himalaya-purifying-neem-face-wash.jpg",
        brand: "Kent",
      })
    );

    this.dummylist.push(
      new ItemSchema({
        name:
          "Dabur Gulabari Premium Rose Water - Paraben Free Skin Toner, 250 ml",
        price: { newPrice: 120, oldPrice: 130 },
        discp: "Minaral RO water Purifier",
        varients: ["RO", "Ro + UV "],
        rating: { value: "4.0", totalCount: "50" },
        image:
          "https://www.bigbasket.com/media/uploads/p/m/40018854_4-himalaya-purifying-neem-face-wash.jpg",
        brand: "Kent",
      })
    );

    this.dummylist.push(
      new ItemSchema({
        name: "Patanjali Saundarya Aloe Vera Gel, 150 ml",
        price: { newPrice: 78, oldPrice: 82 },
        discp: "Patanjali Saundarya Aloe Vera Gel, 150 ml",
        varients: ["RO", "Ro + UV "],
        rating: { value: "3.8", totalCount: "20" },
        image:
          "https://www.bigbasket.com/media/uploads/p/l/30002398_5-patanjali-saundarya-aloe-vera-gel.jpg",
        brand: "Kent",
      })
    );
    this.dummylist.push(
      new ItemSchema({
        name: "Soulflower Cold Pressed Olive Oil, 225",
        price: { newPrice: 210, oldPrice: 220 },
        discp: "Soulflower Cold Pressed Olive Oil",
        varients: ["RO", "Ro + UV "],
        rating: { value: "4.2", totalCount: "40" },
        image:
          "https://www.bigbasket.com/media/uploads/p/m/40018854_4-himalaya-purifying-neem-face-wash.jpg",
        brand: "Kent",
      })
    );
    this.dummylist.push(
      new ItemSchema({
        name: "New kent Ro Purifier Mineral RO water Purifier",
        price: { newPrice: 8000, oldPrice: 12000 },
        discp: "Minaral RO water Purifier",
        varients: ["RO", "Ro + UV "],
        rating: "",
        image:
          "https://www.bigbasket.com/media/uploads/p/m/30006521_5-soulflower-cold-pressed-olive-oil.jpg",
        brand: "Kent",
      })
    );
  }

  ngOnInit() {}
}
