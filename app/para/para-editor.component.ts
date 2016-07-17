import { Component, EventEmitter, Input, OnInit, OnDestroy, Output,OnChanges} from '@angular/core';

import {Observable} from 'rxjs/Rx';

import {Character} from './character';
import {Document} from './document';
import {KeyMap} from './key-map';

@Component({
  selector: 'my-page-editor',
  templateUrl: 'app/para/para-editor.component.html',
  styleUrls: ['app/para/para-editor.component.css'],



})
export class ParaEditorComponent implements OnInit {
	@Input() contents:string;

    keyUp:any;
    click:any;
    keyDown:any;
    mouseDown:any;
    editor:any;

    currentDocument = new Document();

    isSuportedCharacter(keyCode:any){
        if(keyCode >= KeyMap.a && keyCode < KeyMap.z){
            return true;
        }

        if(keyCode === KeyMap.enter || keyCode === KeyMap.spaceBar || keyCode === KeyMap.backSpace){
            return true;
        }

        if(keyCode >= KeyMap.zero && keyCode <= KeyMap.nine){
            return true;
        }

        return false;
    }

    getCharacterFromElement(e,operation){
        let index = [].slice.call(this.editor.children).indexOf(e.target);
        if(index >= 0) {
            return {operation: operation, character: this.currentDocument.characters[index],element:e};
        }
        return null;
    }

    ngOnInit(){

        this.editor = document.getElementById('page');

        this.keyUp = Observable.fromEvent(document,'keyup')
                     .filter((k:any) => this.isSuportedCharacter(k.which))
                     .map((k:any) => {
                        return {operation:'modify',character:new Character(k.which),element:k};
                     });

        this.mouseDown = Observable.fromEvent(this.editor,'mousedown')
            .do(e => this.currentDocument.clearSelection())
            .flatMap((m) => Observable.fromEvent(this.editor,'mousemove'))
            .map((e:any) => this.getCharacterFromElement(e,'range'))
            .filter(e => e !== null)
            .takeUntil(Observable.fromEvent(this.editor,'mouseup')).repeat();

        this.click = Observable.fromEvent(this.editor,'click')
            .map((e:any) => this.getCharacterFromElement(e,'select'))
            .filter(e => e !== null);

        //Prevents page jumping
        this.keyDown = Observable.fromEvent(document,'keydown')
            .filter((k:any) => k.which === KeyMap.spaceBar || k.which === KeyMap.backSpace)
            .map((k:any) => {
                return {element:k};
            });

        this.keyUp
        .merge(this.click)
        .merge(this.mouseDown)
        .merge(this.keyDown).subscribe(e =>
        {
            this.currentDocument.processInput(e.character,e.operation);
            e.element.preventDefault();
        });

    }
}



