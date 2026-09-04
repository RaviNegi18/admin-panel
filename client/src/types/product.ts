type Currency = "CAD" | "USD" | "INR";


export interface Product{
    _id?:string | undefined,
    name:string,
    price:number,
    currency:Currency,
    description:string,
    stock:number
}