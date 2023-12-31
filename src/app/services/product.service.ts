import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { Product } from '../shared/models/product';
import { environment } from '../environments/environment';

@Injectable()
export class ProductService {
  private productsUrl = environment.backendCatalogue;
  private createProductUrl = environment.backendCreateProduit;
  
  constructor(private http: HttpClient) {}

  public createProduct(product: Product): Observable<Product> {
    const formData = new FormData();
    formData.append('name', product.name);
    formData.append('imgurl', product.imgurl);
    formData.append('description', product.description);
    formData.append('price', product.price.toString());
    formData.append('category', product.category);

    return this.http.post<Product>(this.createProductUrl, formData);
  }

  public getProducts(): Observable<Product[]> {
    return this.http.get<Product[]>(this.productsUrl);
  }

  searchCatalog(searchTerm: string): Observable<any> {
    if (searchTerm && searchTerm.trim().length >= 1) {
      const url = `https://projet-sacchetto-vladimir.onrender.com/api/catalogue/${searchTerm}`;
      return this.http.get(url);
    } else {
      return of([]);
    }
  }
}
