type Currency = "CAD" | "USD" | "INR";


export interface Product{
    name:string,
    price:number,
    currency:Currency
}