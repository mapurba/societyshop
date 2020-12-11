import { Component, OnInit } from "@angular/core";
import { State } from "src/app/schemas/componentStateSchema";
import { ItemSchema } from "src/app/schemas/ItemSchema";
import { ComponentStateService } from "src/app/services/component-state.service";

@Component({
  selector: "app-chart",
  templateUrl: "./chart.component.html",
  styleUrls: ["./chart.component.css"],
})
export class ChartComponent implements OnInit {
  dummylist: ItemSchema[];

  addToCartState: string = "addToCart";

  constructor(private component̥StateService: ComponentStateService) {}

  ngAfterViewInit() {}

  ngOnInit() {
    const state = this.component̥StateService.getStateByStateName(
      this.addToCartState
    ) as State;
    this.dummylist = state ? state.value : [];
  }
}
