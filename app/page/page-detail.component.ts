import { Component, EventEmitter, Input, OnInit, OnDestroy, Output,OnChanges} from '@angular/core';
import { Page }        from './page';
import {NgStyle} from '@angular/common';

import { Para }        from '../para/para';
import { ParaService } from '../para/para.service';
import { PageService } from './page.service';
import {ParaEditorComponent} from '../para/para-editor.component'
export var Quill = require("quill");//这句太关键，但是有点丑陋，其实就是从这一句我发现了ts的配置诀窍。
// export var EventEmitter2=require("eventemitter2");
        
@Component({
  selector: 'my-page-detail',
  templateUrl: 'app/page/page-detail.component.html',
  styleUrls: ['app/page/page-detail.component.css'],
  providers: [
    ParaService,//这里不放pageservice，di向上查找pageservice。
  ],

   directives:[NgStyle], 
/*  目前不需要单段落隔离编辑，
考虑用quill做到交叉的编辑，
太多的框化不利于编辑效率。废弃paraeditor，
但是逐步会加入一些新的要素*/

})
export class PageDetailComponent implements OnInit,OnChanges {
@Input() page:Page;
sub: any;
editor:any;


paras: Para[] = [];

  constructor(
  	private pageService:PageService,
    private paraService: ParaService) {
  }
  ngOnInit() {
  this.editor = new Quill('#editor', {
  modules: {
    // 'authorship': { authorId: 'galadriel', enabled: true },
    // 'multi-cursor': true,
    'toolbar': { container: '#full-toolbar' },
    // 'link-tooltip': true
  },
  theme: 'snow'
}); 
}

doEditor(paras:any){
    let text:any=[];
    for (var i =0 ; i < paras.length; i++) {
      text.push({insert:""+paras[i].contents});
      text.push({ insert: '\n', attributes: { align: 'left' } });


    }
        console.info(text);


    this.editor.setContents(text);
/*    this.editor.addModule('toolbar', { container: '#toolbar' });
    var module = this.editor.addModule('authorship', {
  authorId: 'id-1234',
  button: '#author-button',
  color: 'rgb(255, 0, 255)'
});

module.addAuthor('id-5678', 'rgb(255, 255, 0)'); */
// Set external authors

/*this.editor.on('text-update', function(delta) {
  // If the user types an 'a' into the editor, normally we would get:
  //   delta.ops = [{ 'a' }]
  // But with the author module enabled we would now get:
  //   delta.ops = [{ value: 'a', attributes: { author: 'id-1234' } }]
});*/

    
          
    


  }
ngOnChanges(){
      this.paraService.setBookId(this.pageService.getBookId()).setPageId(this.page.id);
     this.paraService.getParas()
      .then(paras=> this.doEditor(paras));
      /*{this.paras = paras;console.info(this.paras);
          this.editor = new Quill('#editor');
          
          this.editor.setText(""+this.paras[0].contents);

      }*/
      
}
}
