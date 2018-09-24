import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ServiceWorkerModule } from '@angular/service-worker';
import { environment } from '../environments/environment';
import { AngularFireModule } from 'angularfire2';

import { MaterialModule } from './material/material.module';

import { ViewsModule } from './views/views.module';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ComponentsModule } from './components/components.module';

import { UserModule } from './core/services/user/user.module';
import { FireDBModule } from './core/services/fire-db/fire-db.module';
import { DatabaseModule } from './core/services/database/database.module';
import { FormsModule } from '@angular/forms';
import { FormByUserResolver } from './core/resolvers/form-by-user.resolver';
import { UserResolver } from './core/resolvers/user.resolver';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    ServiceWorkerModule.register('/ngsw-worker.js', { enabled: environment.production }),
    BrowserAnimationsModule,
    AppRoutingModule,
    AngularFireModule.initializeApp(environment.firebase, 'my-things-project'),
    MaterialModule,
    ViewsModule,
    ComponentsModule,
    UserModule,
    FormsModule,
    FireDBModule,
    DatabaseModule
  ],
  providers: [FormByUserResolver, UserResolver],
  bootstrap: [AppComponent]
})
export class AppModule { }
