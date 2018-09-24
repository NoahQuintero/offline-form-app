import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, RouterStateSnapshot, Router, Resolve } from '@angular/router';
import { Observable, of, from } from 'rxjs';
import { Form } from '../models';
import { DatabaseService } from '../services/database/database.service';
import { take, map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class FormByUserResolver implements Resolve<Form> {

  constructor(private router: Router, private databaseService: DatabaseService) {

  }

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Form | Observable<Form> | Promise<Form> {
    const userId = route.paramMap.get('userId');

    const formCode = route.paramMap.get('formCode');

    return from(this.databaseService.getUserFormByFormCode(userId, formCode)).pipe(take(1), map(form => {
      if (form) {
        return form;
      }
      // tslint:disable-next-line:one-line
      else {
        this.router.navigate(['task-summary']);
        return null;
      }
    }));
  }

}
