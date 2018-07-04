import { ShoppingListService } from './../shoping-list/shoping-list.service';
import { Ingredient } from './../shared/ingredient.model';
import { EventEmitter, Injectable } from '@angular/core';
import { Recipe } from './recipe.model';

@Injectable()
export class RecipeService {
  recipeSelected = new EventEmitter<Recipe>();

  private recipes: Recipe[] = [
    new Recipe('Test recipe',
      'simply',
      'https://ichef.bbci.co.uk/food/ic/food_16x9_832/recipes/chilli-glazed_sticky_71707_16x9.jpg',
      [new Ingredient('Meat', 1), new Ingredient('Fardh', 3)]
    ),
    new Recipe('Test 2 recipe',
      'nail',
      'https://ichef.bbci.co.uk/food/ic/food_16x9_832/recipes/chilli-glazed_sticky_71707_16x9.jpg',
      [new Ingredient('Garlick', 1), new Ingredient('Lemon', 3)]
    ),
  ];

  constructor(private slService: ShoppingListService) { }

  getRecipes() {
    return this.recipes.slice();
  }

  addIngredientsToShoppingList(ingredients: Ingredient[]) {
    this.slService.addIngredients(ingredients);
  }
}
