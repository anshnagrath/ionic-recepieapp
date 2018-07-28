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
  constructor(public alertCtrl: AlertController, public toastCtrl: ToastController, public actCtrl: ActionSheetController, public navCtrl: NavController, public navParams: NavParams, public resSer: RecipesService) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad EditRecipePage');
  }
  ngOnInit() {
    this.navParams.get('mode');
    this.initializeForm();
  }
  private initializeForm() {
    this.recipeForm = new FormGroup({
      'title': new FormControl(null, Validators.required),
      'desciption': new FormControl(null, Validators.required),
      'difficulty': new FormControl('Medium', Validators.required),
      'ingredients': new FormArray([])
    });
  }
  onSubmit() {
    console.log(this.recipeForm)
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

