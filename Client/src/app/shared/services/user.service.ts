import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, BehaviorSubject, Subject } from 'rxjs';
import { CookieService } from 'ngx-cookie-service';
import { State, StateNames } from 'src/app/schemas/componentStateSchema';
import { ComponentStateService } from 'src/app/services/component-state.service';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  private userDetail = new BehaviorSubject(null);
  currentUserDetail = this.userDetail.asObservable();


  userSubject: Subject<any> = new Subject();

  private currentUserStatic: any;


  constructor(private http: HttpClient, private cookieService: CookieService, private componentStateService: ComponentStateService) {
    
    // this.getUserDetailV2().subscribe((res) => {
    //   this.currentUserStatic = res.user;
    // });

    this.getUserDetailCreateState();


    this.componentStateService.onStateChange(StateNames.userDetail).subscribe((user) => {

      if (user.id === StateNames.userDetail) {
        let currentuser = user.value.get(StateNames.userDetail) as State;
        this.currentUserStatic = currentuser.value.user;
        this.userSubject.next(this.currentUserStatic);
      }
    })

  }


  userSub() {
    return this.userSubject;
  }


  getAllUnSubmitedPhotos(): Observable<any> {
    return this.http.get('/api/user/photos');
  }

  submitTask(payload):Observable<any>{
    return this.http.post('/api/admin/task/approve',payload);
  }

  getUserDetail(userId?:any):Observable<any>{
    let url=userId?`/api/user/details?id=${userId}`:'/api/user/details';
    return this.http.get(url)
  }
  getUserDetailV2(userId?: any): Observable<any> {


    let url=`/api/user/details`;
    return this.http.get(url);
  }


  getUserDetailCreateState() {
    return this.getUserDetailV2().subscribe((user) => {
      this.createUserDetailState(user);
      return this.componentStateService.getStateByStateName(StateNames.userDetail);
    });
  }


  createUserDetailState(userDetail) {
    if (
      this.componentStateService.getStateByStateName(StateNames.userDetail)
    ) {
      let cart = this.componentStateService.getStateByStateName(
        StateNames.userDetail
      ) as State;
      cart.value = userDetail;
      let newState = new State(StateNames.userDetail, cart.value);
      this.componentStateService.setState(newState);
    } else {
      //creating empty state is not exist in the datastore
      //right time to add the items of local storage to the datastore
      let newState = new State(
        StateNames.userDetail,
        userDetail
      );
      this.componentStateService.setState(newState);
    }
  }

  getUserDetailV3(userDetails){
    
     return this.userDetail.next(userDetails);
    
  }
  getCurrentUserStatic(){
    return this.currentUserStatic;
  }




  importPhotos(): Observable<any> {
    return this.http.get('/api/api/importInstagramPhotos');
  }

  reviewPhoto(publishPhotoList:any) {


     publishPhotoList.photos.map(element => {
       element.sendForReview=true;
    });
    return this.http.post('/api/user/postPhotosToBlog', publishPhotoList);

  }

  getAdminTask():Observable<any>{
    return this.http.get('/api/admin/tasklist');
  }
  
  isLogedinUser():boolean{

    if(this.cookieService.get('user_session')){
      // console.log(this.cookieService.get('user_session'));
      return true;
    }
    return false;
  }

}
