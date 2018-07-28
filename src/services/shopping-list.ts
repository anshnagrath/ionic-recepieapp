import { Ingridents } from '../models/ingrident';
export class ShoppingListService {
    private ingridents: Ingridents[] = [];
    addItem(name: string, amount: number) {
        this.ingridents.push(new Ingridents(name, amount));
    }
    addItems(items: Ingridents[]) {
        this.ingridents.push(...items);

    }
    getItems() {
        return this.ingridents.slice();

    }
    removeItem(index: number) {
        this.ingridents.splice(index, 1)
    }
}   
