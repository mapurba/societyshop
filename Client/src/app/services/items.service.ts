import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { ItemSchema } from "../schemas/ItemSchema";

@Injectable({
  providedIn: "root",
})
export class ItemsService {
  constructor(private http: HttpClient) {}

  getAllItems(payload): Observable<any> {
    return this.http.get("/api/products/list");
  }

  getinventoryFrommerchant(): Observable<any> {
    return this.http.get("/api/products/merchantProductlist");
  }

  fetchsearchResult(Q): Observable<any> {
    return this.http.get(("/api/search/ac?ed=3&q=") + Q + "&");
  }

  addNewItem(item: ItemSchema) {
    return this.http.post("/api/products", item);
  }
}
