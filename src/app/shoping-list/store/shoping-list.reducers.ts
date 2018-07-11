import { Ingredient } from '../../shared/ingredient.model';
import * as ShopingListActions from './shoping-list.actions';

export interface AppState {
  shoppingList: State;
}

export interface State {
  ingredients: Ingredient[];
  editedIngredient: Ingredient;
  editedIngredientIndex: number;
}

const initialState: State = {
  ingredients: [
    new Ingredient('Apples', 5),
    new Ingredient('Lemons', 3),
  ],
  editedIngredient: null,
  editedIngredientIndex: -1
};

export function shoppingListReducer(state = initialState, action: ShopingListActions.ShopingListActions) {

  switch (action.type) {
    case ShopingListActions.ADD_INGREDIENT:
      return {
        ...state,
        ingredients: [...state.ingredients, action.payload]
      };

    case ShopingListActions.ADD_INGREDIENTS:
      return {
        ...state,
        ingredients: [...state.ingredients, ...action.payload]
      };

    case ShopingListActions.DELETE_INGREDIENT:
      const ing = [...state.ingredients];
      ing.splice(state.editedIngredientIndex, 1);
      return {
        ...state,
        ingredients: ing
      };

    case ShopingListActions.UPDATE_INGREDIENT:
      const ingredient = state.ingredients[state.editedIngredientIndex];
      const updatedIngredient = {
        ...ingredient, ...action.payload.ingredient
      };
      const ingredients = [...state.ingredients];
      ingredients[state.editedIngredientIndex] = updatedIngredient;
      return {
        ...state,
        ingredients
      };

    case ShopingListActions.START_EDIT:
      const editedIngredient = {...state.ingredients[action.payload]};
      return {
        ...state,
        editedIngredient,
        editedIngredientIndex: action.payload
      };

    default :
      return state;
  }
}
