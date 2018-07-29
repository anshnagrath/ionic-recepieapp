import { ShoppingListService } from './../../services/shopping-list';
import { Recipe } from './../../models/reciepe';
import { Ingridents } from './../../models/ingrident';
import { Component, OnInit } from '@angular/core';
import { IonicPage, NavController, NavParams, AlertController, ToastController } from 'ionic-angular';
import { FormGroup, FormControl, Validators, FormArray } from '@angular/forms';
import { ActionSheetController } from 'ionic-angular';
import { RecipesService } from '../../services/reciepe';

@IonicPage()
@Component({
  selector: 'page-edit-recipe',
  templateUrl: 'edit-recipe.html',
})
export class EditRecipePage implements OnInit {
  mode = 'New';
  selectOptions = ['Easy', 'Medium', 'Hard'];
  recipeForm: FormGroup;
  recipe: Recipe;
  index: number;
  constructor(public alertCtrl: AlertController, public toastCtrl: ToastController, public actCtrl: ActionSheetController, public navCtrl: NavController, public navParams: NavParams, public resSer: RecipesService, public slService: ShoppingListService) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad EditRecipePage');
  }
  ngOnInit() {
    this.mode = this.navParams.get('mode');
    console.log(this.mode, 'mode check')
    if (this.mode == 'Edit') {
      this.recipe = this.navParams.get('recipe');
      this.index = this.navParams.get('index');
    }
    this.initializeForm();
  }
  private initializeForm() {
    let title = null, description = null, difficuty = 'medium', ingridents = [];
    if (this.mode == 'Edit') {
      console.log(this.recipe, 'if edit')
      title = this.recipe.title;
      description = this.recipe.description;
      difficuty = this.recipe.difficulty;
      this.recipe.indridents.forEach((ing) => {
        ingridents.push(new FormControl(ing.name, Validators.required));
      })
    }

    this.recipeForm = new FormGroup({
      // console.log(description, title, 'forms to check')
      'title': new FormControl(title, Validators.required),
      'description': new FormControl(description, Validators.required),
      'difficulty': new FormControl(difficuty, Validators.required),
      'ingredients': new FormArray(ingridents)
    });
    console.log(this.recipeForm, 'forms to check')
  }

  onSubmit() {
    console.log(this.recipeForm.value, 'respForm')
    const value = this.recipeForm.value;
    let ingridents = [];
    if (value.ingredients.length) {
      ingridents = value.ingredients.map(name => {
        return { name: name, amount: 1 };
      });


    }

    this.resSer.addRecipes(value.title, value.desciption, value.difficulty, value.ingredients);
    this.recipeForm.reset();
    this.navCtrl.popToRoot();
  }
  onAddIngridents() {
    this.slService.addItems(this.recipe.indridents);
  }
  onDeleterecepie() {
    this.resSer.removeRecipies(this.index);
    this.navCtrl.popToRoot()
  }
  onManageIngridents() {
    const sheet = this.actCtrl.create({
      title: 'what do you want to do?',
      buttons: [
        {
          text: 'Add Ingridents',
          handler: () => {
            this.createNewIngridentAlert().present();

          }

        },
        {
          text: 'Remove all ingridents',
          role: 'destructive',
          handler: () => {
            const fArray: FormArray = <FormArray>this.recipeForm.get('ingredients');
            const len = fArray.length;
            if (len > 0) {
              for (let i = len - 1; i >= 0; i--) {
                fArray.removeAt(i);
                const toast = this.toastCtrl.create({
                  message: 'All the messages are deleted',
                  duration: 1000,
                  position: 'top'
                })
                toast.present();
              }
            }
          }
        }, {
          text: 'cancel',
          role: 'cancel'
        }
      ]
    })
    sheet.present();
  }
  private createNewIngridentAlert() {
    return this.alertCtrl.create({
      title: 'Add Ingridents',
      inputs: [{
        name: 'name',
        placeholder: 'ansh'
      }],
      buttons: [{
        text: 'Cancel',
        role: 'cancel'
      }, {
        text: 'Add',
        handler: data => {
          if (data.name.trim() == '' || data.name == null) {
            const toast = this.toastCtrl.create({
              message: 'Please enter a valid value!',
              duration: 1000,
              position: 'top'
            })
            toast.present();
            return;
          }

          (<FormArray>this.recipeForm.get('ingredients')).push(new FormControl(data.name, Validators.required))
          const toast = this.toastCtrl.create({
            message: 'Item Added',
            duration: 1000,
            position: 'top'
          })
          toast.present();
        }
      }]

    })
  }
}

