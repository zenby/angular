import { Component, OnInit } from '@angular/core';
import { animate, state, style, transition, trigger } from '@angular/animations';

const STATES = {
  highlight: 'highlight',
  normal: 'normal',
  shrunken: 'shrunken'
};

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
  animations: [
    trigger('divState', [
      state(STATES.normal, style({
        'background-color': 'red',
        transform: 'translateX(0)'
      })),
      state(STATES.highlight, style({
        backgroundColor: 'blue',
        transform: 'translateX(100px)'
      })),
      transition(`${STATES.normal} <=> ${STATES.highlight}`, animate(300))
    ]),
    trigger('wildState', [
      state(STATES.normal, style({
        'background-color': 'red',
        transform: 'translateX(0) scale(1)'
      })),
      state(STATES.highlight, style({
        backgroundColor: 'blue',
        transform: 'translateX(100px) scale(1)'
      })),
      state(STATES.shrunken, style({
        backgroundColor: 'green',
        transform: 'translateX(0) scale(0.5)'
      })),
      transition(`${STATES.normal} => ${STATES.highlight}`, animate(300)),
      transition(`${STATES.highlight} => ${STATES.normal}`, animate(800)),
      transition(`${STATES.shrunken} <=> *`, [
        style({ // implement styles
          backgroundColor: 'orange'
        }),
        animate(1000, style({ // animate the result
          borderRadius: '50px'
        })),
        animate(500) // animate our shrunk transition
      ])
    ])
  ]
})
export class HomeComponent implements OnInit {
  state = STATES.normal;
  wildState = STATES.normal;

  constructor() {
  }

  ngOnInit() {
  }

  onAnimate() {
    this.state === STATES.normal
      ? this.state = STATES.highlight
      : this.state = STATES.normal;
    this.wildState === STATES.normal
      ? this.wildState = STATES.highlight
      : this.wildState = STATES.normal;
  }

  onShrink() {
    this.wildState = STATES.shrunken;
  }

// can be useful to analyze animation event
  animationStarted(event) {
    // console.log(event);
  }

// can be useful to analyze animation event
  animationFinished(event) {
    // console.log(event);
  }
}
