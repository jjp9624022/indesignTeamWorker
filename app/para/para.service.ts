import { Injectable }    from '@angular/core';
import { Headers, Http } from '@angular/http';

import 'rxjs/add/operator/toPromise';

import { Para } from './para';

@Injectable()
export class ParaService {

  private parasUrl = 'api';  // URL to web api

  private bookId:number;

  private pageId:string;

  constructor(private http: Http) { }
  

  setBookId(id:number){
    this.bookId=id;
    return this;

  }

setPageId(id:string){
  this.pageId=id;
  return this
}

  getParas(): Promise<Para[]> {
    // console.error(this.http.get(this.parasUrl).toPromise().then())
    return this.http.get(this.parasUrl+'/books/'+this.bookId+'/pages/'+this.pageId+'/paras')
               .toPromise()
               .then(response => response.json().data)//这里坑太大，data属性只用于他们的in mamory server
               .catch(this.handleError);

  }

  // getPara(id: number) {
  //   return this.getParas()
  //              .then(paras => paras.filter(para => para.id === id)[0]);
  // }
  getPara(id: string): Promise<Para> {
    // console.error(this.http.get(this.parasUrl).toPromise().then())
    return this.http.get(this.parasUrl+id)
               .toPromise()
               .then(response => response.json().data)//这里坑太大，data属性只用于他们的in mamory server
               .catch(this.handleError);
             }


  save(para: Para): Promise<Para>  {
    if (para.id) {
      return this.put(para);
    }
    return this.post(para);
  }

  delete(para: Para) {
    let headers = new Headers();
    headers.append('Content-Type', 'application/json');

    let url = `${this.parasUrl}/${para.id}`;

    return this.http
               .delete(url, headers)
               .toPromise()
               .catch(this.handleError);
  }

  // Add new Para
  private post(para: Para): Promise<Para> {
    let headers = new Headers({
      'Content-Type': 'application/json'});

    return this.http
               .post(this.parasUrl, JSON.stringify(para), {headers: headers})
               .toPromise()
               .then(res => res.json().data)
               .catch(this.handleError);
  }

  // Update existing Para
  private put(para: Para) {
    let headers = new Headers();
    headers.append('Content-Type', 'application/json');

    let url = `${this.parasUrl}/${para.id}`;

    return this.http
               .put(url, JSON.stringify(para), {headers: headers})
               .toPromise()
               .then(() => para)
               .catch(this.handleError);
  }

  private handleError(error: any) {
    console.error('An error occurred', error);
    return Promise.reject(error.message || error);
  }
}

