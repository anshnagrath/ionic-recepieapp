import { Ingridents } from './ingrident';
export class Recipe {
    constructor(public title: string, public description, public difficulty: string, public indridents: Ingridents[]) {

    }

}