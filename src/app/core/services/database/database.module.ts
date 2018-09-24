import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DatabaseService } from './database.service';

@NgModule({
  imports: [
    CommonModule
  ],
  declarations: [],
  providers: [DatabaseService]
})
export class DatabaseModule { }
