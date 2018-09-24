import Dexie from 'dexie';
import { User, Form } from '../models';

// Subclass it
export class MyDatabase extends Dexie {
    users: Dexie.Table<User, number>;
    forms: Dexie.Table<Form, number>;
    userForms: Dexie.Table<Form, number>;

    constructor (databaseName) {
        super(databaseName);
        this.version(1).stores({
            users: '++id, userId, lastName, dob, last4SSN',
            forms: '++id, formCode',
            userForms: '++id, completerId, formCode'
        });
    }
}
