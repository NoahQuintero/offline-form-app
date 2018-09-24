import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SidenavService {

  sideNavStatus: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);

  constructor() {
    this.close();
  }

  open() {
    this.sideNavStatus.next(true);
  }

  close() {
    this.sideNavStatus.next(false);
  }
}
