import { ShoppingListService } from './../shoping-list.service';
import { Component, OnInit } from '@angular/core';
import { Ingredient } from '../../shared/ingredient.model';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-shoping-edit',
  templateUrl: './shoping-edit.component.html',
  styleUrls: ['./shoping-edit.component.css']
})
export class ShopingEditComponent implements OnInit {


  constructor(private slService: ShoppingListService) { }

  ngOnInit() {
  }

  onAddIngredient(form: NgForm) {
    const value = form.value;
    const newIngredient = new Ingredient(value.name, value.amount);
    this.slService.addIngredient(newIngredient);

  }

  onSubmit() {

  }
}

