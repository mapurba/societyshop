import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Component, OnInit } from "@angular/core";
import { State, StateNames } from "src/app/schemas/componentStateSchema";
import { ComponentStateService } from "src/app/services/component-state.service";

@Component({
  selector: "app-landing-page",
  templateUrl: "./landing-page.component.html",
  styleUrls: ["./landing-page.component.css"],
})
export class LandingPageComponent implements OnInit {

  user: any;
  userDetailLoading: boolean = false;
  constructor(private http: HttpClient, private componentStateServie: ComponentStateService) { }

  ngOnInit() {
    // this.currentLoggedinUser;
    // this.componentStateServie
    //   .onStateChange(StateNames.userDetail)
    //   .subscribe((res) => {
    //     if (res.id === StateNames.userDetail) {
         
    //     }
    //   });

    let usr: any = this.componentStateServie.getStateByStateName(StateNames.userDetail) as State;
    let userDetail = usr.value;
    this.user = userDetail.user;
    this.userDetailLoading = true;
    console.log("usr loaded 1 ...");
  }

  ngAfterViewInit() {

    // this.userService.userSub().subscribe((user) => {
    //   this.currentLoggedinUser = user;
    //   console.log("hello");
    //   console.log(this.currentLoggedinUser);
    // });
  }

  userSignup() {
  }
}
