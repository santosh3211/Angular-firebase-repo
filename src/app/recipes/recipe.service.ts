import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { Ingredient } from '../shared/Ingredient.model';
import { ShoppingListService } from '../shopping-list/shopping-list.service';
import { Recipe } from './recipe-list/recipe.model';


@Injectable({
  providedIn: 'root'
})
export class RecipeService {
  recipesChanged = new Subject<Recipe[]>();
  // recipeSelected = new EventEmitter<Recipe>();

  constructor(private slService: ShoppingListService) { }
//  private  recipes: Recipe[] =[
//     new Recipe("Coffie","Super -tasty coffie is just awesome","assets/1200px-A_small_cup_of_coffee.jpg", [new Ingredient('Coffe powder', 1), 
  
//     new Ingredient('Milk', 1),
//     new Ingredient('Sugar', 1),
//     new Ingredient('Salt', 1)
//   ]),
//     new Recipe("Tea","What else you need ?","assets/indian-tea-spices-masala-chai-33827904.jpg", [new Ingredient('Chai patti', 1),
//     new Ingredient('Milk', 1),
//     new Ingredient('Sugar', 1),
//     new Ingredient('Salt', 1)]),
//     new Recipe("Bela Pana","Best Summer Drinks in Odisha?","assets/Bela-Pana-summer-drink-Odisha-1024x683.jpg", [new Ingredient('Bela', 1),
//     new Ingredient('Coconut', 1),
//     new Ingredient('Sugar', 2),
//     new Ingredient('cheese', 1),
//     new Ingredient('Banana', 1),
//     new Ingredient('Gol maricha', 1),
//   ]),
//   ];

private  recipes: Recipe[] =[];
   getRecipes(){
     return this.recipes.slice();
   }

   getRecipe(index: number){
    return this.recipes.slice()[index];
  }


   addIngreidentsToShoppingList(ingredient: Ingredient[]){
     this.slService.addIngredients(ingredient);

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

  setRecipes(recipes: Recipe[]){
    this.recipes = recipes;
    this.recipesChanged.next(this.recipes.slice());
  }

}
