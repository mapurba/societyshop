import { Component, OnInit, Output, Input } from '@angular/core';
import { UserService } from '../shared/services/user.service';
declare var $: any;

@Component({
  selector: 'app-post-photos-toblog',
  templateUrl: './post-photos-toblog.component.html',
  styleUrls: ['./post-photos-toblog.component.css']
})
export class PostPhotosToblogComponent implements OnInit {

  _userPhotos:any;
  @Input('userPhotos') 
  set userPhotos(value){
    if(value !=null || value !=undefined){
      this._userPhotos= value.filter(item => !item.publishedToBlog);
    }
    
  }
  publishPhotoList:Map<String,any>;
  constructor(private userService:UserService) {
    this.publishPhotoList = new Map();
   }

  ngOnInit() {
    
  }

  isPhotoSelected(item){
    // console.log( this.publishPhotoList.has(item.id) );
   return this.publishPhotoList.has(item.id);
  }

  addPhotoToList(item, $event) {
    let tempitem= Object.assign({},item);
    tempitem.image="";
    if( $event.target.checked){
      
      this.publishPhotoList.set(item.id,tempitem);
    }
    else{
      this.publishPhotoList.delete(item.id);
    }
    
  }

  publish(){

    let payload={'user':{},'photos':[]};
    let itrator=this.publishPhotoList.values();
    let item:any;
    
    while( item=itrator.next().value){
      payload.user=item.user;
      payload.photos.push({id:item.id,postLink:item.link,url:item.images.low_resolution.url});
    }
    this.userService.reviewPhoto(payload).subscribe((res)=>{
    //  console.log(res);
      // this.getUserPhotos();
      this.publishPhotoList = new Map();
      
    })
  }
  
}
