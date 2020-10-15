import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router, ActivatedRoute } from '@angular/router';
import { UserService } from '../shared/services/user.service';

@Component({
  selector: 'app-blog',
  templateUrl: './blog.component.html',
  styleUrls: ['./blog.component.css']
})
export class BlogComponent implements OnInit {

  userfeed = [1, 2, 3];
  userBlogPhotos: any;
  currentUserBlogID: any;
  userDetail: any;
  loadingPhotos:boolean=true;
  constructor(private http: HttpClient, private route: ActivatedRoute,private router:Router, private userService: UserService) {
    this.currentUserBlogID = this.route.snapshot.paramMap.get('id');
    this.getUserDetail(this.currentUserBlogID);
    this.getUserblogPhotos(this.currentUserBlogID);
  }

  ngOnInit() {

  }

  getUserDetail(userId) {

    this.userService.getUserDetail(userId).subscribe((res) => {
      if(res.user==undefined){
        this.userDetail=res[0];
      }
      else{
        this.userDetail = res.user;
      }
      

    },(err)=>{
      this.router.navigate['/'];
    });
  }

  getUserblogPhotos(userId) {
    
    let url = '/api/user/blogPhotos?id='+userId;
    this.http.get(url).subscribe((res) => {
      this.userBlogPhotos = res;
      this.loadingPhotos=false;
    },(err)=>{
      this.router.navigate['/'];
    });
  }

}
