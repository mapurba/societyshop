import { ChangeDetectorRef, Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-subscribe-merchant',
  templateUrl: './subscribe-merchant.component.html',
  styleUrls: ['./subscribe-merchant.component.css']
})
export class SubscribeMerchantComponent implements OnInit {

  constructor(private ref: ChangeDetectorRef) { }

  MerUserList: [];

  showOverLay = false;

  slectedUser: any;

  isListLoading: false;

  ngOnInit() {
    this.MerUserList = [];
  }


  merchentUsers(users) {
    this.ref.detectChanges();
    this.MerUserList = users;

  }

  searchFinished(data) {
    this.isListLoading = data;
  }



  setShowOverLay(event) {
    // event.p
    this.showOverLay = false;
  }
  openConfirmation(user) {
    this.showOverLay = true;
    this.slectedUser = user;
  }


  prevent(event) {
    event.stopPropagation();
  }


  subscribeSeller(seller) {
    console.log(seller);
  }




}
