import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HeaderComponent } from './header/header.component';
import { ShoppingListService } from './shoping-list/shoping-list.service';
import { RecipeService } from './recipes/recipe.service';
import { DataStorageService } from './shared/data-storage.service';

import { MaterialModule } from './shared/material.module';
import { AuthService } from './auth/auth.service';
import { AuthGuard } from './auth/auth-guard.service';
import { RecipesModule } from './recipes/recipes.module';
import { ShopingListModule } from './shoping-list/shoping-list.module';
import { AuthModule } from './auth/auth.module';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
  ],
  imports: [
    ShopingListModule,
    HttpClientModule,
    BrowserAnimationsModule,
    BrowserModule,
    AppRoutingModule,
    MaterialModule,
    RecipesModule,
    AuthModule
  ],
  providers: [ShoppingListService, RecipeService, DataStorageService, AuthService, AuthGuard],
  bootstrap: [AppComponent]
})
export class AppModule {
}
