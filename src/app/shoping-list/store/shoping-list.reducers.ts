import { Ingredient } from '../../shared/ingredient.model';
import * as ShopingListActions from './shoping-list.actions';

const initialState = {
  ingredients: [
    new Ingredient('Apples', 5),
    new Ingredient('Lemons', 3),
  ]
};

export function shoppingListReducer(state = initialState, action: ShopingListActions.ShopingListActions) {

  switch (action.type) {
    case ShopingListActions.ADD_INGREDIENT:
      return {
        ...state,
        ingredients: [...state.ingredients, action.payload]
      };
    default :
      return state;
  }
}
