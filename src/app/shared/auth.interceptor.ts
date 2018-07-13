import { HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Injectable } from '@angular/core';
import { Store } from '@ngrx/store';

import * as fromApp from '../store/app.reducers';
import * as fromAuth from '../auth/store/auth.reducers';
import { switchMap, take } from 'rxjs/internal/operators';

@Injectable()
export class AuthInterceptor implements HttpInterceptor {
  constructor(private store: Store<fromApp.AppState>) {
  }

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    // const copiedRequest = req.clone({headers: req.headers.append('','')}); - add headers

    return this.store.select('auth')
      .pipe(
        take(1),
        switchMap((authState: fromAuth.State) => {
          const config = {params: req.params.append('auth', authState.token)};
          const copiedRequest = req.clone(authState.token ? config : '');
          return next.handle(copiedRequest);
        })
      );
  }
}

