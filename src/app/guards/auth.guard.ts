import { AuthService } from './../services/auth.service';
import { Injectable } from '@angular/core';
import { Router, UrlTree, CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {
  
  constructor(private auth: AuthService, private router: Router){}
  
  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean | UrlTree | Observable<boolean | UrlTree> | Promise<boolean | UrlTree> {
    
    this.auth.verifyAuthenticated(); // Chama a função responsável por checar se o usuário está autenticado.

    // Verifica se o usuário está conectado e deixa ele prosseguir.
    if(this.auth.getAuthenticated()){
      return true;
    }

    // Caso não esteja conectado, retorna ele para o login.
    this.router.navigate(['/login']);
    return false;

  }
  
}
