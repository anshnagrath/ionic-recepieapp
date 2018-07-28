import { EditRecipePage } from './../edit-recipe/edit-recipe';
import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
@IonicPage()
@Component({
  selector: 'page-recipe',
  templateUrl: 'recipe.html',
})
export class RecipePage {

  constructor(public navCtrl: NavController, public navParams: NavParams) {
  }

  onNewRecipe() {
    this.navCtrl.push(EditRecipePage, { mode: 'New' })

  }
}
