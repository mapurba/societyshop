import { Component, Input, OnInit } from '@angular/core';
import { State } from 'src/app/schemas/componentStateSchema';
import { ItemSchema, Price } from 'src/app/schemas/ItemSchema';
import { ComponentStateService } from 'src/app/services/component-state.service';



@Component({
  selector: 'items-in-list',
  templateUrl: './items-in-list.component.html',
  styleUrls: ['./items-in-list.component.css']
})
export class ItemsInListComponent implements OnInit {

  @Input("item") item: ItemSchema;
  @Input("addMore") addMoreQuatity;

  stateName:string = "addToCart";
  constructor(private componentStateService:ComponentStateService) {
  }

  ngOnInit() {

  }


  addToCart(item:ItemSchema){
   if(this.componentStateService.getStateByStateName(this.stateName)){
      let cart =  this.componentStateService.getStateByStateName(this.stateName) as State;
      cart.value.push(item);
      let newState = new State(this.stateName,cart.value)
      this.componentStateService.setState(newState);
   } else{

    let newState = new State(this.stateName,[item])
    this.componentStateService.setState(newState);
   }
  }

  // increase the quantaity amount 

}
