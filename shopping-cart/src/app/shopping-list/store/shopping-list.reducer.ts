import { Ingredient } from '../../shared/ingredient.model';
import { Action } from '@ngrx/store';
import * as ShoppingListActions from './shopping-list.actions';

const initialState = {
    ingredients: [
        new Ingredient('Apples', 5),
        new Ingredient('Tomatoes', 10)
    ]
};

// ngRx package will pass two arguments to this function [state & action]
export function shoppingListReducer(state = initialState, action: Action) {
    switch (action.type) {
        case ShoppingListActions.ADD_INGREDIENT:
            //copy state for more than one property
            return {
                ...state,
                ingredient: [...state.ingredients, action]
            };
            break;
    }
}
