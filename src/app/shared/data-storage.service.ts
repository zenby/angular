import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

import { RecipeService } from '../recipes/recipe.service';
import { Recipe } from '../recipes/recipe.model';
import { map } from 'rxjs/operators';

const URL = 'https://ng-project-c4248.firebaseio.com/data.json';

@Injectable()
export class DataStorageService {
  constructor(private http: HttpClient,
              private recipeService: RecipeService) {
  }

  storeRecipes() {
    return this.http.put(URL, this.recipeService.getRecipes());
  }

  getRecipes() {
    this.http.get(URL)
      .pipe(
        map(
          (recipes: Recipe[]) => {
            for (const recipe of recipes) {
              if (!recipe.ingredients) {
                recipe.ingredients = [];
              }
            }
            return recipes;
          }
        )
      )
      .subscribe(
        (response: Recipe[]) => {
          this.recipeService.setRecipes(response);
        }
      );
  }
}
