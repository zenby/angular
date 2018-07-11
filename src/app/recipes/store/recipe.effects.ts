import { Actions, Effect } from '@ngrx/effects';
import { HttpClient } from '@angular/common/http';

import { switchMap } from 'rxjs/internal/operators';
import { map } from 'rxjs/operators';
import { Recipe } from '../recipe.model';
import * as RecipeActions from '../store/recipe.actions';
import { Injectable } from '@angular/core';

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

  constructor(private actions$: Actions,
              private httpClient: HttpClient) {
  }
}
