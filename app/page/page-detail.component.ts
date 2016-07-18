import { Component, EventEmitter, Input, OnInit, OnDestroy, Output,OnChanges} from '@angular/core';
import { Page }        from './page';

import { Para }        from '../para/para';
import { ParaService } from '../para/para.service';
import { PageService } from './page.service';
import {ParaEditorComponent} from '../para/para-editor.component'

@Component({
  selector: 'my-page-detail',
  templateUrl: 'app/page/page-detail.component.html',
  styleUrls: ['app/page/page-detail.component.css'],
  providers: [
    ParaService,//这里不放pageservice，di向上查找pageservice。
  ],
  directives:[ParaEditorComponent],

})
export class PageDetailComponent implements OnInit,OnChanges {
@Input() page:Page;
sub: any;

  paras: Para[] = [];

  constructor(
  	private pageService:PageService,
    private paraService: ParaService) {
  }
  ngOnInit() { }
ngOnChanges(){
      this.paraService.setBookId(this.pageService.getBookId()).setPageId(this.page.id);
     this.paraService.getParas()
      .then(paras=> {this.paras = paras;console.info(paras);});
}
}
