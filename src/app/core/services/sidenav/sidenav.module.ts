import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SidenavService } from './sidenav.service';

@NgModule({
  imports: [
    CommonModule
  ],
  providers: [SidenavService]
})
export class SidenavModule { }
