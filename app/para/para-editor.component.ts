/*考虑把这个组件改造为一个service，来处理修改的逻辑*/


import { Component, EventEmitter, Input, OnInit, OnDestroy, Output,OnChanges} from '@angular/core';
import {Observable} from 'rxjs/Rx';
import { Para }        from '../para/para';

// import {Editor} from 'primeng/primeng';
// import {Header} from 'primeng/primeng';

@Component({
  selector: 'my-para-editor',
  templateUrl: 'app/para/para-editor.component.html',
  styleUrls: ['app/para/para-editor.component.css'],
  // directives: [Editor,Header],

})
export class ParaEditorComponent implements OnInit {
	@Input() parasinfo:Para[]=[];
    editor:any;


    ngOnInit(){
    	    
/*    	this.editor=new quill('.editor');
    
    	quill.setText(this.contents);*/





    }
}



