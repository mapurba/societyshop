import { HttpClient } from "@angular/common/http";
import { Component, Input, OnInit } from "@angular/core";
import { Router } from "@angular/router";
import { State } from "src/app/schemas/componentStateSchema";
import { ItemSchema } from "src/app/schemas/ItemSchema";
import { ComponentStateService } from "src/app/services/component-state.service";

export enum paymentComponentMode {
  buttonOnly = 0,
  fullPage = 1,
}

@Component({
  selector: "payment",
  templateUrl: "./payment.component.html",
  styleUrls: ["./payment.component.css"],
})
export class PaymentComponent implements OnInit {
  loading: boolean = true;

  dummylist: ItemSchema[];
  state: any;
  addToCartState: string = "addToCart";
  orderId: any = null;

  orderCreationFailed = true;

  isOrderCreating = false;

  enablePayment = false;


  currentOrderDetail: any;
  // _setDisplayMode = 0;

  componentMode = paymentComponentMode.fullPage;

  @Input("setDisplayMode") _setDisplayMode = 0;

  isloading() {
    return this.loading;
  }
  constructor(
    private component̥StateService: ComponentStateService,
    private http: HttpClient,
    private route: Router
  ) {}

  ngOnInit() {
    // this.loadPaymentRelatedJs();
    console.log(this._setDisplayMode);
  }

  ngAfterViewInit() {
    setTimeout(() => {
      this.loading = false;
      console.log(this.loading);
    }, 500);
  }

  ngDoCheck() {
    // this.dummylist = this.retriveItemFromLocalStore();
    this.state = this.component̥StateService.getStateByStateName(
      this.addToCartState
    ) as State;
    this.dummylist = this.state
      ? this.state.value
      : this.retriveItemFromLocalStore("cartValue");

    this.componentMode = this._setDisplayMode;
  }

  retriveItemFromLocalStore(id): any[] {
    let lastValue = localStorage.getItem(id);
    if (lastValue && lastValue.length > 0) {
      try {
        return JSON.parse(localStorage.getItem(id));
      } catch (e) {
        console.error("JSon parse failed");
        return this.dummylist;
      }
    }
    return this.dummylist;
  }
  createOrderAndToPayment() {
    this.isOrderCreating = true;
    this.http.post("/api/orders/create", { items: this.state.value }).subscribe(
      (res: any) => {
        console.log({ "order created......": res });
        // this.paymentRedirection(res);
        // this.clearCurrentCart();
        this.isOrderCreating = false;
        this.orderId = res.respos._id;
        this.enablePayment = true;
        this.orderCreationFailed = false;
        // this.paymentRedirection(res);
        this.currentOrderDetail = res.respos;

      },
      (err) => {
        this.isOrderCreating = false;
        this.orderCreationFailed = true;
        this.orderId = 1;
        this.enablePayment = false;
      }
    );
  }

  paymentRedirection(orderDetail) {
    // this.route.navigate(["/payment"]);
    let orderData = orderDetail;

    //this creates the order and creata  a payment token can be for to redirect to PG page.store that to session #ToDO

    let newOrderDetail = {
      orderId: orderDetail.respos._id,
      orderAmount: orderDetail.respos.totalAmountAfterDiscount,
      customerName: orderDetail.respos.user,
      customerEmail: "a@a.com",
      customerPhone: "1234512345",
    };
    this.http
      .post(
        "https://us-central1-societystore.cloudfunctions.net/moduleExports/calculateSecretKey.",
        {
          formObj: newOrderDetail,
          paymentType: "SEAMLESSBASIC",
        }
      )
      .subscribe((res: any) => {
        console.log({ ...res.additionalFields, ...newOrderDetail });
        this.redirectToCashFree({
          ...res.additionalFields,
          ...newOrderDetail,
          source: "web_societystore",
        });
      });
  }

  redirectToCashFree(data) {
    this.http
      .post(
        "https://test.cashfree.com/billpay/checkout/post/generate-paymenthash",
        { ...data }
      )
      .subscribe((res) => {});
  }

  changePaymentMode(id): any {
    console.log("opening form ....");

    try {
      let _paymentMode = window["paymentOptions"];

      console.log({ id, _paymentMode });

      if (id === "walet") {
        console.log("something else");
        return;
      }
      window["displayFormElement"](_paymentMode[id]);
    } catch (e) {
      console.log("payment script not. loaded");
    }
  }
}
