import { Actions, Effect } from '@ngrx/effects';
import { Injectable } from '@angular/core';
import * as firebase from 'firebase';
import { Router } from '@angular/router';

import * as AuthActions from './auth.actions';
import { fromPromise } from 'rxjs/internal/observable/fromPromise';
import { mergeMap, map, switchMap } from 'rxjs/internal/operators';

@Injectable()
export class AuthEffects {
  @Effect()
  authSignup = this.actions$
    .ofType(AuthActions.TRY_SIGNUP)
    .pipe(
      map((action: AuthActions.TrySignup) => {
        return action.payload;
      }),
      switchMap((authData: { username: string, password: string }) => {
        return fromPromise(firebase.auth().createUserWithEmailAndPassword(authData.username, authData.password));
      }),
      switchMap(() => {
        return fromPromise(firebase.auth().currentUser.getIdToken());
      }),
      mergeMap((token: string) => {
        this.router.navigate(['/']);
        return [
          {
            type: AuthActions.SIGNUP
          },
          {
            type: AuthActions.SET_TOKEN,
            payload: token
          }
        ];
      })
    );

  @Effect()
  authSignIn = this.actions$
    .ofType(AuthActions.TRY_SIGNIN)
    .pipe(
      map((action: AuthActions.TrySignin) => {
        return action.payload;
      }),
      switchMap((authData: { username: string, password: string }) => {
        return fromPromise(firebase.auth().signInWithEmailAndPassword(authData.username, authData.password));
      }),
      switchMap(() => {
        return fromPromise(firebase.auth().currentUser.getIdToken());
      }),
      mergeMap((token: string) => {
        this.router.navigate(['/']);
        return [
          {
            type: AuthActions.SIGNIN
          },
          {
            type: AuthActions.SET_TOKEN,
            payload: token
          }
        ];
      })
    );

  constructor(private actions$: Actions,
              private router: Router) {
  }


}
