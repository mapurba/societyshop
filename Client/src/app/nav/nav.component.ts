import { Component, OnInit } from '@angular/core';
import { UserService } from '../shared/services/user.service';

@Component({
  selector: 'app-nav',
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.css']
})
export class NavComponent implements OnInit {

  loggedInUserDetails:any;
  constructor(private userService:UserService) { }

  ngOnInit() {
   this.getUserDetail();
  }


  public isloggedin(){
    // console.log(this.userService.isLogedinUser());
    return this.userService.isLogedinUser();
  }

  getUserDetail(){
    this.userService.getUserDetailV2().subscribe((res)=>{
      this.loggedInUserDetails=res.user;
      this.userService.getUserDetailV3(res.user);
    })
  }



}
