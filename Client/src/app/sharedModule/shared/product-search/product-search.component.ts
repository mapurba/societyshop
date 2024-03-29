import { HttpClient } from "@angular/common/http";
import {
  Component,
  ElementRef,
  Input,
  OnInit,
  Output,
  ViewChild,
  EventEmitter,
} from "@angular/core";
import { Router } from "@angular/router";
import { Subject } from "rxjs";
import { debounceTime } from "rxjs/operators";
import { StateNames } from "src/app/schemas/componentStateSchema";
import { ComponentStateService } from "src/app/services/component-state.service";

@Component({
  selector: "product-search",
  templateUrl: "./product-search.component.html",
  styleUrls: ["./product-search.component.css"],
})
export class ProductSearchComponent implements OnInit {
  _showCancleBtn: boolean = false;
  searchQ: string;
  defaultText: string = "Search all the products";
  showDowpdown: boolean = false;
  subject: Subject<any> = new Subject();
  _show: boolean = false;
  dropdownsearchResul = [];
  isloading = false;


  @Input("Qurl") Qurl?: string;
  @Input("isFlat") isFalt: boolean = false;

  @Input("placeholder") placeholder?: string;

  @Output("isLoading") isLoading?: EventEmitter<boolean> = new EventEmitter<boolean>();
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

  @Output("searchResult") searchResult?: EventEmitter<any> = new EventEmitter<any>();

  constructor(
    private componentStateServie: ComponentStateService,
    private http: HttpClient,
    private route: Router
  ) { }

  ngOnInit(): void {

    this.subject.pipe(debounceTime(500)).subscribe((res) => {
      this.searchQ = res;
      // get the search result from this object
      // console.log(this.searchQ);
      this.isLoading.emit(true);
      this.isloading = true;
      this.fetchsearchResult(this.searchQ || '').subscribe((res: any) => {
        // console.log(res);
        this.dropdownsearchResul = res.data.slice(0, 10);
        this.searchResult.emit(res);
        this.isLoading.emit(false);
        this.isloading = false;

      });
    });
    this.subject.next("");
  }

  fetchsearchResult(Q) {
    return this.http.get((this.Qurl || "/api/search/ac?ed=3&q=") + Q + "&");
  }

  ngAfterViewInit() {
    this.componentStateServie
      .onStateChange(StateNames.OpenSearchBoxState)
      .subscribe((res) => {
        if (res.id === StateNames.OpenSearchBoxState) {
          this.searchQRef.nativeElement.click();
        }
      });
  }

  prevent(event) {
    event.stopPropagation();
  }


  onKeyUp(event): void {
    if (event != undefined) {
      const { target } = event;
      const { innerText } = target;
      this.subject.next(innerText);
    }
  }

  onBlur(event, cancle?: boolean): void {
    if (cancle) {
      this._showCancleBtn = false;
      this.showDowpdown = false;
      this.searchQRef.nativeElement.innerText = this.placeholder || this.defaultText;

      return;
    }
    if (event != undefined && event.returnValue) {
      this.showDowpdown = false;
      const { target } = event;
      const { innerText } = target;
      if (innerText.length <= 1) {
        this.searchQRef.nativeElement.innerText = this.placeholder || this.defaultText;
      }
    }

    this._showCancleBtn = false;
  }

  touch() { }

  overlayTouch(event) { }

  mouseLeave(event): void {
    this.showDowpdown = false;
    this._showCancleBtn = false;
  }

  clearText(event) {
    this._showCancleBtn = true;
    window.getSelection().selectAllChildren(this.searchQRef.nativeElement);
    this.showDowpdown = true;
  }

  gotoProductList(item) {
    // console.log(item);
    this.route.navigate(['my', { search: item.name }]);
    this.showDowpdown = false;
  }
}
