import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Component, OnInit } from "@angular/core";

@Component({
  selector: "app-landing-page",
  templateUrl: "./landing-page.component.html",
  styleUrls: ["./landing-page.component.css"],
})
export class LandingPageComponent implements OnInit {
  constructor(private http: HttpClient) {}

  ngOnInit() {}

  userSignup() {
    // set user header

    const headers = new HttpHeaders().set("userlogintype", "normal");
    headers.set(" mode", "cors");
    headers.set("credentials", "include");
    headers.set("cache-control", "no-cache");
    headers.set("sec-fetch-dest", "document");
    headers.set("sec-fetch-mode", "navigate");
    headers.set("userType", "merchant_newss");
    headers.set("Referer", "http://localhost:4300/api/auth/google/");
    
 
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
