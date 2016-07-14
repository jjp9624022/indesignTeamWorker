export class Para {
  id: string;
  name: string;
  bounds:number[];
  contents:string[];
  changes:Change[];
  notes:Note[];

}


export class Change{
	    id:string;
		bounds:number[];
		contents:string[];
		user:User;
		date:string;

		
}


export class Note{

        id:string;
		bounds:number[];
		contents:string[];
		user:User;
		date:string;

		}
export class User{
	id:string;
	

}