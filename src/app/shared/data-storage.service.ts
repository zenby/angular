import { HttpClient, HttpRequest } from '@angular/common/http';
import { Injectable } from '@angular/core';

import { map } from 'rxjs/operators';
import { RecipeService } from '../recipes/recipe.service';
import { Recipe } from '../recipes/recipe.model';

const URL = 'https://ng-project-c4248.firebaseio.com/data.json';

@Injectable()
export class DataStorageService {
  constructor(private httpClient: HttpClient,
              private recipeService: RecipeService) {
  }

  storeRecipes() {

    const req = new HttpRequest('PUT', URL, this.recipeService.getRecipes(), {reportProgress: true});
    return this.httpClient.request(req);
  }

  getRecipes() {
    this.httpClient.get<Recipe[]>(URL)
      .pipe(
        map(
          (recipes) => {
            console.log(recipes);
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
