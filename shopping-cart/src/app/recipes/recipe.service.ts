import { Recipe } from './recipe.model';
import { Injectable } from '@angular/core';
import { Ingredient } from '../shared/ingredient.model';
import { ShoppinglistService } from '../shopping-list/shopping-list.service';
import { Subject } from 'rxjs';

@Injectable()
export class RecipeService {
    recipeSelected = new Subject<Recipe>();
    recipesChanged = new Subject<Recipe[]>();
    
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

    addRecipe(recipe: Recipe) {
        this.recipes.push(recipe);
        this.recipesChanged.next(this.recipes.slice());
    }

    updateRecipe(index: number, newRecipe: Recipe) {
        this.recipes[index] = newRecipe;
        this.recipesChanged.next(this.recipes.slice());
    }

    deleteRecipe(index: number) {
        this.recipes.splice(index, 1);
        this.recipesChanged.next(this.recipes.slice());
    }
}