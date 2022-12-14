import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { AuthGuard } from './guards/auth.guard';
import { SecurityGuard } from './guards/security.guard';

const routes: Routes = [

  { path: '', loadChildren: ()=>import('./modules/home/home.module').then(m=>m.HomeModule), canActivate: [AuthGuard] },
  { path: 'login', pathMatch: 'full', loadChildren: ()=>import('./modules/login/login.module').then(m=>m.LoginModule), canLoad: [SecurityGuard] },
  { path: 'register', pathMatch: 'full', loadChildren: ()=>import('./modules/register/register.module').then(m=>m.RegisterModule), canLoad: [SecurityGuard] },
  {
    path: '**',
    redirectTo: ''
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})

export class AppRoutingModule { }
