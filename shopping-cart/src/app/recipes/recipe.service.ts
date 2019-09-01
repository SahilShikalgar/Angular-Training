import { Recipe } from './recipe.model';
import { EventEmitter, Injectable } from '@angular/core';
import { Ingredient } from '../shared/ingredient.model';
import { ShoppinglistService } from '../shopping-list/shopping-list.service';

@Injectable()
export class RecipeService {
    recipeSelected = new EventEmitter<Recipe>();
    
    private recipes: Recipe[] = [
        new Recipe(
            "A Test Recipe 1", 
            "This is simply a test", 
            "https://www.thekitchenmagpie.com/wp-content/uploads/images/2019/07/chickensalad.jpg",
            [
                new Ingredient('Meat', 1),
                new Ingredient('French Fries', 20)
            ]),
        new Recipe(
            "A Test Recipe 2", 
            "This is simply a test", 
            "https://www.thekitchenmagpie.com/wp-content/uploads/images/2019/07/chickensalad.jpg",
            [
                new Ingredient('Meat', 1),
                new Ingredient('French Fries', 20)
            ]),
        new Recipe(
            "A Test Recipe 3", 
            "This is simply a test", 
            "https://www.thekitchenmagpie.com/wp-content/uploads/images/2019/07/chickensalad.jpg",
            [
                new Ingredient('Meat', 1),
                new Ingredient('French Fries', 20)
            ])
    ];

    constructor(private slService: ShoppinglistService) { }
    
    getRecipes() {
        return this.recipes.slice();    //return copy of array
    }

    addIngredientsToShoppingList(ingredients: Ingredient[]) {
        this.slService.addIngredientsFromRecipe(ingredients);
    }

    getRecipe(index: number) {
        return this.recipes[index];
    }
}