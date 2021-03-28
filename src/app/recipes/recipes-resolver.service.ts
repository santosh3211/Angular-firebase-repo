import { state } from '@angular/animations';
import { Injectable } from '@angular/core';
import {
  ActivatedRouteSnapshot,
  Resolve,
  RouterStateSnapshot,
} from '@angular/router';
import { DataStorageService } from '../shared/data-strorage-service';
import { Recipe } from './recipe-list/recipe.model';
import { RecipeService } from './recipe.service';

@Injectable({ providedIn: 'root' })
export class RecipesResolverServices implements Resolve<Recipe[]> {
  constructor(private dataStorageService: DataStorageService, private recipeService: RecipeService) {}

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
      let data = this.recipeService.getRecipes();
      if(data.length ===0){
          return  this.dataStorageService.fetchRecipes();

      } else{
          return data;
      }
   
  }
}
