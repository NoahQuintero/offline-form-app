import { Component, OnInit } from '@angular/core';
import { DatabaseService } from '../../core/services/database/database.service';
import { Form, User } from '../../core/models';
import { Router, ActivatedRoute, ParamMap } from '@angular/router';
import { switchMap, map, take } from 'rxjs/operators';
import { UserService } from '../../core/services/user/user.service';
import Dexie from 'dexie';
import { Observable, from } from 'rxjs';
import { MatSnackBar } from '@angular/material';

@Component({
  selector: 'app-form-view',
  templateUrl: './form-view.component.html',
  styleUrls: ['./form-view.component.css']
})
export class FormViewComponent implements OnInit {

  form: Form;

  currentUser: User;

  constructor(
    private databaseService: DatabaseService,
    private route: ActivatedRoute,
    private router: Router,
    private snackBar: MatSnackBar) {

    }

  ngOnInit() {

    this.route.data.pipe(take(1)).subscribe((data: {form: Form, user: User}) => {
      this.form = data[0];
      this.currentUser = data[1];
    });

  }

  formSubmitted(f: Form) {

    f.completed = true;

    this.databaseService.completeForm(f).then(() => {
      this.snackBar.open('Your form has been saved!', null, {duration: 2500});
      this.router.navigate(['task-summary', this.currentUser.userId]);
    });

  }

}
