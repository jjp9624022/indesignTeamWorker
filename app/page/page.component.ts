import { ROUTER_DIRECTIVES }  from '@angular/router';
import { BookService }        from '../book.service';
import { Component, EventEmitter, Input, OnInit, OnDestroy, Output } from '@angular/core';
import {Page} from './page';
import {Para} from '../para/para';
import {ParaComponent} from '../para/para.component';


@Component({
  selector: 'my-page-detail',
  templateUrl: 'app/page/page.component.html',
  styleUrls: ['app/page/page.component.css'],
  directives: [ParaComponent]
})

export class PageComponent implements OnInit, OnDestroy {
  @Input() page: Page;
  @Output() close = new EventEmitter();
  error: any;
  sub: any;
  navigated = false; // true if navigated here

ngOnInit() {
   
  }

  ngOnDestroy() {
  }

  save() {
  }

}