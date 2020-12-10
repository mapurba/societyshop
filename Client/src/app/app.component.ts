import { Component, HostListener, Inject } from '@angular/core';
import { DOCUMENT } from '@angular/platform-browser';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {


  // sticky footer 
  title = 'Client';
  windowScrolled: boolean;
  scrollDirection:string;
  currentXPos;
  currentYpos;

  constructor(@Inject(DOCUMENT) private document: Document) { }
  @HostListener("window:scroll", [])
  onWindowScroll() {
    let  scrollX = (this.currentXPos || window.pageXOffset) - window.pageXOffset;
    let  scrollY = (this.currentYpos || window.pageYOffset) - window.pageYOffset;
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

  ngOnInit() { }


  getScrollDirection(scrollX, scrollY) {
    // var directionX = !scrollX ? "NONE" : scrollX > 0 ? "LEFT" : "RIGHT";
    var directionY = !scrollY ? "NONE" : scrollY > 0 ? "UP" : "DOWN";
    return directionY;
  }
}
