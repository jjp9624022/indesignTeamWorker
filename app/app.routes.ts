import { provideRouter, RouterConfig }  from '@angular/router';

import { DashboardComponent } from './dashboard.component';
import { BooksComponent } from './books.component';
import { BookDetailComponent } from './book-detail.component';
import { PageEditorComponent } from './page/page-editor.component';

export const routes: RouterConfig = [
  {
    path: '',
    redirectTo: '/dashboard',
    pathMatch: 'full'
  },
  {
    path: 'dashboard',
    component: DashboardComponent
  },
  {
    path: 'detail/:id',
    component: BookDetailComponent
  },
  {
    path: 'editor/:id',
    component: PageEditorComponent
  },
  //  {
  //   path: 'books/:id/pages/:pageId',
  //   component: PageEditorComponent
  // }, 
  {
    path: 'books',
    component: BooksComponent
  }
];

export const APP_ROUTER_PROVIDERS = [
  provideRouter(routes)
];


/*
Copyright 2016 Google Inc. All Rights Reserved.
Use of this source code is governed by an MIT-style license that
can be found in the LICENSE file at http://angular.io/license
*/