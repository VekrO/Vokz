import { AuthService } from './../../../../services/auth.service';
import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {

  @Input() setRegisterButton: boolean = false;
  @Input() setLoginButton: boolean = false;
  @Input() setLogoutButton: boolean = false;

  constructor(private auth: AuthService) {}

  ngOnInit(): void {
    this.setLoginButton = !this.auth.getAuthenticated();
    this.setRegisterButton = !this.auth.getAuthenticated();
    this.setLogoutButton = this.auth.getAuthenticated();
  }

  logout(): void {
    this.setLogoutButton = false;
    this.auth.logout();
  }

}
