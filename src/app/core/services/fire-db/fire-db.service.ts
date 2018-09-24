import { Injectable } from '@angular/core';
import { AngularFirestore } from 'angularfire2/firestore';
import { Form } from '../../models';
import { DatabaseService } from '../database/database.service';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class FireDBService {

  constructor(private fireDB: AngularFirestore, private db: DatabaseService) { }

  getEvents() {
    return this.fireDB.collection('event').valueChanges();
  }

  getUsers() {
    return this.fireDB.collection('users').valueChanges();
  }

  getUsersBy(field: string, value: string) {
    // can firebase batch get?
    return this.fireDB.collection('users', ref => ref.where(field, '==', value)).valueChanges();
  }

  getForms() {
    return this.fireDB.collection('forms').valueChanges();
  }

  getFormsBy(field: string, value: string) {
    return this.fireDB.collection('forms', ref => ref.where(field, '==', value)).valueChanges();
  }

  uploadCompletedForms(forms: Form[]): Observable<any> {
    const batchAdd = new Observable<any>(observer => {
      const formsToDelete: string[] = [];
      let count: number = 0;

      forms.forEach(f => {
        this.fireDB.collection('completedForms').add(f).then(x => {
          observer.next(x);
          count++;
          formsToDelete.push((f as any).id);

          if (count >= forms.length) {
            this.db.deleteUserForms(formsToDelete).then(() => {
              observer.complete();
            }).catch(err => {
              console.log(err);
              observer.error(err);
            });

          }
        }).catch(err => {
          observer.error(err);
        });
      });
    });

    return batchAdd;
  }
}
