import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { State, StateDB, StateNames } from "../schemas/componentStateSchema";





@Injectable({
  providedIn: "root",
})
export class ComponentStateService {
  allStates: StateDB;
  subject: Subject<State> = new Subject<State>();
  constructor() {
    this.allStates = new StateDB("component-data-state");
    this.subject.subscribe((changes) => {
      console.log({ upated: changes });
    });

    this.allStates.onStateChange(" ").subscribe((res) => {
      console.log({ "state ": res });
      this.subject.next(res);
    });
  }

  setState(newState: State) {
    this.allStates.setState(newState);
  }

  updateUserSessionByPropsName(stateName: StateNames, value: any) {
    let newState = new State(StateNames.UserSession, value);
    this.setState(newState);
  }

  getStateByStateName(stateName: string): any {
    return this.allStates.getState(stateName) || null;
  }

  onStateChange(
    stateName = StateNames.None
  ): Subject<{ id: string; value: Map<string, State> }> {
    return this.allStates.onStateChange(stateName);
  }
}
