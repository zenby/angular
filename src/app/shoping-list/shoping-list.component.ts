import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';

import { ShoppingListService } from './shoping-list.service';
import { Ingredient } from '../shared/ingredient.model';
import { animate, state, style, transition, trigger } from '@angular/animations';

@Component({
  selector: 'app-shoping-list',
  templateUrl: './shoping-list.component.html',
  styleUrls: ['./shoping-list.component.css'],
  animations: [
    trigger('list1', [
      state('in', style({
        opacity: 1,
        transform: 'translateX(0)'
      })),
      transition('void => *', [
        style({ // requires initial styles that will be implemented before animation
          opacity: 0,
          transform: 'translateX(-100px)'
        }),
        animate(300)]),
      transition('* => void', [
        animate(300, style({
          transform: 'translateX(100px)',
          opacity: 0
        }))
      ])
    ]),
  ]
})
export class ShopingListComponent implements OnInit, OnDestroy {
  ingredients: Ingredient[];
  private subscription: Subscription;

  constructor(private slService: ShoppingListService) {
  }

  ngOnInit() {
    this.ingredients = this.slService.getIngredients();
    this.subscription = this.slService.ingredientsChanged
      .subscribe((ingredients: Ingredient[]) => {
        this.ingredients = ingredients;
      });
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }


  onEditItem(index: number) {
    this.slService.startedEditing.next(index);
  }

}
