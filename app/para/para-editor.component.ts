import { Component, EventEmitter, Input, OnInit, OnDestroy, Output,OnChanges} from '@angular/core';
import {Observable} from 'rxjs/Rx';
import {Editor} from 'primeng/primeng';
import {Header} from 'primeng/primeng';

@Component({
  selector: 'my-para-editor',
  templateUrl: 'app/para/para-editor.component.html',
  styleUrls: ['app/para/para-editor.component.css'],
directives: [Editor,Header],


})
export class ParaEditorComponent implements OnInit {
	@Input() contents:string;



    ngOnInit(){


    }
}



