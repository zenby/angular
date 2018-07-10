import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ShopingListComponent } from './shoping-list/shoping-list.component';

const appRoutes: Routes = [
  {path: '', redirectTo: '/recipes', pathMatch: 'full'},
  {path: 'shopping-list', component: ShopingListComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(appRoutes)],
  exports: [RouterModule]
})

export class AppRoutingModule {

}
