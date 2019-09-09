import { Component, OnInit } from '@angular/core';
import { Ingredient } from '../shared/ingredient.model';
import { ShoppinglistService } from './shopping-list.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-shopping-list',
  templateUrl: './shopping-list.component.html'
})
export class ShoppingListComponent implements OnInit {
  ingredients: Ingredient[] = [];
  private subscription: Subscription;

  constructor(private shoppinglistService: ShoppinglistService) { }

  ngOnInit() {
    this.ingredients = this.shoppinglistService.getIngredients();
    this.subscription = this.shoppinglistService.ingredientsChanged
      .subscribe((ingredients: Ingredient[]) => {
        this.ingredients = ingredients;
      })
  }

  onEditItem(index: number) {
    this.shoppinglistService.startedEditing.next(index);
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }
}
