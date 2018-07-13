import { Router, ActivatedRoute } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { animate, state, style, transition, trigger } from '@angular/animations';

import * as fromRecipe from '../store/recipe.reducers';
import * as fromAuth from '../../auth/store/auth.reducers';

@Component({
  selector: 'app-recipe-list',
  templateUrl: './recipe-list.component.html',
  styleUrls: ['./recipe-list.component.css'],
  animations: [
    trigger('recipeState', [
      state('in', style({
        opacity: 1,
      })),
      transition('* => void', [
        animate(300, style({
          opacity: 0
        }))
      ])
    ])
  ]
})
export class RecipeListComponent implements OnInit {
  recipeState: Observable<fromRecipe.State>;
  authState: Observable<fromAuth.State>;

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private store: Store<fromRecipe.FeatureState>,
    private authStore: Store<fromAuth.State>
  ) {
  }

  ngOnInit() {
    this.recipeState = this.store.select('recipes');
    this.authState = this.authStore.select('auth');
  }

  onNewRecipe() {
    this.router.navigate(['new'], {relativeTo: this.route});
  }
}
