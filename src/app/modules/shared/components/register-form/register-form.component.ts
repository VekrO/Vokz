import { AuthService } from './../../../../services/auth.service';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Component } from '@angular/core';

@Component({
  selector: 'app-register-form',
  templateUrl: './register-form.component.html',
  styleUrls: ['./register-form.component.css']
})
export class RegisterFormComponent {

  public form: FormGroup;

  constructor(private auth: AuthService) {
    this.form = new FormGroup({
      'username': new FormControl('', [Validators.required]),
      'email': new FormControl('', [Validators.required, Validators.email]),
      'password': new FormControl('', [Validators.required, Validators.minLength(8)])
    })
  }

  submit(): void {
    if(this.form.valid){
      this.auth.register(this.form)
    }
  }  

}
