import { ToastrService } from 'ngx-toastr';
import { ProductService } from './../../../../services/product.service';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-product-create',
  templateUrl: './product-create.component.html',
  styleUrls: ['./product-create.component.css']
})
export class ProductCreateComponent implements OnInit {

  public form!: FormGroup;

  constructor(private productService: ProductService, private notify: ToastrService) { }

  ngOnInit(): void {
    this.form = new FormGroup({
      'name': new FormControl('', [Validators.required]),
      'description': new FormControl(''),
      'price': new FormControl('', [Validators.required]),
      'quantity': new FormControl('', [Validators.required, Validators.minLength(1)]),
    })
  }

  submit(): void {
    if(this.form.valid){
      const obs$ = this.productService.createProduct(this.form.value).subscribe({
        complete: ()=>{
          this.notify.success(`Um novo produto chamado ${this.form.value.name} foi criado com sucesso!`);
          obs$.unsubscribe();
        }
      })
    }
  }

}
