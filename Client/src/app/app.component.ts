import { Component, HostListener, Inject } from "@angular/core";
import { DOCUMENT } from "@angular/platform-browser";
import { State, StateNames, UserSession } from "./schemas/componentStateSchema";
import { ComponentStateService } from "./services/component-state.service";
import { SessionService } from "./services/session.service";

@Component({
  selector: "app-root",
  templateUrl: "./app.component.html",
  styleUrls: ["./app.component.css"],
})
export class AppComponent {
  // sticky footer
  title = "Client";
  windowScrolled: boolean;
  scrollDirection: string;
  currentXPos;
  currentYpos;
  openSearchSwitch: boolean = false;

  constructor(
    @Inject(DOCUMENT) private document: Document,
    private componentStateServie: ComponentStateService,
    private sessionService:SessionService
  ) {}
  @HostListener("window:scroll", [])
  onWindowScroll() {
    let scrollX = (this.currentXPos || window.pageXOffset) - window.pageXOffset;
    let scrollY = (this.currentYpos || window.pageYOffset) - window.pageYOffset;
    this.currentXPos = window.pageXOffset;
    this.currentYpos = window.pageYOffset;
    this.scrollDirection = this.getScrollDirection(scrollX, scrollY);
  }

  ngOnInit() {
    this.componentStateServie
      .onStateChange(StateNames.addToCart)
      .subscribe((res) => {
        if (res.id === StateNames.addToCart) {
          // this.searchQRef.nativeElement.click();
          console.log(res.value.get(StateNames.addToCart).value);

          // #Todo cleanup
          ///store item to local storage if needed
          // update session store
          
          //update local store
          localStorage.setItem(
            "cartValue",
            JSON.stringify(res.value.get(StateNames.addToCart).value)
          );
          setTimeout(() => {
            console.log("....update serrion.");
            this.updateSessionStateByProperty(
              "cartValue",
              res.value.get(StateNames.addToCart).value
            );
          }, 4000);
        }
      });
    this.componentStateServie
      .onStateChange(StateNames.UserSession)
      .subscribe((res) => {
        if (res.id === StateNames.UserSession) {
          // this.searchQRef.nativeElement.click();
          let userSession = res.value.get(StateNames.UserSession).value as UserSession;
          console.log(userSession);

          // use session service to persist the date to db
          this.sessionService.updateStateTodb(userSession);

          console.info(
            "user session uodate need to send these to server from here"
          );
          // #Todo cleanup
          ///store item to local storage if needed
          // localStorage.setItem(
          //   "UserSession",
          //   JSON.stringify(res.value.get("UserSession").value)
          // );
        }
      });
  }

  updateSessionStateByProperty(propsName, value: any,) {
    let session = new UserSession();
    session.cartValue = value;
    this.sessionService.updateUserSession(session);
  };
  getScrollDirection(scrollX, scrollY) {
    // var directionX = !scrollX ? "NONE" : scrollX > 0 ? "LEFT" : "RIGHT";
    var directionY = !scrollY ? "NONE" : scrollY > 0 ? "UP" : "DOWN";
    return directionY;
  }

  openSearch() {
    this.openSearchSwitch = true;
    let newState = new State(StateNames.OpenSearchBoxState, true);
    this.componentStateServie.setState(newState);
  }


  getStateFromDbAndSetToComponentState() {
    
  }
}
