import { HttpClient, HttpParams, HttpRequest } from '@angular/common/http';
import { Injectable } from '@angular/core';

import { RecipeService } from '../recipes/recipe.service';
import { Recipe } from '../recipes/recipe.model';
import { map } from 'rxjs/operators';
import { AuthService } from '../auth/auth.service';

const URL = 'https://ng-project-c4248.firebaseio.com/data.json';

@Injectable()
export class DataStorageService {
  constructor(private httpClient: HttpClient,
              private recipeService: RecipeService,
              private authService: AuthService) {
  }

  storeRecipes() {
    const token = this.authService.getToken();
    // return this.httpClient.put(URL, this.recipeService.getRecipes(), {
    //   params: new HttpParams().set('auth', token)
    // });

    const req = new HttpRequest('PUT', URL, this.recipeService.getRecipes(), {reportProgress: true});
    return this.httpClient.request(req);
  }

  getRecipes() {
    const token = this.authService.getToken();
    this.httpClient.get<Recipe[]>(URL, {
      params: new HttpParams().set('auth', token)
    })
      .pipe(
        map(
          (recipes) => {
            for (const recipe of recipes) {
              if (!recipe.shopingListState) {
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
