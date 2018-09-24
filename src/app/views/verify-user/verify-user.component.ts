import { Component, OnInit } from '@angular/core';
import { UserService } from '../../core/services/user/user.service';
import { User } from '../../core/models';
import { Router } from '@angular/router';
import { DatabaseService } from '../../core/services/database/database.service';

@Component({
  selector: 'app-verify-user',
  templateUrl: './verify-user.component.html',
  styleUrls: ['./verify-user.component.css']
})
export class VerifyUserComponent implements OnInit {

  foundUser: User;

  constructor(private userService: UserService, private router: Router, private databaseService: DatabaseService) { }

  ngOnInit() {
    this.foundUser = this.userService.foundUser;
  }

  isCorrect(correct: boolean) {
    if (!correct) {
      // Do some kind of handling of this scenario

    } else {
      this.userService.setCurrentUser();

      // setup their forms
      this.databaseService.createFormsForUser(this.foundUser.userId).then(() => {
        this.router.navigate(['task-summary', this.foundUser.userId]);
      });

      
    }
  }

}
