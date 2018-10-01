import { Component, OnInit } from '@angular/core';
import { Observable, throwError, BehaviorSubject } from 'rxjs';
import { map, take, catchError } from 'rxjs/operators';
import { User, Form } from '../../core/models';
import { FireDBService } from '../../core/services/fire-db/fire-db.service';
import { DatabaseService } from '../../core/services/database/database.service';
import { MatSnackBar, MatDialog } from '@angular/material';
import { DialogComponent } from '../../components/dialog/dialog.component';


@Component({
  selector: 'app-setup',
  templateUrl: './setup.component.html',
  styleUrls: ['./setup.component.scss'],
  providers: []
})
export class SetupComponent implements OnInit {

  events: Observable<{}[]>;

  private _usersAdded: boolean = false;
  get usersAdded(): boolean {
    return this._usersAdded;
  }

  set usersAdded(added) {
    this._usersAdded = added;
    this.trySuccessToast();
  }

  private _formsAdded: boolean = false;
  get formsAdded(): boolean {
    return this._formsAdded;
  }

  set formsAdded(added) {
    this._formsAdded = added;
    this.trySuccessToast();
  }

  formsPendingUpload: boolean = false;

  constructor(private fireDB: FireDBService, private db: DatabaseService, private snackBar: MatSnackBar, private dialog: MatDialog) { }

  ngOnInit() {
    this.events = this.fireDB.getEvents();

    this.tryOpenDialog();
  }

  tryOpenDialog() {
    this.db.getUserForms().toArray(forms => {
      if (forms.length) {
        const dialog = this.dialog.open(DialogComponent, {width: '350px'});

        dialog.afterClosed().subscribe(upload => {
          if (upload) {
            this.uploadCompletedForms(forms).subscribe(null, null, () => {
              this.snackBar.open('The forms have been successfully uploaded!', null, {duration: 2500});
            });
          }
          // tslint:disable-next-line:one-line
          else {
            this.formsPendingUpload = true;
          }
        });
      }
    });
  }

  setupForEvent($event, event) {

    this.clearEvents();

    this.setupUsers(event);

    this.setupForms(event);

  }

  uploadCompletedForms(forms) {
    return this.fireDB.uploadCompletedForms(forms);
  }

  clearEvents() {
    this.db.clearForms();
    this.db.clearUsers();
  }

  errorHandler(e) {
    console.log(e);
  }

  setupUsers(event) {
    // Create new observable
    const attendees$ = new Observable<User>(observer => {
      let count: number = 0;

      // for every attendee
      event.attendees.forEach( a => {
        const u = this.fireDB.getUsersBy('userId', a);

        // get the attendee from the server (assumses we should only get one per request, userId should be unique)
        u.pipe(catchError(e => throwError(observer.error(e))))
          .pipe(take(1)).pipe(map(users => users as User[])).subscribe(users => {

            // emit item and track how many we have so far
            observer.next(users[0]);
            count++;

            // when we have everyone we're supposed to get, complete the observable
            if (count >= event.attendees.length) {
              observer.complete();
            }
        });
      });

      return { unsubscribe() { } };
    });

    const attendees: User[] = [];
    // subscribe to our observable, and catch the emitted items
    attendees$.subscribe(u => attendees.push(u), null, () => {
      // once we have everyone, batch add them to db.
      this.db.createUsers(attendees).then(() => {
        // and say we successfully got everyone.
        this.usersAdded = true;
      }).catch(err => {
        // should give error feedback here...
        console.log(err);
      });
    });
  }

  // functions identical to setupUsers, but forms instead...
  setupForms(event) {
    const forms$ = new Observable<Form>(observer => {
      let count: number = 0;

      event.forms.forEach( f => {
        const myForm = this.fireDB.getFormsBy('formCode', f);
        myForm.pipe(catchError(e => throwError(observer.error(e))))
          .pipe(take(1)).pipe(map(form => form as Form[])).subscribe(form => {

            observer.next(form[0]);
            count++;

            if (count >= event.attendees.length) {
              observer.complete();
            }

        });
      });

      return { unsubscribe() { } };
    });

    const forms: Form[] = [];
    forms$.subscribe(u => forms.push(u), null, () => {
      this.db.createForms(forms).then(() => {
        this.formsAdded = true;
      }).catch(err => {
        console.log(err);
      });
    });
  }

  trySuccessToast() {
    // console.log(this.usersAdded, this.formsAdded);
    if (this.usersAdded && this.formsAdded) {
      // console.log('success');
      // alert('This device is ready for the event!');

      this.snackBar.open('This device is ready for the event!', null, {duration: 2500});
    }
  }

}
