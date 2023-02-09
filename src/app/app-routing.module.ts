import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: '',
    redirectTo: 'loader',
    pathMatch: 'full'
  },
  {
    path: 'register',
    loadChildren: () => import('./pages/register/register.module').then( m => m.RegisterPageModule)
  },
  {
    path: 'store-front',
    loadChildren: () => import('./pages/store-front/store-front.module').then( m => m.StoreFrontPageModule)
  },
  {
    path: 'login-page',
    loadChildren: () => import('./pages/login-page/login-page.module').then( m => m.LoginPagePageModule)
  },
  {
    path: 'central-ajuda',
    loadChildren: () => import('./pages/central-ajuda/central-ajuda.module').then( m => m.CentralAjudaPageModule)
  },
  {
    path: 'termos',
    loadChildren: () => import('./pages/termos/termos.module').then( m => m.TermosPageModule)
  },
  {
    path: 'codigo-conduta',
    loadChildren: () => import('./pages/codigo-conduta/codigo-conduta.module').then( m => m.CodigoCondutaPageModule)
  },
  {
    path: 'privacidade',
    loadChildren: () => import('./pages/privacidade/privacidade.module').then( m => m.PrivacidadePageModule)
  },
  {
    path: 'mycart',
    loadChildren: () => import('./pages/mycart/mycart.module').then( m => m.MycartPageModule)
  },
  {
    path: 'loader',
    loadChildren: () => import('./pages/loader/loader.module').then( m => m.LoaderPageModule)
  },  {
    path: 'profile',
    loadChildren: () => import('./pages/profile/profile.module').then( m => m.ProfilePageModule)
  }




];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule {}
