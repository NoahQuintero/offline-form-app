import { Injectable } from '@angular/core';
import { UserService } from '../user/user.service';
import { AngularFireAuth } from 'angularfire2/auth';


@Injectable({
  providedIn: 'root'
})
export class AuthService {

  user = null;

  constructor(private userService: UserService, private afAuth: AngularFireAuth) { }

  login(email: string, password: string, callback: Function) {
    this.afAuth.auth.signInWithEmailAndPassword(email, password).then(data => {
      console.log(data);
      this.user = data.user;
      callback(data, null);
    },
    error => {
      callback(null, error);
    });
  }

  createUser(email: string, password: string, callback: Function) {
    this.afAuth.auth.createUserWithEmailAndPassword(email, password).then(data => {
      // console.log(data);
      this.user = data.user;
      callback(data, null);
    },
    error => {
      callback(null, error);
    });
  }

  loggedIn() {
    return this.user ? true : false;
  }

}
