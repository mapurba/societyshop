export class Rating {
  value: number;
  totalCount: number;
}

export class Price {
  new: number;
  old: number;
}

export class ItemSchema {
  name: string;
  id: string;
  itemCode: number = null;
  discp: string;
  price: Price;
  varients: any[] = ["None"];
  rating: Rating;
  image: string;
  brand: string;

  constructor(...args) {
    const { name, id, discp, price, varients, rating, image, brand } = args[0];
    this.name = name;
    this.id = id;
    this.discp = discp;
    this.varients = varients;
    this.rating = rating;
    this.price = price;
    this.image = image;
    this.brand = brand;
  }
}

export const DummyItem = new ItemSchema({
  name: "kent Ro Purifier Mineral RO water Purifier",
  price: { new: 9000, old: 12000 },
  discp: "Minaral RO water Purifier",
  varients: ["RO", "Ro + UV "],
  rating: { value: "4.2", totalCount: "200" },
  image:
    "https://www.bigbasket.com/media/uploads/p/m/40018854_4-himalaya-purifying-neem-face-wash.jpg",
  brand: "Kent",
});

export function retriveItemFromLocalStore(id): any[] {
  let lastValue = localStorage.getItem(id);
  if (lastValue && lastValue.length > 0) {
    try {
      return JSON.parse(localStorage.getItem(id));
    } catch (e) {
      console.error("JSon parse failed");
      return [];
    }
  }
  return [];
}