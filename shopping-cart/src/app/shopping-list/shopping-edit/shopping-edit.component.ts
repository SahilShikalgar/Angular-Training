import { Component, OnInit, ViewChild } from '@angular/core';
import { Ingredient } from 'src/app/shared/ingredient.model';
import { ShoppinglistService } from '../shopping-list.service';
import { NgForm } from '@angular/forms';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-shopping-edit',
  templateUrl: './shopping-edit.component.html',
  styles: []
})
export class ShoppingEditComponent implements OnInit {
  @ViewChild('f', { static: false }) slForm: NgForm;

  private subscription: Subscription;
  editMode: boolean = false;
  editedItemIndex: number;
  editedItem: Ingredient;

  constructor(private slService: ShoppinglistService) { }

  ngOnInit() {
    this.subscription = this.slService.startedEditing
      .subscribe((index: number) => {
        this.editMode = true;
        this.editedItemIndex = index;
        this.editedItem = this.slService.getIngredient(index);
        this.slForm.setValue({
          'name': this.editedItem.name,
          'amount': this.editedItem.amount
        });
      });
  }

  onSubmit(form: NgForm) {
    const value = form.value;
    const newIngredient = new Ingredient(value.name, value.amount);
    if(this.editMode) {
      this.slService.updateIngredient(this.editedItemIndex, newIngredient);
    }
    else {
      this.slService.onIngredientAdded(newIngredient);
    }
    this.onClear();
  }

  onDelete() {
    this.slService.deleteIngredient(this.editedItemIndex);
    this.onClear();
  }

  onClear() {
    this.editMode = false;
    this.slForm.reset();
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }
}
