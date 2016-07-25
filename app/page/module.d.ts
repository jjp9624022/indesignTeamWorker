
declare class Module {
	quill:any;
    options:any;
	constructor(quill, options?) 
}

declare class Inline {
	blotName;
	tagName;
	constructor() 
}

declare interface QuillStatic{
	    sources;
	    import(things:string):any
	    register(path, target, overwrite?)

}
declare module "Module" {
    export = Module;
}