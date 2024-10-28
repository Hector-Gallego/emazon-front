import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { RedirectGuard } from './core/guards/redirect/redirect.guard';
import { IsLoggedGuard } from './core/guards/isLogged/is-logged.guard';


const routes: Routes = [
  {
    path: 'admin',
    canLoad: [IsLoggedGuard],
    loadChildren: () => import('./pages/admin/admin.module').then(m => m.AdminModule)
  },
  {
    path: 'auth',  
    canActivate: [RedirectGuard],
    loadChildren: () => import('./pages/auth/auth.module').then(m => m.AuthModule) 
  },
  {
    path: 'tienda',
    canLoad: [IsLoggedGuard],
    loadChildren: () => import('./pages/client/client.module').then(m => m.ClientModule)
  },
  { path: '**', redirectTo: '/tienda/articulos', pathMatch: 'full' }  
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
