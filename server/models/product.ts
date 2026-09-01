import mongoose, {Schema,Document} from "mongoose";
export interface Iproduct extends Document{
    name:string;
    description:string;
    price:number;
    currency:"INR"|"USD"|"CAD",
    stock:number
}


const productSchema=new mongoose.Schema<Iproduct>({

    name:{
        type:String,
        required:true
    },
    description:{
        type:String,
        required:true
    },
    price:{
        type:Number,
        required:true

    },currency:{
        enum:[ "INR", "CAD","USD"],
        type:String,
        default:"INR"
    },
    stock:{
        type:Number,
        required:true,
        min:0,
        default:0

    }
})


const Product=mongoose.model<Iproduct>("Product",productSchema)
export default Product