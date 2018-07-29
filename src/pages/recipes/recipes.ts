import { RecipesService } from './../../services/reciepe';
import { EditRecipePage } from './../edit-recipe/edit-recipe';
import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { RecipePage } from '../recipe/recipe';
import { Recipe } from '../../models/reciepe';




@IonicPage()
@Component({
  selector: 'page-recipes',
  templateUrl: 'recipes.html',
})
export class RecipesPage {
  public recepies;

  constructor(public navCtrl: NavController, public navParams: NavParams, public resSer: RecipesService) {
  }
  ionViewWillEnter() {
    this.recepies = this.resSer.getRecipies();
    console.log(this.recepies, 'check this one ')
  }
  ionViewDidLoad() {
    console.log('ionViewDidLoad RecipesPage');
  }
  onNewRecipe() {
    this.navCtrl.push(EditRecipePage, { mode: 'new' })
  }
  onLoadRecepie(recipe: Recipe, index: number) {
    console.log(recipe, 'have to check it here')
    this.navCtrl.push(RecipePage, { recipe: recipe, index: index });
  }
}
