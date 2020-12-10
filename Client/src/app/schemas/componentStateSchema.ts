import { Observable, Subject } from "rxjs";
import { debounceTime } from "rxjs/operators";

export class State {
    id: string;
    value: any;
    constructor(id:string,value:any){
        this.id=id;
        this.value=value;
    }
}

export class StateDB {

    _states: Map<string, State>;
    subject: Subject<{'id':string,'value':Map<string, State>}> = new Subject<{'id':string,'value':Map<string, State>}>();
    _stateMechineName:String;
    constructor(stateMechineName) {
        this._states = new Map<string, State>();
        this._stateMechineName=stateMechineName;
        this.subject
            .pipe(debounceTime(500))
            .subscribe((res) => {
                // get the search result from this object
                console.log("state changed..."+this._stateMechineName);
            }
            );
    }

    setState(val) {
        let {id,value} = val;
        let newState = new State(id,value);
        this._states.set(id, newState);
        this.subject.next({'id':id,'value':this._states});
    }

    getState(id) {
        return this._states.has(id) ? this._states.get(id) : null;
    }

    onStateChange(lookupState?:string): Subject<{'id':string,'value':Map<string, State>}>{
        return this.subject;
    }

}
