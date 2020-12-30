import { HttpClient } from "@angular/common/http";
import { Component, Input, OnInit } from "@angular/core";
import { FormControl, FormGroup, Validators } from "@angular/forms";
import { DomSanitizer } from "@angular/platform-browser";
import { Router } from "@angular/router";
import { State, StateNames } from "src/app/schemas/componentStateSchema";
import { ItemSchema, retriveItemFromLocalStore } from "src/app/schemas/ItemSchema";
import { PAYMENT_TYPE_RESPONCE } from "src/app/schemas/paymentResponce";
import { ComponentStateService } from "src/app/services/component-state.service";

export enum paymentComponentMode {
  buttonOnly = 0,
  fullPage = 1,
}

export enum cashFreeSDKEventEnums { paymentRequest = "PAYMENT_REQUEST", paymentResponse = "PAYMENT_RESPONSE" }





@Component({
  selector: "payment",
  templateUrl: "./payment.component.html",
  styleUrls: ["./payment.component.css"],
  providers: [
    { provide: Window, useValue: window }
  ]
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

  payMode: any;

  currentOrderDetail: any;

  totalAmount

  showiframeScreen: boolean = false;

  paymentHash: any;
  // _setDisplayMode = 0;

  componentMode = paymentComponentMode.fullPage;
  upiAddress = new FormControl("");

  paymentProcessiong = false;
  upiValid = '';
  @Input("setDisplayMode") _setDisplayMode = 0;

  isloading() {
    return this.loading;
  }
  constructor(
    private component̥StateService: ComponentStateService,
    private http: HttpClient,
    private route: Router,
    private sanitizer: DomSanitizer,
    private window: Window
  ) { }

  ngOnInit() {
    // this.loadPaymentRelatedJs();
    console.log(this._setDisplayMode);

    // this.createItemForm = new FormGroup({
    //   name: new FormControl("", [Validators.required]),
    //   discp: new FormControl("", [Validators.required]),
    //   price: new FormControl("", [Validators.required]),
    //   brand: new FormControl("", [Validators.required]),
    //   varient: new FormControl("", [Validators.required]),
    //   image: new FormControl("", [Validators.required]),
    // });


    this.component̥StateService
      .onStateChange(StateNames.OpenSearchBoxState)
      .subscribe((res) => {

        if (res.id === StateNames.addToCart) {
          let userCart = res.value.get(StateNames.addToCart);
          console.log('cart changed.');
          let cartItems = new Map(retriveItemFromLocalStore("cartValue"));
          this.state = { value: [] };
          cartItems.forEach((value: any, key) => {
            this.state.value.push(value);
          });
        }

      });
    let cartItems = new Map(retriveItemFromLocalStore("cartValue"));
    this.state = { value: [] };
    cartItems.forEach((value: any, key) => {
      this.state.value.push(value);
    });
  }

  ngAfterViewInit() {
    setTimeout(() => {
      this.loading = false;
      console.log(this.loading);
    }, 500);
  }

  ngDoCheck() {
    // this.   = this.retriveItemFromLocalStore();
    // this.state = this.component̥StateService.getStateByStateName(
    //   this.addToCartState
    // ) as State;
    // this.dummylist = this.state
    //   ? this.state.value
    //   : this.retriveItemFromLocalStore("cartValue");

    // this.componentMode = this._setDisplayMode;
  }



  initiateCashfree() {
    var config = { layout: {}, checkout: {}, mode: "TEST" };
    config.layout = { view: "popup", width: "650" };
    // config.layout = {};
    config.checkout = "transparent";
    config.mode = "PROD"; //use PROD when you go live
    this.window['CashFree'].init(config);
  }

  handleResponse(data) {
    console.log(data);
  }

  callback(event) {
    //sample callback to see what response is received
    console.log("call back passed to sdk called");
    console.log("event:", event);

    switch (event.name) {
      case cashFreeSDKEventEnums.paymentRequest: {
        console.log("payment request enum hit");
        console.log("event:", event);
        //do error reporting here
        //.....
        //unfreeze form
        // this.displayResult(event.status, event.message);
        console.log("event:", event);
        break;
      }
      case cashFreeSDKEventEnums.paymentResponse: {
        //capture response and send to server
        console.log("payment response enum hit");
        console.log("event:", event);
        const { response } = event;
        this.handleResponse(JSON.stringify(response));
        break;
      }
      default: {
        console.log("other event caught");
        console.log("event:", event);
      }
    }
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

    // let cartValue =

    this.http.post("/api/orders/create", { items: this.state.value }).subscribe(
      (res: any) => {
        console.log({ "order created......": res });
        this.isOrderCreating = false;
        this.orderId = res.respos._id;
        this.enablePayment = true;
        this.orderCreationFailed = false;
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

    //this creates the order and creata  a payment token can be for to redirect to PG page.store that to session #ToDO

    let newOrderDetail = {
      orderId: orderDetail.order._id,
      orderAmount: 1,
      customerName: orderDetail.order.user.profile.name,
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
        console.log({ ...res.additionalFields, ...newOrderDetail, ...orderDetail.paymentDetail });
        let paymentData = {
          ...res.additionalFields,
          ...newOrderDetail,
          ...orderDetail.paymentDetail,
          // returnUrl: "https://us-central1-societystore.cloudfunctions.net/moduleExports/seamlessBasic/result",
          // returnUrl: "http://localhost:4300/api/orders/payment/responce",
          returnUrl: "https://societystore.co/api/orders/payment/responce",
          notifyUrl: "https://societystore.co/api/orders/payment/responce",
          source: "web_societystore",
        };
        // this.redirectToCashFree({
        //   ...res.additionalFields,
        //   ...newOrderDetail,
        //   ...orderDetail.paymentDetail,
        //   source: "web_societystore",
        // });

        try {
          this.initiateCashfree();
          this.window['CashFree'].paySeamless(paymentData, this.callback);
        } catch (e) {
          console.log(e);
        }


      });
  }

  redirectToCashFree(data) {
    this.http
      .post(
        "https://www.cashfree.com/checkout/post/generate-paymenthash",
        { ...data }
      )
      .subscribe((res: any) => {
        if (res.status == "OK") {
          // let paymentUrl = "https://www.cashfree.com/checkout/post/payment/" + res.paymentHash;
          // this.paymentHash = this.sanitizer.bypassSecurityTrustResourceUrl(paymentUrl);
          // console.log(this.paymentHash);
          // this.showiframeScreen = true;
        }
      });
  }

  changePaymentMode(id): any {
    console.log("opening form ....");
    this.payMode = id;
    try {
      // let _paymentMode = window["paymentOptions"];

      // console.log({ id, _paymentMode });

      // if (id === "walet") {
      //   console.log("something else");
      //   return;
      // }
      // window["displayFormElement"](_paymentMode[id]);



    } catch (e) {
      console.log("payment script not. loaded");
    }
  }

  processPayment() {
    this.paymentProcessiong = true;

    let payload = { order: this.currentOrderDetail, paymentDetail: {} }
    switch (this.payMode) {
      case "upi": {
        // payload.paymentDetail =
        payload.paymentDetail = PAYMENT_TYPE_RESPONCE.upi;
        payload.paymentDetail['upi'].vpa = this.upiAddress.value;
        payload.paymentDetail['upi_vpa'] = this.upiAddress.value;
        this.http.post("/api/orders/validate", payload.paymentDetail).subscribe((res: any) => {
          // console.log(res);
          if (res.status == "OK" && res.valid == true) {
            this.upiValid = 'green';
            this.paymentRedirection(payload);
          } else {
            this.upiValid = 'red';
            this.paymentProcessiong = false;
            return;
          }

        })
        return;
      }
      case "card": {
        payload.paymentDetail = PAYMENT_TYPE_RESPONCE.CARD;
        break;
      }
      case "nb": {
        payload.paymentDetail = PAYMENT_TYPE_RESPONCE.netBanking;
        break;
      }
      default: return;
    }
    // console.log(payload);
    this.paymentRedirection(payload);
  }
}
