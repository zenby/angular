import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ShopingListComponent } from './shoping-list.component';
import { ShopingEditComponent } from './shoping-edit/shoping-edit.component';
import { MaterialModule } from '../shared/material.module';
import { FormsModule } from '@angular/forms';

@NgModule({
  declarations: [
    ShopingListComponent,
    ShopingEditComponent,
  ],
  imports: [
    CommonModule,
    MaterialModule,
    FormsModule,
  ]
})
export class ShopingListModule {
}

