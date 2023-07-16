// type ProductIndex = Exclude<keyof Product, "toSearchString">;

export interface Product {
    id: number;
    imageUrl: string;
    name: string;
    type: string;
    price: number;
    currency: string;
    color: string;
    gender: string;
    quantity: number;
    
    [key: string]: string|number;
} 


export class ProductData {
    id: number;
    imageUrl: string;
    name: string;
    type: string;
    price: number;
    currency: string;
    color: string;
    gender: string;
    quantity: number;
    searchString: string;    

    
    [key: string]: string|number;

    constructor(product: Product) {
        this.id = product.id;
        this.name = product.name;
        this.imageUrl = product.imageUrl;
        this.type = product.type;
        this.price = product.price;
        this.currency = product.currency;
        this.color = product.color;
        this.gender = product.gender;
        this.quantity = product.quantity;
        this.searchString = this.id.toString() + " " + this.name + " " + this.type + " " + this.color + " " + this.gender + " ";
    }
}