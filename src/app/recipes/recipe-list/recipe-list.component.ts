import { Component, OnInit, EventEmitter, Output } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { RecipeService } from '../recipe.service';

import { Recipe } from './recipe.model';

@Component({
  selector: 'app-recipe-list',
  templateUrl: './recipe-list.component.html',
  styleUrls: ['./recipe-list.component.css'],
})
export class RecipeListComponent implements OnInit {
  // @Output() recipeWasSelected = new EventEmitter<Recipe>();
  // recipes: Recipe[] =[
  //   new Recipe("Coffie","Make a test  Coffie","assets/pumpkin-pad-thai-recipe.jpg"),
  //   new Recipe("Tea","Make a test Tea","assets/pumpkin-pad-thai-recipe.jpg"),
  //   new Recipe("Pasta","Make a delicious Pasta","assets/pumpkin-pad-thai-recipe.jpg"),
  //   new Recipe("Pizza","Make a Pizza","assets/pumpkin-pad-thai-recipe.jpg")
  // ];
  recipes: Recipe[];

  constructor(
    private recipeService: RecipeService,
    private route: Router,
    private router: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.recipeService.recipesChanged.subscribe((recopes: Recipe[]) => {
      this.recipes = recopes;
    });
    this.recipes = this.recipeService.getRecipes();
  }
  // onRecipeSelected(recipeEl: Recipe){
  //   this.recipeWasSelected.emit(recipeEl);

  // }
  onNewRecipe(): void {
    this.route.navigate(['new'], { relativeTo: this.router });
  }
}
