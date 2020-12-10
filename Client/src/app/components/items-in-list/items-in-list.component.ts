import { Component, Input, OnInit } from '@angular/core';
import { ItemSchema, Price } from 'src/app/schemas/ItemSchema';



@Component({
  selector: 'items-in-list',
  templateUrl: './items-in-list.component.html',
  styleUrls: ['./items-in-list.component.css']
})
export class ItemsInListComponent implements OnInit {

  @Input("item") item: ItemSchema;
  constructor() {
  }

  ngOnInit() {
  }

}
