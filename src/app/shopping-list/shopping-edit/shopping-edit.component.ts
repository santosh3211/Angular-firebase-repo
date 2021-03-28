import {
  Component,
  ElementRef,
  OnDestroy,
  OnInit,
  ViewChild
} from '@angular/core';
import { FormGroup, NgForm } from '@angular/forms';
import { Subscription } from 'rxjs';
import { Ingredient } from 'src/app/shared/Ingredient.model';
import { ShoppingListService } from '../shopping-list.service';

@Component({
  selector: 'app-shopping-edit',
  templateUrl: './shopping-edit.component.html',
  styleUrls: ['./shopping-edit.component.css'],
})
export class ShoppingEditComponent implements OnInit, OnDestroy {
  @ViewChild('nameInput') nameInputRef: ElementRef;
  @ViewChild('amountInput') amountInputRef: ElementRef;
  @ViewChild('f') slForm: NgForm;
  // @Output() ingrediaentAdded = new EventEmitter<Ingredient>();

  subscription: Subscription;
  editMode = false;
  edittedItemIndex: number;
  editedItem: Ingredient;
  constructor(private shoppingListService: ShoppingListService) {}
  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }

  ngOnInit(): void {
    this.subscription = this.shoppingListService.startedEditing.subscribe(
      (index: number) => {
        this.edittedItemIndex = index;
        this.editMode = true;
        this.editedItem = this.shoppingListService.getIngrident(index);
        this.slForm.setValue({
          name: this.editedItem.name,
          amount: this.editedItem.amount,
        });
      }
    );
  }

  onSubmit(shoppingForm: NgForm) {
    const newIngredient = new Ingredient(
      shoppingForm.value.name,
      shoppingForm.value.amount
    );
    if(this.editMode){
      this.shoppingListService.updateIngredient(this.edittedItemIndex, newIngredient);
    } else{
      this.shoppingListService.addIngredient(newIngredient);
    }
    this.editMode = false;
    shoppingForm.reset();
    
  }
  onDeleteItem() {
    this.shoppingListService.deleteIngredient(this.edittedItemIndex);
    this.onClearItem();
  }
  onClearItem() {
    this.slForm.reset();
    this.editMode = false;
  }
}
