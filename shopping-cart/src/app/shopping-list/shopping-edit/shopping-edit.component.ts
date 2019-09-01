import { Component, OnInit, ElementRef, ViewChild, Output } from '@angular/core';
import { Ingredient } from 'src/app/shared/ingredient.model';
import { ShoppinglistService } from '../shopping-list.service';

@Component({
  selector: 'app-shopping-edit',
  templateUrl: './shopping-edit.component.html',
  styles: []
})
export class ShoppingEditComponent implements OnInit {
  @ViewChild('nameInput', {static: false}) nameInputReference: ElementRef;
  @ViewChild('amountInput', {static: false}) amountInputReference: ElementRef;

  constructor(private slService: ShoppinglistService) { }

  ngOnInit() {
  }

  onAddItem() {
    const ingName = this.nameInputReference.nativeElement.value;
    const ingAmount = this.amountInputReference.nativeElement.value;
    const newIngredient = new Ingredient(ingName, ingAmount);
    this.slService.onIngredientAdded(newIngredient);
  }
}
