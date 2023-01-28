import { NgModule } from '@angular/core';
import { initializeApp, provideFirebaseApp } from '@angular/fire/app';
import { AngularFireModule } from '@angular/fire/compat';
import { getFirestore, provideFirestore } from '@angular/fire/firestore';
import { BrowserModule } from '@angular/platform-browser';
import { RouteReuseStrategy } from '@angular/router';
import { IonicModule, IonicRouteStrategy } from '@ionic/angular';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';
import { environment } from 'src/environments/environment';
import { AppStoreModule } from 'src/store/AppStoreModule';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoadingComponent } from './components/loading/loading.component';
import { AuthGuard } from './guards/auth/auth-guard';



@NgModule({
  declarations: [AppComponent, LoadingComponent],
  imports: [
    BrowserModule,
    IonicModule.forRoot(),
    AppRoutingModule,
    AngularFireModule.initializeApp(environment.firebase),
    ...AppStoreModule,
    StoreDevtoolsModule.instrument({ maxAge: 25 }),
    provideFirebaseApp(() => initializeApp(environment.firebase)),
    provideFirestore(() => getFirestore())
  ],

  providers: [{ provide: RouteReuseStrategy, useClass: IonicRouteStrategy }, AuthGuard],
  bootstrap: [AppComponent],
})
export class AppModule {}
