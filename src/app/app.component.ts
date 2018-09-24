import { Component, OnInit } from '@angular/core';
import { AuthService } from './core/services/auth/auth.service';
import { SidenavService } from './core/services/sidenav/sidenav.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'app';

  sidenavStatus: boolean;

  constructor(private auth: AuthService, private sidenav: SidenavService) {

  }

  ngOnInit() {
    this.sidenav.sideNavStatus.subscribe(status => {
      this.sidenavStatus = status;
    });

  }
}
