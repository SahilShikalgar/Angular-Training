import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { Recipe } from '../recipe.model';

@Component({
  selector: 'app-recipe-list',
  templateUrl: './recipe-list.component.html',
  styleUrls: ['./recipe-list.component.css']
})
export class RecipeListComponent implements OnInit {
  @Output() recipeWasSelected = new EventEmitter<Recipe>();
  recipes: Recipe[] = [
    new Recipe("A Test Recipe 1", "This is simply a test", "https://www.thekitchenmagpie.com/wp-content/uploads/images/2019/07/chickensalad.jpg"),
    new Recipe("A Test Recipe 2", "This is simply a test", "https://www.thekitchenmagpie.com/wp-content/uploads/images/2019/07/chickensalad.jpg"),
    new Recipe("A Test Recipe 3", "This is simply a test", "https://www.thekitchenmagpie.com/wp-content/uploads/images/2019/07/chickensalad.jpg")
  ];

  constructor() { }

  ngOnInit() {
  }

  onRecipeSelected(recipe: Recipe) {
    this.recipeWasSelected.emit(recipe);
  }
}
