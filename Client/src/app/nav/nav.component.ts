import { Component, OnInit } from "@angular/core";
import { Router } from "@angular/router";
import { State, StateNames, UserSession } from "../schemas/componentStateSchema";
import { ItemSchema, retriveItemFromLocalStore } from "../schemas/ItemSchema";
import { ComponentStateService } from "../services/component-state.service";
import { SessionService } from "../services/session.service";
import { UserService } from "../shared/services/user.service";

@Component({
  selector: "app-nav",
  templateUrl: "./nav.component.html",
  styleUrls: ["./nav.component.css"],
})
export class NavComponent implements OnInit {
  loggedInUserDetails: any;
  userLoggedin: boolean = false;
  loadingUser: boolean = true;
  public hideProfileDropDown: boolean = true;
  constructor(
    private userService: UserService,
    public route: Router,
    private componentStateService: ComponentStateService,
    private sessionService: SessionService
  ) {}

  ngOnInit() {
    this.getUserDetail();
  }

  public isloggedin() {
    // console.log(this.userService.isLogedinUser());
    return this.userService.isLogedinUser();
  }

  // updateSessionStateByProperty(propsName, value: any) {
  //   let session = new UserSession();
  //   session[propsName] = value;
  //   this.sessionService.updateUserSession(session);
  // }

  getUserDetail() {
    this.loadingUser = true;
    this.userService.getUserDetailV2().subscribe(
      (res) => {
        this.loadingUser = false;
        this.userLoggedin = true;
        this.loggedInUserDetails = res.user;
        this.userService.getUserDetailV3(res.user);
        this.UpdateCartfromSession(res.user.session["cartValue"]);
      },
      (err) => {
        this.loadingUser = false;
        this.userLoggedin = false;
      }
    );
  }

  UpdateCartfromSession(itemsOfCart: ItemSchema[]) {
    if (this.componentStateService.getStateByStateName(StateNames.addToCart)) {
      let cart = this.componentStateService.getStateByStateName(
        StateNames.addToCart
      ) as State;
      cart.value.push(itemsOfCart);
      let newState = new State(StateNames.addToCart, cart.value);
      this.componentStateService.setState(newState);
    } else {
      //creating empty state is not exist in the datastore
      //right time to add the items of local storage to the datastore

      let newState = new State(StateNames.addToCart, [
        // ...retriveItemFromLocalStore("cartValue"),//do we need this here ???
        ...itemsOfCart,
      ]);
      this.componentStateService.setState(newState);
    }
  }
}
