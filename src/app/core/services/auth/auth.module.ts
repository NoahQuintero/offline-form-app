import { NgModule } from '@angular/core';
import { AuthService } from './auth.service';
import { AngularFireAuthModule } from 'angularfire2/auth';

@NgModule({
  imports: [
    AngularFireAuthModule
  ],
  providers: [
    AuthService
  ]
})
export class AuthModule { }
