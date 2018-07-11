import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { Store } from '@ngrx/store';

import { ShoppingListService } from './shoping-list.service';
import { Ingredient } from '../shared/ingredient.model';
import * as fromShoppingList from './store/shoping-list.reducers';

@Component({
  selector: 'app-shoping-list',
  templateUrl: './shoping-list.component.html',
  styleUrls: ['./shoping-list.component.css']
})
export class ShopingListComponent implements OnInit {
  shopingListState: Observable<{ ingredients: Ingredient[] }>;

  constructor(private slService: ShoppingListService,
              private store: Store<fromShoppingList.AppState>) {
  }

  ngOnInit() {
    this.shopingListState = this.store.select('shoppingList');
  }

  onEditItem(index: number) {
    this.slService.startedEditing.next(index);
  }

}
