import { Observable, tap } from 'rxjs';
import { Router } from '@angular/router';
import { FormGroup, Validators, FormControl } from '@angular/forms';
import { AuthService } from './../../../../services/auth.service';
import { Component } from '@angular/core';

import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-login-form',
  templateUrl: './login-form.component.html',
  styleUrls: ['./login-form.component.css']
})
export class LoginFormComponent {

  public form: FormGroup;

  constructor(private auth: AuthService, private router: Router, private notify: ToastrService) {
    this.form = new FormGroup({
      'email': new FormControl('', [Validators.required]),
      'password': new FormControl('', [Validators.required, Validators.minLength(8)])
    })
  }

  submit(): void {
    if (this.form.valid) {
      this.auth.login(this.form).subscribe(
        {
          next: (data)=>{
            this.notify.success('Seja bem-vindo!');
            this.router.navigate(['/']);
          },
          error: (err)=>{
            this.notify.error('Verifique os dados informados!');
            console.log(err);
          }
        }
      )
    }
  }
}