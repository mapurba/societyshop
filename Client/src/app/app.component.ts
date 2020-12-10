import { Component, HostListener, Inject } from '@angular/core';
import { DOCUMENT } from '@angular/platform-browser';
import { State } from './schemas/componentStateSchema';
import { ComponentStateService } from './services/component-state.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {


  // sticky footer 
  title = 'Client';
  windowScrolled: boolean;
  scrollDirection: string;
  currentXPos;
  currentYpos;
  openSearchSwitch: boolean = false;

  constructor(@Inject(DOCUMENT) private document: Document,private componentStateServie:ComponentStateService) { }
  @HostListener("window:scroll", [])
  onWindowScroll() {
    let scrollX = (this.currentXPos || window.pageXOffset) - window.pageXOffset;
    let scrollY = (this.currentYpos || window.pageYOffset) - window.pageYOffset;
    this.currentXPos = window.pageXOffset;
    this.currentYpos = window.pageYOffset;
    this.scrollDirection = this.getScrollDirection(scrollX, scrollY);
  }


  // scrollToTop() {
  //   (function smoothscroll() {
  //     var currentScroll = document.documentElement.scrollTop || document.body.scrollTop;
  //     if (currentScroll > 0) {
  //       window.requestAnimationFrame(smoothscroll);
  //       window.scrollTo(0, currentScroll - (currentScroll / 8));
  //     }
  //   })();
  // }

  ngOnInit() {

    let stateName = "addToCart";

    this.componentStateServie.onStateChange('addToCart').subscribe((res)=>{
      if(res.id===stateName){
        // this.searchQRef.nativeElement.click();
        console.log(res);
      }
    })
   }


  getScrollDirection(scrollX, scrollY) {
    // var directionX = !scrollX ? "NONE" : scrollX > 0 ? "LEFT" : "RIGHT";
    var directionY = !scrollY ? "NONE" : scrollY > 0 ? "UP" : "DOWN";
    return directionY;
  }

  openSearch() {
    this.openSearchSwitch = true;
    let newState = new State("openSearchBoxState",true);
    this.componentStateServie.setState(newState);
  }
}
