import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../../core/services/auth/auth.service';
import { UserService } from '../../core/services/user/user.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent implements OnInit {

  lastName: string;
  dob: string;
  ssn: string;

  constructor(private auth: AuthService, private router: Router, private userService: UserService) {

  }

  ngOnInit() {
  }

  handleLogin($event) {
    this.userService.setUserToFind(this.lastName, this.dob, this.ssn);

    this.router.navigate(['verify-user']);
  }

}
