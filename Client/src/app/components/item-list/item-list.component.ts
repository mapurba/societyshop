import { Component, OnInit } from '@angular/core';
import { ItemSchema } from 'src/app/schemas/ItemSchema';

@Component({
  selector: 'item-list',
  templateUrl: './item-list.component.html',
  styleUrls: ['./item-list.component.css']
})
export class ItemListComponent implements OnInit {


  dummylist[]: ItemSchema;
  
  constructor() {

    this.dummylist = [];
    this.dummylist.push(
      new ItemSchema({ name: "kent Ro Purifier Mineral RO water Purifier", price: { newPrice: 9000, oldPrice: 12000 }, discp: "Minaral RO water Purifier", varients: ['RO', 'Ro + UV '], rating: '', image: "", brand: "Kent" })
    )

    this.dummylist.push(
      new ItemSchema({ name: "New kent Ro Purifier Mineral RO water Purifier", price: { newPrice: 8000, oldPrice: 12000 }, discp: "Minaral RO water Purifier", varients: ['RO', 'Ro + UV '], rating: '', image: "", brand: "Kent" })
    )
  }

  ngOnInit() {
  }

}
