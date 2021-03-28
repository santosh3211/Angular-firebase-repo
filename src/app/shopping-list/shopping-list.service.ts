import { Injectable } from '@angular/core';

import { Ingredient } from '../shared/Ingredient.model';
import {Subject} from 'rxjs';
@Injectable({
  providedIn: 'root',
})
export class ShoppingListService {
  addIngredients(ingredient: Ingredient[]) {
    this.ingredients.push(...ingredient);
    this.ingredientChanges.next(this.ingredients.slice());
  }
  startedEditing = new Subject<number>();

  ingredientChanges = new Subject<Ingredient[]>();
  private ingredients: Ingredient[] = [
    new Ingredient('Jira', 50),
    new Ingredient('Apple', 3),
    new Ingredient('Salt', 5),
    new Ingredient('Sugar', 1),
  ];
  constructor() {}
  getIngrideints(): Ingredient[] {
    return this.ingredients.slice();
  }

  addIngredient(ingredient: Ingredient) {
    this.ingredients.push(ingredient);
    this.ingredientChanges.next(this.ingredients.slice());
  }
  updateIngredient(index:number, newIngredient: Ingredient) {
    this.ingredients[index] = newIngredient;
    this.ingredientChanges.next(this.ingredients.slice());
  }

  getIngrident(index: number){
    return this.ingredients[index];

  }

  deleteIngredient(index:number) {
   this.ingredients.splice(index, 1);
    this.ingredientChanges.next(this.ingredients.slice());
  }
}
