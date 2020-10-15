import { Component, OnInit } from '@angular/core';
import { UserService } from 'src/app/shared/services/user.service';
// import { getImagem } from 'src/app/shared/services/factories/image-factory';
declare var $: any;

@Component({
  selector: 'app-admin-console',
  templateUrl: './admin-console.component.html',
  styleUrls: ['./admin-console.component.css']
})
export class AdminConsoleComponent implements OnInit {
  adminTask: any;
  hideTable: boolean = false;
  selectedTask: any;
  productImage: any;
  productLink: string;
  selectedMedia: any;
  constructor(private userService: UserService) { }

  ngOnInit() {

    this.getAdminTask();
  }

  openDialog(media) {
    this.selectedMedia = media;
    this.productLink='';
    this.productImage='';
    $('#addlikns').modal('show');



  }
  handleFileSelect(evt) {
    var files = evt.target.files;
    var file = files[0];

    if (files && file) {
      var reader = new FileReader();

      reader.onload = this._handleReaderLoaded.bind(this);

      reader.readAsBinaryString(file);
    }
  }

  _handleReaderLoaded(readerEvt) {
    var binaryString = readerEvt.target.result;
    this.productImage = btoa(binaryString);
    //console.log(btoa(binaryString));
  }
  saveimage($event) {
    this.handleFileSelect($event);
  }
  
  getAdminTask() {
    this.userService.getAdminTask().subscribe((res) => {
      this.adminTask = res;
    });
  }

  taskDetails(task) {
    this.toggleView();
    task.userMedia.map((item, index) => {
      task.userMedia[index]['productLink'] = [];
    })
    this.selectedTask = task;
  }


  toggleView() {
    this.hideTable ? this.hideTable = false : this.hideTable = true;
    //return this.hideTable;
  }

  addProductLink() {
    this.selectedTask.userMedia.map((item, index) => {
      if (item.id == this.selectedMedia.id) {
        item.productLink.push({ 'image': this.productImage, 'productLink': this.productLink });
      }
    });

  }


  publish(){
    let payload={'user':this.selectedTask.user,'usermedia':this.selectedTask.userMedia};
    this.userService.submitTask(payload).subscribe((res)=>{

    });
  }
}
