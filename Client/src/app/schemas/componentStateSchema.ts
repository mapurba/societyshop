import { Observable, Subject } from "rxjs";
import { debounceTime } from "rxjs/operators";
import { ItemSchema } from "./ItemSchema";

export class State {
  id: string;
  value: any;
  constructor(id: string, value: any) {
    this.id = id;
    this.value = value;
  }
}

export enum StateNames {
  None = " ",
  addToCart = "addToCart",
  UserSession = "UserSession",
  OpenSearchBoxState = "OpenSearchBoxState",
  userDetail = "UserDetail"
}

export class UserSession {
  cartValue: any[];
}

export class StateDB {
  _states: Map<string, State>;
  subject: Subject<{ id: string; value: Map<string, State> }> = new Subject<{
    id: string;
    value: Map<string, State>;
  }>();
  _stateMechineName: String;
  constructor(stateMechineName) {
    this._states = new Map<string, State>();
    this._stateMechineName = stateMechineName;
    this.subject.pipe(debounceTime(500)).subscribe((res) => {
      // get the search result from this object
      console.log("state changed..." + this._stateMechineName);
    });
  }

  setState(val) {
    let { id, value } = val;

    /* 
      only map unique object to the store based on the object code.
    */
    // var result = [];
    // if (id === StateNames.addToCart) {
    //   // value.fo
    //   var helper = {};
    //   result = value.forEach(function (o, r: ItemSchema) {
    //     var key = o.itemCode;
    //     if (!helper[key]) {
    //       helper[key] = Object.assign({}, o); // create a copy of o
    //       // r.push(helper[key]);
    //     } else {
    //       helper[key].quantity += 1;
    //     }

    //     return r;
    //   });


    //   let newState = new State(id, result);
    //   this._states.delete(id);
    //   this._states.set(id, newState);
    //   this.subject.next({ id: id, value: this._states });
    //   return;
    // }
    let newState = new State(id, value);
    this._states.delete(id);
    this._states.set(id, newState);
    this.subject.next({ id: id, value: this._states });

    
  }

  getState(id) {
    return this._states.has(id) ? this._states.get(id) : null;
  }

  onStateChange(
    lookupState?: string
  ): Subject<{ id: string; value: Map<string, State> }> {
    return this.subject;
  }
}
