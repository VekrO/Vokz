import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  public form: FormGroup;

  constructor() {
    this.form = new FormGroup({
      'name': new FormControl('', [Validators.required])
    })
  }

  ngOnInit(): void {
  }

}
