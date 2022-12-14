import { AuthService } from './../services/auth.service';
import { Injectable } from '@angular/core';
import { Router, UrlTree, CanLoad, Route, UrlSegment } from '@angular/router';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SecurityGuard implements CanLoad {
  constructor(private auth: AuthService, private router: Router){}
  
  canLoad(route: Route, segments: UrlSegment[]): boolean | UrlTree | Observable<boolean | UrlTree> | Promise<boolean | UrlTree> {

    this.auth.verifyAuthenticated(); // Chama a função responsável por checar se o usuário está autenticado.

    // Verifica se o usuário está conectado e não deixa ele acessar o login.
    if(this.auth.getAuthenticated()){
      return false;
    }

    // Caso não esteja conectado, deixa ele acessar o login.
    return true;
    
  }

}
