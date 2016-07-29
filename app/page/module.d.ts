
declare interface Module {
	quill:any;
    options:any;
	// constructor(quill, options?) 
}



declare interface QuillStatic{
	    sources;
	    import(things:string):any
	    register(path, target, overwrite?)

}
declare module "Module" {
    export = Module;
}



// declare interface InlineStatic{

// compare(self, other);
// allowedChildren:any[];
// order:any[];
// blotName;
// tagName;


// formatAt(index, length, name, value);
// }


// declare interface Inline {

// }


// declare var Inline:InlineStatic;

// declare module "Inline" {

//     export = Inline;
// }