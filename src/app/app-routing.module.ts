import { AuthGuard } from './guards/auth/auth-guard';
import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes, CanLoad } from '@angular/router';

const routes: Routes = [
  {
    path: '',
    redirectTo: 'loader',
    pathMatch: 'full'
  },

  {
    path: 'loader',
    loadChildren: () => import('./pages/loader/loader.module').then( m => m.LoaderPageModule)
  },
  {
    path: 'login',
    loadChildren: () => import('./pages/login/login.module').then( m => m.LoginPageModule)
  },
  {
    path: 'register',
    loadChildren: () => import('./pages/register/register.module').then( m => m.RegisterPageModule)
  },
  {
    path: 'home',
    loadChildren: () => import('./pages/home/home.module').then( m => m.HomePageModule),
    canMatch: [AuthGuard]
  },
  {
    path: 'sales',
    loadChildren: () => import('./pages/sales/sales.module').then( m => m.SalesPageModule),
    canMatch: [AuthGuard]
  },
  {
    path: 'all-sales',
    loadChildren: () => import('./pages/all-sales/all-sales.module').then( m => m.AllSalesPageModule),
    canMatch: [AuthGuard]
  },
  {
    path: 'add-sale',
    loadChildren: () => import('./pages/add-sale/add-sale.module').then( m => m.AddSalePageModule),
    canMatch: [AuthGuard]
  }
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule {}
