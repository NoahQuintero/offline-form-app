import { Component, OnInit } from '@angular/core';
import { SidenavService } from '../../core/services/sidenav/sidenav.service';

@Component({
  selector: 'app-sidenav',
  templateUrl: './sidenav.component.html',
  styleUrls: ['./sidenav.component.css']
})
export class SidenavComponent implements OnInit {

  status: boolean;

  constructor(private sideNav: SidenavService) { }

  ngOnInit() {
    this.sideNav.sideNavStatus.subscribe(status => {
      this.status = status;
    });
  }

}
