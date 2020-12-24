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

  constructor(
    @Inject(DOCUMENT) private document: Document,
    private componentStateServie: ComponentStateService,
    private sessionService: SessionService,
    public route: Router,
    private userDetail: UserService
  ) {
    console.log(route.url);
  }

  getScrollDirection(scrollX, scrollY) {
    // var directionX = !scrollX ? "NONE" : scrollX > 0 ? "LEFT" : "RIGHT";
    var directionY = !scrollY ? "NONE" : scrollY > 0 ? "UP" : "DOWN";
    return directionY;
  }

  @HostListener("window:scroll", [])
  onWindowScroll() {
    let scrollX = (this.currentXPos || window.pageXOffset) - window.pageXOffset;
    let scrollY = (this.currentYpos || window.pageYOffset) - window.pageYOffset;
    this.currentXPos = window.pageXOffset;
    this.currentYpos = window.pageYOffset;
    this.scrollDirection = this.getScrollDirection(scrollX, scrollY);

    //this code checks if the user is scrolling
    if (this.scroller) {
      clearTimeout(this.scroller);
    }
    this.scroller = setTimeout(() => {
      console.log("scroll stopped...");
      this.isScrolling = false;
      this.scrollStop = true;
      // this.fullscreenmodes();
    }, 200);
    console.log("scrolling");
    this.scrollStop = false;
    this.isScrolling = true;
  }

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
          // this.searchQRef.nativeElement.click();
          console.log(res.value.get(StateNames.addToCart).value);

          // #Todo cleanup
          ///store item to local storage if needed
          // update session store

          //update local store
          try {
            localStorage.setItem(
              "cartValue",
              JSON.stringify(res.value.get(StateNames.addToCart).value)
            );
          } catch (e) {
            console.log("localStorage save error");
          }

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
          let userSession = res.value.get(StateNames.UserSession);
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

    this.userDetail.getUserDetailV2().subscribe((res) => {
      this.user = res.user;
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

  getStateFromDbAndSetToComponentState() {}

  // autofullscreen() {
  //   const element = this.document.querySelector("body");
  //   // make the element go to full-screen mode
  //   console.log("funncreen error");

  //   element
  //     .requestFullscreen()
  //     .then(function () {
  //       console.log("element has entered fullscreen mode successfully");
  //     })
  //     .catch(function (error) {
  //       // element could not enter fullscreen mode
  //       console.log("funncreen error");
  //     });
  // }
}
