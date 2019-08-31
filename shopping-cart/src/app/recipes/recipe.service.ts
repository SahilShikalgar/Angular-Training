import { Recipe } from './recipe.model';
import { EventEmitter } from '@angular/core';

export class RecipeService {
    recipeSelected = new EventEmitter<Recipe>();
    
    private recipes: Recipe[] = [
        new Recipe("A Test Recipe 1", "This is simply a test", "https://www.thekitchenmagpie.com/wp-content/uploads/images/2019/07/chickensalad.jpg"),
        new Recipe("A Test Recipe 2", "This is simply a test", "https://www.thekitchenmagpie.com/wp-content/uploads/images/2019/07/chickensalad.jpg"),
        new Recipe("A Test Recipe 3", "This is simply a test", "https://www.thekitchenmagpie.com/wp-content/uploads/images/2019/07/chickensalad.jpg")
    ];
    
    getRecipes() {
        return this.recipes.slice();    //return copy of array
    }
}