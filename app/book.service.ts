import { Injectable }    from '@angular/core';
import { Headers, Http } from '@angular/http';

import 'rxjs/add/operator/toPromise';

import { Book } from './book';

@Injectable()
export class BookService {

  private booksUrl = 'api/books';  // URL to web api

  constructor(private http: Http) { }

  getBooks(): Promise<Book[]> {
    // console.error(this.http.get(this.booksUrl).toPromise().then())
    return this.http.get(this.booksUrl)
               .toPromise()
               .then(response => response.json())//这里坑太大，data属性只用于他们的in mamory server
               .catch(this.handleError);

  }

  getBook(id: number) {
    return this.getBooks()
               .then(books => books.filter(book => book.id === id)[0]);
  }

  save(book: Book): Promise<Book>  {
    if (book.id) {
      return this.put(book);
    }
    return this.post(book);
  }

  delete(book: Book) {
    let headers = new Headers();
    headers.append('Content-Type', 'application/json');

    let url = `${this.booksUrl}/${book.id}`;

    return this.http
               .delete(url, headers)
               .toPromise()
               .catch(this.handleError);
  }

  // Add new Book
  private post(book: Book): Promise<Book> {
    let headers = new Headers({
      'Content-Type': 'application/json'});

    return this.http
               .post(this.booksUrl, JSON.stringify(book), {headers: headers})
               .toPromise()
               .then(res => res.json().data)
               .catch(this.handleError);
  }

  // Update existing Book
  private put(book: Book) {
    let headers = new Headers();
    headers.append('Content-Type', 'application/json');

    let url = `${this.booksUrl}/${book.id}`;

    return this.http
               .put(url, JSON.stringify(book), {headers: headers})
               .toPromise()
               .then(() => book)
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