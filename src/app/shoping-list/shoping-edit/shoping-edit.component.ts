import { Component, OnInit, OnDestroy, ViewChild } from '@angular/core';
import { animate, state, style, transition, trigger } from '@angular/animations';
import { NgForm } from '@angular/forms';
import { Subscription } from 'rxjs';

import { ShoppingListService } from '../shoping-list.service';
import { Ingredient } from '../../shared/ingredient.model';

const STATES = {
  highlight: 'highlight',
  normal: 'normal',
  shrunken: 'shrunken'
};

@Component({
  selector: 'app-shoping-edit',
  templateUrl: './shoping-edit.component.html',
  styleUrls: ['./shoping-edit.component.css'],
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
export class ShopingEditComponent implements OnInit, OnDestroy {
  @ViewChild('f') slForm: NgForm;
  subscription: Subscription;
  editMode = false;
  editedItemIndex: number;
  editedItem: Ingredient;
  state = STATES.normal;
  wildState = STATES.normal;

  constructor(private slService: ShoppingListService) {
  }

  ngOnInit() {
    this.subscription = this.slService.startedEditing
      .subscribe(
        (index: number) => {
          this.editMode = true;
          this.editedItemIndex = index;
          this.editedItem = this.slService.getIngredient(index);
          this.slForm.setValue({
            name: this.editedItem.name,
            amount: this.editedItem.amount
          });
        }
      );
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

  onSubmit(form: NgForm) {
    const value = form.value;
    const newIngredient = new Ingredient(value.name, value.amount);
    if (this.editMode) {
      this.slService.updateIngredient(this.editedItemIndex, newIngredient);
    } else {
      this.slService.addIngredient(newIngredient);
    }
    this.editMode = false;
    form.reset();
  }

  onDelete() {
    this.slService.deleteIngredient(this.editedItemIndex);
    this.onClear();
  }

  onClear() {
    this.slForm.reset();
    this.editMode = false;
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }
}

