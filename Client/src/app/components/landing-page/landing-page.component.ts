import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Component, OnInit } from "@angular/core";
import { UserService } from "src/app/shared/services/user.service";

@Component({
  selector: "app-landing-page",
  templateUrl: "./landing-page.component.html",
  styleUrls: ["./landing-page.component.css"],
})
export class LandingPageComponent implements OnInit {

  currentLoggedinUser: any;
  constructor(private http: HttpClient, private userService: UserService) { }

  ngOnInit() {
    this.currentLoggedinUser;

    this.userService.userSub().subscribe((user) => {
      this.currentLoggedinUser = user;
    })
  }

  userSignup() {
    // set user header


    
 
    // fetch("/api/auth/google", {
    //   headers: {
    //     "accept":"text/html,application/xhtml+xml,application/xml;q=0.9,image/webp,image/apng,*/*;q=0.8,application/signed-exchange;v=b3;q=0.9",
    //     "accept-language": "en-US,en;q=0.9",
    //     "cache-control": "no-cache",
    //     "pragma": "no-cache",
    //     "sec-fetch-dest": "document",
    //     "sec-fetch-mode": "navigate",
    //     "sec-fetch-site": "same-origin",
    //     "sec-fetch-user": "?1",
    //     "upgrade-insecure-requests": "1",
    //     "userType":"merchant_new"
    //   },
    //   body: null,
    //   method: "GET",
    //   mode: "cors",
    //   credentials: "include",
    // });
  }
}
