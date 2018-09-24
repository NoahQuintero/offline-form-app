import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, RouterStateSnapshot, Router, Resolve } from '@angular/router';
import { Observable, of, from } from 'rxjs';
import { User } from '../models';
import { DatabaseService } from '../services/database/database.service';
import { take, map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class UserResolver implements Resolve<User> {

  constructor(private router: Router, private databaseService: DatabaseService) {

  }

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): User | Observable<User> | Promise<User> {
    const userId: string = route.paramMap.get('userId');

    return from(this.databaseService.getUserById(userId)).pipe(take(1), map(user => {
      if (user) {
        return user;
      }
      // tslint:disable-next-line:one-line
      else {
        this.router.navigate(['login']);
        return null;
      }
    }));
  }

}
