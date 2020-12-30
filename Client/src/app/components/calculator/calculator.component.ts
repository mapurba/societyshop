import { HttpClient } from '@angular/common/http';
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
  payMod = 'reset';
  @ViewChild('total') total;




  newOrder: any = { upi: {}, amount: 0 };

  constructor(
    private window: Window,
    private http: HttpClient

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
    try {

      this.newOrder.amount = parseInt(this.total.nativeElement.innerHTML);
      if (this.newOrder.amount > 0) {
        this.showOverlay = true;
      }
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
    this.payMod = 'reset';
  }

  upiList(data) {
    this.searchResult = data.data;
  }


  selectedUpi(upi) {
    this.upiSelected = true;
    this.newOrder.upi = upi;
    // this.newOrder.amount =
  }

  createWpLink() {
    let url = 'whatsapp://send?text=Pay your Last bill @ : https://societystore.co/api/pay/';

    this.http.post("api/orders/payment/link", { amount: this.newOrder.amount }).subscribe((res: any) => {
      this.window.open(url + res.data._id, "_blank", "toolbar=yes,scrollbars=yes,resizable=yes,top=500,left=500,width=400,height=400");
    });
  }

  isloading(data) {
    this.isloaded = data;
    console.log(this.isloaded);

  }

  changePaymentMode(mode) {
    this.payMod = mode;
  }
}
