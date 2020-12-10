import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { UserService } from '../shared/services/user.service';

@Component({
  selector: 'app-nav',
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.css']
})
export class NavComponent implements OnInit {

  loggedInUserDetails:any;
  userLoggedin:boolean = false;
  loadingUser:boolean = true;
  constructor(private userService:UserService,public route:Router) { }

  ngOnInit() {
   this.getUserDetail();
  }


  public isloggedin(){
    // console.log(this.userService.isLogedinUser());
    return this.userService.isLogedinUser();
  }

  getUserDetail(){
    this.loadingUser=true;
    this.userService.getUserDetailV2().subscribe((res)=>{
      this.loadingUser=false;
      this.userLoggedin=true;
      this.loggedInUserDetails=res.user;
      this.userService.getUserDetailV3(res.user);
    },(err)=>{
      this.loadingUser=false;
      this.userLoggedin =false;
    })
  }



}
