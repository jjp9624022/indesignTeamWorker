import { Component, OnInit,Input } from '@angular/core';

import { Page }                from './page';
import { PageService }         from './page.service';
import { PageDetailComponent } from './page-detail.component';

@Component({
  selector: 'my-pages',
  templateUrl: 'app/pages.component.html',
  styleUrls:  ['app/pages.component.css'],
})
export class PagesComponent implements OnInit {
  @Input() pages: Page[];
  selectedPage: Page;
  addingPage = false;
  error: any;

  constructor(
    private pageService: PageService) { }

  // getPages() {
  //   this.pageService
  //       .getPages()
  //       .then(pages => this.pages = pages)
  //       .catch(error => this.error = error);
  // }



  ngOnInit() {
    
  }

  onSelect(page: Page) {
    this.selectedPage = page;
    this.addingPage = false;
  }

  
}


/*
Copyright 2016 Google Inc. All Rights Reserved.
Use of this source code is governed by an MIT-style license that
can be found in the LICENSE file at http://angular.io/license
*/