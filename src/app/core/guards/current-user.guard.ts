import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { UserService } from '../services/user/user.service';


@Injectable({
  providedIn: 'root'
})
export class CurrentUserGuard implements CanActivate {

  constructor(private userService: UserService, private router: Router) {

  }

  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean> | Promise<boolean> | boolean {
      if (!this.userService.currentUser) {
        this.router.navigate(['login']);
      }

      return this.userService.currentUser ? true : false;
  }
}
