import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { AuthService } from './../../../../services/auth.service';
import { FormGroup, Validators, FormControl, AbstractControl } from '@angular/forms';
import { Component } from '@angular/core';


@Component({
  selector: 'app-register-form',
  templateUrl: './register-form.component.html',
  styleUrls: ['./register-form.component.css']
})
export class RegisterFormComponent {

  constructor(private auth: AuthService, private notify: ToastrService, private router: Router) {}

  public firstForm = new FormGroup({
    'first_name': new FormControl('', Validators.required),
    'last_name': new FormControl('', Validators.required),
  })

  public secondForm = new FormGroup({
    'email': new FormControl('', [Validators.required]),
    'telephone': new FormControl('', [Validators.required, Validators.minLength(15)]),
    'cpf': new FormControl(''),
    'rg': new FormControl(''),
    'password': new FormControl('', [Validators.required, Validators.minLength(8)]),
    'passwordConfirm': new FormControl('', [Validators.required, Validators.minLength(8)]),
  }, [this.passwordMatch('password', 'passwordConfirm')])
  
  passwordMatch(password: string, passwordConfirm: string){
    return function(form: AbstractControl){
      const passwordValue = form.get('password')?.value;
      const passwordConfirmValue = form.get('passwordConfirm')?.value;
      if(passwordValue === passwordConfirmValue){
        return null;
      }
      form.get('passwordConfirm')?.setErrors({mismatch: true})
      return { mismatch: true }
    }
  }

  submit(): void {

    console.log(this.secondForm.controls['passwordConfirm'].hasError('mismatch'));
    

    let params = {
      first_name: this.firstForm.get('first_name')?.value,
      last_name: this.firstForm.get('last_name')?.value,
      email: this.secondForm.get('email')?.value,
      telephone: this.secondForm.get('telephone')?.value,
      cpf: this.secondForm.get('cpf')?.value,
      rg: this.secondForm.get('rg')?.value,
      password: this.secondForm.get('password')?.value,
    }
    
    let obs$ = this.auth.register(params).subscribe({
      complete: ()=>{
        obs$.unsubscribe();
        this.notify.success('Registro efetuado com sucesso! Faça login.')
        this.router.navigate(['/login']);
      }
    })
    
  }

  resetCpfRg(): void {
    this.secondForm.patchValue({cpf: ''});
    this.secondForm.patchValue({rg: ''});
  }

  handleTelephone(event: any): void {
    let input = event.target
    input.value = this.phoneMask(input.value)
  }

  phoneMask(value: string): string{
    if (!value) return ""
    value = value.replace(/\D/g,'')
    value = value.replace(/(\d{2})(\d)/,"($1) $2")
    value = value.replace(/(\d)(\d{4})$/,"$1-$2")
    return value
  }

  handleCpf(): void {
    
    if(this.secondForm.value.cpf?.length == 3){
      this.secondForm.patchValue({cpf: this.secondForm.value.cpf += '.'})
    }else if(this.secondForm.value.cpf?.length == 7){
      this.secondForm.patchValue({cpf: this.secondForm.value.cpf += '.'})
    }else if(this.secondForm.value.cpf?.length == 11){
      this.secondForm.patchValue({cpf: this.secondForm.value.cpf += '-'})
    }

  }

}
