import { Injectable }    from '@angular/core';
import { Headers, Http } from '@angular/http';

import 'rxjs/add/operator/toPromise';

import { Page } from './page';

@Injectable()
export class PageService {

  private pagesUrl = 'api/pages';  // URL to web api
  

  constructor(private http: Http) { }

  getPages(): Promise<Page[]> {
    // console.error(this.http.get(this.pagesUrl).toPromise().then())
    return this.http.get(this.pagesUrl)
               .toPromise()
               .then(response => response.json().data)//这里坑太大，data属性只用于他们的in mamory server
               .catch(this.handleError);

  }

  // getPage(id: number) {
  //   return this.getPages()
  //              .then(pages => pages.filter(page => page.id === id)[0]);
  // }
  getPage(id: number): Promise<Page> {
    // console.error(this.http.get(this.pagesUrl).toPromise().then())
    return this.http.get(this.pagesUrl+id)
               .toPromise()
               .then(response => response.json().data)//这里坑太大，data属性只用于他们的in mamory server
               .catch(this.handleError);
             }


  save(page: Page): Promise<Page>  {
    if (page.id) {
      return this.put(page);
    }
    return this.post(page);
  }

  delete(page: Page) {
    let headers = new Headers();
    headers.append('Content-Type', 'application/json');

    let url = `${this.pagesUrl}/${page.id}`;

    return this.http
               .delete(url, headers)
               .toPromise()
               .catch(this.handleError);
  }

  // Add new Page
  private post(page: Page): Promise<Page> {
    let headers = new Headers({
      'Content-Type': 'application/json'});

    return this.http
               .post(this.pagesUrl, JSON.stringify(page), {headers: headers})
               .toPromise()
               .then(res => res.json().data)
               .catch(this.handleError);
  }

  // Update existing Page
  private put(page: Page) {
    let headers = new Headers();
    headers.append('Content-Type', 'application/json');

    let url = `${this.pagesUrl}/${page.id}`;

    return this.http
               .put(url, JSON.stringify(page), {headers: headers})
               .toPromise()
               .then(() => page)
               .catch(this.handleError);
  }

  private handleError(error: any) {
    console.error('An error occurred', error);
    return Promise.reject(error.message || error);
  }
}



/*
Copyright 2016 Google Inc. All Rights Reserved.
Use of this source code is governed by an MIT-style license that
can be found in the LICENSE file at http://angular.io/license
*/