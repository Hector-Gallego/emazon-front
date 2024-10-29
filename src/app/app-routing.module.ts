import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { RedirectGuard } from './core/guards/redirect/redirect.guard';
import { IsLoggedGuard } from './core/guards/isLogged/is-logged.guard';
import { MainRoutes } from './shared/constants/routes.constants';


const routes: Routes = [
  {
    path: MainRoutes.ADMIN,
    canLoad: [IsLoggedGuard],
    loadChildren: () => import('./pages/admin/admin.module').then(m => m.AdminModule)
  },
  {
    path: MainRoutes.AUTH,  
    canActivate: [RedirectGuard],
    loadChildren: () => import('./pages/auth/auth.module').then(m => m.AuthModule) 
  },
  {
    path: MainRoutes.STORE,
    canLoad: [IsLoggedGuard],
    loadChildren: () => import('./pages/client/client.module').then(m => m.ClientModule)
  },
  { path: '**', redirectTo: MainRoutes.DEFAULT_REDIRECT, pathMatch: 'full' }  
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
