import { Ingridents } from './../models/ingrident';
import { Recipe } from '../models/reciepe'
export class RecipesService {
    private recipies: Recipe[] = [];
    addRecipes(title: string, description: string, difficult: string, ingridents: Ingridents[]) {
        this.recipies.push(new Recipe(title, description, difficult, ingridents))

    }
    getRecipies() {
        return this.recipies.slice();
    }
    updateRecipies(index: number, title: string, description: string, difficult: string, ingridents: Ingridents[]) {
        this.recipies[index] = new Recipe(title, description, difficult, ingridents)
    }
    removeRecipies(index: number) {
        this.recipies.splice(index, 1);
    }
}