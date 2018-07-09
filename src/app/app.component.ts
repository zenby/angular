import { Component, OnInit } from '@angular/core';
import * as firebase from 'firebase';
import { keys } from '../environments/environment';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})

export class AppComponent implements OnInit {

  ngOnInit() {
    firebase.initializeApp({
      apiKey: keys.firebaseKey,
      authDomain: keys.firebaseDomain,
    });
  }
}
