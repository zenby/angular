import { Recipe } from '../recipe.model';
import { Ingredient } from '../../shared/ingredient.model';

import * as RecipeActions from './recipe.actions';

export interface FeatureState {
  recipes: State;
}

export interface State {
  recipes: Recipe[];
}

const initialState: State = {
  recipes: [
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
  ]
};

export function recipeReducer(state = initialState, action: RecipeActions.RecipeActions) {
  switch (action.type) {
    case RecipeActions.SET_RECIPES:
      return {
        ...state,
        recipes: [action.payload]
      };

    case RecipeActions.ADD_RECIPES:
      return {
        ...state,
        recipes: [...state.recipes, action.payload]
      };

    case RecipeActions.UPDATE_RECIPES:
      const recipe = state.recipes[action.payload.index];
      const updatedRecipe = {
        ...recipe,
        ...action.payload.updatedRecipe
      };
      const recipes = [...state.recipes];
      recipes[action.payload.index] = updatedRecipe;
      return {
        ...state,
        recipes: recipes
      };

    case RecipeActions.DELETE_RECIPES:
      const oldRecipes = [...state.recipes];
      oldRecipes.splice(action.payload, 1);
      return {
        ...state,
        recipes: oldRecipes
      };
    default:
      return state;
  }
}
