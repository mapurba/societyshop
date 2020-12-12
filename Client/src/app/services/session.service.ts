import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import {
  State,
  StateNames,
  UserSession,
} from "../schemas/componentStateSchema";
import { UserService } from "../shared/services/user.service";
import { ComponentStateService } from "./component-state.service";

@Injectable({
  providedIn: "root",
})
export class SessionService {
  // stateName = "cartValue";
  constructor(
    private componentStateService: ComponentStateService,
    private http: HttpClient
  ) {}

  updateUserSession(userSession: UserSession) {
    if (
      this.componentStateService.getStateByStateName(StateNames.UserSession)
    ) {
      let cart = this.componentStateService.getStateByStateName(
        StateNames.UserSession
      ) as State;
      cart.value = userSession;
      let newState = new State(StateNames.UserSession, cart.value);
      this.componentStateService.setState(newState);
    } else {
      //creating empty state is not exist in the datastore
      //right time to add the items of local storage to the datastore

      let newState = new State(
        StateNames.UserSession,
        // ...this.retriveItemFromLocalStore("cartValue"),
        userSession
      );
      this.componentStateService.setState(newState);
    }
  }

  updateStateTodb(currentState: UserSession) {
    this.http
      .post("/api/user/session", { data: JSON.stringify(currentState) })
      .subscribe(
        (done) => {
          console.info("...state updated");
        },
        (err) => {
          console.info("!..unable to save state");
        }
      );
  }
}
