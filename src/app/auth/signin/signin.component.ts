import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Store } from '@ngrx/store';
import { animate, state, style, transition, trigger } from '@angular/animations';

import * as fromApp from '../store/auth.reducers';
import * as AuthActions from '../store/auth.actions';

@Component({
  selector: 'app-signin',
  templateUrl: './signin.component.html',
  styleUrls: ['./signin.component.css'],
  animations: [
    trigger('signState', [
      state('in', style({
        opacity: 1,
        transform: 'translateX(0)'
      })),
      transition('void => *', [
        style({
          opacity: 0,
          transform: 'translateX(200px) rotate(180deg)'
        }),
        animate(300)]),
      transition('* => void', [
        animate(300, style({
          transform: 'translateX(100px)',
          opacity: 0
        }))
      ])
    ])
  ]
})
export class SigninComponent implements OnInit {

  constructor(private store: Store<fromApp.State>) {
  }

  ngOnInit() {
  }

  onSignin(form: NgForm) {
    const email = form.value.email;
    const password = form.value.password;
    this.store.dispatch(new AuthActions.TrySignin({username: email, password: password}));
  }
}
