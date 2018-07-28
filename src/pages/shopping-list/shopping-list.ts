import { ShoppingListService } from './../../services/shopping-list';
import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { NgForm } from '@angular/forms';
import { Ingridents } from '../../models/ingrident';


@IonicPage()
@Component({
  selector: 'page-shopping-list',
  templateUrl: 'shopping-list.html',
})

export class ShoppingListPage {
  public itemList;
  constructor(public navCtrl: NavController, public navParams: NavParams, public shoppingListService: ShoppingListService) {
  }
  ionViewWillEnter() {
    this.getItems();
  }
  onAddItem(form: NgForm) {
    console.log(form, 'added');
    this.shoppingListService.addItem(form.value.ingridentName, form.value.Ammount);
    form.reset();
    this.getItems();
  }
  getItems() {
    this.itemList = this.shoppingListService.getItems();
    console.log(this.itemList, 'check')
  }
  onCheckItem(index: number) {
    this.shoppingListService.removeItem(index);
    this.getItems();

  }

}
