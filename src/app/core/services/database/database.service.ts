import { Injectable } from '@angular/core';
import { MyDatabase } from '../../db/db.class';
import { User, Form } from '../../models';
import Dexie from 'dexie';

@Injectable({
  providedIn: 'root'
})
export class DatabaseService {

  private db: MyDatabase;

  constructor() {
    this.db = new MyDatabase('myDB');
  }

  createUsers(users: User[]) {
    return this.db.users.bulkAdd(users);
  }

  getUsers(): Dexie.Table<any, number> {
    return this.db.users;
  }

  getUserById(userId: string) {
    return this.getUsers().where('userId').equals(userId).first();
  }

  clearUsers() {
    this.db.users.clear();
  }

  createForms(forms: any[]) {
    return this.db.forms.bulkPut(forms);
  }

  getForms(): Dexie.Table<any, number> {
    return this.db.forms;
  }

  getFormByFormCode(code: string): Dexie.Promise<any> {
    return this.db.forms.where('formCode').equals(code).first();
  }

  clearForms() {
    this.db.forms.clear();
  }

  completeForm(f: Form) {
    return this.db.userForms.put(f);
  }

  getUserForms(): Dexie.Table<Form, number> {
    return this.db.userForms;
  }

  deleteUserForms(forms: string[]): Dexie.Promise<any> {
    return this.db.userForms.bulkDelete(forms);
  }

  getUserFormsByUser(userId: string) {
    return this.getUserForms().where('completerId').equals(userId);
  }

  getUserFormByFormCode(userId: string, code: string): Dexie.Promise<Form> {
    return this.db.userForms.where('formCode').equals(code).first();
  }

  createFormsForUser(userId: string) {
    // Get all the forms we have, add a completerId, and add them to the userForms

    return this.getUserFormsByUser(userId).toArray(forms => {

      if (!forms.length) {
        this.getForms().toArray().then(allForms => {
          allForms.forEach(f => {
            f.completerId = userId;
          });

          return this.db.userForms.bulkAdd(allForms);
        });
      }
    });
  }
}
