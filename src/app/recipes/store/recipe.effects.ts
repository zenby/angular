import { Actions, Effect } from '@ngrx/effects';
import { HttpClient, HttpRequest } from '@angular/common/http';
import { Store } from '@ngrx/store';
import { Injectable } from '@angular/core';

import { switchMap } from 'rxjs/internal/operators';
import { map, withLatestFrom } from 'rxjs/operators';
import { Recipe } from '../recipe.model';
import * as RecipeActions from '../store/recipe.actions';
import * as fromRecipe from '../store/recipe.reducers';

const URL = 'https://ng-project-c4248.firebaseio.com/data.json';

@Injectable()
export class RecipeEffects {
  @Effect()
  recipeFetch = this.actions$
    .ofType(RecipeActions.FETCH_RECIPES)
    .pipe(
      switchMap((action: RecipeActions.FetchRecipes) => this.httpClient.get<Recipe[]>(URL)),
      map(
        (recipes) => {
          console.log(recipes);
          for (const recipe of recipes) {
            if (!recipe.ingredients) {
              recipe.ingredients = [];
            }
          }
          return {
            type: RecipeActions.SET_RECIPES,
            payload: recipes
          };
        }
      )
    );

  @Effect({
    dispatch: false
  })
  recipeStore = this.actions$
    .ofType(RecipeActions.STORE_RECIPES)
    .pipe(
      withLatestFrom(this.store.select('recipes')),
      switchMap(([action, state]) => {
        const req = new HttpRequest('PUT', URL, state.recipes, {reportProgress: true});
        return this.httpClient.request(req);
      })
    );

  constructor(private actions$: Actions,
              private httpClient: HttpClient,
              private store: Store<fromRecipe.FeatureState>) {
  }
}
