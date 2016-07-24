/// <reference path="./module.d.ts" />

import { Observable }     from 'rxjs/Observable';

// import Quill from '../quill';
// let _      = Quill.require('lodash');
// import "quill";//这句太关键，但是有点丑陋，其实就是从这一句我发现了ts的配置诀窍。
export var Quill = require("quill");
export var Delta = Quill.import('delta');

// import * as Module from ('quill');
// let Delta  = Quill.require('delta');
// let Module = Quill.require('module');
// import Module from '../core/module';
// import Parchment from 'parchment';

class Module{
  quill;
  options;
  constructor(quill, options = {}) {
    this.quill = quill;
    this.options = options;
  }
}
export class Authorship {
    quill;
  options;

  static DEFAULTS = {
    authorId: null,
    color: 'transparent',
    enabled: true
  };

  constructor(quill, options) {
    //可以不用继承。先试试，因为继承牵涉的太多了
    // super(quill, options);
    console.info("authorship on");
var Parchment = Quill.import('parchment');


    // console.info(this.quill);
    this.quill = quill;
    this.options = options;
    // if (this.options.button != null) { this.attachButton(this.options.button); }
    // if (this.options.enabled) { this.enable(); }
        // this.quill.addFormat('author', { class: 'author-' });
    if (this.options.authorId == null) { return; }
    //to-do 计划改成观察者模式。貌似有点问题，这个函数是挂在quill对象里面的，最好不要动他们的原始逻辑。
    //我还是只关注自己的业务逻辑比较好。收回。
/*    Observable.fromEvent(this.quill,this.quill.constructor.events.PRE_EVENT).map()*/
    this.quill.on(this.quill.constructor.events.EDITOR_CHANGE, (eventName, delta, origin) => {
      console.info(eventName,origin,delta);
      if (eventName === this.quill.constructor.events.TEXT_CHANGE && true/*origin === 'user'*/) {
        let authorDelta = new Delta();
        let authorFormat = { author: this.options.authorId };

        //这像个pipline
        for(let op of delta.ops) {
          if (op.delete != null) { return; }
          if ((op.insert != null) || ((op.retain != null) && (op.attributes != null))) {
            // Add authorship to insert/format
            if (!op.attributes) { op.attributes = {}; }
            op.attributes.author = this.options.authorId;
            // Apply authorship to our own editor
            return authorDelta.retain(op.retain || op.insert.length || 1, authorFormat);
          } else {
            return authorDelta.retain(op.retain);
          }
        }
        
        return this.quill.updateContents(authorDelta, Quill.sources.SILENT);
      }
    }
    );
    this.addAuthor(this.options.authorId, this.options.color);
  }



//这一部分可以扩展到权限之类的东西，总之，办法比较多。
  addAuthor(id, color) {
    // let styles = {};
    // styles[`.authorship .author-${id}`] = { "background-color": `${color}` };
    // return this.quill.theme.addStyles(styles);
  }
//这一部分要链接入angular的组件
  // attachButton(button) {

  //   // let mybutton = document.getElementById(button);


  //    var source  = Observable.fromEvent(button,'click');
  //    var subscription = source.subscribe(e => button.enable);

  //   // return mybutton.on('click', () => {
  //   //   mybutton.toggleClass('ql-on');
  //     return this.enable(button.enable);
  //   }
      
  // enable(enabled = true) {
  //   return dom(this.quill.root).toggleClass('authorship', enabled);
  // }

  // disable() {
  //   return this.enable(false);
  // }
}
