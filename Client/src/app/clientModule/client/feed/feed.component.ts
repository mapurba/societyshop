import { Route } from '@angular/compiler/src/core';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-feed',
  templateUrl: './feed.component.html',
  styleUrls: ['./feed.component.css'],

})
export class FeedComponent implements OnInit {

  searchListQ = "";
  constructor(
    private route: ActivatedRoute
  ) {
    this.route.params.subscribe((params) => {
      console.log(params);
      if (params.search) {
        this.searchListQ = params.search;
      }
    });

  }

  ngOnInit() {

  }



}
