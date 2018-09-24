import { Component, OnInit } from '@angular/core';
import { DatabaseService } from '../../core/services/database/database.service';
import { Router, ActivatedRoute } from '@angular/router';
import { Form, User } from '../../core/models';
import { from, Observable } from 'rxjs';
import { take } from 'rxjs/operators';

@Component({
  selector: 'app-task-summary',
  templateUrl: './task-summary.component.html',
  styleUrls: ['./task-summary.component.scss']
})
export class TaskSummaryComponent implements OnInit {

  userForms: Observable<Form[]>;

  currentUser: User;

  complete: boolean;

  constructor(private databaseService: DatabaseService, private router: Router, private route: ActivatedRoute) {
    this.route.data.pipe(take(1)).subscribe((data) => {
      this.currentUser = data[0];
    });
  }

  ngOnInit() {
    this.userForms = from(this.databaseService.getUserFormsByUser(this.currentUser.userId).toArray());

    this.userForms.pipe(take(1)).subscribe(forms => {
      let complete = true;
      forms.forEach(f => {
        // tslint:disable-next-line:no-unused-expression
        f.completed ? null : complete = false;
      });

      complete ? this.complete = true : this.complete = false;
    });
  }

  startForm(e, f: Form) {
    this.router.navigate(['form', this.currentUser.userId, f.formCode]);
  }

}
