import { Component, OnInit } from '@angular/core';

let $: any;
@Component({
  selector: 'app-calculator',
  templateUrl: './calculator.component.html',
  styleUrls: ['./calculator.component.css']
})
export class CalculatorComponent implements OnInit {

  constructor() { }

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

}
