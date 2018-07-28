import { EditRecipePage } from './../pages/edit-recipe/edit-recipe';
import { BrowserModule } from '@angular/platform-browser';
import { ErrorHandler, NgModule } from '@angular/core';
import { IonicApp, IonicErrorHandler, IonicModule } from 'ionic-angular';
import { SplashScreen } from '@ionic-native/splash-screen';
import { StatusBar } from '@ionic-native/status-bar';
import { MyApp } from './app.component';
import { ShoppingListService } from '../services/shopping-list';
import { RecipePage } from '../pages/recipe/recipe';
import { RecipesPage } from '../pages/recipes/recipes';
import { ShoppingListPage } from '../pages/shopping-list/shopping-list';
import { TabsPage } from '../pages/tabs/tabs';
import { FormControl, FormGroup, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RecipesService } from '../services/reciepe';


@NgModule({
  declarations: [
    MyApp,
    TabsPage,
    RecipePage,
    EditRecipePage,
    RecipesPage,
    ShoppingListPage
  ],
  imports: [
    BrowserModule,
    FormsModule,
    ReactiveFormsModule,
    IonicModule.forRoot(MyApp)
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    TabsPage,
    RecipePage,
    EditRecipePage,
    RecipesPage,
    ShoppingListPage
  ],
  providers: [
    StatusBar,
    SplashScreen,
    ShoppingListService,
    RecipesService,
    { provide: ErrorHandler, useClass: IonicErrorHandler }
  ]
})
export class AppModule { }
