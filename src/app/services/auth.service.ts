import { Router } from '@angular/router';
import { FormGroup } from '@angular/forms';
import { environment } from './../../environments/environment.prod';
import { Register } from './../interfaces/register';
import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { BehaviorSubject, Observable, tap } from 'rxjs';

@Injectable({
  providedIn: 'root'
})

export class AuthService {

  private _isAuthenticated = new BehaviorSubject<boolean>(false); // Sujeito que está observando.
  public isAuthenticated = this._isAuthenticated.asObservable(); // Observar as mudanças realizadas e inserir na variável pública.

  constructor(private http: HttpClient, private router: Router) {}

  register(params: object): Observable<Register>{
    return this.http.post<Register>(`${environment.baseUrl}/user/register/`, params)
  }

  login(params: FormGroup): Observable<any>{
    return this.http.post<any>(`${environment.baseUrl}/user/login/`, params.value, {
      headers: new HttpHeaders({
        'Content-Type': 'application/json'
      })
    }).pipe(
      tap(user => {
        if(user){
          localStorage.setItem('token', user.access)
        }
      })
    )
  }

  logout(): void {
    localStorage.clear(); // Limpa o token!
    this._isAuthenticated.next(false); // Desabilita.
    this.router.navigate(['/login']); // Manda o usuário para o login!
  }

  tokenCheck(): Observable<any> {
    return this.http.post<any>(`${environment.baseUrl}/user/token/check/`, {'token': localStorage.getItem('token')}, {
      headers: new HttpHeaders({
        'Content-Type': 'application/json'
      })
    })
  }

  verifyAuthenticated(): any {

     // Checar se o token do usuário é válido!
     if(localStorage.getItem('token')){

      // Verificar se o token é válido e alterar o estado do isAuthenticated.
      this.tokenCheck().subscribe({
        next: ()=>{
          this._isAuthenticated.next(true);
          this.router.navigate(['/']);
        },
        error: ()=>{
          this._isAuthenticated.next(false);
        }
      })
      
    }else{

      // Diz que o usuário não está autenticado!
      this._isAuthenticated.next(false);
    
    }

  }

  getAuthenticated(): boolean {
    return this._isAuthenticated.getValue();
  }

}
