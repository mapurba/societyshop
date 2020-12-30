import { Component, OnInit, ViewChild } from '@angular/core';

let $: any;
@Component({
  selector: 'app-calculator',
  templateUrl: './calculator.component.html',
  styleUrls: ['./calculator.component.css'],
  providers: [
    { provide: Window, useValue: window }
  ]
})
export class CalculatorComponent implements OnInit {
  showOverlay = false;

  searchResult: any[] = [];
  upiSelected = false;
  isloaded: boolean = false;
  @ViewChild('total') total;




  newOrder: any = { upi: {}, amount: 0 };

  constructor(
    private window: Window

  ) { }

  ngOnInit(): void {
    // final draft
  }

  public loadScript() {
    let body = <HTMLDivElement>document.body;
    let script = document.createElement('script');
    script.innerHTML = '';
    script.src = '/assets/js/calc.js';
    script.async = true;
    script.defer = true;
    body.appendChild(script);
  }
  ngAfterViewInit() {
    this.loadScript();
  }

  openConfirmation(order) {
    this.showOverlay = true;
    try {
      console.log(this.total.nativeElement.innerHTML);

      this.newOrder.amount = parseInt(this.total.nativeElement.innerHTML);
    }
    catch (e) {
      this.newOrder.amount = 1;
    }

  }




  prevent(event, order) {
    event.stopPropagation();
  }

  hideOverlay(event) {
    this.showOverlay = !this.showOverlay;
    this.upiSelected = false;
    this.newOrder = {};
  }

  upiList(data) {
    this.searchResult = data.data;
  }


  selectedUpi(upi) {
    this.upiSelected = true;
    this.newOrder.upi = upi;
    // this.newOrder.amount =
  }


  isloading(data) {
    this.isloaded = data;
    console.log(this.isloaded);

  }

}
