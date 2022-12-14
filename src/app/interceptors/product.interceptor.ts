import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor
} from '@angular/common/http';
import { Observable, catchError, EMPTY } from 'rxjs';

@Injectable()
export class ProductInterceptor implements HttpInterceptor {

  constructor(private notify: ToastrService, private router: Router) {}

  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {

    const token = localStorage.getItem('token');
    if(token != null){
      const authRequest = request.clone({setHeaders: {'Authorization': `Bearer ${token}`}})
      return next.handle(authRequest).pipe(catchError(error=>{
        localStorage.clear();
        this.notify.error('A sua sessão expirou! Faça login novamente!')
        this.router.navigate(['/login']);
        return EMPTY;
      }))
    }

    return next.handle(request);
  }

}
