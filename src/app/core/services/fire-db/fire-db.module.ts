import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FireDBService } from './fire-db.service';
import { AngularFirestore } from 'angularfire2/firestore';

@NgModule({
  imports: [
    CommonModule
  ],
  declarations: [],
  providers: [FireDBService, AngularFirestore]
})
export class FireDBModule { }
