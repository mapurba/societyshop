import { Component, ElementRef, Input, OnInit, ViewChild } from '@angular/core';
import { Subject } from 'rxjs';
import { debounceTime } from 'rxjs/operators';

@Component({
  selector: 'product-search',
  templateUrl: './product-search.component.html',
  styleUrls: ['./product-search.component.css']
})
export class ProductSearchComponent implements OnInit {

  _showCancleBtn: boolean = false;
  subject: Subject<any> = new Subject();
  searchQ: string;
  defaultText = "Search all the products";
  @ViewChild("searchQ") searchQRef: ElementRef;

  @Input("showCancleBtn")
  set ShowCancleBtn(val) {
    this.ShowCancleBtn = val;
  }

  constructor() { }

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
      const { target } = event;
      const { innerText } = target;
      if (innerText.length <= 1) {
        this.searchQRef.nativeElement.innerText = this.defaultText;
      }
    }

  }

  clearText(event) {
    window.getSelection()
      .selectAllChildren(
        this.searchQRef.nativeElement
      );
  }



}
