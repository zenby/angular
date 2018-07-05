import { RecipeDetailComponent } from './recipes/recipe-detail/recipe-detail.component';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { RecipeStartComponent } from './recipes/recipe-start/recipe-start.component';
import { ShopingListComponent } from './shoping-list/shoping-list.component';
import { RecipesComponent } from './recipes/recipes.component';

const appRoutes: Routes = [
  { path: '', redirectTo: '/recipes', pathMatch: 'full' },
  {
    path: 'recipes', component: RecipesComponent, children: [
      { path: '', component: RecipeStartComponent },
      { path: ':id', component: RecipeDetailComponent }
    ]
  },
  { path: 'shopping-list', component: ShopingListComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(appRoutes)],
  exports: [RouterModule]
})

export class AppRoutingModule {

}
