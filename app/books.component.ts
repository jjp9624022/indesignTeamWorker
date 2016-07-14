import { Component, OnInit } from '@angular/core';
import { Router }            from '@angular/router';

import { Book }                from './book';
import { BookService }         from './book.service';
import { BookDetailComponent } from './book-detail.component';

@Component({
  selector: 'my-books',
  templateUrl: 'app/books.component.html',
  styleUrls:  ['app/books.component.css'],
  directives: [BookDetailComponent]
})
export class BooksComponent implements OnInit {
  books: Book[];
  selectedBook: Book;
  addingBook = false;
  error: any;

  constructor(
    private router: Router,
    private bookService: BookService) { }

  getBooks() {
    this.bookService
        .getBooks()
        .then(books => this.books = books)
        .catch(error => this.error = error);
  }

  addBook() {
    this.addingBook = true;
    this.selectedBook = null;
  }

  close(savedBook: Book) {
    this.addingBook = false;
    if (savedBook) { this.getBooks(); }
  }

  deleteBook(book: Book, event: any) {
    event.stopPropagation();
    this.bookService
        .delete(book)
        .then(res => {
          this.books = this.books.filter(h => h !== book);
          if (this.selectedBook === book) { this.selectedBook = null; }
        })
        .catch(error => this.error = error);
  }

  ngOnInit() {
    this.getBooks();
  }

  onSelect(book: Book) {
    this.selectedBook = book;
    this.addingBook = false;
  }

  gotoDetail() {
    this.router.navigate(['/detail', this.selectedBook.id]);
  }
}


/*
Copyright 2016 Google Inc. All Rights Reserved.
Use of this source code is governed by an MIT-style license that
can be found in the LICENSE file at http://angular.io/license
*/