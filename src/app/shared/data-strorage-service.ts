import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Recipe } from "../recipes/recipe-list/recipe.model";
import { RecipeService } from "../recipes/recipe.service";
import { map, tap } from 'rxjs/operators';
@Injectable({providedIn:'root'})
export class DataStorageService{

constructor(private httpClient: HttpClient, private recipeService: RecipeService){

}

storeRecipes(){
    const recipes = this.recipeService.getRecipes();
     return this.httpClient.put('https://ng-course-recipe-book-244ff-default-rtdb.firebaseio.com/recipes.json',recipes).subscribe(res =>{
         console.log(res);
     });
}
// fetchRecipes(){
//     return this.httpClient.get<Recipe[]>('https://ng-course-recipe-book-244ff-default-rtdb.firebaseio.com/recipes.json')
    
//     .subscribe(res =>{
//         console.log(res);
//         this.recipeService.setRecipes(res);
//     });
// }


fetchRecipes() {
    return this.httpClient
      .get<Recipe[]>(
        'https://ng-course-recipe-book-244ff-default-rtdb.firebaseio.com/recipes.json'
      )
      .pipe(
        map(recipes => {
          return recipes.map(recipe => {
            return {
              ...recipe,
              ingredients: recipe.ingredients ? recipe.ingredients : []
            };
          });
        }),
        tap(recipes => {
          this.recipeService.setRecipes(recipes);
        })
      )
  }

}