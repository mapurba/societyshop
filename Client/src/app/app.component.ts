import { DOCUMENT } from "@angular/common";
import { Component, HostListener, Inject } from "@angular/core";
import { Router } from "@angular/router";
import { State, StateNames, UserSession } from "./schemas/componentStateSchema";
import { ComponentStateService } from "./services/component-state.service";
import { SessionService } from "./services/session.service";
import { UserService } from "./shared/services/user.service";

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
  isScrolling: boolean = false;
  scrollStop: boolean = true;
  scroller: any;
  user: any;
  userDetailLoading: boolean = true;

  removeLoader = false;

  constructor(
    @Inject(DOCUMENT) private document: Document,
    private componentStateServie: ComponentStateService,
    private sessionService: SessionService,
    public route: Router,
    private userDetail: UserService
  ) {
    // console.log(route.url);

    setTimeout(() => {
      this.removeLoader = true;
    }, 1000);

  }

  getScrollDirection(scrollX, scrollY) {
    // var directionX = !scrollX ? "NONE" : scrollX > 0 ? "LEFT" : "RIGHT";
    var directionY = !scrollY ? "NONE" : scrollY > 0 ? "UP" : "DOWN";
    return directionY;
  }

  // @HostListener("window:scroll", [])
  // onWindowScroll() {
  //   let scrollX = (this.currentXPos || window.pageXOffset) - window.pageXOffset;
  //   let scrollY = (this.currentYpos || window.pageYOffset) - window.pageYOffset;
  //   this.currentXPos = window.pageXOffset;
  //   this.currentYpos = window.pageYOffset;
  //   this.scrollDirection = this.getScrollDirection(scrollX, scrollY);

  //   //this code checks if the user is scrolling
  //   if (this.scroller) {
  //     clearTimeout(this.scroller);
  //   }
  //   this.scroller = setTimeout(() => {
  //     console.log("scroll stopped...");
  //     this.isScrolling = false;
  //     this.scrollStop = true;
  //     // this.fullscreenmodes();
  //   }, 200);
  //   console.log("scrolling");
  //   this.scrollStop = false;
  //   this.isScrolling = true;
  // }

  elem: any;
  isFullScreen: boolean;
  @HostListener("document:fullscreenchange", ["$event"])
  @HostListener("document:webkitfullscreenchange", ["$event"])
  @HostListener("document:mozfullscreenchange", ["$event"])
  @HostListener("document:MSFullscreenChange", ["$event"])
  fullscreenmodes(event) {
    this.chkScreenMode();
  }
  chkScreenMode() {
    if (document.fullscreenElement) {
      //fullscreen
      this.isFullScreen = true;
    } else {
      //not in full screen
      this.isFullScreen = false;
    }
  }
  ngOnInit() {
    this.componentStateServie
      .onStateChange(StateNames.addToCart)
      .subscribe((res) => {
        if (res.id === StateNames.addToCart) {

          if (res.value.get(StateNames.addToCart).value) {
            try {
              setTimeout(() => {
                console.log("....update serrion.");
                this.updateSessionStateByProperty(
                  "cartValue",
                  res.value.get(StateNames.addToCart).value
                );
              }, 4000);
            } catch (e) {
              console.error("Empty Cart");
            }
          }
        }
        if (res.id === StateNames.UserSession) {
          let userSession = res.value.get(StateNames.UserSession);
          // use session service to persist the date to db
          this.sessionService.updateStateTodb(userSession);
          console.info(
            "user session uodate need to send these to server from here"
          );
        }
        if (res.id === StateNames.userDetail) {
          let userDetail = res.value.get(StateNames.userDetail);
          console.log("usr loaded...");
          this.user = userDetail.value.user;
          this.userDetailLoading = false;
        }
      });

    // this.autofullscreen();
  }

  updateSessionStateByProperty(propsName, value: any) {
    let session = new UserSession();
    session.cartValue = value;
    this.sessionService.updateUserSession(session);
  }
  openSearch() {
    this.openSearchSwitch = true;
    let newState = new State(StateNames.OpenSearchBoxState, true);
    this.componentStateServie.setState(newState);
    window.scroll(this.currentXPos, this.currentYpos - 1);
  }

  getStateFromDbAndSetToComponentState() { }
}
