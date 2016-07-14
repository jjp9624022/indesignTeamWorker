import { ROUTER_DIRECTIVES }  from '@angular/router';
import { BookService }        from '../book.service';
import { Component, EventEmitter, Input, OnInit, OnDestroy, Output } from '@angular/core';
import {Para} from './para';



@Component({
  selector: 'para',
  templateUrl: 'app/para/para.component.html',
  styleUrls: ['app/para/para.component.css'],
})

export class ParaComponent implements OnInit, OnDestroy {
  @Input() para: Para;
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