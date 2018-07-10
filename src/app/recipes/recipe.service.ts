import { Subject } from 'rxjs';

import { Ingredient } from '../shared/ingredient.model';
import { Recipe } from './recipe.model';

export class RecipeService {
  recipeChanged = new Subject<Recipe[]>();

  private recipes: Recipe[] = [
    new Recipe('Test recipe',
      'simply',
      'https://ichef.bbci.co.uk/food/ic/food_16x9_832/recipes/chilli-glazed_sticky_71707_16x9.jpg',
      [new Ingredient('Meat', 1), new Ingredient('Farsh', 3)]
    ),
    new Recipe('Test 2 recipe',
      'nail',
      'https://ichef.bbci.co.uk/food/ic/food_16x9_832/recipes/chilli-glazed_sticky_71707_16x9.jpg',
      [new Ingredient('Garlick', 1), new Ingredient('Lemon', 3)]
    ),
  ];

  getRecipes() {
    return this.recipes.slice();
  }

  setRecipes(recipes: Recipe[]) {
    this.recipes = recipes;
    this.recipeChanged.next(this.recipes.slice());
  }

  getRecipeById(id: number) {
    return this.recipes.slice()[id];
  }

  addRecipe(recipe: Recipe) {
    this.recipes.push(recipe);
    this.recipeChanged.next(this.recipes.slice());
  }

  updateRecipe(index: number, newRecipe: Recipe) {
    this.recipes[index] = newRecipe;
    this.recipeChanged.next(this.recipes.slice());
  }

  deleteRecipe(index: number) {
    this.recipes.splice(index, 1);
    this.recipeChanged.next(this.recipes.slice());
  }
}
