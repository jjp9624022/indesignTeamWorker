import { Component, OnInit } from '@angular/core';
import { Router }           from '@angular/router';

import { Book }        from './book';
import { BookService } from './book.service';

@Component({
  selector: 'my-dashboard',
  templateUrl: 'app/dashboard.component.html',
  styleUrls: ['app/dashboard.component.css']
})
export class DashboardComponent implements OnInit {

  books: Book[] = [];

  constructor(
    private router: Router,
    private bookService: BookService) {
  }

  ngOnInit() {
 
    this.bookService.getBooks()
      .then(books=> this.books = books.slice(1, 5));
  }

  gotoDetail(book: Book) {
    let link = ['/detail', book.id];
    this.router.navigate(link);
  }
}


/*
Copyright 2016 Google Inc. All Rights Reserved.
Use of this source code is governed by an MIT-style license that
can be found in the LICENSE file at http://angular.io/license
*/