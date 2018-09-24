import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { UserService } from '../services/user/user.service';
import { take, map } from 'rxjs/operators';


@Injectable({
  providedIn: 'root'
})
export class VerifyUserGuard implements CanActivate {

  constructor(private userService: UserService, private router: Router) {

  }

  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean> | Promise<boolean> | boolean {
      return this.foundUser().pipe(map(x => {
        if (x) {
          return true;
        }

        this.router.navigate(['login']);
        return false;
      }));
  }

   foundUser(): Observable<any> {
    return this.userService.findUserToFind();
  }
}
