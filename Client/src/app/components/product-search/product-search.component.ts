import { Component, ElementRef, Input, OnInit, ViewChild } from '@angular/core';
import { Subject } from 'rxjs';
import { debounceTime } from 'rxjs/operators';
import { ComponentStateService } from 'src/app/services/component-state.service';

@Component({
  selector: 'product-search',
  templateUrl: './product-search.component.html',
  styleUrls: ['./product-search.component.css']
})
export class ProductSearchComponent implements OnInit {

  _showCancleBtn: boolean = false;
  searchQ: string;
  defaultText: string = "Search all the products";
  showDowpdown: boolean = false;
  subject: Subject<any> = new Subject();
  _show: boolean = false;

  @ViewChild("searchQ") searchQRef: ElementRef;
  @Input("show") setShow(val) {
    this._show = val;
  }
  @Input("showCancleBtn")
  set ShowCancleBtn(val) {
    this.ShowCancleBtn = val;
    if (val) {
      this.searchQRef.nativeElement.click();
    }
  }

  constructor(private componentStateServie:ComponentStateService) { }

  ngOnInit(): void {

    this.subject
      .pipe(debounceTime(500))
      .subscribe((res) => {
        this.searchQ = res;
        // get the search result from this object
        console.log(this.searchQ);
      }
      );
  }


  ngAfterViewInit() {
    let stateName = "openSearchBoxState";

    this.componentStateServie.onStateChange('openSearchBoxState').subscribe((res)=>{
      if(res.id===stateName){
        this.searchQRef.nativeElement.click();
      }
    })
  }

  onKeyUp(event): void {
    if (event != undefined) {
      const { target } = event;
      const { innerText } = target;
      this.subject.next(innerText);
    }
  }

  onBlur(event): void {
    if (event != undefined && event.returnValue) {
      this.showDowpdown = false;
      this.ShowCancleBtn = this.ShowCancleBtn ? !this.ShowCancleBtn : this.ShowCancleBtn;
      const { target } = event;
      const { innerText } = target;
      if (innerText.length <= 1) {
        this.searchQRef.nativeElement.innerText = this.defaultText;
      }
    }

  }

  touch() {
  }

  overlayTouch(event) {
  }

  mouseLeave(event): void {
    this.showDowpdown = false;

  }


  clearText(event) {
    this._showCancleBtn = true;
    window.getSelection()
      .selectAllChildren(
        this.searchQRef.nativeElement
      );

    this.showDowpdown = true;

  }



}
