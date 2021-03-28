import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { Ingredient } from '../shared/Ingredient.model';
import{ShoppingListService} from './shopping-list.service';


@Component({
  selector: 'app-shopping-list',
  templateUrl: './shopping-list.component.html',
  styleUrls: ['./shopping-list.component.css'],
})
export class ShoppingListComponent implements OnInit, OnDestroy {
  ingredients: Ingredient[];
  private idChanged: Subscription;

  constructor(private shoppingListService: ShoppingListService) {}
  ngOnDestroy(): void {
    this.idChanged.unsubscribe();
  }
  NgModel

  ngOnInit(): void {
    this.ingredients = this.shoppingListService.getIngrideints();
    this.idChanged = this.shoppingListService.ingredientChanges.subscribe(
      (ingridents: Ingredient[]) => {
        this.ingredients = ingridents;
      }
    );
  }
  onEditItem(index: number){
     this.shoppingListService.startedEditing.next(index);

  }

  // onIngredientAdded(ingredient: Ingredient){
  //    console.log('Inside shopping list', ingredient)
  //   this.ingredients.push(ingredient);

  // }
}
