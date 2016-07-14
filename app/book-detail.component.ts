import { Component, EventEmitter, Input, OnInit, OnDestroy, Output } from '@angular/core';

import { ActivatedRoute } from '@angular/router';

import { Book }        from './book';
import { BookService } from './book.service';

@Component({
  selector: 'my-book-detail',
  templateUrl: 'app/book-detail.component.html',
  styleUrls: ['app/book-detail.component.css']
})
export class BookDetailComponent implements OnInit, OnDestroy {
  @Input() book: Book;
  @Output() close = new EventEmitter();
  error: any;
  sub: any;
  navigated = false; // true if navigated here

  constructor(
    private bookService: BookService,
    private route: ActivatedRoute) {
  }

  ngOnInit() {
    this.sub = this.route.params.subscribe(params => {
      if (params['id'] !== undefined) {
        let id = +params['id'];
        this.navigated = true;
        this.bookService.getBook(id)
            .then(book => this.book = book);
      } else {
        this.navigated = false;
        this.book = new Book();
      }
    });
  }

  ngOnDestroy() {
    this.sub.unsubscribe();
  }

  save() {
    this.bookService
        .save(this.book)
        .then(book => {
          this.book = book; // saved book, w/ id if new
          this.goBack(book);
        })
        .catch(error => this.error = error); // TODO: Display error message
  }
  goBack(savedBook: Book = null) {
    this.close.emit(savedBook);
    if (this.navigated) { window.history.back(); }
  }
}


/*
Copyright 2016 Google Inc. All Rights Reserved.
Use of this source code is governed by an MIT-style license that
can be found in the LICENSE file at http://angular.io/license
*/