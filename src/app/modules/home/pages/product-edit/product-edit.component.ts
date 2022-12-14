import { ToastrService } from 'ngx-toastr';
import { tap } from 'rxjs';
import { ProductService } from './../../../../services/product.service';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Product } from './../../../../interfaces/product';
import { Component, OnInit, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-product-edit',
  templateUrl: './product-edit.component.html',
  styleUrls: ['./product-edit.component.css']
})
export class ProductEditComponent implements OnInit {

  public form!: FormGroup;

  constructor(
    public dialogRef: MatDialogRef<ProductEditComponent>,
    @Inject(MAT_DIALOG_DATA) public data: Product,
    private productService: ProductService,
    private notify: ToastrService
    ) { }

  ngOnInit(): void {
    this.form = new FormGroup({
      'name': new FormControl(this.data.name, [Validators.required]),
      'description': new FormControl(this.data.description),
      'price': new FormControl(this.data.price, [Validators.required]),
      'quantity': new FormControl(this.data.quantity, [Validators.required, Validators.minLength(1)]),
    })
  }

  submit(id: any): void {
    if(this.form.valid){
      this.productService.editProduct(id, this.form.value).subscribe(()=>{
        this.notify.success('A ação foi realizada com sucesso!')
      });
    }
  }

}
