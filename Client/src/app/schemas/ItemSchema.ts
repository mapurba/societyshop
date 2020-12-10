 export class Rating{
    value:number;
    totalCount:number;
  }

 export class Price{
    newPrice:number;
    oldPrice:number;
  }
  
export  class ItemSchema{
    name:string;
    id:string;
    discp:string;
    price:Price;
    varients:any[] = ['None'];
    rating:Rating;
    image:string;
    brand:string;

    constructor(...args){
        const {name,id,discp,price,varients,rating,image,brand} = args[0];
        this.name=name;
        this.id=id;
        this.discp=discp;
        this.varients=varients;
        this.rating=rating;
        this.price=price;
        this.image=image;
        this.brand=brand;
    }
  }