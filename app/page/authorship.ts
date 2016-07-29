/// <reference path="./module.d.ts" />

// import { Observable }     from 'rxjs/Observable';

// import Quill from '../quill';
// let _      = Quill.require('lodash');
// import "quill";//这句太关键，但是有点丑陋，其实就是从这一句我发现了ts的配置诀窍。
export var Quill = require("quill");
export var Delta = Quill.import('delta');
export var Bold = Quill.import('formats/bold');
export var Inline=Quill.import('blots/inline');
export var Parchment = Quill.import('parchment');



// export var deepcopy = require('deepcopy');
// import * as Module from ('quill');
// let Delta  = Quill.require('delta');
// let Module = Quill.require('module');
// import Module from '../core/module';
// import Parchment from 'parchment';


export class Authorship implements Module {
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
let authorClass = new Parchment.Attributor.Class('author', 'author', {
  scope: Parchment.Scope.INLINE
});
// let authorStyle = new Parchment.Attributor.Style('author', 'background-color');
let idClass = new Parchment.Attributor.Class('idClass', 'id', {
  scope: Parchment.Scope.BLOCK
});
//这里是全部关于定位的属性：
let heightStyle = new Parchment.Attributor.Style('heightStyle', 'height',{
  scope: Parchment.Scope.BLOCK
});

let widthStyle = new Parchment.Attributor.Style('widthStyle', 'width',{
  scope: Parchment.Scope.BLOCK
});

let topStyle = new Parchment.Attributor.Style('topStyle', 'top',{
  scope: Parchment.Scope.BLOCK
});
let leftStyle = new Parchment.Attributor.Style('leftStyle', 'left',{
  scope: Parchment.Scope.BLOCK
});
let fontsizeStyle = new Parchment.Attributor.Style('fontsizeStyle', 'font-size',{
  scope: Parchment.Scope.INLINE
});
let positionStyle = new Parchment.Attributor.Style('positionStyle', 'position',{
  scope: Parchment.Scope.BLOCK
});

let textoverflow = new Parchment.Attributor.Style('textoverflow', 'text-overflow',{
  scope: Parchment.Scope.BLOCK
});

let visableStyle = new Parchment.Attributor.Style('visableStyle', 'opacity',{
  scope: Parchment.Scope.BLOCK
});

Quill.register({'formats/heightStyle':heightStyle});
Quill.register({'formats/widthStyle':widthStyle});
Quill.register({'formats/topStyle':topStyle});
Quill.register({'formats/leftStyle':leftStyle});
Quill.register({'formats/positionStyle':positionStyle});
Quill.register({'formats/fontsizeStyle':fontsizeStyle});
Quill.register({'formats/textoverflow':textoverflow});
Quill.register({'formats/visableStyle':visableStyle});




// class Frame implements Inline{
//   static blotName;
//   static tagName;
// }

// Frame.blotName ='buttonTag';
// Frame.tagName='myTag';
// Quill.register({'formats/bold':Frame});
// Quill.register({'formats/bold':Inline});
Quill.register({'formats/idClass':idClass});
Quill.register({'formats/authorClass':authorClass});

// Quill.register({'formats/selfId':selfId});
// Quill.register({'formats/authorStyle':authorStyle});
//Adding Arrray to XArray prototype chain.
// var Change=Inline;
// Change.blotName=deepcopy(Inline.blotName);
// Change.tagName=deepcopy(Inline.tagName);
// Change.blotName='change';
// Change.tagName='CHANGE';
// console.info(Change);
// Quill.register({'formats/authorTag':Change}); 



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
    this.quill.on(this.quill.constructor.events.TEXT_CHANGE, (delta, old_delta/*it is history*/, origin) => {
      // console.info(origin,old_delta,delta);
      if (/*eventName === this.quill.constructor.events.TEXT_CHANGE && true*/origin === 'user') {
        let authorDelta = new Delta();

        let authorTag={authorTag:true};
        //这像个pipline
        for(let op of delta.ops) {

          if (op.retain && !op.attributes){
            authorDelta.retain(op.retain);
          }else
          if(op.insert){

            if (!op.attributes) { op.attributes = {}; }
            op.attributes.author = this.options.authorId;
            op.attributes.angularTag=true;

            authorDelta.insert(op.insert,op.attributes);
            console.info("insert",op);
            

          }else
          if(op.retain &&  op.attributes!= null){
            // op.attributes.authorStyle="gray";
            op.attributes.author = this.options.authorId;
            op.attributes.angularTag=true;

            authorDelta.retain(op.retain,op.attributes);
            console.info("changeFormat",op);

          }else

          if(op.delete){

            // op.attributes.author = this.options.authorId;
            //需要动大
            authorDelta.delete(op.delete);
            

          }else {

          authorDelta.retain((op.insert != null) || ((op.retain != null)||(op.delete != null)));

          }


        }
        console.info(authorDelta);

        this.quill.updateContents(authorDelta, Quill.sources.SILENT);
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
