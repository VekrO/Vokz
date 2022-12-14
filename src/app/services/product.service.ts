import { HttpClient } from '@angular/common/http';
import { Observable, tap } from 'rxjs';
import { Injectable } from '@angular/core';
import { Product } from '../interfaces/product';

@Injectable({
  providedIn: 'root'
})

export class ProductService {

  constructor(private http: HttpClient) { }

  getProducts(): Observable<any> {
    return this.http.get('http://localhost:8000/product/');
  }

  createProduct(product: Product): Observable<any> {
    return this.http.post<any>('http://localhost:8000/product/create/', product)
  }
  
  editProduct(id: string, product: Product): Observable<any> {

    return this.http.patch<any>('http://localhost:8000/product/update/', {
      id: id,
      name: product.name,
      description: product.description,
      price: product.price,
      quantity: product.quantity

    })

  }

  deleteProduct(id: string): Observable<any>{
    return this.http.delete<any>('http://localhost:8000/product/delete/', {
      body: {
        id: id
      }
    }).pipe(tap(object=>{
      console.log(object);
    }))
  }

}
