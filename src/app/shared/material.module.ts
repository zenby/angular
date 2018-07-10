import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MatFormFieldModule } from '@angular/material/form-field';
import { MatTabsModule } from '@angular/material/tabs';
import { MatCardModule } from '@angular/material/card';
import { MatMenuModule } from '@angular/material/menu';
import { MatInputModule } from '@angular/material/input';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule, MatCheckboxModule } from '@angular/material';
import { MatListModule } from '@angular/material/list';
import { MatSelectModule } from '@angular/material/select';
import { FlexLayoutModule } from '@angular/flex-layout';


@NgModule({
  imports: [
    CommonModule,
    MatButtonModule,
    MatCheckboxModule,
    MatSelectModule,
    MatInputModule,
    MatCardModule,
    MatMenuModule,
    MatIconModule,
    MatListModule,
    MatFormFieldModule,
    MatTabsModule,
    FlexLayoutModule
  ],
  declarations: [],
  exports: [
    CommonModule,
    MatButtonModule,
    MatCheckboxModule,
    MatSelectModule,
    MatInputModule,
    MatCardModule,
    MatMenuModule,
    MatIconModule,
    MatListModule,
    MatFormFieldModule,
    MatTabsModule,
    FlexLayoutModule
  ]
})
export class MaterialModule {
}
