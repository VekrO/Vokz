import { Product } from './../../interfaces/product';
import { ProductService } from './../../services/product.service';
import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ProductEditComponent } from './pages/product-edit/product-edit.component';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  constructor(private productService: ProductService, private dialog: MatDialog) { }

  public products: Array<{id: string, name: string, description: string, price: number, quantity: number}> = [];
  public productDeleteList: Array<{id: string}> = [];
  
  ngOnInit(): void {
    this.populateList();
  }
  
  deleteProduct(products: any): void {
    for(let product of products){
      if(!this.productDeleteList.includes(product)){
        // Deleta o produto.
        this.productService.deleteProduct(product.value.id).subscribe({
          complete: ()=>{
            this.populateList();
          }
        });
      }
    }
  }

  populateList(){
    this.productService.getProducts().subscribe(data=>{
      this.products = data;
    })
  }

  // Formulário de edição de produto!
  openForm(product: Product){
    this.dialog.open(ProductEditComponent, {
      data: { id: product.id, name: product.name, description: product.description, price: product.price, quantity: product.quantity }
    }).afterClosed().subscribe(()=>{
      this.populateList();
    })
  }

}
