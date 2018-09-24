import { Injectable } from '@angular/core';
import { MyDatabase } from '../../db/db.class';
import * as moment from 'moment';
import { Observable, from, of } from 'rxjs';
import { User } from '../../models';


@Injectable({
  providedIn: 'root'
})
export class UserService {

  toFind: any = {};

  foundUser: User;

  currentUser: User;

  constructor() { }

  setCurrentUser() {
    this.currentUser = this.foundUser;
  }

  setUserToFind(lastName: string, dob: string, last4SSN: string) {
    this.toFind = {
      lastName: lastName,
      dob: dob,
      last4SSN: last4SSN
    };

  }

  findUserToFind(): Observable<any> {
    return this.findUser(this.toFind.lastName, this.toFind.dob, this.toFind.last4SSN);
  }

  findUser(lastName: string, dob: string, last4SSN: string): Observable<any> {

    if (!(lastName || dob || last4SSN)) {
      return of(false);
    }

    const db = new MyDatabase('myDB');

    db.open();

    const queryPromise = db.users.where('lastName').equalsIgnoreCase(lastName).and((user) => {

      let found: boolean;

      found = moment(user.dob).isSame(moment(dob)) && user.last4SSN === last4SSN;

      return found;
    }).first(user => {
      this.foundUser = user;
      return user;
    });

    return from(queryPromise);
  }
}
