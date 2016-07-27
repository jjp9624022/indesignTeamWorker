
declare interface Module {
	quill:any;
    options:any;
	// constructor(quill, options?) 
}




declare interface InlineStatic{
blotName;
tagName;
compare(self, other);
formatAt(index, length, name, value);
allowedChildren:any[];
order:any[];
}


declare var Inline: InlineStatic;

declare module "Inline" {

    export = Inline;
}

declare interface QuillStatic{
	    sources;
	    import(things:string):any
	    register(path, target, overwrite?)

}
declare module "Module" {
    export = Module;
}